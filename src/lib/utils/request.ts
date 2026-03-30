import { sleep } from "./sleep";

export interface RetryContext {
  url: string;
  status: number | "NETWORK_ERROR";
  retry: number;
  retryAfter: number;
  error?: string;
}

export interface BackOffOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  retryOnStatuses?: Set<number>;
  retryOnNetworkError?: boolean;
  cancellationSignal?: AbortSignal | null;
  onRetry?: (context: RetryContext) => void;
}

/**
 * Fetch with rate-limit handling (429) and transient retry/backoff.
 */
export async function request(
  requestUrl: string,
  requestOptions: RequestInit = {},
  backOffOptions: BackOffOptions = {}
): Promise<Response> {
  const {
    maxRetries = 5,
    baseDelayMs = 2000,
    maxDelayMs = 30_000,
    retryOnStatuses = new Set([429]),
    retryOnNetworkError = true,
    cancellationSignal = requestOptions.signal, // Abort signal
    onRetry
  } = backOffOptions;

  let retry = 0;
  let lastResponse: Response | undefined;
  let lastException: any;

  while (retry <= maxRetries) {
    lastResponse = undefined;
    lastException = undefined;

    try {
      lastResponse = await fetch(requestUrl, { ...requestOptions, signal: cancellationSignal });
      if (!retryOnStatuses.has(lastResponse.status)) {
        if (retry > 0)
          console.log(`Request to ${requestUrl} succeeded after ${retry}/${maxRetries} retries.`);
        return lastResponse;
      }
    } catch (e: any) {
      if (e?.name === "AbortError" || !retryOnNetworkError)
        throw e;
      lastException = e;
      lastResponse = undefined;
    }

    retry++;
    if (retry > maxRetries)
      break;

    console.error(`Request to ${requestUrl} failed, will retry ${retry}/${maxRetries}. `, lastResponse ?? lastException);
    await backOff({
      url: requestUrl,
      response: lastResponse,
      exception: lastException,
      retry,
      baseDelayMs,
      maxDelayMs,
      onRetry,
      cancellationSignal
    });
  }

  console.error(`Request to ${requestUrl} exhausted ${maxRetries}`, lastResponse ?? lastException);
  throw lastResponse ?? lastException ?? new Error("Request exhausted retries");
}

async function backOff({
  url,
  response,
  exception,
  retry,
  baseDelayMs,
  maxDelayMs,
  onRetry,
  cancellationSignal
}: {
  url: string;
  response?: Response;
  exception?: any;
  retry: number;
  baseDelayMs: number;
  maxDelayMs: number;
  onRetry?: (context: RetryContext) => void;
  cancellationSignal?: AbortSignal | null;
}) {
  let retryDelayMs: number;
  if (!!response && !exception)
    retryDelayMs = getBackOffInMs({
      response,
      retry,
      baseDelayMs,
      maxDelayMs,
    });
  else
    retryDelayMs = computeBackoffWithJitter(retry, baseDelayMs, maxDelayMs);

  if (onRetry) {
    onRetry({
      url,
      status: response?.status ?? "NETWORK_ERROR",
      retry: retry,
      retryAfter: retryDelayMs,
      error: exception?.toString() ?? undefined
    });
  }

  await sleep(retryDelayMs, cancellationSignal ?? undefined);
}

function getBackOffInMs({
  response,
  retry,
  baseDelayMs,
  maxDelayMs
}: {
  response: Response;
  retry: number;
  baseDelayMs: number;
  maxDelayMs: number;
}): number {
  const retryAfterMs = getRetryAfterInMs(response);
  const retryAfterIsValid = Number.isFinite(retryAfterMs) && retryAfterMs >= 0;
  if (retryAfterIsValid) {
    const retryAfterJittered = retryAfterMs + Math.random() * 200;
    return clamp(retryAfterJittered, 0, maxDelayMs);
  }

  return computeBackoffWithJitter(retry, baseDelayMs, maxDelayMs);
}

function computeBackoffWithJitter(retry: number, baseDelayMs: number, maxDelayMs: number): number {
  // Exponential backoff base * 2^attempt
  const backOff = baseDelayMs * Math.pow(2, retry - 1);
  const jitter = Math.random() * 0.15 * backOff;
  return clamp(backOff + jitter, baseDelayMs, maxDelayMs);
}

function getRetryAfterInMs(response: Response): number {
  const retryAfter = response.headers.get("retry-after");
  if (!retryAfter) return NaN;

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds)) return seconds * 1000;

  const asDate = Date.parse(retryAfter);
  if (Number.isFinite(asDate)) return asDate - Date.now();

  return NaN;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

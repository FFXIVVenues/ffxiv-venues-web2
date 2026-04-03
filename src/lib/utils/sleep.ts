export function sleep(ms: number, cancellationSignal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (cancellationSignal?.aborted) {
      return reject(Object.assign(new Error("Aborted"), { name: "AbortError" }));
    }

    const timer = setTimeout(resolve, ms);

    if (cancellationSignal) {
      cancellationSignal.addEventListener(
        "abort",
        () => {
          clearTimeout(timer);
          reject(Object.assign(new Error("Aborted"), { name: "AbortError" }));
        },
        { once: true }
      );
    }
  });
}
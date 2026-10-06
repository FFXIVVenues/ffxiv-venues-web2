import {t} from "@lingui/core/macro";

export const saveError = (error: unknown) =>
    error instanceof Response && error.status === 401
        ? t`Your login has expired. Use /login in Discord to log in again.`
        : t`Something went wrong saving your venue. Please try again.`;
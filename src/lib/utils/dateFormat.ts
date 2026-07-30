export const dtfOptions = {
  time12: { hour: "numeric", minute: "2-digit" },
  time24: { hour: "numeric", minute: "2-digit", hour12: false },
  weekdayShort: { weekday: "short" },
  weekdayLong: { weekday: "long" },
  dateNear: { weekday: "long",  day: "numeric" },
  dateFar: { weekday: "long",  month: "short", day: "numeric" },
  dateNearShort: { weekday: "short", day: "numeric" },
  dateFarShort: { weekday: "short", month: "short", day: "numeric" },
  effective: { day: "numeric", month: "long", year: "numeric" },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export type DtfKey = keyof typeof dtfOptions;

const cache = new Map<string, Intl.DateTimeFormat>();

export function dtf(locale: string, k: DtfKey): Intl.DateTimeFormat {
  const key = locale + "|" + k;
  let f = cache.get(key);
  if (!f) cache.set(key, (f = new Intl.DateTimeFormat(locale, dtfOptions[k])));
  return f;
}

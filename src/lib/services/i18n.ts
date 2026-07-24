import { i18n } from "@lingui/core";

export const locales = {
    en: "English",
    fr: "Français",
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "en";

export async function activateLocale(locale: string) {
    const loc = (locale in locales ? locale : defaultLocale) as Locale;
    const { messages } = await import(`../../locales/${loc}/messages.po`);
    i18n.load(loc, messages);
    i18n.activate(loc);
    localStorage.setItem("locale", loc);
}

export function detectLocale(): Locale {
    const saved = localStorage.getItem("locale");
    if (saved && saved in locales) return saved as Locale;
    const browser = navigator.language.split("-")[0] ?? defaultLocale;
    return (browser in locales ? browser : defaultLocale) as Locale;
}
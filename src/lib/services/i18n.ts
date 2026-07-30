import { i18n } from "@lingui/core";

export const locales = {
    en: "English",
    "en-x-miqo": "Miqo'te",
    fr: "Français",
    de: "Deutsch",
    "pt-BR": "Português (Brasil)",
    ja: "日本語",
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "en";
export const availableLocales: Locale[] = ["en"];

export const isAvailableLocale = (value: string): value is Locale => (availableLocales as readonly string[]).includes(value);

export async function activateLocale(locale: Locale) {
    const { messages } = await import(`../../locales/${locale}/messages.po`);
    i18n.load(locale, messages);
    i18n.activate(locale);
    localStorage.setItem("locale", locale);
}

export function detectLocale(): Locale {
    const saved = localStorage.getItem("locale");
    if (saved && availableLocales.includes(saved as Locale)) return saved as Locale;
    const nav = navigator.language;
    if (availableLocales.includes(nav as Locale)) return nav as Locale;
    const base = nav.split("-")[0] ?? defaultLocale;
    if (availableLocales.includes(base as Locale)) return base as Locale;

    return defaultLocale;
}
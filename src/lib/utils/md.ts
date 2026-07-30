const docs = import.meta.glob("../../content/**/*.md", {
    query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

export function _md(path: string, locale: string): string {
    const at = (loc: string) => Object.entries(docs).find(([p]) => p.endsWith(`/${path}/${loc}.md`))?.[1];
    return at(locale) ?? at("en") ?? "";
}
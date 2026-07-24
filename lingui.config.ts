import { defineConfig } from "@lingui/cli";

export default defineConfig({
   sourceLocale: "en",
    locales: ["en", "fr", "de", "pt-BR", "ja"],
    catalogs: [
        {
            path: "<rootDir>/src/locales/{locale}/messages",
            include: ["src"],
        },
    ],
});
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { App } from "./components/app/app.tsx";
import { messages } from "./locales/en/messages.po";
import "./index.css";
import { provideTheme } from "@/lib/services/settings/usetheme";

provideTheme();

i18n.load("ja", messages);
i18n.activate("ja");

const elem = document.getElementById("app-root")!;
const app = (
    <StrictMode>
        <I18nProvider i18n={i18n}>
            <App />
        </I18nProvider>
    </StrictMode>
);

if (import.meta.hot) {
    const root = (import.meta.hot.data.root ??= createRoot(elem));
    root.render(app);
} else {
    createRoot(elem).render(app);
}


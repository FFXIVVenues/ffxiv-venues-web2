import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app/app.tsx";
import "./index.css";
import {ThemeProvider} from "@/lib/utils/hooks/useTheme.ts";

const elem = document.getElementById("app-root")!;
const app = (
  <StrictMode>
      <ThemeProvider />
      <App />
  </StrictMode>
);

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  createRoot(elem).render(app);
}


import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { App } from "./components/app/App.tsx";

import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/charts/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/nprogress/styles.css'

// import "./index.css";

const theme = createTheme({
  cursorType: 'pointer',
  primaryColor: 'magenta',
  primaryShade: 5,
  colors: {
    magenta: [
      '#fff0ff',
      '#ffd6ff',
      '#ffadff',
      '#ff85ff',
      '#ff5cff',
      '#ff33ff',
      '#ff0aff',
      '#FF00FF',
      '#d600d6',
      '#ad00ad',
    ],
    dark: [
      "#c9c9c9",
      "#b8b8b8",
      "#828282",
      "#696969",
      "#424242",
      "#202020",
      "#181818",
      "#101010",
      "#080808",
      "#000000",
    ],
  },
  breakpoints: {
    xs: '15em',
    sm: '40em',
    md: '65em',
    lg: '95em',
    xl: '125em',
  }

});

const elem = document.getElementById("app-root")!;
const app = (
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>
);

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}


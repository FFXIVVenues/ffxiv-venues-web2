import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { lingui } from "@lingui/vite-plugin";

export default defineConfig({
  root: "src",
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  build: { outDir: "../dist" },
  plugins: [
    react({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
    tailwindcss(),
    lingui(),
  ],
});
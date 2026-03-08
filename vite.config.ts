import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';


export default defineConfig({
  root: "src",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "../dist",
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    include: ["src/tests/**/*.test.jsx"], // Asegúrate de que Vitest incluya tus archivos de prueba
  },
});

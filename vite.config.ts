import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => ({
  plugins: [react()],
  test: {
    css: true,
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
  },
}));

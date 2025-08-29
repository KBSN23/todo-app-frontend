import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/helpers/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["html", "text"],
      exclude: [
        "**/*.d.ts",
        "**/*.types.tsx",
        "**/*.types.ts",
        "**/index.ts",
        "**/*.gen.ts",
        "vite.config.ts",
        "eslint.config.js",
        "src/main.tsx",
        "src/routes/__root.tsx",
        "src/helpers/runStoreTests.ts",
      ],
    },
  },
  server: {
    port: 3000,
  },
});

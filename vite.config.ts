import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error tailwindcss plugin is not typed 
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore 
import path from "path";
// @ts-ignore
import { fileURLToPath } from "url";

import { nodePolyfills } from "vite-plugin-node-polyfills";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      exclude: ["fs", "path", "url", "crypto"],
    }),
  ],
  resolve: {
    alias: {
      "node:fs/promises": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "node:fs": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "node:path": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "node:url": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "node:crypto": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "fs/promises": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "fs": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "path": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "url": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
      "crypto": path.resolve(__dirname, "src/Utilities/nodeMocks.ts"),
    },
  },
  server: {
    host: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
    sourcemap: true,
  },
});

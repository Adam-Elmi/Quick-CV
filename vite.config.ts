import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error tailwindcss plugin is not typed
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true,
  },
  optimizeDeps: {
    exclude: ["quickjs-emscripten"],
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    target: "esnext",
    sourcemap: true,
  },
});

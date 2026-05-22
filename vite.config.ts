import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter, TanStackRouterVite } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    devtools(),
    tailwindcss(),
    viteReact(),
  ],
  server: {
    port: 4000,
  },
});

export default config;

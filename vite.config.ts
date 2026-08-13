import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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

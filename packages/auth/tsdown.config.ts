import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		client: "./src/client.ts",
		react: "./src/react/index.tsx",
		"react/client": "./src/react/client.tsx",
		shared: "./src/shared.ts",
		expo: "./src/expo.ts",
		env: "./env.ts",
	},
	exports: true,
	external: ["react", "react-dom", "cloudflare:workers", "cloudflare:workflow"],
});

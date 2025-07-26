import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		client: "./src/client.ts",
		react: "./src/react.tsx",
		shared: "./src/shared.ts",
		expo: "./src/expo.ts",
		env: "./env.ts",
	},
	exports: true,
});

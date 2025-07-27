import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		expo: "./src/expo.ts",
		cf: "./src/cf.ts",
	},
	exports: true,
});

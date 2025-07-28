import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "./src/index.ts",
	},
	exports: true,
	external: ["cloudflare:workers", "cloudflare:workflow"],
});

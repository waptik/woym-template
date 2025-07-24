import { defineConfig } from "tsdown"

export default defineConfig({
	// entry: {
	// 	index: "./src/index.ts",
	// 	client: "./src/client/index.ts",
	// 	react: "./src/react.tsx",
	// 	server: "./src/server/index.ts",
	// 	lib: "./src/lib/index.ts",
	// },
	format: ["cjs", "esm"],
	dts: true,
	exports: false,
	minify: true,
	unbundle: true,
})

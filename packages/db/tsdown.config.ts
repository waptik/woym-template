import { defineConfig } from "tsdown"

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		schema: "./src/schema/index.ts",
		db: "./src/db.ts",
		utils: "./src/utils.ts",
		worker: "./src/worker.ts",
	},
	format: ["cjs", "esm"],
	dts: true,
	exports: true,
	unbundle: true,
})

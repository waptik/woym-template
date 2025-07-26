import { defineConfig } from "tsdown"

export default defineConfig({
	// entry: ["./src/index.ts", "./src/schema/index.ts", "./src/db.ts", "./src/utils.ts"],
	entry: {
		index: "./src/index.ts",
		schema: "./src/schema/index.ts",
		db: "./src/db.ts",
		utils: "./src/utils.ts",
		env: "./env.ts",
	},
	exports: true,
	// format: ["cjs", "esm"],
	// unbundle: true,
})

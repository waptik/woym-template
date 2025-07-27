import { defineConfig } from "tsdown"

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		schema: "./src/schema/index.ts",
		"db-cli": "./src/db-cli.ts",
		utils: "./src/utils.ts",
		env: "./env.ts",
	},
	exports: true,
})

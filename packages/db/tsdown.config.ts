import { defineConfig } from "tsdown"

export default defineConfig({
	entry: {
		index: "./src/index.ts",
		schema: "./src/schema/index.ts",
		"db-cli": "./src/db-cli.ts",
		utils: "./src/utils.ts",
	},
	exports: true,
	external:["@woym/workers-types"]
})

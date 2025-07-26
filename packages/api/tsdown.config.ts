import { defineConfig } from "tsdown";

export default defineConfig({
	// entry: ["./src/index.ts", "./src/client/index.ts", "./src/react.tsx", "./src/server/index.ts", "./src/lib/index.ts"],
	entry: {
		index: "./src/index.ts",
		client: "./src/client/index.ts",
		react: "./src/react.tsx",
		server: "./src/server/index.ts",
		handlers: "./src/server/handlers/index.ts",
		lib: "./src/lib/index.ts",
	},
	// format: ["cjs", "esm"],
	dts: true,
	exports: true,
	// minify: true,
	// unbundle: true,
});

import { defineConfig } from "tsdown"

export default defineConfig({
	workspace: { include: ["packages/*"] },
	dts: true,
	// exports: true,
	// fixedExtension: true,
	// format: ["esm", "cjs"],
})

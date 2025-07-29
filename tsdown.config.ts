import { defineConfig } from "tsdown";

export default defineConfig({
	// Remove workspace include since packages now build individually
	// workspace: { include: ["packages/*"] },
	dts: true,
	// exports: true,
	// fixedExtension: true,
	// format: ["esm", "cjs"],
});

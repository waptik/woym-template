import { defineConfig } from "tsdown";

defineConfig({
    entry: ["./src/**/*.ts"],
    external: ["cloudflare:workers", "cloudflare:workflows"],
    // exports: true,
})
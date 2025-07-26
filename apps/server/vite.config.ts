import { cloudflare } from "@cloudflare/vite-plugin"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/

export default defineConfig(({ mode }) => {

	const isDevelopment = mode === "development"
	return {
		server: {
			port: isDevelopment ? 3001 : undefined,
		},
		plugins: [tsconfigPaths(), cloudflare()],
	}
})

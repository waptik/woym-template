import { cloudflare } from "@cloudflare/vite-plugin"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	console.log(`Loading environment variables for mode: ${mode}`, env)

	const isDevelopment = env.VITE_USER_NODE_ENV === "development"
	return {
		optimizeDeps: {
			exclude: ["@woym/auth", "@woym/api", "@woym/schemas", "@woym/workers-types", "@woym/db", "@better-auth/expo"],
		},
		server: {
			port: isDevelopment ? 3001 : undefined,
		},
		plugins: [tsconfigPaths(), cloudflare()],
	}
})

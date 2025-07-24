import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	console.log("[Vite] Loaded environment variables:", env)

	const isDevelopment = env.VITE_USER_NODE_ENV === "development"
	return {
		optimizeDeps: {
			exclude: [
				"tanstack-start-server-fn-manifest:v",
				"tanstack-start-router-manifest:v",
				"tanstack-start-server-routes-manifest:v",
				"@woym/auth",
				"@woym/api",
				"@woym/schemas",
				"@woym/workers-types",
				"@woym/db",
				"@better-auth/expo",
			],
		},
		server: {
			allowedHosts: isDevelopment ? true : undefined,
			port: isDevelopment ? 3000 : undefined,
			proxy: {
				"/api": {
					target: env.VITE_SERVER_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		plugins: [
			tsconfigPaths(),
			tailwindcss(),
			tanstackStart({ target: "cloudflare-module", customViteReactPlugin: true }),
			viteReact(),
		],
	}
})

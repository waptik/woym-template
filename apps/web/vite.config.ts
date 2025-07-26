import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
	
	const env = loadEnv(mode, process.cwd())

	const isDevelopment = mode === "development"
	return {
		optimizeDeps: {
			exclude: [
				"tanstack-start-server-fn-manifest:v",
				"tanstack-start-router-manifest:v",
				"tanstack-start-server-routes-manifest:v",
				"@better-auth/expo",
			],
		},
		server: {
			allowedHosts: isDevelopment ? true : undefined,
			port: isDevelopment ? 3000 : undefined,
			proxy: {
				"/__": {
					target: env.VITE_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/__/, ""),
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

import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const isDevelopment = mode === "development";
	return {
		build: {
			rollupOptions: {
				external: [
					"drizzle-orm",
					"http",
					"nanoid",
					"better-auth",
					"path",
					"vite",
					"dotenv/config",
					"drizzle-orm/sqlite-core",
					"drizzle-orm/libsql",
					"@libsql/client",
					"dotenv",
				],
				output: {
					globals: {
						"drizzle-orm": "drizzle-orm",
						http: "http",
						nanoid: "nanoid",
						"socket.io": "socket.io",
						path: "path",
						vite: "vite",
						"dotenv/config": "dotenv/config",
						"drizzle-orm/sqlite-core": "drizzle-orm/sqlite-core",
						"drizzle-orm/libsql": "drizzle-orm/libsql",
						"@libsql/client": "@libsql/client",
						dotenv: "dotenv",
					},
				},
			},
			sourcemap:true,
		},
		server: {
			port: isDevelopment ? 3001 : undefined,
		},
		plugins: [tsconfigPaths(), cloudflare()],
	};
});

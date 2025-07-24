import { defineConfig } from "drizzle-kit"

import { env } from "./env"

console.log("[DB] Drizzle configuration initialized with environment variables:", { env })

export default defineConfig({
	schema: "./src/schema",
	out: "./drizzle",
	// DOCS: https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit
	dialect: "sqlite",
	driver: "d1-http",
	verbose: true,
	dbCredentials: {
		accountId: env.CLOUDFLARE_ACCOUNT_ID,
		databaseId: env.CLOUDFLARE_DATABASE_ID,
		token: env.CLOUDFLARE_D1_TOKEN,
	},
	casing: "snake_case",
	migrations: {
		prefix: "timestamp",
	},
})

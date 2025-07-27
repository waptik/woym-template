import { defineConfig } from "drizzle-kit"
import { dbEnv } from "@woym/schemas/db";

console.log("[drizzle.config.ts] Initializing Drizzle configuration with environment variables:",dbEnv);


export default defineConfig({
	schema: "./src/schema",
	out: "./drizzle",
	// DOCS: https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit
	dialect: "sqlite",
	driver: "d1-http",
	verbose: true,
	dbCredentials: {
		accountId: dbEnv.CLOUDFLARE_ACCOUNT_ID,
		databaseId: dbEnv.CLOUDFLARE_DATABASE_ID,
		token: dbEnv.CLOUDFLARE_D1_TOKEN,
	},
	casing: "snake_case",
	migrations: {
		prefix: "timestamp",
	},
})

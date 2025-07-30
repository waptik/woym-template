import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: "../../apps/server/.env" });

console.log("[drizzle.config.ts] Initializing Drizzle configuration with environment variables");

export default defineConfig({
	schema: "./src/schema",
	out: "./drizzle",
	// DOCS: https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit
	dialect: "sqlite",
	driver: "d1-http",
	verbose: true,
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID || "",
		databaseId: process.env.CLOUDFLARE_DATABASE_ID || "",
		token: process.env.CLOUDFLARE_D1_TOKEN || "",
	},
	casing: "snake_case",
	migrations: {
		prefix: "timestamp",
	},
});

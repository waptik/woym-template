import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// CLI-specific database configuration using SQLite
// This file is used when running in Node.js environments (CLI, build tools, etc.)

// Create an in-memory SQLite database for CLI operations
export const db = drizzle({
	schema,
	casing: "snake_case",
	connection: {
		url: process.env.LOCAL_DB_URL ?? "",
	},
}) as ReturnType<typeof drizzle>;

// Re-export schema for convenience
export { schema };

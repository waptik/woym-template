import { cloudflare } from "@woym/workers-types"
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"

console.log("[DB] Initializing D1 database with environment variables:", cloudflare)

export const db = drizzle(cloudflare.env.DB, {
	schema,
	casing: "snake_case",
})

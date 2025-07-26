import { cloudflare } from "@woym/workers-types"
import { drizzle } from "drizzle-orm/d1"
import * as schema from "./schema"


export const db = drizzle(cloudflare.env.DB, {
	schema,
	casing: "snake_case",
})

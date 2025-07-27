import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema";

// const {env}= cloudflare

export const db = drizzle(env.DB, {
	schema,
	casing: "snake_case",
});

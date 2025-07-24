import { createEnv } from "@t3-oss/env-core"
import * as dotenv from "dotenv"
import { z } from "zod"

dotenv.config({ path: "../../apps/server/.env" }) // Adjust the path as necessary

export const env = createEnv({
	server: {
		CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
		CLOUDFLARE_DATABASE_ID: z.string(),
		CLOUDFLARE_D1_TOKEN: z.string(),
	},
	runtimeEnv: {
		CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
		CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
		CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
	},
	skipValidation: true,
})

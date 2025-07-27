/** biome-ignore-all lint/suspicious/noExplicitAny: n/a */

import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"

import BASE_ENV from "./base"

const runtimeEnv: NodeJS.ProcessEnv = process.env

console.log("[pkg.schemas.server] Initializing environment variables with runtimeEnv:", runtimeEnv.NODE_ENV)

export const serverEnv = createEnv({
	...BASE_ENV,
	runtimeEnv,
	server: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.describe("The current environment the server is running in"),
		GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional(),

		// BetterAuth specific
		CORS_ORIGINS: z.string().describe("Comma-separated list of allowed CORS origins"),
		BETTER_AUTH_SECRET: z.string().describe("Secret for BetterAuth"),
		WEBSITE_URL: z.string().url().describe("Base URL for the website"),
		API_URL: z.url().describe("Base URL for the API"),
	},
})

export type ServerEnv = typeof serverEnv

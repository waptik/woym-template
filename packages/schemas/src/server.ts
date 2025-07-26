/** biome-ignore-all lint/suspicious/noExplicitAny: n/a */

import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"

import BASE_ENV from "./base"
import { workerEnv } from "./cf"

const runtimeEnv: NodeJS.ProcessEnv = process.env

const isEdge = false

// Only try to initialize Cloudflare Workers env at runtime
// @see https://github.com/geekyharsh05/Nimbus/blob/37d6eb7b5ee2740bdd7ae80c1faf37980ec88bb8/packages/env/server.ts#L28
// async function initCloudflareEnv() {
// 	if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
// 		return
// 	}

// 	try {
// 		// Check if we're in a Cloudflare Workers environment
// 		if ((globalThis as any).Cloudflare && (globalThis as any).WebSocketPair !== undefined) {
// 			// Use dynamic import to avoid webpack processing this import
// 			runtimeEnv = env as unknown as NodeJS.ProcessEnv
// 			console.log("[Schemas.Cloudflare Workers] Environment variables initialized", runtimeEnv)
// 			isEdge = true
// 		}
// 	} catch {
// 		console.warn("Falling back to process.env as Cloudflare Workers environment was not detected")
// 	}
// }
// // Initialize the Cloudflare environment if applicable
// void initCloudflareEnv().catch(console.error)

console.log("[Schemas] Initializing environment variables with runtimeEnv:", runtimeEnv)

export const schemasEnv = createEnv({
	...BASE_ENV,
	extends: [workerEnv],
	runtimeEnv,

	server: {
		// Required

		// Node environment
		NODE_ENV: z.enum(["development", "production", "test"]),

		// Database
		// DATABASE_URL: z.url(),
		// DATABASE_HOST: z.string(),
		// POSTGRES_PORT: z.string(),
		// POSTGRES_USER: z.string(),
		// POSTGRES_PASSWORD: z.string(),
		// POSTGRES_DB: z.string(),

		// Authentication
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.url(),

		// Server Configuration
		FRONTEND_URL: z.string().optional(),
		BACKEND_URL: z.string().optional(),

		// Email
		// EMAIL_FROM: z.email(),
		// RESEND_API_KEY: z.string(),

		// Optional (because of edge runtime support)

		// Valkey (Redis)
		// VALKEY_HOST: z.string().optional(),
		// VALKEY_PORT: z.string().optional(),
		// VALKEY_USERNAME: z.string().optional(),
		// VALKEY_PASSWORD: z.string().optional(),

		// Upstash (Redis)
		// UPSTASH_REDIS_REST_URL: z.string().optional(),
		// UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
	},

	// createFinalSchema(shape, isServer) {
	// 	return z.object(shape);
	// },
})

// Export the typed environment variables
export { isEdge }
export type SchemasEnv = typeof schemasEnv

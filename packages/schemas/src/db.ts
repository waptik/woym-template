/** biome-ignore-all lint/suspicious/noExplicitAny: n/a */
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"
import BASE_ENV from "./base"

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
// 			const { env } = await import("cloudflare:workers")
// 			runtimeEnv = env as unknown as NodeJS.ProcessEnv
// 			console.log("[initCloudflareEnv.Cloudflare Workers] Environment variables initialized", runtimeEnv)
// 			isEdge = true
// 		}
// 	} catch {
// 		console.warn("Falling back to process.env as Cloudflare Workers environment was not detected")
// 	}
// }
// // Initialize the Cloudflare environment if applicable
// void initCloudflareEnv().catch(console.error)

export const dbEnv = createEnv({
	...BASE_ENV,
	runtimeEnv,

	server: {
		CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
		CLOUDFLARE_DATABASE_ID: z.string(),
		CLOUDFLARE_D1_TOKEN: z.string(),
		DB: z.any().describe("The D1 database instance, initialized at runtime"),
	},
	// runtimeEnv: {
	// 	CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
	// 	CLOUDFLARE_DATABASE_ID: process.env.CLOUDFLARE_DATABASE_ID,
	// 	CLOUDFLARE_D1_TOKEN: process.env.CLOUDFLARE_D1_TOKEN,
	// },
	skipValidation: true,

	// createFinalSchema(shape, isServer) {
	// 	return z.object(shape);
	// },
})

// Export the typed environment variables
export { isEdge }
export type DbEnv = typeof dbEnv

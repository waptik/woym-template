import { expo } from "@better-auth/expo"
import { db, schema } from "@woym/db"
import type { BetterAuthOptions } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { anonymous, oAuthProxy } from "better-auth/plugins"

export interface AuthOptions {
	baseUrl: string
	productionUrl?: string
	secret: string | undefined
	origins?: string
}

export const sharedAuthConfig = (options: AuthOptions): BetterAuthOptions => {
	console.log("[auth.shared] Creating shared auth config with options:", options)
	const origins = (options.origins || "").split(",").map((origin) => origin.trim())
	const trustedOrigins = ["expo://", ...origins]
	const plugins: BetterAuthOptions["plugins"] = [
		oAuthProxy({
			currentURL: options.baseUrl,
			productionURL: options.productionUrl,
		}),
		expo(),
		anonymous(),
	]

	const config = {
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema,
		}),
		baseURL: options.baseUrl,
		secret: options.secret,
		plugins,
		trustedOrigins,
		advanced: {
			crossSubDomainCookies: { enabled: true },
		},
	} satisfies BetterAuthOptions

	return config
}

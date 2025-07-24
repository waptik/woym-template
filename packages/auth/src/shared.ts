import { expo } from "@better-auth/expo"
import { db, schema } from "@woym/db"
import type { BetterAuthOptions } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { anonymous, oAuthProxy } from "better-auth/plugins"

export interface AuthOptions {
	baseUrl: string
	productionUrl?: string
	secret: string | undefined
	origins?: string[]
	enableOAuthProxy?: boolean
}

export const sharedAuthConfig = (options: AuthOptions): BetterAuthOptions => {
	const trustedOrigins = ["expo://", ...(options.origins || [])]
	const plugins: BetterAuthOptions["plugins"] = [expo(), anonymous()]
	if (options.enableOAuthProxy) {
		plugins.push(
			oAuthProxy({
				currentURL: options.baseUrl,
				productionURL: options.productionUrl,
			}),
		)
	}
	const config = {
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema,
		}),
		baseURL: options.baseUrl,
		secret: options.secret,
		plugins,
		trustedOrigins,
	} satisfies BetterAuthOptions

	return config
}

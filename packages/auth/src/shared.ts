import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import { anonymous, oAuthProxy } from "better-auth/plugins";

export interface AuthOptions {
	baseUrl: string;
	productionUrl?: string;
	secret: string | undefined;
	origins?: string;
}

export const sharedAuthConfig = (options: AuthOptions): BetterAuthOptions => {
	console.log("[auth.shared] Creating shared auth config with options:", options);
	const origins = (options.origins || "")
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);
	const trustedOrigins = ["expo://", ...origins];
	console.log("[auth.shared] Trusted origins:", trustedOrigins);

	const plugins: BetterAuthOptions["plugins"] = [
		oAuthProxy({
			currentURL: options.baseUrl,
			productionURL: options.productionUrl,
		}),
		expo(),
		anonymous(),
	];

	// If running in CLI mode, use the drizzle adapter with SQLite
	const config = {
		baseURL: options.baseUrl,
		secret: options.secret,
		plugins,
		trustedOrigins,
		advanced: {
			crossSubDomainCookies: { enabled: true },
		},
		rateLimit: {
			enabled: true,
		},
	} satisfies BetterAuthOptions;

	return config;
};

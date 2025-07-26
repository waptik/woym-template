import { env } from "cloudflare:workers"
import { type Auth, initAuth } from "@woym/auth"

console.log("[server.auth] Initializing auth with environment variables:", {
	baseUrl: env.API_URL,
	secret: env.BETTER_AUTH_SECRET,
	corsOrigin: env.CORS_ORIGINS,
});


export const auth = initAuth({
	baseUrl: env.API_URL,
	secret: env.BETTER_AUTH_SECRET,
	origins: env.CORS_ORIGINS,
	productionUrl: env.WEBSITE_URL,
}) as Auth


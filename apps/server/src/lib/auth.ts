import { type Auth, initAuth } from "@woym/auth"
import { cloudflare } from "@woym/workers-types";

console.log("[server.auth] Initializing auth with environment variables:", cloudflare.env.API_URL,);


export const auth = initAuth({
	baseUrl: cloudflare.env.API_URL,
	secret: cloudflare.env.BETTER_AUTH_SECRET,
	origins: cloudflare.env.CORS_ORIGINS,
	productionUrl: cloudflare.env.WEBSITE_URL,
}) as Auth


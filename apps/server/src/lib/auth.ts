import { type Auth, initAuth } from "@woym/auth";
import { env } from "@woym/schemas";

export const auth = initAuth({
	baseUrl: env.API_URL,
	secret: env.BETTER_AUTH_SECRET,
	origins: env.CORS_ORIGINS,
	productionUrl: env.WEBSITE_URL,
}) as Auth;

import { env } from "cloudflare:workers"
import { type Auth, initAuth } from "@woym/auth"

export const auth = initAuth({
	baseUrl: env.BETTER_AUTH_URL,
	secret: env.BETTER_AUTH_SECRET,
	origins: [env.CORS_ORIGIN],
}) as Auth

// export const auth = betterAuth({
// 	database: drizzleAdapter(db, {
// 		provider: "sqlite",
// 		schema,
// 	}),
// 	trustedOrigins: [env.CORS_ORIGIN],
// 	emailAndPassword: {
// 		enabled: true,
// 	},
// 	secret: env.BETTER_AUTH_SECRET,
// 	baseURL: env.BETTER_AUTH_URL,
// 	plugins: [expo()],
// })

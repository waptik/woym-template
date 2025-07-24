import type { Auth } from "@woym/auth"
import { db } from "@woym/db"

export type CreateContextOptions = {
	headers: Headers
	auth: Auth
}

export async function createContext({ headers, auth }: CreateContextOptions) {
	console.log(">>> oRPC Request from", headers.get("x-orpc-source") ?? "unknown", "by", "anonymous")
	const authApi = auth.api
	const session = await authApi.getSession({
		headers,
	})
	if (!session) {
		console.warn("No session found for request")
	}

	return {
		session: {
			...session?.session,
			user: session?.user,
			db,
			// authApi: auth.api,
		},
	}
}

export type Context = Awaited<ReturnType<typeof createContext>>

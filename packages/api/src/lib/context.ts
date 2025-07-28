import type { Auth } from "@woym/auth";
import { db } from "@woym/db";
import type { CloudflareEnv } from "@woym/workers-types";
import type { Context as HonoContext } from "hono";

export type HonoEnv = {
	Bindings: CloudflareEnv;
};

export type CreateContextOptions = {
	auth: Auth;
	context: HonoContext<HonoEnv>;
};

export async function createContext({ auth, context }: CreateContextOptions) {
	console.log(">>> oRPC Request from", context.req.header("x-orpc-source") ?? "unknown", "by", "anonymous");
	const authApi = auth.api;
	const request = context.req.raw.cf; // as HonoRequest;
	console.log("[pkg/api.context] Cloudflare Workers Request", JSON.stringify(request, null, 2));

	const session = await authApi.getSession({
		headers: context.req.raw.headers,
	});
	if (!session) {
		console.warn("No session found for request");
	}

	return {
		session: {
			...session?.session,
			user: session?.user,
			// authApi: auth.api,
		},
		db,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;

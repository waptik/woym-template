import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";

export const o = os.$context<Context>();

/**
 * Middleware for timing procedure execution and adding an articifial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = o.middleware(async ({ next, path }) => {
	const start = Date.now();

	if (process.env.NODE_ENV !== "production") {
		// artificial delay in dev 100-500ms
		const waitMs = Math.floor(Math.random() * 400) + 100;
		await new Promise((resolve) => setTimeout(resolve, waitMs));
	}

	const result = await next();

	const end = Date.now();
	console.log(`[oRPC] ${path} took ${end - start}ms to execute`);

	return result;
});

export const publicProcedure = o.use(timingMiddleware);

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}
	return next({
		context: {
			...context,
			// Ensure the session is passed through
			session: context.session,
			user: context.session.user,
		},
	});
});

export const protectedProcedure = o.use(timingMiddleware).use(requireAuth);

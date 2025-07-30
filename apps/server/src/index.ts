import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openAPIGenerator, openapiHandler, rpcHandler } from "@woym/api/handlers";
import { createContext, type HonoEnv } from "@woym/api/lib";
import { appRouter } from "@woym/api/server";
import { env } from "@woym/schemas";

// imports without "@"
import { streamText } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { stream } from "hono/streaming";

// local imports
import { auth } from "./lib/auth";

const app = new Hono<HonoEnv>();

const origin = env.CORS_ORIGINS.split(",").map((origin) => origin.trim());

app
	// start chained middleware
	.use(logger())
	.use(
		"*",
		cors({
			origin,
			allowMethods: ["GET", "POST", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		}),
	)
	.onError(async (err, c) => {
		if (err instanceof Response) return err;
		console.error("Error in Hono handler:", err);
		return c.json(
			{
				error: "Internal Server Error",
				message: err instanceof Error ? err.message : "Unknown error",
			},
			500,
		);
	})
	.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
	.use("/v1/*", async (c, next) => {
		const context = await createContext({
			auth,
			context: c,
		});

		const { matched, response } = await openapiHandler.handle(c.req.raw, {
			prefix: "/v1",
			context,
		});

		if (matched) {
			return c.newResponse(response.body, response);
		}

		return await next();
	})
	.use("/rpc/*", async (c, next) => {
		const context = await createContext({
			auth,
			context: c,
		});
		const { matched, response } = await rpcHandler.handle(c.req.raw, {
			prefix: "/rpc",
			context: context,
		});

		if (matched) {
			return c.newResponse(response.body, response);
		}
		return await next();
	})
	// start normal routes
	.get("/", (c) => {
		return c.text("Hello from the Hono server!");
	})
	.get("/cf", (c) => {
		return c.json(c.req.raw.cf);
	})
	.get("/_health", (c) => {
		return c.json({ ok: true });
	})
	.get("/robots.txt", (c) => {
		return c.text("User-agent: *\nDisallow: /");
	})
	.get("/spec.json", async (c) => {
		console.log("[workers-types] Generating OpenAPI spec");

		return c.json(
			await openAPIGenerator.generate(appRouter, {
				info: {
					title: "WOYM API",
					version: "1.0.0",
					description: "The TanstackStart Hono oRPC Expo API",
				},
				servers: [
					{
						url: "/v1",
					} /** Should use absolute URLs in production */,
				],
			}),
		);
	})
	.post("/ai", async (c) => {
		const body = await c.req.json();
		const messages = body.messages || [];
		const google = createGoogleGenerativeAI({
			apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
		});
		const result = streamText({
			model: google("gemini-1.5-flash"),
			messages,
		});

		c.header("X-Vercel-AI-Data-Stream", "v1");
		c.header("Content-Type", "text/plain; charset=utf-8");
		return stream(c, (stream) => stream.pipe(result.toDataStream()));
	});

export default app;

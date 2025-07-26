import { env } from "cloudflare:workers"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { openAPIGenerator, openapiHandler, rpcHandler } from "@woym/api/handlers"
import { createContext } from "@woym/api/lib"
import { appRouter } from "@woym/api/server"

import { streamText } from "ai"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { stream } from "hono/streaming"

// local imports
import { auth } from "./lib/auth"

const app = new Hono()

const origins = env.CORS_ORIGINS.split(",").map((origin) => origin.trim())

app.use(logger())
	.use(
		cors({
			origin: origins,
			allowMethods: ["GET", "POST", "OPTIONS"],
			allowHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		}),
	)
	.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
	.get("/openapi.json", async (c) => {
		const openapi = await openAPIGenerator.generate({
			router: appRouter,
		})
		return c.json(openapi)
	})
	.get("/", (c) => {
		return c.text("OK")
	})
	.get("/_health", (c) => {
		return c.json({ ok: true })
	})
	.get("/robots.txt", (c) => {
		return c.text("User-agent: *\nDisallow: /")
	})
	.get("/spec.json", async (c) => {
		return c.json(
			await openAPIGenerator.generate(appRouter, {
				info: {
					title: "TSHOE API",
					version: "1.0.0",
					description: "The TanstackStart Hono oRPC Expo API",
				},
				servers: [{ url: "/v1" } /** Should use absolute URLs in production */],
			}),
		)
	})
	.use("/v1/*", async (c, next) => {
		const context = await createContext({ headers: c.req.raw.headers, auth })

		const { matched, response } = await openapiHandler.handle(c.req.raw, {
			prefix: "/v1",
			context,
		})

		if (matched) {
			return c.newResponse(response.body, response)
		}

		await next()
	})
	.use("/rpc/*", async (c, next) => {
		const context = await createContext({ headers: c.req.raw.headers, auth })
		const { matched, response } = await rpcHandler.handle(c.req.raw, {
			prefix: "/rpc",
			context: context,
		})

		if (matched) {
			return c.newResponse(response.body, response)
		}
		await next()
	})
	.post("/ai", async (c) => {
		const body = await c.req.json()
		const messages = body.messages || []
		const google = createGoogleGenerativeAI({
			apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
		})
		const result = streamText({
			model: google("gemini-1.5-flash"),
			messages,
		})

		c.header("X-Vercel-AI-Data-Stream", "v1")
		c.header("Content-Type", "text/plain; charset=utf-8")
		return stream(c, (stream) => stream.pipe(result.toDataStream()))
	})

export default app
export type AppType = typeof app

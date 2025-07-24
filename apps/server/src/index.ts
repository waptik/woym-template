import { env } from "cloudflare:workers"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { RPCHandler } from "@orpc/server/fetch"
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

app.use(logger())
app.use(
	cors({
		origin: [env.CORS_ORIGIN],
		allowMethods: ["GET", "POST", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
)

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))

const handler = new RPCHandler(appRouter)
app.use("/rpc/*", async (c, next) => {
	const context = await createContext({ headers: c.req.raw.headers, auth })
	const { matched, response } = await handler.handle(c.req.raw, {
		prefix: "/rpc",
		context: context,
	})

	if (matched) {
		return c.newResponse(response.body, response)
	}
	await next()
})

app.post("/ai", async (c) => {
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

app.get("/", (c) => {
	return c.text("OK")
})

export default app

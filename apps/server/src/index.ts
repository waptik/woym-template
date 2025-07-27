import { serverEnv } from "@woym/schemas/server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { rpcHandler } from "@woym/api/handlers";
import { createContext } from "@woym/api/lib";
import { streamText } from "ai";
import { stream } from "hono/streaming";

const app = new Hono();

const origin = serverEnv.CORS_ORIGINS.split(",").map((origin) => origin.trim());

app.use(logger());
app.use(
    "/*",
    cors({
        origin,
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }),
).on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))
    .get("/", (c) => {
        return c.text("OK");
    })
    .get("/_health", (c) => {
        return c.json({ ok: true });
    })
    .get("/robots.txt", (c) => {
        return c.text("User-agent: *\nDisallow: /");
    })
    .use("/rpc/*", async (c, next) => {
        const context = await createContext({
            headers: c.req.raw.headers,
            auth,
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
    .post("/ai", async (c) => {
        const body = await c.req.json();
        const messages = body.messages || [];
        const google = createGoogleGenerativeAI({
            apiKey: serverEnv.GOOGLE_GENERATIVE_AI_API_KEY,
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

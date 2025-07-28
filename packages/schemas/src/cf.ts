import { createEnv } from "@t3-oss/env-core";
import { cloudflare } from "@woym/workers-types";
import z from "zod";
import BASE_ENV from "./base";

const { DB: _, ...globalEnv } = cloudflare.env;

const runtimeEnv = globalEnv; // as unknown as NodeJS.ProcessEnv

console.log("[pkg.schemas.cfs] Environment variables initialized", runtimeEnv);

export const workerEnv = createEnv({
	...BASE_ENV,
	runtimeEnv,
	server: {
		// Add any server-side environment variables here if needed
		CORS_ORIGINS: z
			.string()
			.optional()
			.default("http://localhost:3000")
			.describe("Comma-separated list of allowed CORS origins"),
		API_URL: z.string().url().optional().default("http://localhost:3000").describe("Base URL for the API"),
		WEBSITE_URL: z
			.string()
			.url()
			.optional()
			.default("http://localhost:3001")
			.describe("Base URL for the website"),
		BETTER_AUTH_SECRET: z.string().optional().default("secret").describe("Secret for BetterAuth"),
		CLOUDFLARE_ACCOUNT_ID: z.string().optional().describe("Cloudflare account ID"),
		CLOUDFLARE_DATABASE_ID: z.string().optional().describe("Cloudflare database ID"),
		CLOUDFLARE_D1_TOKEN: z.string().optional().describe("Cloudflare D1 token"),
		GOOGLE_GENERATIVE_AI_API_KEY: z.string().optional().describe("Google Generative AI API key"),
	},
});

console.log("[pkg.schemas.cfs] Worker environment variables created", { workerEnv });

export type WorkerEnv = typeof workerEnv;

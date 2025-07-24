import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"
import BASE_ENV from "./base"

export const webEnv = createEnv({
	...BASE_ENV,
	shared: {
		VITE_SERVER_URL: z.string().url().describe("The URL of the server, used for API requests"),
	},
	runtimeEnv: process.env,
	server: {
		// Web-specific server variables can go here if needed in the future
	},
	clientPrefix: "VITE_",
	client: {
		// Client-side environment variables
		VITE_SERVER_URL: z.url(),
	},
})

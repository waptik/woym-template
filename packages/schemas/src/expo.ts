import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"
import BASE_ENV from "./base"

export const env = createEnv({
	...BASE_ENV,
	runtimeEnv: {
		EXPO_PUBLIC_SERVER_URL: process.env.EXPO_PUBLIC_SERVER_URL,
	},

	clientPrefix: "EXPO_PUBLIC",
	client: {
		// Client-side environment variables
		EXPO_PUBLIC_SERVER_URL: z.url(),
	},
})

// Export the typed environment variables
export default env

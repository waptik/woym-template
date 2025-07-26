import { createEnv } from "@t3-oss/env-core"
import { z } from "zod/v4"

export const authEnv = () =>
	createEnv({
		server: {
			NODE_ENV: z.enum(["development", "production"]).default("development"),
		},
		runtimeEnv: {
			...process.env,
			// POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
			// POLAR_ENVIRONMENT: process.env.POLAR_ENVIRONMENT,
			// VITE_API_URL: import.meta.env.VITE_API_URL,
			// VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			// VITE_SOURCE_COMMIT:
			// 	process.env.SOURCE_COMMIT ||
			// 	process.env.COMMIT_HASH ||
			// 	process.env.GIT_HASH ||
			// 	import.meta.env.VITE_SOURCE_COMMIT,
		},
		emptyStringAsUndefined: true,
	})

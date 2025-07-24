import { createEnv } from "@t3-oss/env-core"
import { cloudflare } from "@woym/workers-types"
import BASE_ENV from "./base"

const { DB: _, ...globalEnv } = cloudflare.env

const runtimeEnv = globalEnv as unknown as NodeJS.ProcessEnv

export const workerEnv = createEnv({
	...BASE_ENV,
	runtimeEnv,
	server: {
		// Add any server-side environment variables here if needed
	},
})

export type WorkerEnv = typeof workerEnv

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";
import BASE_ENV from "./base";

const runtimeEnv: NodeJS.ProcessEnv = process.env;

export const dbEnv = createEnv({
	...BASE_ENV,
	runtimeEnv,
	server: {
		CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
		CLOUDFLARE_DATABASE_ID: z.string(),
		CLOUDFLARE_D1_TOKEN: z.string(),
	},
	skipValidation: true,
	// createFinalSchema(shape, isServer) {
	// 	return z.object(shape);
	// },
});

// Export the typed environment variables
export type DbEnv = typeof dbEnv;

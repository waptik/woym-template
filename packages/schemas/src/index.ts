import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";
import BASE_ENV from "./base";
import { workerEnv } from "./cf";

const runtimeEnv: NodeJS.ProcessEnv = process.env;

export const unused = z.string().describe(
	`This lib is currently not used as we use drizzle-zod for simple schemas
   But as your application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);

export const env = createEnv({
	...BASE_ENV,
	runtimeEnv,
	extends: [workerEnv],
	server: {
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.describe("The current environment the server is running in"),
	},
});

export type Env = typeof env;

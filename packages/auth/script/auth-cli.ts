/**
 * @fileoverview Better Auth CLI Configuration
 *
 * This file is used exclusively by the Better Auth CLI to generate database schemas.
 * DO NOT USE THIS FILE DIRECTLY IN YOUR APPLICATION.
 * @see https://github.com/t3-oss/create-t3-turbo/blob/5d75af71c05b0233b3582720282ebbf0806df086/packages/auth/script/auth-cli.ts
 *
 * This configuration is consumed by the CLI command:
 * `pnpx @better-auth/cli generate --config script/auth-cli.ts --output ../db/src/auth-schema.ts`
 *
 * For actual authentication usage, import from "../src/index.ts" instead.
 */

import { betterAuth } from "better-auth";
import { sharedAuthConfig } from "../src/shared";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, schema } from "@woym/db/db-cli";


/**
 * CLI-only authentication configuration for schema generation.
 *
 * @warning This configuration is NOT intended for runtime use.
 * @warning Use the main auth configuration from "../src/index.ts" for your application.
 */

console.log("[auth-cli] Initializing CLI auth configuration with SQLite database", process.env.LOCAL_DB_URL);

const config = sharedAuthConfig({
	baseUrl: "http://localhost:3000",
	productionUrl: "http://localhost:3000",
	secret: "secret",
});
config.database = drizzleAdapter(db, {
	provider: "sqlite",
	schema,
	debugLogs: true,
	usePlural: true,
});
export const auth = betterAuth(config);

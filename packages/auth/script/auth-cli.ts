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

import { initAuth } from "../src/index"

/**
 * CLI-only authentication configuration for schema generation.
 *
 * @warning This configuration is NOT intended for runtime use.
 * @warning Use the main auth configuration from "../src/index.ts" for your application.
 */
export const auth = initAuth({
	baseUrl: "http://localhost:3000",
	productionUrl: "http://localhost:3000",
	secret: "secret",
})

import { db, schema } from "@woym/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { type AuthOptions, sharedAuthConfig } from "./shared";

export function initAuth(options: AuthOptions) {
	const config = sharedAuthConfig(options);
	config.database = drizzleAdapter(db, {
		provider: "sqlite",
		schema,
		debugLogs: true,
		usePlural: true,
	});
	return betterAuth(config) as ReturnType<typeof betterAuth>;
}

export type Auth = ReturnType<typeof initAuth>;
export type Session = Auth["$Infer"]["Session"];

import { betterAuth } from "better-auth"
import { type AuthOptions, sharedAuthConfig } from "./shared"

export function initAuth(options: AuthOptions) {
	return betterAuth(sharedAuthConfig(options)) as ReturnType<typeof betterAuth>
}

export type Auth = ReturnType<typeof initAuth>
export type Session = Auth["$Infer"]["Session"]

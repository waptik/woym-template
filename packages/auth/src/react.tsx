import { createAuthClient } from "better-auth/react"

export function getAuthClient(baseURL?: string) {
	return createAuthClient({
		baseURL,
	})
}

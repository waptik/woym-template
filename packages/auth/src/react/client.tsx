import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export function getAuthClient(baseURL?: string) {
	return createAuthClient({
		baseURL,
		plugins: [anonymousClient()],
	});
}

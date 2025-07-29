import { createQueryClient } from "@woym/api/client";
import { createORPC } from "@woym/api/react";

// local imports
import { authClient } from "@/lib/auth-client";
import { getBaseUrl } from "./base-url";

export const queryClient = createQueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: false,
			staleTime: 1000 * 60 * 5, // 5 minutes
		}
	}
});

const url = getBaseUrl();

console.log("[ORPC] Base URL:", { url });

export const { client, orpc } = createORPC({
	url,
	authClient,
});

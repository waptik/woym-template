import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { DedupeRequestsPlugin } from "@orpc/client/plugins";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { Auth } from "@woym/auth";
import type { ExpoAuthClient } from "@woym/auth/expo";

// local imports
import type { appRouter } from "#/server";

// type BaseRPCLinkOptions = RPCLinkOptions<Record<PropertyKey, unknown>>

interface RpcLinkOptions {
	url: string;
	authClient?: Auth | ExpoAuthClient;
	isWeb?: boolean;
}

function getRpcLink(opts: RpcLinkOptions) {
	const url = opts.url.endsWith("/rpc") ? opts.url : `${opts.url}/rpc`;

	return new RPCLink({
		url,
		headers() {
			const headers = new Map<string, string>();
			if (opts.authClient && "getCookie" in opts.authClient) {
				headers.set("X-Expo-Client", "true");
				const cookies = opts.authClient.getCookie();
				if (cookies) {
					headers.set("Cookie", cookies);
				}
			}
			console.log(
				"[api.getRpcLink] Headers:",
				Object.fromEntries(headers),
			);

			return Object.fromEntries(headers);
		},
		...(opts.isWeb
			? {
				fetch(url, options) {
					// Ensure credentials are included for CORS requests
					return fetch(url, {
						...options,
						credentials: "include",
					});
				},
			}
			: undefined),
		plugins: [
			new DedupeRequestsPlugin({
				filter: ({ request }) => request.method === "GET",
				groups: [{ condition: () => true, context: {} }],
			}),
		],
	});
}

const getORPCClient = (
	link: Parameters<typeof createORPCClient>[0],
): RouterClient<typeof appRouter> => createORPCClient(link);

const getORPC = (client: RouterClient<typeof appRouter>) =>
	createTanstackQueryUtils(client);

export function createORPC(options: RpcLinkOptions): {
	client: RouterClient<typeof appRouter>;
	orpc: ReturnType<typeof getORPC>;
} {
	const link = getRpcLink(options);
	const client = getORPCClient(link);
	const orpc = getORPC(client);
	return { client, orpc };
}

import { defaultShouldDehydrateQuery, QueryCache, QueryClient, type QueryClientConfig } from "@tanstack/react-query"

export const createQueryClient = (options?: QueryClientConfig) =>
	new QueryClient({
		defaultOptions: {
			queries: {
				// With SSR, we usually want to set some default staleTime
				// above 0 to avoid refetching immediately on the client
				staleTime: 60 * 1000,
			},
			dehydrate: {
				shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
			},
			hydrate: {},
		},
		queryCache: new QueryCache({
			onError: (error) => {
				console.log(error)
			},
		}),
		...options,
	})

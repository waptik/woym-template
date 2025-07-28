import { QueryCache } from "@tanstack/react-query";
import type { RouterClient } from "@woym/api";
import { createQueryClient } from "@woym/api/client";
import { createORPC } from "@woym/api/react";
import type { appRouter } from "@woym/api/server";
import { toast } from "sonner";
import { oRpcURL } from "@/lib/constants";

export const queryClient = createQueryClient({
	queryCache: new QueryCache({
		onError: (error) => {
			toast.error(`Error: ${error.message}`, {
				action: {
					label: "retry",
					onClick: () => {
						queryClient.invalidateQueries();
					},
				},
			});
		},
	}),
});

// Create ORPC instance with explicit typing
const orpcInstance = createORPC({
	url: oRpcURL,
	isWeb: true,
});

// Export with correct types
export const client = orpcInstance.client as RouterClient<typeof appRouter>;
export const orpc = orpcInstance.orpc;

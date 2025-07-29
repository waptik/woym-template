import type { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createRootRouteWithContext, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { BetterAuthProvider } from "@woym/auth/react";

// local imports without relative paths
import Header from "@/components/header";
import Loader from "@/components/loader";
import { Toaster } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";
import type { orpc } from "@/utils/orpc";

// local imports with relative paths
import appCss from "../index.css?url";

export interface RouterAppContext {
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "My App",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<BetterAuthProvider authClient={authClient}>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</BetterAuthProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const isFetching = useRouterState({ select: (s) => s.isLoading });

	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="grid h-svh grid-rows-[auto_1fr]">
					<Header />
					{isFetching ? <Loader /> : children}
				</div>
				<Toaster richColors />
				<TanStackRouterDevtools position="bottom-left" />
				<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
				<Scripts />
			</body>
		</html>
	);
}

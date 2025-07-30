"use client";

import type { BetterAuthClientPlugin, ClientOptions } from "better-auth";
import type { anonymousClient } from "better-auth/client/plugins";
import type { createAuthClient } from "better-auth/react";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";

type AnonymousClient = ReturnType<typeof anonymousClient>;

type PluginsWithAnonymous = (AnonymousClient | BetterAuthClientPlugin)[];
type AuthClientWithPlugins<Plugins extends PluginsWithAnonymous> = ReturnType<
	typeof createAuthClient<
		ClientOptions & {
			plugins: Plugins;
		}
	>
>;

export type AuthClient = AuthClientWithPlugins<PluginsWithAnonymous>;

export type Session = AuthClient["$Infer"]["Session"];
export type User = AuthClient["$Infer"]["Session"]["user"];

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	error: Error | null;
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
}
interface AuthProviderProps extends PropsWithChildren {
	// You can add more props if needed, like a custom auth client or initial session
	authClient: AuthClient; // Optional auth client, if you want to pass it down
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}
	return context;
};

export function BetterAuthProvider({ children, authClient }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { data: authSession, error: sessionError, isPending } = authClient.useSession();

	// biome-ignore lint/correctness/useExhaustiveDependencies: only run once on mount
	useEffect(() => {
		console.info("[BetterAuthProvider] Initializing auth session", authSession);
		console.info("[BetterAuthProvider] Current user:", user);

		async function syncSession() {
			if (authSession && !user) {
				setUser(authSession.user);
			}
		}

		void syncSession();
		return () => {
			setUser(null);
			setError(null);
			setIsLoading(false);
		};
	}, []);

	const signIn = async () => {
		setIsLoading(true);
		try {
			// logout any existing session before signing in anonymously
			await authClient.signOut();

			// Sign in anonymously
			const anonymousSession = await authClient.signIn.anonymous();
			if (anonymousSession.error) {
				console.error("Anonymous sign-in error:", anonymousSession.error);
				throw anonymousSession.error;
			}
			setUser(anonymousSession.data.user);
			setError(null);
		} catch (error) {
			setError(error as Error);
			console.error("Anonymous sign-in failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const signOut = async () => {
		setIsLoading(true);
		try {
			await authClient.signOut();
			setUser(null);
			setError(null);
		} catch (error) {
			console.error("Sign-out failed:", error);
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const contextValue: AuthContextType = {
		user,
		isLoading: isPending || isLoading,
		isAuthenticated: !!user,
		signIn,
		signOut,
		error: sessionError || error,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

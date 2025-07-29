import { expoClient } from "@better-auth/expo/client";
import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

type ExpoClientOptions = Parameters<typeof expoClient>[0];

interface ExpoAuthOptions {
	baseURL: string;
	storage: ExpoClientOptions["storage"];
}

export function getExpoAuthClient(options: ExpoAuthOptions) {
	return createAuthClient({
		baseURL: options.baseURL,
		plugins: [
			expoClient({
				storagePrefix: "woym-expo-app",
				storage: options.storage,
			}),
			anonymousClient(),
		],
	});
}

export type ExpoAuthClient = ReturnType<typeof getExpoAuthClient>;

export type Session = ExpoAuthClient["$Infer"]["Session"];
export type User = ExpoAuthClient["$Infer"]["Session"]["user"];

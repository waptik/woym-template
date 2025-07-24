import { expoClient } from "@better-auth/expo/client"
import { createAuthClient } from "better-auth/react"

type ExpoClientOptions = Parameters<typeof expoClient>[0]

interface ExpoAuthOptions {
	baseURL: string
	storage: ExpoClientOptions["storage"]
}

export function getExpoAuthClient(options: ExpoAuthOptions) {
	return createAuthClient({
		baseURL: options.baseURL,
		plugins: [
			expoClient({
				storagePrefix: "woym-expo-app",
				storage: options.storage,
			}),
		],
	})
}

export type ExpoAuthClient = ReturnType<typeof getExpoAuthClient>

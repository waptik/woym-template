import { getExpoAuthClient } from "@woym/auth/expo"
import * as SecureStore from "expo-secure-store"
import { getBaseUrl } from "../utils/base-url"

const baseUrl = getBaseUrl()

console.log("[AuthClient] Base URL:", baseUrl)
export const authClient = getExpoAuthClient({
	baseURL: baseUrl,
	storage: SecureStore,
})



export type Session = typeof authClient.$Infer.Session;
export type User = typeof authClient.$Infer.Session.user;
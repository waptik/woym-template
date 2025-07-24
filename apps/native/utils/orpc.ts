import { createQueryClient } from "@woym/api/client"
import { createORPC } from "@woym/api/react"

// local imports
import { authClient } from "@/lib/auth-client"
import { getBaseUrl } from "./base-url"

export const queryClient = createQueryClient()

const baseUrl = getBaseUrl()

console.log("[ORPC] Base URL:", baseUrl)

const url = `${baseUrl}/rpc`

export const { client, orpc } = createORPC({
	url,
	authClient,
})

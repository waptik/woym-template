import { getAuthClient } from "@woym/auth/react"
import { serverURL } from "./constants"

export const authClient = getAuthClient(serverURL)

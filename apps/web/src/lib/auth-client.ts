import { getAuthClient } from "@woym/auth/react"
import { baseURL } from "./constants"

const authURL = `${baseURL}/__/api/auth`
export const authClient = getAuthClient(authURL)

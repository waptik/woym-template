export const baseURL = import.meta.env.VITE_APP_URL as string
export const serverURL = import.meta.env.VITE_API_URL as string
console.log("[web.utils.constants] Base URL:", serverURL)
export const oRpcURL = `${baseURL}/__/rpc`
console.log("[web.utils.constants] ORPC URL:", oRpcURL)

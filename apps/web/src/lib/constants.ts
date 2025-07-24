export const baseURL = import.meta.env.VITE_APP_URL as string
export const serverURL = import.meta.env.VITE_SERVER_URL as string
console.log("[web.utils.constants] Base URL:", serverURL)
export const oRpcURL = `${baseURL}/api/rpc`
console.log("[web.utils.constants] ORPC URL:", oRpcURL)

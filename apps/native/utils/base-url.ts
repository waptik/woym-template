import Constants from "expo-constants"
import { Platform } from "react-native"

/**
 * Gets the local IP address of your host-machine for use with Expo Go. If it cannot automatically find it,
 * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
 * you don't have anything else running on it, or you'd have to change it.
 *
 * **NOTE**: This is only for development, because 'localhost' in Expo Go refers to the device itself, not your computer.
 * In production, you'll want to set the baseUrl to your production API URL.
 */
const getDevServerIp = (): string => {
	const debuggerHost = Constants.expoConfig?.hostUri
	let localhost = debuggerHost?.split(":")[0]

	//   for expo go, localhost is the device itself, not your computer
	if (Platform.OS === "web") {
		// If running on a physical device, we need to use the local network IP address
		localhost = "localhost"
	}

	if (!localhost) {
		throw new Error("Failed to get localhost. Please point to your production server.")
	}
	console.log("[BaseUrl.getDevServerIp] Using localhost: ", localhost)

	// Your development machine's IP address
	// Note: If this IP changes, you'll need to update it here
	return `http://${localhost}:3001` // Your local network IP address and Hono server port
}

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
	if (__DEV__) {
		// // When running in Expo Go on a physical device
		// if (Platform.OS !== "web") {
		//   return getDevServerIp();
		// }
		// // When running in web that can access localhost directly
		// return "http://localhost:8787"; // Your Hono server port
		return getDevServerIp() // Use the function to get the development server IP
	}

	// Production URL from environment variables
	return `${process.env.EXPO_PUBLIC_SERVER_URL}` // Fallback production URL
}

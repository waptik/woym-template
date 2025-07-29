import type { ConfigContext, ExpoConfig } from "expo/config"

export default ({ config }: ConfigContext): ExpoConfig => {
	return {
		...config,
		name: "My Better App",
		slug: "mybettertapp",
		version: "1.0.0",
		scheme: "mybettertapp",
		web: {
			bundler: "metro",
			output: "server",
			favicon: "./assets/favicon.png",
		},
		plugins: ["expo-router", "expo-secure-store", "expo-web-browser"],
		experiments: {
			typedRoutes: true,
			tsconfigPaths: true,
			reactCanary: true,
			buildCacheProvider: "eas",
		},
		newArchEnabled: true,
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "xyz.waptik.mybettertapp",
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#ffffff",
			},
			package: "xyz.waptik.mybettertapp",
			edgeToEdgeEnabled: true,
		},
	}
}

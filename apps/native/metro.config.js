// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const { withNativeWind } = require("nativewind/metro");
const path = require("node:path");

const config = withTurborepoManagedCache(
	withMonorepoPaths(
		withNativeWind(getDefaultConfig(__dirname), {
			input: "./global.css",
			configPath: "./tailwind.config.js",
		}),
	),
);

config.resolver.unstable_enablePackageExports = true;

config.resolver.disableHierarchicalLookup = true;

module.exports = config;

/**
 * Add the monorepo paths to the Metro config.
 * This allows Metro to resolve modules from the monorepo.
 *
 * @see https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withMonorepoPaths(config) {
	const projectRoot = __dirname;
	const workspaceRoot = path.resolve(projectRoot, "../..");

	// Only list the packages within your monorepo that your app uses. No need to add anything else.
	// If your monorepo tooling can give you the list of monorepo workspaces linked
	// in your app workspace, you can automate this list instead of hardcoding them.
	const monorepoPackages = {
		"@woym/api": path.resolve(workspaceRoot, "packages/api"),
		"@woym/auth": path.resolve(workspaceRoot, "packages/auth"),
	};
	console.log(`Using monorepo paths: ${workspaceRoot}`);
	console.log(`Using project root: ${projectRoot}`);
	console.log(
		`is resolver: ${!!config.resolver}`,
		config.resolver ? "yes" : "no",
	);
	console.log(`monorepo packages: ${JSON.stringify(monorepoPackages)}`);

	// if (config.resolver) {
	// 1. Watch the local app directory, and only the shared packages (limiting the scope and speeding it up)
	// Note how we change this from `workspaceRoot` to `projectRoot`. This is part of the optimization!
	config.watchFolders = [
		workspaceRoot,
		...Object.values(monorepoPackages),
	];

	// #2. Add the monorepo workspaces as `extraNodeModules` to Metro.
	// If your monorepo tooling creates workspace symlinks in the `node_modules` directory,
	// you can either add symlink support to Metro or set the `extraNodeModules` to avoid the symlinks.
	// See: https://metrobundler.dev/docs/configuration/#extranodemodules
	config.resolver.extraNodeModules = monorepoPackages;

	// #3 - Resolve modules within the project's `node_modules` first, then all monorepo modules
	config.resolver.nodeModulesPaths = [
		path.resolve(projectRoot, "node_modules"),
		path.resolve(workspaceRoot, "node_modules"),
	];
	// }

	return config;
}

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 * @param {import('expo/metro-config').MetroConfig} config
 * @returns {import('expo/metro-config').MetroConfig}
 */
function withTurborepoManagedCache(config) {
	config.cacheStores = [
		new FileStore({ root: path.join(__dirname, ".cache/metro") }),
	];
	return config;
}

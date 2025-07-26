// Reference the worker configuration types
/// <reference path="../worker-configuration.d.ts" />

import * as CloudflareWorkersBindings from "cloudflare:workers"
import { env } from "cloudflare:workers"

// Export the main Cloudflare types that consumers will need
export type Bindings = CloudflareBindings
export type Env = Cloudflare.Env

export const cloudflare = {
	env,
	bindings: env as Bindings,
	workers: CloudflareWorkersBindings,
} as const

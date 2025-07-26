import { ORPCError, onError, ValidationError } from "@orpc/server"
import { RPCHandler } from "@orpc/server/fetch"
import { BatchHandlerPlugin } from "@orpc/server/plugins"
import { ZodError, type ZodIssue } from "zod"

import { appRouter } from "#/server"

export const rpcHandler = new RPCHandler(appRouter, {
	plugins: [new BatchHandlerPlugin()],

	clientInterceptors: [
		onError((error) => {
			if (
				error instanceof ORPCError &&
				error.code === "BAD_REQUEST" &&
				error.cause instanceof ValidationError
			) {
				// If you only use Zod you can safely cast to ZodIssue[]
				const zodError = new ZodError(error.cause.issues as ZodIssue[])

				console.log("INPUT_VALIDATION_ERROR", {
					zodError: zodError.toString(),
				})

				throw new ORPCError("INPUT_VALIDATION_FAILED", {
					status: 422,
					data: zodError.flatten(),
					cause: error.cause,
				})
			}

			if (
				error instanceof ORPCError &&
				error.code === "INTERNAL_SERVER_ERROR" &&
				error.cause instanceof ValidationError
			) {
				const zodError = new ZodError(error.cause.issues as ZodIssue[])

				console.log("OUTPUT_VALIDATION_ERROR", {
					zodError: zodError.toString(),
				})

				throw new ORPCError("OUTPUT_VALIDATION_FAILED", {
					cause: error.cause,
				})
			}
		}),
	],
})

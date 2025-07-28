import type { InferRouterInputs, InferRouterOutputs } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "#/lib/orpc";
import { todoRouter } from "./todo";

export const appRouter = {
	healthCheck: publicProcedure.route({ method: "GET", path: "/health" }).handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	todo: todoRouter,
};

type AppRouter = typeof appRouter;
type RouterInputs = InferRouterInputs<typeof appRouter>;
type RouterOutputs = InferRouterOutputs<typeof appRouter>;

export type { AppRouter, RouterInputs, RouterOutputs };

import { db } from "@woym/db";
import { todos } from "@woym/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import { publicProcedure } from "#/lib/orpc";

export const todosRouter = {
	getAll: publicProcedure.route({ method: "GET", path: "/todos" }).handler(async () => {
		return await db.select().from(todos);
	}),

	create: publicProcedure.input(z.object({ text: z.string().min(1) })).handler(async ({ input }) => {
		return await db.insert(todos).values({
			text: input.text,
		});
	}),

	toggle: publicProcedure.input(z.object({ id: z.number(), completed: z.boolean() })).handler(async ({ input }) => {
		return await db.update(todos).set({ completed: input.completed }).where(eq(todos.id, input.id));
	}),

	delete: publicProcedure.input(z.object({ id: z.number() })).handler(async ({ input }) => {
		return await db.delete(todos).where(eq(todos.id, input.id));
	}),
};

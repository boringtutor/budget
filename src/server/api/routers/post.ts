import { z } from "zod";
import { zodTransactionType } from "@/types/zodTypes";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //     return ctx.db.post.create({
      //       data: {
      //         name: input.name,
      //       },
      //     });
      //   }),

      // getLatest: publicProcedure.query(({ ctx }) => {
      //   return ctx.db.post.findFirst({
      //     orderBy: { createdAt: "desc" },
      //   });
    }),
});

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string().min(4),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().min(8),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: { ...input },
      });
    }),
  getUser: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findMany({ where: { username: input.username } });
    }),
});

export const userTransactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1),
        categoryId: z.string().min(1),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (zodTransactionType.safeParse(input.categoryId).success) {
        return ctx.db.transaction.create({
          data: {
            ...input,
          },
        });
      } else {
        return "error parsing input with zod type ";
      }
    }),
  getTransactions: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.transaction.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
});

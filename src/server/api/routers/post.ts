import { z } from "zod";

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
        firstName: z.string().min(1).optional(),
        lastName: z.string().min(1).optional(),
        password: z.string().min(8),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: { ...input },
      });
    }),
});

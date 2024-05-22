import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany({
        orderBy: {
          _relevance: {
            fields: ["name"],
            search: input.query,
            sort: "asc",
          },
        },
      });

      return users;
    }),
});

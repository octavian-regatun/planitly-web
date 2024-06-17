import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const friendshipsRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        userId1: z.string(),
        userId2: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.friendship.findFirst({
        where: {
          OR: [
            {
              user1Id: input.userId1,
              user2Id: input.userId2,
            },
            {
              user1Id: input.userId2,
              user2Id: input.userId1,
            },
          ],
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.id === input.userId) {
        throw new Error("You can't be friends with yourself");
      }

      const existingFriendship = await ctx.db.friendship.findFirst({
        where: {
          OR: [
            {
              user1Id: ctx.session.user.id,
              user2Id: input.userId,
            },
            {
              user1Id: input.userId,
              user2Id: ctx.session.user.id,
            },
          ],
        },
      });

      if (existingFriendship) {
        throw new Error("You are already friends with this user");
      }

      const friendship = await ctx.db.friendship.create({
        data: {
          authorId: ctx.session.user.id,
          user1Id: ctx.session.user.id,
          user2Id: input.userId,
        },
      });

      return friendship;
    }),

  accept: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const friendship = await ctx.db.friendship.update({
        where: {
          id: input.id,
        },
        data: {
          status: "ACCEPTED",
        },
      });

      return friendship;
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const friendship = await ctx.db.friendship.delete({
        where: {
          id: input.id,
        },
      });

      return friendship;
    }),
});

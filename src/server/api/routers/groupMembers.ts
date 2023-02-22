import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const groupMembersRouter = createTRPCRouter({
  getPendingGroupMembers: protectedProcedure
    .input(z.object({ groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { groupId } = input

      return await ctx.prisma.groupMember.findMany({
        where: {
          groupId,
          status: "PENDING",
        },
      })
    }),
})

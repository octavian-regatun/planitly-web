import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { protectedProcedure } from "../trpc"

const inputSchema = z.object({ id: z.number() })

export const enforceGroupAdminProcedure = protectedProcedure.use(
  async ({ ctx, next, rawInput }) => {
    const result = inputSchema.safeParse(rawInput)

    if (!result.success) throw new TRPCError({ code: "BAD_REQUEST" })

    const { id: userId } = ctx.session.user
    const { id: groupId } = result.data

    const groupMemberId = await ctx.prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        GroupMember: {
          where: {
            userId,
            role: "ADMIN",
            status: "ACCEPTED",
          },
        },
      },
    })

    if (!groupMemberId)
      throw new TRPCError({ code: "BAD_REQUEST", message: "Group not found!" })

    if (groupMemberId.GroupMember.length === 0)
      throw new TRPCError({
        code: "FORBIDDEN",
      })

    return next()
  }
)

import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const friendshipsRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        status: z.enum(["PENDING", "ACCEPTED"]).nullable(),
        type: z.enum(["INCOMING", "OUTGOING"]).nullable(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { status, type } = input
      const { id: myId } = ctx.session.user

      type Query = {
        where: {
          recipientId?: string
          requesterId?: string
          status?: "PENDING" | "ACCEPTED"
          OR?: {
            requesterId?: string
            recipientId?: string
            status?: "PENDING" | "ACCEPTED"
          }[]
        }
      }

      const query: Query = { where: {} }

      if (type === "INCOMING") query.where.recipientId = myId
      else if (type === "OUTGOING") query.where.requesterId = myId
      else
        query.where.OR = [
          {
            requesterId: myId,
          },
          {
            recipientId: myId,
          },
        ]

      if (status === "PENDING") query.where["status"] = "PENDING"
      else if (status === "ACCEPTED") query.where["status"] = "ACCEPTED"
      else
        query.where["OR"] = [
          {
            status: "PENDING",
          },
          {
            status: "ACCEPTED",
          },
        ]

      return ctx.prisma.friendship.findMany({
        ...query,
        include: {
          recipient: true,
          requester: true,
        },
      })
    }),

  addFriend: protectedProcedure
    .input(z.object({ recipientId: z.string() }))
    .mutation(({ input, ctx }) => {
      const { recipientId } = input

      return ctx.prisma.friendship.create({
        data: {
          requesterId: ctx.session.user.id,
          recipientId,
          status: "PENDING",
        },
      })
    }),

  acceptFriend: protectedProcedure
    .input(z.object({ requesterId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { requesterId } = input

      const friendship = await ctx.prisma.friendship.findFirst({
        where: {
          requesterId,
          recipientId: ctx.session.user.id,
        },
      })

      if (!friendship) throw new Error("Friendship not found")

      return ctx.prisma.friendship.update({
        where: {
          id: friendship.id,
        },
        data: {
          status: "ACCEPTED",
        },
      })
    }),

  deleteFriendship: protectedProcedure
    .input(z.object({ friendshipId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { friendshipId: id } = input

      return ctx.prisma.friendship.delete({
        where: {
          id,
        },
      })
    }),
})

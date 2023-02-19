import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const groupsRouter = createTRPCRouter({
  createGroup: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        membersIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, membersIds } = input

      return await ctx.prisma.group.create({
        data: {
          name,
          GroupMember: {
            create: membersIds.map((id) => {
              if (id === ctx.session.user.id)
                return { userId: id, role: "ADMIN", status: "ACCEPTED" }
              return {
                userId: id,
              }
            }),
          },
        },
      })
    }),

  getGroup: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      return await ctx.prisma.group.findUnique({
        where: {
          id,
        },
        include: {
          GroupMember: {
            include: {
              user: true,
            },
          },
        },
      })
    }),

  getGroups: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.group.findMany({
      where: {
        GroupMember: {
          some: {
            userId: ctx.session.user.id,
          },
        },
      },
      include: {
        GroupMember: { include: { user: true } },
      },
    })
  }),

  isGroupAdmin: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const groupMemberId = await ctx.prisma.group.findUnique({
        where: {
          id,
        },
        select: {
          GroupMember: {
            where: {
              userId: ctx.session.user.id,
              role: "ADMIN",
            },
            select: {
              id: true,
            },
          },
        },
      })

      if (!groupMemberId) throw new Error("Group not found")

      return groupMemberId.GroupMember[0]?.id ? true : false
    }),

  updateGroup: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, description } = input

      const groupMemberId = await ctx.prisma.group.findUnique({
        where: {
          id,
        },
        select: {
          GroupMember: {
            where: {
              userId: ctx.session.user.id,
              role: "ADMIN",
            },
            select: {
              id: true,
            },
          },
        },
      })

      if (!groupMemberId) throw new Error("Group not found")
      if (!groupMemberId.GroupMember[0]?.id)
        throw new Error("Group member not found")

      return ctx.prisma.group.update({
        where: {
          id,
        },
        data: {
          name,
          description: description === "" ? null : description,
        },
      })
    }),

  acceptGroupInvitation: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      const groupMemberId = await ctx.prisma.group.findUnique({
        where: {
          id,
        },
        select: {
          GroupMember: {
            where: {
              userId: ctx.session.user.id,
            },
            select: {
              id: true,
            },
          },
        },
      })

      if (!groupMemberId) throw new Error("Group not found")
      if (!groupMemberId.GroupMember[0]?.id)
        throw new Error("Group member not found")

      return ctx.prisma.groupMember.update({
        where: {
          id: groupMemberId.GroupMember[0].id,
        },
        data: {
          status: "ACCEPTED",
        },
      })
    }),

  deleteGroupInvitation: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input

      const groupMemberId = await ctx.prisma.group.findUnique({
        where: {
          id,
        },
        select: {
          GroupMember: {
            where: {
              userId: ctx.session.user.id,
            },
            select: {
              id: true,
            },
          },
        },
      })

      if (!groupMemberId) throw new Error("Group not found")
      if (!groupMemberId.GroupMember[0]?.id)
        throw new Error("Group member not found")

      return ctx.prisma.groupMember.delete({
        where: {
          id: groupMemberId.GroupMember[0].id,
        },
      })
    }),

  deleteGroup: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input

      const groupMemberId = await ctx.prisma.group.findUnique({
        where: {
          id,
        },
        select: {
          GroupMember: {
            where: {
              userId: ctx.session.user.id,
              role: "ADMIN",
            },
            select: {
              id: true,
            },
          },
        },
      })

      if (!groupMemberId) throw new Error("Group not found")
      if (!groupMemberId.GroupMember[0]?.id)
        throw new Error("Group member not found")

      return ctx.prisma.group.delete({
        where: {
          id,
        },
      })
    }),
})

export type GroupsRouter = typeof groupsRouter

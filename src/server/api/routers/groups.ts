import { User } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { searchFriends } from "../../../utils/users"
import { enforceGroupAdminProcedure } from "../middlewares/enforceGroupAdminProcedure"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const groupsRouter = createTRPCRouter({
  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input

      const data = await ctx.prisma.groupMember.findMany({
        where: {
          userId: ctx.session.user.id,
          status: "ACCEPTED",
          group: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        include: {
          group: true,
        },
      })

      return data.map((item) => item.group)
    }),

  getParticipants: protectedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(async ({ ctx, input }) => {
      const { ids } = input

      const data = await ctx.prisma.group.findMany({
        where: {
          id: {
            in: ids,
          },
        },
        include: {
          GroupMember: {
            include: {
              user: true,
            },
          },
        },
      })

      const groupMembers = data.map((item) => item.GroupMember)

      const mappedData = groupMembers
        .flat()
        .map((item) => ({ ...item.user, loading: false }))

      const uniqueData = mappedData.filter(
        (item, index) => mappedData.findIndex((i) => i.id === item.id) === index
      )

      return uniqueData
    }),

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

      return !!groupMemberId.GroupMember[0]?.id
    }),

  updateGroup: enforceGroupAdminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string(),
        membersId: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id: groupId,
        name,
        description,
        membersId: membersIdUpdated,
      } = input

      const groupMembers = await ctx.prisma.group.findUnique({
        where: {
          id: groupId,
        },
        select: {
          GroupMember: {
            select: {
              userId: true,
            },
          },
        },
      })

      if (!groupMembers)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Group not found!",
        })

      const membersIdCurrent = groupMembers?.GroupMember.map(
        (member) => member.userId
      )

      const membersIdToDelete = membersIdCurrent.filter(
        (id) => !membersIdUpdated.includes(id)
      )

      const membersIdToAdd = membersIdUpdated.filter(
        (id) => !membersIdCurrent.includes(id)
      )

      // add the new members to the group
      await ctx.prisma.groupMember.createMany({
        data: membersIdToAdd.map((userId) => {
          return {
            userId,
            groupId,
          }
        }),
      })

      // delete the members from the group
      await ctx.prisma.groupMember.deleteMany({
        where: {
          userId: {
            in: membersIdToDelete,
          },
          groupId,
        },
      })

      return ctx.prisma.group.update({
        where: {
          id: groupId,
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

  searchMembers: protectedProcedure
    .input(z.object({ query: z.string(), groupId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { query, groupId } = input

      const friends = await searchFriends(query, ctx.session.user.id)

      const groupMembers = await ctx.prisma.group.findUnique({
        where: {
          id: groupId,
        },
        select: {
          GroupMember: {
            select: {
              userId: true,
            },
          },
        },
      })

      const groupMembersId = groupMembers?.GroupMember.map(
        (member) => member.userId
      )

      return friends.filter((friend) => !groupMembersId?.includes(friend.id))
    }),
})

export type GroupsRouter = typeof groupsRouter

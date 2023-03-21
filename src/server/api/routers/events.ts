import { TRPCError } from "@trpc/server"
import { endOfDay, startOfDay } from "date-fns"
import { z } from "zod"
import { removeDuplicates } from "../../../utils/array"
import { prisma } from "../../db"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const eventsRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().nullable(),
        startDate: z.date(),
        endDate: z.date(),
        allDay: z.boolean(),
        location: z
          .object({
            name: z.string(),
            address: z.string(),
            latitude: z.number(),
            longitude: z.number(),
          })
          .nullable(),
        groupsId: z.array(z.number()).min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        name,
        description,
        startDate,
        endDate,
        allDay,
        location,
        groupsId,
      } = input

      const locationData = location ? { location: { create: location } } : {}

      const participants = await getGroupParticipants(groupsId)

      const event = await ctx.prisma.event.create({
        data: {
          name,
          description,
          startDate,
          endDate,
          allDay,
          ...locationData,
        },
      })

      for (const participant of participants) {
        await ctx.prisma.eventMember.create({
          data: {
            eventId: event.id,
            userId: participant.id,
            status:
              participant.id === ctx.session.user.id ? "ACCEPTED" : "PENDING",
          },
        })
      }
    }),

  getEvents: protectedProcedure
    .input(
      z.object({
        date: z.date().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { date } = input
      if (date) {
        const data = await ctx.prisma.eventMember.findMany({
          where: {
            userId: ctx.session.user.id,
            // status: "ACCEPTED",
          },
          include: {
            event: {
              include: {
                location: true,
              },
            },
          },
        })

        const events = data.map((eventMember) => eventMember.event)

        return filterEventsHappeningOnDate(events, date)
      }

      const data = await ctx.prisma.eventMember.findMany({
        where: {
          userId: ctx.session.user.id,
          // status: "ACCEPTED",
        },
        include: {
          event: {
            include: {
              location: true,
            },
          },
        },
      })

      return data.map((eventMember) => eventMember.event)
    }),

  getEvent: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input

      try {
        const event = await ctx.prisma.event.findUnique({
          where: {
            id,
          },
          include: {
            location: true,
            EventMember: {
              include: {
                user: true,
              },
            },
          },
        })
        return event
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event not found",
        })
      }
    }),

  getEventParticipants: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input

      try {
        const event = await ctx.prisma.event.findUnique({
          where: {
            id: eventId,
          },
        })

        const participants = await ctx.prisma.eventMember.findMany({
          where: {
            eventId,
          },
          include: {
            user: true,
          },
        })

        return participants.map((participant) => participant.user)
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Event not found",
        })
      }
    }),
})

async function getGroupParticipants(groupsId: number[]) {
  const participants = await prisma.group.findMany({
    where: {
      id: {
        in: groupsId,
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

  const groupMembers = participants.map((group) => group.GroupMember).flat()
  const users = groupMembers.map((groupMember) => groupMember.user)
  return removeDuplicates(users, "id")
}

function filterEventsHappeningOnDate<
  T extends { startDate: Date; endDate: Date; allDay: boolean }
>(events: T[], date: Date) {
  return events.filter((event) => {
    return (
      event.allDay &&
      date >= startOfDay(event.startDate) &&
      date <= endOfDay(event.endDate)
    )
  })
}

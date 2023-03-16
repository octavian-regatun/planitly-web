import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const eventsRouter = createTRPCRouter({
  createEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        allDay: z.boolean(),
        location: z.object({
          name: z.string(),
          address: z.string(),
          latitude: z.number(),
          longitude: z.number(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description, startDate, endDate, allDay, location } = input

      return await ctx.prisma.event.create({
        data: {
          name,
          description,
          startDate,
          endDate,
          allDay,
          location: {
            create: {
              name: location.name,
              address: location.address,
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
          EventMember: {
            create: {
              userId: ctx.session.user.id,
              status: "ACCEPTED",
            },
          },
        },
      })
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

        const filteredData = data.filter((eventMember) => {
          const event = eventMember.event
          return (
            event.startDate.getTime() <= date.getTime() &&
            event.endDate.getTime() >= date.getTime()
          )
        })

        return filteredData.map((eventMember) => eventMember.event)
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
})

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
        },
      })
    }),
})

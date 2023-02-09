import { createTRPCRouter, protectedProcedure } from "../trpc"
import { z } from "zod"

export const usersRouter = createTRPCRouter({
  getMe: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
  }),

  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input, ctx }) => {
      const { query } = input

      return ctx.prisma.user.findMany({
        where: {
          id: {
            not: ctx.session.user.id,
          },
          OR: [
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      })
    }),
})

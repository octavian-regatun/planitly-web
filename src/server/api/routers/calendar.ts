import { z } from "zod"
import { generateCalendar } from "../../../utils/calendar"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const calendarRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ month: z.number(), year: z.number() }))
    .query(({ input }) => {
      const { month, year } = input

      return generateCalendar(month, year)
    }),
})

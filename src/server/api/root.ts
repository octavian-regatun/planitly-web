import { createTRPCRouter } from "./trpc"
import { calendarRouter } from "./routers/calendar"
import { usersRouter } from "./routers/users"
import { friendshipsRouter } from "./routers/friendships"
import { groupsRouter } from "./routers/groups"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  calendar: calendarRouter,
  friendships: friendshipsRouter,
  users: usersRouter,
  groups: groupsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

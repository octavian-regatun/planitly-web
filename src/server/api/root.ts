import { eventsRouter } from "./routers/events"
import { friendshipsRouter } from "./routers/friendships"
import { groupMembersRouter } from "./routers/groupMembers"
import { groupsRouter } from "./routers/groups"
import { locationsRouter } from "./routers/locations"
import { usersRouter } from "./routers/users"
import { createTRPCRouter } from "./trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  friendships: friendshipsRouter,
  users: usersRouter,
  groups: groupsRouter,
  groupMembers: groupMembersRouter,
  locations: locationsRouter,
  events: eventsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

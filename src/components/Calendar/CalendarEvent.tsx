import type { inferRouterOutputs } from "@trpc/server"
import Marquee from "react-fast-marquee"
import type { eventsRouter } from "../../server/api/routers/events"

export const CalendarEvent: React.FC<{
  event: inferRouterOutputs<typeof eventsRouter>["getEvents"][number]
}> = ({ event }) => {
  return (
    <div className="flex h-3 overflow-hidden bg-yellow-200 text-black">
      <Marquee gradient={false} pauseOnHover speed={50}>
        <p className="whitespace-nowrap text-xs">{event.name} &nbsp;</p>
      </Marquee>
    </div>
  )
}

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/solid"
import type { inferRouterOutputs } from "@trpc/server"
import { format } from "date-fns"
import Link from "next/link"
import type { eventsRouter } from "../../server/api/routers/events"

type Event = inferRouterOutputs<typeof eventsRouter>["getEvents"][number]

export const EventsList: React.FC<{
  events: Event[]
}> = ({ events }) => {
  return (
    <div className="flex flex-col gap-4 rounded-t-3xl bg-white p-4 relative -top-6">
      <p className="font-bold text-gray-800">Upcoming</p>
      {events.map((event) => (
        <EventCard event={event} key={`event-card-${event.id}`} />
      ))}
    </div>
  )
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link
      href={`/events/${event.id}`}
      key={event.id}
      className="flex flex-col gap-4 rounded-2xl bg-amber-200 p-4 "
    >
      <p className="text-lg font-bold text-gray-800">{event.name}</p>
      {event.location && (
        <div className="flex items-center gap-2 text-sm opacity-75">
          <MapPinIcon className="h-4 w-4 text-gray-800" />
          <p>{event.location.name}</p>
        </div>
      )}
      <div className="flex items-center gap-2 text-sm opacity-75">
        <ClockIcon className="h-4 w-4 text-gray-800" />
        <p>
          {format(event.startDate, "E, MMMM d, y")} -{" "}
          {format(event.endDate, "E, MMMM d, y")}
        </p>
      </div>
    </Link>
  )
}

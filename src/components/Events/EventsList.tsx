import { ClockIcon, MapPinIcon } from "@heroicons/react/24/solid"
import type { inferRouterOutputs } from "@trpc/server"
import { format } from "date-fns"
import type { eventsRouter } from "../../server/api/routers/events"

export const EventsList: React.FC<{
  events: inferRouterOutputs<typeof eventsRouter>["getEvents"]
}> = ({ events }) => {
  return (
    <div className="flex flex-col gap-4 rounded-t-3xl bg-white p-4">
      <p className="font-bold text-gray-800">Upcoming</p>
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col gap-4 rounded-2xl bg-amber-200 p-4 "
        >
          <p className="text-lg font-bold text-gray-800">{event.name}</p>
          <div className="flex items-center gap-2 text-sm opacity-75">
            <MapPinIcon className="h-4 w-4 text-gray-800" />
            <p>{event.location.name}</p>
          </div>
          <div className="flex items-center gap-2 text-sm opacity-75">
            <ClockIcon className="h-4 w-4 text-gray-800" />
            <p>
              {format(event.startDate, "E, MMMM d, y")} -{" "}
              {format(event.endDate, "E, MMMM d, y")}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

import { inferRouterOutputs } from "@trpc/server"
import { api } from "../../utils/api"
import { CalendarEvent } from "./CalendarEvent"

const CalendarDay: React.FC<{ date: Date }> = ({ date }) => {
  const getEventsQuery = api.events.getEvents.useQuery({ date })
  return (
    <td className="flex flex-1 flex-col items-center justify-start overflow-hidden border border-l-0 border-b-0 border-gray-200 text-center last:border-r-0">
      <p>{date.getDate()}</p>
      {getEventsQuery.data &&
        getEventsQuery.data.map((event) => (
          <CalendarEvent event={event} key={`calendar-event-${event.id}`} />
        ))}
    </td>
  )
}

export default CalendarDay

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { inferRouterOutputs } from "@trpc/server"
import { format, getDay, parse, startOfWeek } from "date-fns"
import { enUS } from "date-fns/locale"
import { useMemo } from "react"
import { Calendar, dateFnsLocalizer, ToolbarProps } from "react-big-calendar"
import { eventsRouter } from "../../server/api/routers/events"

const localizer = dateFnsLocalizer({
  format: format,
  parse: parse,
  startOfWeek: startOfWeek,
  getDay: getDay,
  locales: {
    "en-US": enUS,
  },
})

export const CalendarWrapper: React.FC<{
  events?: inferRouterOutputs<typeof eventsRouter>["getEvents"]
}> = ({ events }) => {
  const components = useMemo(() => {
    toolbar: Toolbar
  }, [Toolbar])

  return (
    <Calendar
      localizer={localizer}
      components={{ toolbar: Toolbar }}
      startAccessor="startDate"
      endAccessor="endDate"
      titleAccessor="name"
      events={events}
      formats={{
        weekdayFormat: (date, culture) =>
          localizer.format(date, "EEE", culture),
      }}
      views={["month"]}
    />
  )
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onNavigate, date } = props
  return (
    <div className="mb-4 flex items-center justify-center">
      <button
        className="rounded-full border border-gray-200 p-2 text-gray-200"
        onClick={() => onNavigate("PREV")}
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>
      <p className="flex-1 text-center text-xl text-white">
        {format(date, "MMMM, y")}
      </p>
      <button
        className="rounded-full border border-gray-200 p-2 text-gray-200"
        onClick={() => onNavigate("NEXT")}
      >
        <ArrowRightIcon className="h-6 w-6" />
      </button>
    </div>
  )
}

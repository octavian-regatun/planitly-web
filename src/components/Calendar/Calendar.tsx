import {
  ArrowLeftIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline"
import { format } from "date-fns"
import { api } from "../../utils/api"
import useCalendarStore from "../../utils/store/calendar"
import CalendarHeader from "./CalendarHeader"
import CalendarWeeks from "./CalendarWeeks"

const Calendar: React.FC = () => {
  const date = useCalendarStore((state) => state.date)
  const prevMonth = useCalendarStore((state) => state.prevMonth)
  const nextMonth = useCalendarStore((state) => state.nextMonth)

  const { data: calendar } = api.calendar.generate.useQuery({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  })

  return (
    <div className="flex h-full flex-col gap-4 text-center text-gray-200">
      <div className="flex items-center justify-center">
        <button
          className="rounded-full border border-gray-200 p-2 text-gray-200"
          onClick={prevMonth}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <p className="flex-1 text-xl">{format(date, "MMMM, y")}</p>
        <button
          className="rounded-full border border-gray-200 p-2 text-gray-200"
          onClick={nextMonth}
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>
      <table className="flex flex-1 flex-col rounded border border-gray-200">
        <CalendarHeader />
        <CalendarWeeks weeks={calendar} />
      </table>
    </div>
  )
}

export default Calendar

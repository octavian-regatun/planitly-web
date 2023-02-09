import { format } from "date-fns"
import { api } from "../../utils/api"
import useCalendarStore from "../../utils/store/calendar"
import Icon from "../Icon"
import CalendarHeader from "./CalendarHeader"
import CalendarWeek from "./CalendarWeeks"

const Calendar: React.FC = () => {
  const date = useCalendarStore((state) => state.date)
  const prevMonth = useCalendarStore((state) => state.prevMonth)
  const nextMonth = useCalendarStore((state) => state.nextMonth)

  const { data: calendar } = api.calendar.generate.useQuery({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  })

  return (
    <div className="flex h-full flex-col gap-4 text-center">
      <div className="flex justify-center">
        <button
          className="rounded-full bg-black p-2 text-white"
          onClick={prevMonth}
        >
          <Icon type="arrow-left" className="h-6 w-6" />
        </button>
        <p className="flex-1 text-2xl font-bold">{format(date, "MMMM, y")}</p>
        <button
          className="rounded-full bg-black p-2 text-white"
          onClick={nextMonth}
        >
          <Icon type="arrow-right" className="h-6 w-6" />
        </button>
      </div>
      <table className="flex h-1/2 flex-col rounded border border-black">
        <CalendarHeader />
        <CalendarWeek weeks={calendar} />
      </table>
    </div>
  )
}

export default Calendar

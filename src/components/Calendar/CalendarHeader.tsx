const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const CalendarHeader: React.FC = () => {
  return (
    <thead>
      <tr className="flex flex-1 justify-evenly">
        {weekDays.map((day) => (
          <th
            className="flex-1 border-r border-gray-200 last:border-r-0 font-normal"
            key={`calendar-week-day-${day}`}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default CalendarHeader

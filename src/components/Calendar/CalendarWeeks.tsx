import CalendarDay from "./CalendarDay"

const CalendarWeeks: React.FC<{
  weeks: readonly [Date[], Date[], Date[], Date[], Date[], Date[]] | undefined
}> = ({ weeks }) => {
  return (
    <tbody className="flex flex-1 flex-col">
      {weeks?.map((week, index) => (
        <tr
          key={`calendar-week-${index}`}
          className="flex flex-1 justify-evenly"
        >
          {week.map((day, index) => (
            <CalendarDay key={`calendar-day-${index}`} date={day} />
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default CalendarWeeks

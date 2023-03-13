const CalendarDay: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <td className="flex flex-1 items-start justify-center border border-l-0 border-b-0 border-gray-200 text-center last:border-r-0">
      {date.getDate()}
    </td>
  )
}

export default CalendarDay

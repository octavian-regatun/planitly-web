const CalendarDay: React.FC<{ date: Date }> = ({ date }) => {
  return (
    <td className="flex-1 border border-l-0 border-b-0 border-black text-center last:border-r-0">
      {date.getDate()}
    </td>
  )
}

export default CalendarDay

import ReactDatePicker from "react-datepicker"

export const DateTimeRangePicker: React.FC<{
  startDate: Date | null
  endDate: Date | null
  onChange: (dates: [Date | null, Date | null]) => void
}> = ({ onChange, startDate, endDate }) => {
  return (
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      popperClassName="!z-[1002]"
      className="rounded-lg bg-teal-700 p-2 text-white placeholder-gray-200 outline-teal-500"
    />
  )
}

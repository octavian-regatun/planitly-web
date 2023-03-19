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
      className="border-b-2 border-b-gray-200 py-2 outline-none"
    />
  )
}

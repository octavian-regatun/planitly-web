import { useState } from "react"
import ReactDatePicker from "react-datepicker"

export const DateTimeRangePicker: React.FC = (props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const onChange = (dates: [Date | null, Date | null]) => {
    console.log(dates)
    const [start, end] = dates

    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div className="flex justify-center">
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      showTimeInput
      popperClassName="!z-[1002]"
      wrapperClassName="!w-fit"
      className="border border-black rounded-full px-4 py-2"
    />
    </div>
  )
}

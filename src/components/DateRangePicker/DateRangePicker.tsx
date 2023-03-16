import { useState } from "react"
import ReactDatePicker from "react-datepicker"

export const DateTimeRangePicker: React.FC<{
  startDate: Date | null
  endDate: Date | null
  onChange: (dates: [Date | null, Date | null]) => void
}> = ({ onChange, startDate, endDate }) => {
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
        className="rounded-full border border-black px-4 py-2"
      />
    </div>
  )
}

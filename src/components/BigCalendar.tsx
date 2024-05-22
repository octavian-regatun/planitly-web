"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { FC } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar: FC = () => {
  return (
    <Calendar
      className="h-[calc(100vh-4rem)] w-full p-4"
      localizer={localizer}
      events={[]}
      startAccessor="start"
      endAccessor="end"
    />
  );
};

export default BigCalendar;

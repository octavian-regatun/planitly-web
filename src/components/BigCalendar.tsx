import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { BigCalendarToolbar } from "./BigCalendarToolbar";
import { useQuery } from "@tanstack/react-query";
import { eventsService } from "@/services/events";
import { BigCalendarEvent } from "./BigCalendarEvent";
import { useEffect } from "react";

const localizer = dayjsLocalizer(dayjs);

export function BigCalendar() {
  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: eventsService.findAll,
    initialData: [],
  });

  return (
    <>
      <Calendar
        className="p-4"
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        components={{
          toolbar: BigCalendarToolbar,
          eventWrapper: BigCalendarEvent,
        }}
        formats={{
          weekdayFormat: (date, culture) =>
            localizer.format(date, "dddd", culture),
        }}
        views={["month"]}
        events={eventsQuery.data.map(event => ({
          title: event.title,
          start: new Date(event.startAt),
          end: new Date(event.endAt),
          allDay: event.allDay,
          resource: event,
        }))}
        popup
        showAllEvents
      />
    </>
  );
}

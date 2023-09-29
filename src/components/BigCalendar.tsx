import { useGetEvents } from "@/hooks/use-get-events";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { BigCalendarEvent } from "./BigCalendarEvent";
import { BigCalendarToolbar } from "./BigCalendarToolbar";

const localizer = dayjsLocalizer(dayjs);

export function BigCalendar() {
  const getEvents = useGetEvents();

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
            localizer.format(date, "ddd", culture),
        }}
        views={["month"]}
        events={getEvents.data.map(event => ({
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

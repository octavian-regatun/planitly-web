import { getEventsApi } from "@/server/api/events";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { format, isSameDay } from "date-fns";
import Link from "next/link";

interface Props {
  event: Awaited<ReturnType<typeof getEventsApi>>[number];
}

export default function EventCard({ event }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded bg-teal-500 p-4 text-white">
      <p className="text-xl">{event.name}</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-4 w-4" />
          <p>{event.location.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          <p>
            {format(event.startDate, "E, MMMM d, y")}
            {!isSameDay(event.startDate, event.endDate) && (
              <>
                {" "}
                -<br />
                {format(event.endDate, "E, MMMM d, y")}
              </>
            )}
          </p>
        </div>
      </div>
      <Link href={`/events/${event.id}`} className="bg-teal-700/50 rounded text-center py-2 hover:bg-teal-700 hover:text-white transition-colors">
        View Event
      </Link>
    </div>
  );
}

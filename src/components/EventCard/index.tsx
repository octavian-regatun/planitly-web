import { serverApi } from "@/server/api";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { format, isSameDay } from "date-fns";
import Link from "next/link";

interface Props {
  event: Awaited<ReturnType<(typeof serverApi)["events"]["getEvents"]>>[number];
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
      <Link
        href={`/events/${event.id}`}
        className="rounded bg-teal-700/50 py-2 text-center transition-colors hover:bg-teal-700 hover:text-white"
      >
        View Event
      </Link>
    </div>
  );
}

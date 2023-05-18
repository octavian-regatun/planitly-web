import ParticipantsList from "@/components/EventPage/ParticipantsList";
import { getEventApi } from "@/server/api/events";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { format, isSameDay } from "date-fns";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default async function EventPage({ params: { id } }: Props) {
  console.log(id);

  const event = await getEventApi({ id: parseInt(id) });

  if (!event) return null;

  return (
    <div>
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="cover"
        width={1920}
        height={1080}
      />
      <div className="relative -top-8 flex flex-col gap-4 rounded-t-3xl bg-white px-4 pt-4">
        <p className="text-center text-xl">{event.name}</p>
        <div className="flex flex-col gap-2 rounded bg-teal-500 p-4 text-white drop-shadow-md">
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
        <p>Participants</p>
        <ParticipantsList event={event} />
      </div>
    </div>
  );
}

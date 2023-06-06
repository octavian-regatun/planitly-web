import EventCard from "@/components/EventCard";
import { getEventsApi } from "@/server/api/events";

export default async function EventsPage() {
  const events = await getEventsApi();

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-xl">Upcoming Events</h1>
      <div className="mt-4 flex flex-col gap-4">
        {events.map(event => (
          <EventCard event={event} key={`event-card-${event.id}`} />
        ))}
      </div>
    </div>
  );
}

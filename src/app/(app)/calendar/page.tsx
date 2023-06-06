import BigCalendar from "@/components/BigCalendar";
import { serverApi } from "@/server/api";

export default async function CalendarPage() {
  const events = await serverApi.events.getEvents();

  return (
    <div className="flex flex-col gap-8 px-4 pb-24 pt-4">
      <div className="h-[calc(100vh-192px)]">
        <BigCalendar events={events} />
      </div>
      <p className="rounded border border-teal-500 p-2 text-center">
        See whats new with your friends!
      </p>
    </div>
  );
}

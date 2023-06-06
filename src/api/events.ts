import { createEventApi, getEventsApi } from "@/server/api/events";

export async function getEvents() {
  const res = await fetch("/api/events");

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.error);
  }

  const data = (await res.json()) as Awaited<ReturnType<typeof getEventsApi>>;

  return data;
}

export async function createEvent({
  name,
  description,
  location,
  userIds,
  startDate,
  endDate,
  allDay,
}: {
  name: string;
  description: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  userIds: string[];
  startDate: Date;
  endDate: Date;
  allDay: boolean;
}) {
  const res = await fetch("/api/events", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      location,
      userIds,
      startDate,
      endDate,
      allDay,
    }),
  });

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.error);
  }

  const data = (await res.json()) as Awaited<ReturnType<typeof createEventApi>>;

  return data;
}

export async function deleteEvent({ eventId }: { eventId: number }) {
  const res = await fetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.error);
  }

  const data = (await res.json()) as Awaited<ReturnType<typeof createEventApi>>;

  return data;
}

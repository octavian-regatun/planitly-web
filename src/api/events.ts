import { serverApi } from "@/server/api";

export const eventsClientApi = {
  getEvents: async () => {
    const res = await fetch("/api/events");

    if (!res.ok) {
      const data = await res.json();

      throw new Error(data.error);
    }

    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["events"]["getEvents"]>
    >;

    return data;
  },
  createEvent: async ({
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
  }) => {
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

    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["events"]["createEvent"]>
    >;

    return data;
  },

  deleteEvent: async ({ eventId }: { eventId: number }) => {
    const res = await fetch(`/api/events/${eventId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();

      throw new Error(data.error);
    }

    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["events"]["createEvent"]>
    >;

    return data;
  }
}
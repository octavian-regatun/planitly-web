import { getServerAuthSession } from "../auth";
import { prisma } from "../db";

export const eventsServerApi = {
  getEvent: async ({ id }: { id: number }) => {
    return await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        eventMembers: {
          include: {
            user: true,
          },
        },
        location: true,
      },
    });
  },
  getEvents: async () => {
    const session = await getServerAuthSession();

    return await prisma.event.findMany({
      where: {
        eventMembers: {
          some: {
            userId: session?.user.id,
          },
        },
      },
      include: {
        eventMembers: true,
        location: true,
      },
    });
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
    const session = await getServerAuthSession();

    const event = await prisma.event.create({
      data: {
        name,
        description,
        location: {
          create: {
            name: location.name,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
          },
        },
        allDay,
        endDate,
        startDate,
      },
    });

    await prisma.eventMember.createMany({
      data: userIds.map(userId => {
        if (userId === session?.user.id) {
          return {
            userId,
            eventId: event.id,
            role: "ADMIN",
          };
        }
        return {
          userId,
          eventId: event.id,
        };
      }),
    });

    return event;
  },
  getEventMember: async ({
    eventId,
    userId,
  }: {
    eventId: number;
    userId: string;
  }) => {
    return await prisma.eventMember.findFirst({
      where: {
        eventId,
        userId,
      },
    });
  },
  deleteEvent: async ({ id }: { id: number }) => {
    const session = await getServerAuthSession();

    if (!session) {
      throw new Error("Not authenticated");
    }

    const eventMember = await eventsServerApi.getEventMember({
      userId: session.user.id,
      eventId: id,
    });

    if (eventMember?.role !== "ADMIN") {
      throw new Error("Not authorized");
    }

    return await prisma.event.delete({
      where: {
        id,
      },
    });
  },
};

import { prisma } from "../db";

export async function createEventApi({
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
    data: userIds.map(userId => ({
      userId,
      eventId: event.id,
    })),
  });

  return event;
}

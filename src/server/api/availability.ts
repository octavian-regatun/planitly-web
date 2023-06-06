import { prisma } from "@/server/db";

export async function createAvailability({
  userId,
  isAvailable,
  startDate,
  endDate,
}: {
  userId: string;
  isAvailable: boolean;
  startDate: Date;
  endDate: Date;
}) {
  return await prisma.availability.create({
    data: {
      userId,
      isAvailable,
      startDate,
      endDate,
    },
  });
}

export const getAvailabilities = async () => {
  return await prisma.availability.findMany({
    orderBy: {
      startDate: "asc",
    },
  });
};

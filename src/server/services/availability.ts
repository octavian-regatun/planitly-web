import { prisma } from "@/server/db";

export const availabilitiesServerApi = {
  create: async ({
    userId,
    isAvailable,
    startDate,
    endDate,
  }: {
    userId: string;
    isAvailable: boolean;
    startDate: Date;
    endDate: Date;
  }) => {
    return await prisma.availability.create({
      data: {
        userId,
        isAvailable,
        startDate,
        endDate,
      },
    });
  },
  getAll: async () => {
    return await prisma.availability.findMany({
      orderBy: {
        startDate: "asc",
      },
    });
  },
};

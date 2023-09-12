import { Prisma, User } from "@prisma/client";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db";

export const usersServerApi = {
  getUsers: async ({ includeMe }: { includeMe?: boolean }) => {
    const session = await getServerAuthSession();

    let where: Prisma.UserWhereInput = {};

    if (!includeMe) {
      where = {
        ...where,
        NOT: {
          id: session?.user.id,
        },
      };
    }

    return await prisma.user.findMany({ where });
  },
  getUserByUsername: async (username: string) => {
    return await prisma.user.findUnique({
      where: {
        username,
      },
    });
  },
  getUserById: async ({ id }: { id: string }) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },
  getMeUser: async () => {
    const session = await getServerAuthSession();

    try {
      return await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  searchUsers: async (query: string) => {
    const session = await getServerAuthSession();

    try {
      return prisma.user.findMany({
        where: {
          id: {
            not: session?.user.id,
          },
          OR: [
            {
              username: {
                contains: query,
              },
            },
            {
              firstName: {
                contains: query,
              },
            },
            {
              lastName: {
                contains: query,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

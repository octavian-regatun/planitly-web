import { Prisma, User } from "@prisma/client";
import { getServerAuthSession } from "../auth";
import { prisma } from "../db";

export async function getUsersApi({ includeMe }: { includeMe?: boolean }) {
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
}

export async function getUserByUsernameApi(username: string) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}

export async function getUserByIdApi({ id }: { id: string }) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getMeUserApi() {
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
}

export async function searchUsersApi(query: string) {
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
}

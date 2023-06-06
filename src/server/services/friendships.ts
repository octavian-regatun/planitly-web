import { Friendship } from "@prisma/client";
import { prisma } from "../db";
import { getServerAuthSession } from "../auth";

export const friendshipsServerApi = {
  getFriendship: async (id: number) => {
    try {
      return await prisma.friendship.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getFriendships: async () => {
    const session = await getServerAuthSession();

    try {
      return await prisma.friendship.findMany({
        where: {
          OR: [
            {
              recipientId: session?.user.id,
            },
            {
              requesterId: session?.user.id,
            },
          ],
        },
        include: {
          recipient: true,
          requester: true,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getFriendshipWithUserId: async (userId: string) => {
    const session = await getServerAuthSession();

    try {
      return await prisma.friendship.findMany({
        where: {
          OR: [
            {
              requesterId: session?.user.id,
              recipientId: userId,
            },
            {
              requesterId: userId,
              recipientId: session?.user.id,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  createFriendship: async ({ recipientId }: { recipientId: string }) => {
    const session = await getServerAuthSession();

    const recipient = await prisma.user.findUnique({
      where: {
        id: recipientId,
      },
    });

    if (!recipient) throw new Error("User not found");

    if (recipientId === session?.user.id)
      throw new Error("You can't add yourself as a friend");

    let existingFriendship: Friendship[] | null;

    try {
      existingFriendship = await friendshipsServerApi.getFriendshipWithUserId(
        recipientId
      );
    } catch (error) {
      console.log(error);
      return null;
    }

    if (!existingFriendship || existingFriendship.length > 0)
      throw new Error("You are already friends with this user");

    try {
      return await prisma.friendship.create({
        data: {
          requesterId: session?.user.id as string,
          recipientId,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteFriendship: async ({ id }: { id: number }) => {
    try {
      return await prisma.friendship.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  updateFriendship: async ({
    id,
    status,
  }: {
    id: number;
    status: "ACCEPTED" | "PENDING";
  }) => {
    try {
      return await prisma.friendship.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

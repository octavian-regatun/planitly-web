import { Friendship } from "@prisma/client";
import { prisma } from "../db";
import { getServerAuthSession } from "../auth";

export async function getFriendshipApi(id: number) {
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
}

export async function getFriendshipsApi() {
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
}

export async function getFriendshipWithUserIdApi(userId: string) {
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
}

export async function createFriendshipApi({
  recipientId,
}: {
  recipientId: string;
}) {
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
    existingFriendship = await getFriendshipWithUserIdApi(recipientId);
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
}

export async function deleteFriendshipApi({ id }: { id: number }) {
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
}

export async function updateFriendshipApi({
  id,
  status,
}: {
  id: number;
  status: "ACCEPTED" | "PENDING";
}) {
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
}

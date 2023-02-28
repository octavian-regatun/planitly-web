import { prisma } from "../server/db"

export async function searchFriends(query: string, userId: string) {
  const friends1 = await prisma.friendship.findMany({
    where: {
      status: "ACCEPTED",
      requesterId: userId,
      recipient: {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    },
    select: {
      recipient: true,
    },
  })

  const friends2 = await prisma.friendship.findMany({
    where: {
      status: "ACCEPTED",
      recipientId: userId,
      requester: {
        OR: [
          {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    },
    select: {
      requester: true,
    },
  })

  const mappedFriends1 = friends1.map((friend) => friend.recipient)
  const mappedFriends2 = friends2.map((friend) => friend.requester)

  return [...mappedFriends1, ...mappedFriends2]
}

import { Friendship, User } from "@prisma/client";

type Friendships = (Friendship & {
  requester: User;
  recipient: User;
})[];

export function getUsersWithoutFriendship(
  users: User[],
  friendships: Friendships,
  loggedUserId: string
) {
  return users.filter(
    user =>
      !friendships.find(
        friendship =>
          (friendship.requesterId === user.id &&
            friendship.recipientId === loggedUserId) ||
          (friendship.requesterId === loggedUserId &&
            friendship.recipientId === user.id)
      )
  );
}

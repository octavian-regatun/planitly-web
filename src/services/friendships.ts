import { backendAxios } from "@/utilities/axios";
import { PublicUser } from "./users";

export interface Friendship {
  id: number;
  recipientId: number;
  requesterId: number;
  recipient: PublicUser;
  requester: PublicUser;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export type FriendshipStatus = "ACCEPTED" | "PENDING";

export const friendshipsService = {
  async find(
    {
      type = "ALL",
      status = "ALL",
    }: {
      type: "ALL" | "INCOMING" | "OUTGOING";
      status: FriendshipStatus | "ALL";
    } = {
      type: "ALL",
      status: "ALL",
    }
  ) {
    return await backendAxios.get<Friendship[]>("friendships", {
      params: { type, status },
    });
  },
  async findByUserId(userId: number) {
    return await backendAxios.get<Friendship>(`friendships/users/${userId}`);
  },
  async create(recipientId: number) {
    return await backendAxios.post<Friendship>("friendships", { recipientId });
  },
  async delete(id: number) {
    return await backendAxios.delete(`friendships/${id}`);
  },
  async accept(id: number) {
    return await backendAxios.patch<Friendship>(`friendships/${id}`);
  },
  findFriendshipBetween(
    userId1: number,
    userId2: number,
    friendships: Friendship[]
  ) {
    return friendships.find(friendship => {
      return (
        (friendship.requesterId === userId1 &&
          friendship.recipientId === userId2) ||
        (friendship.requesterId === userId2 &&
          friendship.recipientId === userId1)
      );
    });
  },
};

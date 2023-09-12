import { backendAxios } from "@/utilities/axios";

export interface Friendship {
  id: number;
  recipientId: number;
  requesterId: number;
  status: FriendshipStatus;
  createdAt: string;
  updatedAt: string;
}

export enum FriendshipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
}

export const friendshipsService = {
  async find() {
    return await backendAxios.get<Friendship[]>("friendships");
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

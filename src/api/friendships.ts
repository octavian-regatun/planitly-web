import { serverApi } from "@/server/api";

export const friendshipsClientApi = {
  getFriendships: async () => {
    const res = await fetch(`/api/friendships`);
    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["friendships"]["getFriendships"]>
    >;

    if (!res.ok) {
      const data = (await res.json()) as { error: string };

      throw new Error(data.error);
    }

    return data;
  },

  createFriendship: async ({ recipientId }: { recipientId: string }) => {
    const res = await fetch(`/api/friendships`, {
      body: JSON.stringify({ recipientId }),
      method: "POST",
    });

    if (!res.ok) {
      const data = (await res.json()) as { error: string };

      throw new Error(data.error);
    }

    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["friendships"]["createFriendship"]>
    >;

    return data;
  },
  updateFriendship: async ({
    id,
    status,
  }: {
    id: number;
    status: "ACCEPTED" | "PENDING";
  }) => {
    const res = await fetch(`/api/friendships/${id}`, {
      body: JSON.stringify({ status }),
      method: "PATCH",
    });

    if (!res.ok) {
      const data = (await res.json()) as { error: string };

      throw new Error(data.error);
    }

    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["friendships"]["updateFriendship"]>
    >;

    return data;
  },

  deleteFriendship: async ({ id }: { id: number }) => {
    const res = await fetch(`/api/friendships/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = (await res.json()) as { error: string };

      throw new Error(data.error);
    }

    const data = (await res.json()) as Awaited<
      ReturnType<(typeof serverApi)["friendships"]["deleteFriendship"]>
    >;

    return data;
  },
};

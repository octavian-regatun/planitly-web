import {
  createFriendshipApi,
  deleteFriendshipApi,
  getFriendshipsApi,
  updateFriendshipApi,
} from "@/server/api/friendships";

export const getFriendships = async () => {
  const res = await fetch(`/api/friendships`);
  const data = (await res.json()) as Awaited<
    ReturnType<typeof getFriendshipsApi>
  >;

  if (!res.ok) {
    const data = (await res.json()) as { error: string };

    throw new Error(data.error);
  }

  return data;
};

export const createFriendship = async ({
  recipientId,
}: {
  recipientId: string;
}) => {
  const res = await fetch(`/api/friendships`, {
    body: JSON.stringify({ recipientId }),
    method: "POST",
  });

  if (!res.ok) {
    const data = (await res.json()) as { error: string };

    throw new Error(data.error);
  }

  const data = (await res.json()) as Awaited<
    ReturnType<typeof createFriendshipApi>
  >;

  return data;
};

export const updateFriendship = async ({
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
    ReturnType<typeof updateFriendshipApi>
  >;

  return data;
};

export const deleteFriendship = async ({ id }: { id: number }) => {
  const res = await fetch(`/api/friendships/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = (await res.json()) as { error: string };

    throw new Error(data.error);
  }

  const data = (await res.json()) as Awaited<
    ReturnType<typeof deleteFriendshipApi>
  >;

  return data;
};

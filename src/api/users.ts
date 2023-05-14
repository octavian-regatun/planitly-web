import {
  getUserByIdApi,
  getUsersApi,
  searchUsersApi,
} from "@/server/api/users";

export const searchUsers = async (query: string) => {
  const res = await fetch(`/api/users/search?query=${query}`);
  const users = (await res.json()) as Awaited<
    ReturnType<typeof searchUsersApi>
  >;

  return users;
};

export const getUsers = async ({
  username,
  includeMe,
}: {
  username?: string;
  includeMe?: boolean;
}) => {
  const urlParams = new URLSearchParams();

  if (typeof includeMe === "boolean")
    urlParams.append("includeMe", includeMe.toString());

  const res = await fetch(`/api/users?${urlParams.toString()}`);

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.error);
  }

  const users = (await res.json()) as Awaited<ReturnType<typeof getUsersApi>>;

  return users;
};

export async function getUserById({ id }: { id: string }) {
  const res = await fetch(`/api/users/${id}`);

  if (!res.ok) {
    const data = await res.json();

    throw new Error(data.error);
  }

  const data = (await res.json()) as Awaited<ReturnType<typeof getUserByIdApi>>;

  console.log(data);

  return data;
}

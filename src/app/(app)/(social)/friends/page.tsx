import FriendsList from "@/components/FriendsPage/FriendsList";
import Search from "@/components/FriendsPage/Search";
import { getFriendshipsApi } from "@/server/api/friendships";
import { searchUsersApi } from "@/server/api/users";
import { getServerAuthSession } from "@/server/auth";
import { Session } from "next-auth";

export default async function FriendsPage() {
  const session = (await getServerAuthSession()) as Session;
  const searchUsers = await searchUsersApi("");

  if (searchUsers === null) return null;

  return (
    <div className="mt-4 flex flex-col items-center">
      <Search />
      <FriendsList session={session} />
    </div>
  );
}

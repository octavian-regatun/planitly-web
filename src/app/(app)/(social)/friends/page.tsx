import FriendsList from "@/components/FriendsPage/FriendsList";
import Search from "@/components/FriendsPage/Search";
import { getServerAuthSession } from "@/server/auth";
import { Session } from "next-auth";
import { serverApi } from "@/server/api";

export default async function FriendsPage() {
  const session = (await getServerAuthSession()) as Session;
  const searchUsers = await serverApi.users.searchUsers("");

  if (searchUsers === null) return null;

  return (
    <div className="mt-4 flex flex-col items-center">
      <Search />
      <FriendsList session={session} />
    </div>
  );
}

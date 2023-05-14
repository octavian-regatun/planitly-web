"use client";
import { getFriendships } from "@/api/friendships";
import { searchUsers } from "@/api/users";
import UserCard from "@/components/UserCard";
import { useFriendsStore } from "@/store/friends";
import { getUsersWithoutFriendship } from "@/utilities/users";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useEffect, useMemo, useState } from "react";

interface Props {
  session: Session;
}

export default function FriendsList({ session }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [query] = useFriendsStore(state => [state.query]);

  const searchUsersQuery = useQuery({
    queryKey: ["search-users", query],
    queryFn: () => searchUsers(query),
  });

  const getFriendshipsQuery = useQuery({
    queryKey: ["get-friendships", query],
    queryFn: () => getFriendships(),
  });

  useEffect(() => {
    if (!searchUsersQuery.data) {
      setUsers([]);
      return;
    }
    if (!getFriendshipsQuery.data) {
      setUsers(searchUsersQuery.data);
      return;
    }
    const users = getUsersWithoutFriendship(
      searchUsersQuery.data,
      getFriendshipsQuery.data,
      session.user.id
    );

    setUsers(users);
  }, [searchUsersQuery.data, getFriendshipsQuery.data, session.user.id]);

  return (
    <div className="w-full bg-white drop-shadow">
      {users.map(user => (
        <UserCard
          user={user}
          key={`search-user-${user.id}`}
          className="w-full"
          addFriendButton
        />
      ))}
      {getFriendshipsQuery.data?.map(friendship => (
        <UserCard
          user={
            session.user.id === friendship.recipientId
              ? friendship.requester
              : friendship.recipient
          }
          key={`search-user-${friendship.id}`}
          className="w-full"
          friendship={friendship}
          acceptFriendButton={
            friendship.recipientId === session.user.id &&
            friendship.status === "PENDING"
          }
          pending={
            friendship.requesterId === session.user.id &&
            friendship.status === "PENDING"
          }
          deleteFriendButton
        />
      ))}
    </div>
  );
}

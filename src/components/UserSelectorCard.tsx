import { useGetFriendships } from "@/hooks/use-get-friendships";
import { useSearchUsers } from "@/hooks/use-search-users";
import { Friendship } from "@/services/friendships";
import { User } from "@/services/users";
import { useStore } from "@/store/store";
import { useState } from "react";
import SelectUser from "./SelectUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export function UserSelectorCard({ selectedUser, setSelectedUser }: Props) {
  const me = useStore((store) => store.me) as User;
  const [open, setOpen] = useState(false);

  const usersQuery = useSearchUsers("");
  const getFriendships = useGetFriendships();

  const getFriendshipStatus = (friendship: Friendship) => {
    if (friendship.status === "ACCEPTED") return "Friends";
    if (friendship.status === "PENDING") return "Pending";
    return undefined;
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>Manage your friends here.</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectUser />
      </CardContent>
    </Card>
  );
}

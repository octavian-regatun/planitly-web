import { BellIcon } from "@heroicons/react/24/outline";
import { Button } from "./shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/dropdown-menu";
import { FriendshipNotification } from "./FriendshipNotification";
import { useGetFriendships } from "@/hooks/use-get-friendships";
import { FriendshipStatus } from "@/services/friendships";

export function Notifications() {
  const getFriendships = useGetFriendships({
    status: "PENDING",
    type: "INCOMING",
  });

  console.log(getFriendships.data?.data);

  if (getFriendships.isError)
    return (
      <Button variant="outline" size="icon" disabled>
        <BellIcon className="h-6 w-6" />
      </Button>
    );
  if (getFriendships.isPending) return <div>Loading...</div>;

  const areFriendshipsPending = getFriendships.data.data.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <BellIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!areFriendshipsPending && (
          <DropdownMenuLabel>No Notifications</DropdownMenuLabel>
        )}
        {areFriendshipsPending && (
          <>
            <DropdownMenuLabel>
              Pending Friend Requests ({getFriendships.data.data.length})
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {getFriendships.data.data.map(friendship => (
                <FriendshipNotification
                  friendship={friendship}
                  key={friendship.id}
                />
              ))}
            </DropdownMenuItem>
          </>
        )}
        {/* <DropdownMenuSeparator />
        <DropdownMenuLabel>Pending Group Invites (1)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FriendshipNotification userId={1} />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

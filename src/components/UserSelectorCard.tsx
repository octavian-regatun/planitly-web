import { Friendship, friendshipsService } from "@/services/friendships";
import { User, usersService } from "@/services/users";
import { useStore } from "@/store/store";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";
import { useGetFriendships } from "@/hooks/use-get-friendships";
import { useSearchUsers } from "@/hooks/use-search-users";

interface Props {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export function UserSelectorCard({ selectedUser, setSelectedUser }: Props) {
  const me = useStore(store => store.me) as User;
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[300px] justify-between"
            >
              {selectedUser ? (
                <div className="flex gap-2 items-center">
                  <Image
                    src={selectedUser.picture}
                    alt="profile"
                    className="rounded-full"
                    width={24}
                    height={24}
                  />
                  <span>{selectedUser.username}</span>
                </div>
              ) : (
                "Select user..."
              )}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search username..." className="h-9" />
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {usersQuery.data?.map(user => (
                  <CommandItem
                    key={`user-${user.id}`}
                    onSelect={username => {
                      setSelectedUser(
                        user?.username === selectedUser?.username ? null : user
                      );
                      setOpen(false);
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={user.picture}
                        alt="profile"
                        className="rounded-full"
                        width={24}
                        height={24}
                      />
                      <span>{user.username}</span>
                    </div>
                    {getFriendships.status === "success" &&
                      friendshipsService.findFriendshipBetween(
                        me.id,
                        user.id,
                        getFriendships.data.data
                      ) && (
                        <p className="ml-auto text-sm text-neutral-500">
                          {getFriendshipStatus(
                            friendshipsService.findFriendshipBetween(
                              me.id,
                              user.id,
                              getFriendships.data.data
                            ) as Friendship
                          )}
                        </p>
                      )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}

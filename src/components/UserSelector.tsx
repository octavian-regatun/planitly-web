import { PublicUser, User } from "@/services/users";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/Popover";
import { Button } from "./shadcn/Button";
import Image from "next/image";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./shadcn/Command";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useStore } from "@/store/store";
import { Friendship, friendshipsService } from "@/services/friendships";

interface Props {
  users: PublicUser[];
  value: PublicUser | null;
  onChange: (user: PublicUser | null) => void;
}

export function UserSelector({ users, value, onChange }: Props) {
  const me = useStore(store => store.me) as User;
  const [open, setOpen] = useState(false);

  const friendshipsQuery = useQuery({
    queryKey: ["friendships"],
    queryFn: () => friendshipsService.find(),
  });

  const getFriendshipStatus = (friendship: Friendship) => {
    if (friendship.status === "ACCEPTED") return "Friends";
    if (friendship.status === "PENDING") return "Pending";
    return undefined;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value ? (
            <div className="flex gap-2 items-center">
              <Image
                src={value.picture}
                alt="profile"
                className="rounded-full"
                width={24}
                height={24}
              />
              <span>{value.username}</span>
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
            {users.map(user => (
              <CommandItem
                key={`user-${user.id}`}
                onSelect={username => {
                  onChange(user?.username === value?.username ? null : user);
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
                {friendshipsQuery.status === "success" &&
                  friendshipsService.findFriendshipBetween(
                    me.id,
                    user.id,
                    friendshipsQuery.data.data
                  ) && (
                    <p className="ml-auto text-sm text-neutral-500">
                      {getFriendshipStatus(
                        friendshipsService.findFriendshipBetween(
                          me.id,
                          user.id,
                          friendshipsQuery.data.data
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
  );
}

import { Group } from "@/services/groups";
import { User } from "@/services/users";
import { useStore } from "@/store/store";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./shadcn/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./shadcn/Command";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/Popover";

interface Props {
  groups: Group[];
  value: Group | null;
  onChange: (user: Group | null) => void;
  className?: string;
}

export function GroupSelector({ groups, value, onChange, className }: Props) {
  const me = useStore(store => store.me) as User;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={twMerge("w-[300px] justify-between", className)}
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
              <span>{value.name}</span>
            </div>
          ) : (
            "Select group..."
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search group..." className="h-9" />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {groups.map(group => (
              <CommandItem
                key={`user-${group.id}`}
                onSelect={username => {
                  onChange(group?.id === value?.id ? null : group);
                  setOpen(false);
                }}
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={group.picture}
                    alt="profile"
                    className="rounded-full"
                    width={24}
                    height={24}
                  />
                  <span>{group.name}</span>
                </div>
                {/* {friendshipsQuery.status === "success" &&
                  friendshipsService.findFriendshipBetween(
                    me.id,
                    group.id,
                    friendshipsQuery.data.data
                  ) && (
                    <p className="ml-auto text-sm text-neutral-500">
                      {getFriendshipStatus(
                        friendshipsService.findFriendshipBetween(
                          me.id,
                          group.id,
                          friendshipsQuery.data.data
                        ) as Friendship
                      )}
                    </p>
                  )} */}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

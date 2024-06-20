import { usersService } from "@/services/users";
import { cn } from "@/utilities/shadcn";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Command } from "lucide-react";
import React, { FC } from "react";
import { toast } from "sonner";
import { ZodError } from "zod";
import { Button } from "./shadcn/button";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/popover";

type Props = {};

const SelectUser: FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(null);

  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: usersService.findAll,
  });

  if (getUsers.isError) {
    if (getUsers.error instanceof ZodError) {
      console.error(getUsers.error.issues);
      toast.error("Failed to validate server response!");
    } else toast.error("Failed to fetch users");
  }

  console.log(getUsers.data?.response);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? getUsers.data?.response.find((user) => user.id === value)
                ?.firstName
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {getUsers.data?.response.map((user) => (
              <CommandItem
                key={user.id}
                value={String(user.id)}
                onSelect={(currentValue) => {
                  if (currentValue === null) {
                    setValue(null);
                    return;
                  }

                  setValue(
                    currentValue === String(value)
                      ? null
                      : parseInt(currentValue, 10)
                  );

                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.firstName} {user.lastName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectUser;

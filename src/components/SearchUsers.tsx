"use client";
import { LoaderCircle, User } from "lucide-react";
import { FC, HTMLAttributes, useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = HTMLAttributes<HTMLDivElement>;

const SearchUsers: FC<Props> = (props) => {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const { data: users } = api.users.search.useQuery({ query });

  console.log(users);

  return (
    <div {...props}>
      <Input
        className="w-48"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {focused && (
        <ul className="absolute mt-2 flex min-h-14 w-48 flex-col items-center justify-center gap-2 bg-white p-2 drop-shadow">
          {users ? (
            users.map((user) => (
              <Button
                key={user.id}
                onClick={() => console.log(user)}
                className="w-full justify-start gap-2"
                variant="ghost"
              >
                <User className="h-4 w-4" />
                <span>{user.name}</span>
              </Button>
            ))
          ) : (
            <LoaderCircle className="h-8 w-8 animate-spin" />
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchUsers;

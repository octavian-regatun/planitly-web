"use client";
import { useState } from "react";
import UserProfile from "~/components/UserProfile";
import UserSelect from "~/components/UserSelect";

const FriendsPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="grid w-full grid-cols-12 p-4">
      <div className="col-span-6 flex flex-col gap-2">
        <UserSelect
          selectValueProps={{ placeholder: "Search users" }}
          selectProps={{ onValueChange: setSelectedUserId }}
        />
        {selectedUserId && <UserProfile userId={selectedUserId} />}
      </div>
    </div>
  );
};

export default FriendsPage;

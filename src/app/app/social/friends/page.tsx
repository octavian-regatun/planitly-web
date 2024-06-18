"use client";
import { useState } from "react";
import FriendList from "~/components/FriendList";
import UserProfile from "~/components/UserProfile";
import UserSelect from "~/components/UserSelect";

const FriendsPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="grid w-full grid-cols-12 gap-4 p-4">
      <div className="col-span-6 flex flex-col gap-2">
        <UserSelect
          selectValueProps={{ placeholder: "Search users" }}
          selectProps={{ onValueChange: setSelectedUserId }}
        />
        {selectedUserId && <UserProfile userId={selectedUserId} />}
      </div>
      <div className="col-span-6">
        <FriendList cardProps={{ className: "h-full" }} />
      </div>
    </div>
  );
};

export default FriendsPage;

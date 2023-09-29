"use client";

import { UserCard } from "@/components/UserCard";
import { UserSelectorCard } from "@/components/UserSelectorCard";
import { User } from "@/services/users";
import { useState } from "react";

export default function FriendsPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4 p-4">
      <UserSelectorCard
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {selectedUser && <UserCard user={selectedUser} />}
    </div>
  );
}

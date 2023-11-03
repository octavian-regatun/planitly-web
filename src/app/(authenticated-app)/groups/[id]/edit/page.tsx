"use client";

import { ErrorCard } from "@/components/ErrorCard";
import { UserPicture } from "@/components/UserPicture";
import { UserSelector } from "@/components/UserSelector";
import { Button } from "@/components/shadcn/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/Card";
import { GroupPicture } from "@/components/shadcn/GroupPicture";
import { useCreateGroupMember } from "@/hooks/use-create-group-member";
import { useDeleteGroupMember } from "@/hooks/use-delete-group-member";
import { useGetGroup } from "@/hooks/use-get-group";
import { useSearchUsers } from "@/hooks/use-search-users";
import { groupMembersService } from "@/services/group-members";
import { PublicUser } from "@/services/users";
import { useStore } from "@/store/store";
import Link from "next/link";
import { useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function GroupPage({ params: { id } }: Props) {
  const me = useStore(state => state.me);

  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  const searchUsers = useSearchUsers("");
  const getGroup = useGetGroup(parseInt(id));
  const deleteMember = useDeleteGroupMember();
  const addMember = useCreateGroupMember();

  const groupMembers = getGroup.data?.data?.groupMembers || [];
  const usersNotMembers =
    searchUsers.data?.filter(
      user =>
        !groupMembers.find(member => member.userId === user.id) &&
        user.id !== me?.id
    ) || [];

  if (getGroup.isPending) return <div>Loading...</div>;
  if (getGroup.isError)
    return (
      <div className="p-4">
        <ErrorCard message={getGroup.error.response!.data.message} />
      </div>
    );

  const groupMemberMe = groupMembersService.getMemberFromGroupByUserId(
    getGroup.data.data,
    me!.id
  );

  return (
    <div className="flex flex-col pt-4 md:pt-16 mx-auto px-4 gap-4 max-w-screen-sm">
      <p className="text-2xl">You are editing now:</p>
      <hr />
      <p className="text-2xl">{getGroup.data.data.name}</p>
      <GroupPicture groupId={parseInt(id)} size={128} />
      <p className="text-neutral-700 mt-4">{getGroup.data.data.description}</p>
      <hr />
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {groupMembers.map(member => (
            <div key={`group-member-${member.id}`} className="flex gap-2">
              <UserPicture size={48} userId={member.userId} />
              <div className="flex-1">
                <p className="font-medium">
                  {member.user.firstName} {member.user.lastName}
                </p>
                <p className="text-neutral-500 text-sm">
                  {member.role} {member.status === "PENDING" && " - PENDING"}
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => deleteMember.mutate(member.id)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <UserSelector
              users={usersNotMembers}
              value={selectedUser}
              onChange={setSelectedUser}
              className="mr-auto"
            />
            <Button
              disabled={!selectedUser}
              onClick={() => {
                addMember.mutate({
                  groupId: parseInt(id),
                  userId: selectedUser!.id,
                });
                setSelectedUser(null);
              }}
            >
              Invite
            </Button>
          </div>
        </CardContent>
      </Card>
      <Link href={`/groups/${id}`}>
        <Button>View Group</Button>
      </Link>
    </div>
  );
}

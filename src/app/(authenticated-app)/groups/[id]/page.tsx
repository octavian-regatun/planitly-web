"use client";

import { ErrorCard } from "@/components/ErrorCard";
import { GroupMembers } from "@/components/GroupMembers";
import { Button } from "@/components/shadcn/Button";
import { GroupPicture } from "@/components/shadcn/GroupPicture";
import { useAcceptGroupMember } from "@/hooks/use-accept-group-member";
import { useDeleteGroup } from "@/hooks/use-delete-group";
import { useDeleteGroupMember } from "@/hooks/use-delete-group-member";
import { useGetGroup } from "@/hooks/use-get-group";
import { groupMembersService } from "@/services/group-members";
import { useStore } from "@/store/store";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function GroupPage({ params: { id } }: Props) {
  const me = useStore(state => state.me);

  const getGroup = useGetGroup(parseInt(id));
  const acceptGroupMember = useAcceptGroupMember(parseInt(id));
  const deleteGroupMember = useDeleteGroupMember();
  const deleteGroup = useDeleteGroup(parseInt(id));

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
      <p className="text-2xl">{getGroup.data.data.name}</p>
      <GroupPicture groupId={parseInt(id)} size={128} />
      <p className="text-neutral-700 mt-4">{getGroup.data.data.description}</p>
      <hr />
      <div>
        <p className="font-semibold">Members</p>
        <GroupMembers groupId={parseInt(id)} />
      </div>
      {/* Action Buttons */}
      <div>
        {groupMemberMe &&
          groupMemberMe.status === "ACCEPTED" &&
          groupMemberMe.role === "MEMBER" && (
            <Button
              variant="destructive"
              onClick={() => deleteGroupMember.mutate(groupMemberMe.id)}
            >
              Leave Group
            </Button>
          )}
        {groupMemberMe &&
          groupMemberMe.status === "ACCEPTED" &&
          groupMemberMe.role === "ADMIN" && (
            <div className="flex gap-2">
              <Button asChild>
                <Link href={`/groups/${id}/edit`}>Edit Group</Link>
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteGroup.mutate(parseInt(id))}
              >
                Delete Group
              </Button>
            </div>
          )}
        {groupMemberMe && groupMemberMe.status === "PENDING" && (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                acceptGroupMember.mutate(groupMemberMe.id);
              }}
            >
              Accept <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                deleteGroupMember.mutate(groupMemberMe.id);
              }}
            >
              Decline <XMarkIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

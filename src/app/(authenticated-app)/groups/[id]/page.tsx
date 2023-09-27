"use client";

import { ErrorCard } from "@/components/ErrorCard";
import { Button } from "@/components/shadcn/Button";
import { useToast } from "@/components/shadcn/use-toast";
import { groupMembersService } from "@/services/group-members";
import { Group, groupsService } from "@/services/groups";
import { useStore } from "@/store/store";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default function GroupPage({ params: { id } }: Props) {
  const me = useStore(state => state.me);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const groupQuery = useQuery<
    AxiosResponse<Group, any>,
    AxiosError<{ message: string; statusCode: number }>
  >({
    queryKey: ["group", id],
    queryFn: () => groupsService.findById(parseInt(id)),
    retry: false,
  });

  const acceptGroupMemberMutation = useMutation({
    mutationFn: groupMembersService.accept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", id] });
    },
  });

  const deleteGroupMemberMutation = useMutation({
    mutationFn: groupMembersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", id] });
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: groupsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", id] });

      toast({
        title: "Group deleted",
        description: "Group was successfully deleted",
      });
    },
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast({
        title: "Error",
        description: error.response!.data.message,
        variant: "destructive",
      });
    },
  });

  if (groupQuery.isPending) return <div>Loading...</div>;
  if (groupQuery.isError)
    return (
      <div className="p-4">
        <ErrorCard message={groupQuery.error.response!.data.message} />
      </div>
    );

  const groupMemberMe = groupMembersService.getMemberFromGroupByUserId(
    groupQuery.data.data,
    me!.id
  );

  return (
    <div className="flex flex-col items-center pt-4">
      <Image
        src={groupQuery.data.data.picture}
        alt="group"
        width={128}
        height={128}
        className="rounded-full border"
      />
      <p className="text-xl mt-4">{groupQuery.data.data.name}</p>
      <p className="text-neutral-700">{groupQuery.data.data.description}</p>
      <div className="mt-8">
        {groupMemberMe &&
          groupMemberMe.status === "ACCEPTED" &&
          groupMemberMe.role === "MEMBER" && (
            <Button
              variant="destructive"
              onClick={() => deleteGroupMemberMutation.mutate(groupMemberMe.id)}
            >
              Leave Group
            </Button>
          )}
        {groupMemberMe &&
          groupMemberMe.status === "ACCEPTED" &&
          groupMemberMe.role === "ADMIN" && (
            <Button
              variant="destructive"
              onClick={() => deleteGroupMutation.mutate(parseInt(id))}
            >
              Delete Group
            </Button>
          )}
        {groupMemberMe && groupMemberMe.status === "PENDING" && (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                acceptGroupMemberMutation.mutate(groupMemberMe.id);
              }}
            >
              Accept <CheckIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                deleteGroupMemberMutation.mutate(groupMemberMe.id);
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

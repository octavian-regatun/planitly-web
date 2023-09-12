"use client";

import { clientApi } from "@/api";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Friendship } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "../UI/Button";

interface Props {
  friendship: Friendship;
}

export default function DeleteFriendButton({ friendship }: Props) {
  const queryClient = useQueryClient();
  const deleteFriendshipMutation = useMutation({
    mutationFn: clientApi.friendships.deleteFriendship,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-friendships"] });
    },
    onError(error: Error) {
      toast.error(error.message, { toastId: "add-friend-error" });
    },
  });
  return (
    <Button
      className="rounded-full p-2"
      variant="outlined"
      onClick={() => deleteFriendshipMutation.mutate({ id: friendship.id })}
    >
      <XMarkIcon className="h-4 w-4" />
    </Button>
  );
}

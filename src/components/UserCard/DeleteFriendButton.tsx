"use client";

import { UserPlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../UI/Button";
import { Friendship, User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFriendship, deleteFriendship } from "@/api/friendships";
import { toast } from "react-toastify";

interface Props {
  friendship: Friendship;
}

export default function DeleteFriendButton({ friendship }: Props) {
  const queryClient = useQueryClient();
  const deleteFriendshipMutation = useMutation({
    mutationFn: deleteFriendship,
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

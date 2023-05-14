"use client";

import { UserPlusIcon } from "@heroicons/react/24/solid";
import Button from "../UI/Button";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFriendship } from "@/api/friendships";
import { toast } from "react-toastify";

interface Props {
  user: User;
}

export default function AddFriendButton({ user }: Props) {
  const queryClient = useQueryClient();

  const updateFriendshipMutation = useMutation({
    mutationFn: createFriendship,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-friendships"] });
    },
    onError(x: Error) {
      toast.error(x.message, { toastId: "add-friend-error" });
    },
  });
  return (
    <Button
      className="rounded-full p-2"
      variant="outlined"
      onClick={() => updateFriendshipMutation.mutate({ recipientId: user.id })}
    >
      <UserPlusIcon className="h-4 w-4" />
    </Button>
  );
}

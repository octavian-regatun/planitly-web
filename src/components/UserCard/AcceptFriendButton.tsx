"use client";

import { clientApi } from "@/api";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Friendship } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "../UI/Button";

interface Props {
  friendship: Friendship;
}

export default function AcceptFriendButton({ friendship }: Props) {
  const queryClient = useQueryClient();

  const updateFriendshipMutation = useMutation({
    mutationFn: clientApi.friendships.updateFriendship,
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
      onClick={() =>
        updateFriendshipMutation.mutate({
          id: friendship.id,
          status: "ACCEPTED",
        })
      }
    >
      <CheckIcon className="h-4 w-4" />
    </Button>
  );
}

import { friendshipsService } from "@/services/friendships";
import { groupsService } from "@/services/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useDeleteFriendship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendshipsService.delete,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast.success("Friendship removed!");
    },
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast.error("Friendship removal failed!");
    },
  });
}

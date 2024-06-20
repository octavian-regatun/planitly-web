import { friendshipsService } from "@/services/friendships";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useAcceptFriendship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendshipsService.accept,
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast.error(error.response?.data.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast.success("Friendship accepted!");
    },
  });
}

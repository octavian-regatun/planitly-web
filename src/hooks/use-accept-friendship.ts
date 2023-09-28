import { useToast } from "@/components/shadcn/use-toast";
import { friendshipsService } from "@/services/friendships";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAcceptFriendship() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendshipsService.accept,
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast({
        title: `Error`,
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast({
        title: `Friendship Accepted`,
      });
    },
  });
}

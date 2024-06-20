import { useToast } from "@/components/shadcn/use-toast";
import { friendshipsService } from "@/services/friendships";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useCreateFriendship() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: friendshipsService.create,
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast.error(`Error: ${error.response?.data.message}`, {
        className: "bg-red-600 text-white",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast.info(`Friendship Request Sent`);
    },
  });
}

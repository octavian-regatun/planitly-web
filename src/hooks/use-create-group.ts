import { groupsService } from "@/services/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Your group has been created.");
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      toast.error(error.response?.data.message);
    },
  });
}

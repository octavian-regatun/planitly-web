import { groupsService } from "@/services/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useDeleteGroup(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });

      toast.success("Group deleted");
    },
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast.error("Group deletion failed!");
    },
  });
}

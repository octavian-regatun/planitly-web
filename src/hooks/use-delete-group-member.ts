import { groupMembersService } from "@/services/group-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteGroupMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupMembersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Group member deleted.");
    },
    onError(error) {
      toast.error("Group member deletion failed!");
    },
  });
}

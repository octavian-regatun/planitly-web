import { groupMembersService } from "@/services/group-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteGroupMember(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupMembersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
}

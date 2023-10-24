import { groupMembersService } from "@/services/group-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAcceptGroupMember(groupId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupMembersService.accept,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
    },
  });
}

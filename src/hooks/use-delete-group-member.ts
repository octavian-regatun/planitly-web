import { useToast } from "@/components/shadcn/use-toast";
import { groupMembersService } from "@/services/group-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteGroupMember(groupId: number) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupMembersService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      toast({
        title: "Success",
        description: `Group member deleted.`,
      });
    },
    onError(error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

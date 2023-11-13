import { useToast } from "@/components/shadcn/use-toast";
import { groupMembersService } from "@/services/group-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateGroupMember() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groupMembersService.create,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast({
        title: "Success",
        description: `You have invited ${data.data.user.firstName} ${data.data.user.lastName} to the group.`,
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

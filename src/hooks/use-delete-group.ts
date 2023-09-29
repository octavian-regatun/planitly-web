import { useToast } from "@/components/shadcn/use-toast";
import { groupsService } from "@/services/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useDeleteGroup(groupId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: groupsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });

      toast({
        title: "Group deleted",
        description: "Group was successfully deleted",
      });
    },
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast({
        title: "Error",
        description: error.response!.data.message,
        variant: "destructive",
      });
    },
  });
}

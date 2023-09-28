import { useToast } from "@/components/shadcn/use-toast";
import { groupsService } from "@/services/groups";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateGroup() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: groupsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast({
        title: "Group Created 🎉",
        description: "Your group has been created.",
      });
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      toast({
        title: `Error`,
        description: error.response?.data.message,
        className: "bg-red-600 text-white",
      });
    },
  });
}

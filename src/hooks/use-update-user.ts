import { useToast } from "@/components/shadcn/use-toast";
import { usersService } from "@/services/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser(userId: number, values: any) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => usersService.update(userId, values),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users"] });

      toast({
        title: "User Updated 🎉",
        description: "Your user has been updated.",
      });
    },
  });
}

import { toast, useToast } from "@/components/shadcn/use-toast";
import { eventsService } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: eventsService.removeById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event deleted 🗑️",
        description: "Your event has been deleted.",
      });
    },
  });
}

import { useToast } from "@/components/shadcn/use-toast";
import { eventsService } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateEvent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsService.createEvent,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event Created 🎉",
        description: `Event ${data.title} has been created`,
      });
    },
    onError(error) {
      toast({
        title: "Event Creation Failed 😢",
        description: error.message,
      });
    },
  });
}

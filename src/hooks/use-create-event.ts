import { eventsService } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventsService.createEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(`Event ${data.title} has been created`);
    },
    onError(error) {
      toast.error("Event creation failed!");
    },
  });
}

import { eventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";

export function useGetEvent({ id }: { id: number }) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () => eventsService.findById(id),
  });
}

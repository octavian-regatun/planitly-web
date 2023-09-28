import { eventsService } from "@/services/events";
import { useQuery } from "@tanstack/react-query";

export function useGetEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: eventsService.findAll,
    initialData: [],
  });
}

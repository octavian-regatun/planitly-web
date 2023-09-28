import { groupsService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";

export function useGetGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: groupsService.find,
  });
}

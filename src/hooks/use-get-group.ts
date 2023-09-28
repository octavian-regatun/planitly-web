import { groupsService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";

export function useGetGroup(groupId: number) {
  return useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => groupsService.findById(groupId),
  });
}

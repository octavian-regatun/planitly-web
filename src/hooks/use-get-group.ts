import { Group, groupsService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useGetGroup(groupId: number) {
  return useQuery<
    AxiosResponse<Group, any>,
    AxiosError<{ message: string; statusCode: number }>
  >({
    queryKey: ["groups", groupId],
    queryFn: () => groupsService.findById(groupId),
    retry: false,
  });
}

import { usersService } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useGetGroupMembers(userIds: number[]) {
  return useQuery({
    queryKey: ["users", userIds],
    queryFn: () => usersService.findByIds(userIds),
  });
}

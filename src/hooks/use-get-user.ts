import { usersService } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useGetUser(userId: number) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => usersService.findById(userId),
  });
}

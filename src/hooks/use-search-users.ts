import { usersService } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

export function useSearchUsers(query: string) {
  return useQuery({
    queryKey: ["users", { search: query }],
    queryFn: () => usersService.search(query),
  });
}

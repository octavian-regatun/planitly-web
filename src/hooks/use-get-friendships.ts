import { friendshipsService } from "@/services/friendships";
import { useQuery } from "@tanstack/react-query";

export function useGetFriendships() {
  return useQuery({
    queryKey: ["friendships"],
    queryFn: () => friendshipsService.find(),
  });
}

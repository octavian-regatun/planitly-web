import { friendshipsService } from "@/services/friendships";
import { useQuery } from "@tanstack/react-query";

export function useGetFriendship(userId: number) {
  return useQuery({
    queryKey: ["friendships", { users: { id: userId } }],
    queryFn: () => friendshipsService.findByUserId(userId),
  });
}

import { FriendshipStatus, friendshipsService } from "@/services/friendships";
import { useQuery } from "@tanstack/react-query";

type Options = Parameters<typeof friendshipsService.find>[0];

export function useGetFriendships(options?: Options) {
  return useQuery({
    queryKey: ["friendships", { ...options }],
    queryFn: () => friendshipsService.find(options),
  });
}

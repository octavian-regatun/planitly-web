import { usersService } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "./shadcn/Button";
import { friendshipsService } from "@/services/friendships";
import { toast } from "./shadcn/use-toast";
import { AxiosError } from "axios";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  id: number;
}

export function PublicUserProfile({ id }: Props) {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => usersService.findById(id),
  });

  const friendshipQuery = useQuery({
    queryKey: ["friendships", { users: { id: userQuery.data?.id } }],
    queryFn: () => friendshipsService.findByUserId(userQuery.data!.id),
    enabled: !!userQuery.data,
  });

  const acceptFriendshipMutation = useMutation({
    mutationFn: friendshipsService.accept,
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast({
        title: `Error`,
        description: error.response?.data.message,
        className: "bg-red-600 text-white",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast({
        title: `Friendship Accepted`,
        description: `You accepted ${userQuery.data?.firstName} ${userQuery.data?.lastName}'s friendship request.`,
      });
    },
  });

  const deleteFriendshipMutation = useMutation({
    mutationFn: friendshipsService.delete,
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast({
        title: `Error`,
        description: error.response?.data.message,
        className: "bg-red-600 text-white",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast({
        title: `Friendship Removed`,
        description: `You removed ${userQuery.data?.firstName} ${userQuery.data?.lastName} from your friends / sent friend requests.`,
      });
    },
  });

  const createFriendshipMutation = useMutation({
    mutationFn: friendshipsService.create,
    onError(error: AxiosError<{ message: string; statusCode: number }>) {
      toast({
        title: `Error`,
        description: error.response?.data.message,
        className: "bg-red-600 text-white",
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friendships"],
      });

      toast({
        title: `Friendship Request Sent`,
        description: `You sent a friendship request to ${userQuery.data?.firstName} ${userQuery.data?.lastName}.`,
      });
    },
  });

  const friendship = friendshipQuery.data?.data;

  if (userQuery.isPending) return <div>Loading...</div>;
  if (userQuery.isError) return <div>{userQuery.error.message}</div>;

  return (
    <div className="flex flex-col items-center pt-4">
      <Image
        src={userQuery.data.picture}
        alt="profile"
        width={128}
        height={128}
        className="rounded-full border"
      />
      <p className="text-xl mt-4">
        {userQuery.data.firstName} {userQuery.data.lastName}
      </p>
      <p className="text-neutral-500">@{userQuery.data.username}</p>
      <div className="mt-8">
        {friendshipQuery.data && friendship?.status === "ACCEPTED" && (
          <Button
            variant="destructive"
            onClick={() =>
              deleteFriendshipMutation.mutate(friendshipQuery.data.data.id)
            }
          >
            Remove Friend
          </Button>
        )}
        {friendshipQuery.data &&
          friendship?.status === "PENDING" &&
          friendship.recipientId === id && (
            <Button
              variant="destructive"
              onClick={() =>
                deleteFriendshipMutation.mutate(friendshipQuery.data.data.id)
              }
            >
              Remove Friend Request
            </Button>
          )}
        {friendshipQuery.data &&
          friendship?.status === "PENDING" &&
          friendship.requesterId === id && (
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  acceptFriendshipMutation.mutate(friendshipQuery.data.data.id)
                }
              >
                Accept <CheckIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() =>
                  deleteFriendshipMutation.mutate(friendshipQuery.data.data.id)
                }
              >
                Decline <XMarkIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        {!friendshipQuery.data?.data && (
          <Button
            onClick={() => {
              createFriendshipMutation.mutate(id);
            }}
          >
            Add Friend
          </Button>
        )}
      </div>
    </div>
  );
}

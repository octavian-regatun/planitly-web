import { friendshipsService } from "@/services/friendships";
import { PublicUser, User } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useMemo } from "react";
import { Button } from "./shadcn/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/Card";
import { useToast } from "./shadcn/use-toast";
import { useStore } from "@/store/store";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  user: PublicUser;
}

export function UserCard({ user }: Props) {
  const me = useStore(state => state.me) as User;
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const friendshipQuery = useQuery({
    queryKey: ["friendships", { users: { id: user.id } }],
    queryFn: () => friendshipsService.findByUserId(user.id),
  });

  const createFriendshipMutation = useMutation({
    mutationFn: () => friendshipsService.create(user.id),
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
        description: `You sent a friendship request to ${user.firstName} ${user.lastName}.`,
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
        description: `You removed ${user.firstName} ${user.lastName} from your friends / sent friend requests.`,
      });
    },
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
        description: `You accepted ${user.firstName} ${user.lastName}'s friendship request.`,
      });
    },
  });

  const friendshipsStatusMessage: () =>
    | "Friends"
    | "Pending"
    | "Not Friends" = () => {
    switch (friendshipQuery.data?.status) {
      case 204:
        return "Not Friends";
      case 200:
        if (friendshipQuery.data.data.status === "ACCEPTED") return "Friends";
        return "Pending";
      default:
        return "Not Friends";
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image
            src={user.picture}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>
            {user.firstName} {user.lastName}
          </span>
        </CardTitle>
        <CardDescription>@{user.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <i>{friendshipsStatusMessage()}</i>
      </CardContent>
      <CardFooter>
        {friendshipsStatusMessage() === "Not Friends" &&
          friendshipQuery.status !== "pending" && (
            <Button onClick={() => createFriendshipMutation.mutate()}>
              Add Friend
            </Button>
          )}
        {friendshipsStatusMessage() === "Pending" &&
          friendshipQuery.status !== "pending" &&
          friendshipQuery.data &&
          friendshipQuery.data.data.requesterId === me.id && (
            <Button
              variant="destructive"
              onClick={() =>
                deleteFriendshipMutation.mutate(friendshipQuery.data.data.id)
              }
            >
              Cancel Request
            </Button>
          )}
        {friendshipsStatusMessage() === "Pending" &&
          friendshipQuery.status !== "pending" &&
          friendshipQuery.data &&
          friendshipQuery.data.data.recipientId === me.id && (
            <div className="flex gap-2 items-center">
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
        {friendshipsStatusMessage() === "Friends" &&
          friendshipQuery.status !== "pending" &&
          friendshipQuery.data && (
            <Button
              variant="destructive"
              onClick={() =>
                deleteFriendshipMutation.mutate(friendshipQuery.data.data.id)
              }
            >
              Remove Friend
            </Button>
          )}
        <Button asChild className="ml-2">
          <Link href={`/users/${user.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

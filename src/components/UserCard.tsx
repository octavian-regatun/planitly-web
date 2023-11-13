import { friendshipsService } from "@/services/friendships";
import { PublicUser, User } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useMemo } from "react";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { useToast } from "./shadcn/use-toast";
import { useStore } from "@/store/store";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDeleteFriendship } from "@/hooks/use-delete-friendship";
import { useAcceptFriendship } from "@/hooks/use-accept-friendship";
import { useCreateFriendship } from "@/hooks/use-create-friendship";
import { useGetFriendship } from "@/hooks/use-get-friendship";

interface Props {
  user: PublicUser;
}

export function UserCard({ user }: Props) {
  const me = useStore(state => state.me) as User;

  const getFriendship = useGetFriendship(user.id);
  const createFriendship = useCreateFriendship();
  const deleteFriendship = useDeleteFriendship();
  const acceptFriendship = useAcceptFriendship();

  const friendshipsStatusMessage: () =>
    | "Friends"
    | "Pending"
    | "Not Friends" = () => {
    switch (getFriendship.data?.status) {
      case 204:
        return "Not Friends";
      case 200:
        if (getFriendship.data.data.status === "ACCEPTED") return "Friends";
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
          getFriendship.status !== "pending" && (
            <Button onClick={() => createFriendship.mutate(user.id)}>
              Add Friend
            </Button>
          )}
        {friendshipsStatusMessage() === "Pending" &&
          getFriendship.status !== "pending" &&
          getFriendship.data &&
          getFriendship.data.data.requesterId === me.id && (
            <Button
              variant="destructive"
              onClick={() =>
                deleteFriendship.mutate(getFriendship.data.data.id)
              }
            >
              Cancel Request
            </Button>
          )}
        {friendshipsStatusMessage() === "Pending" &&
          getFriendship.status !== "pending" &&
          getFriendship.data &&
          getFriendship.data.data.recipientId === me.id && (
            <div className="flex gap-2 items-center">
              <Button
                onClick={() =>
                  acceptFriendship.mutate(getFriendship.data.data.id)
                }
              >
                Accept <CheckIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() =>
                  deleteFriendship.mutate(getFriendship.data.data.id)
                }
              >
                Decline <XMarkIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        {friendshipsStatusMessage() === "Friends" &&
          getFriendship.status !== "pending" &&
          getFriendship.data && (
            <Button
              variant="destructive"
              onClick={() =>
                deleteFriendship.mutate(getFriendship.data.data.id)
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

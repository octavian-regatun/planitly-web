import { usersService } from "@/services/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "./shadcn/Button";
import { friendshipsService } from "@/services/friendships";
import { toast } from "./shadcn/use-toast";
import { AxiosError } from "axios";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCreateFriendship } from "@/hooks/use-create-friendship";
import { useAcceptFriendship } from "@/hooks/use-accept-friendship";
import { useDeleteFriendship } from "@/hooks/use-delete-friendship";
import { useGetFriendship } from "@/hooks/use-get-friendship";
import { useGetUser } from "@/hooks/use-get-user";

interface Props {
  id: number;
}

export function PublicUserProfile({ id }: Props) {
  const userQuery = useGetUser(id);

  const getFriendship = useGetFriendship(userQuery.data?.id);
  const acceptFriendship = useAcceptFriendship();
  const deleteFriendship = useDeleteFriendship();
  const createFriendship = useCreateFriendship();

  const friendship = getFriendship.data?.data;

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
        {getFriendship.data && friendship?.status === "ACCEPTED" && (
          <Button
            variant="destructive"
            onClick={() => deleteFriendship.mutate(getFriendship.data.data.id)}
          >
            Remove Friend
          </Button>
        )}
        {getFriendship.data &&
          friendship?.status === "PENDING" &&
          friendship.recipientId === id && (
            <Button
              variant="destructive"
              onClick={() =>
                deleteFriendship.mutate(getFriendship.data.data.id)
              }
            >
              Remove Friend Request
            </Button>
          )}
        {getFriendship.data &&
          friendship?.status === "PENDING" &&
          friendship.requesterId === id && (
            <div className="flex gap-2">
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
        {!getFriendship.data?.data && (
          <Button
            onClick={() => {
              createFriendship.mutate(id);
            }}
          >
            Add Friend
          </Button>
        )}
      </div>
    </div>
  );
}

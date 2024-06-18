"use client";
import { PlusCircleIcon, TrashIcon } from "lucide-react";
import { FC, HTMLAttributes } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FriendshipStatus } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  userId: string;
};

const UserProfile: FC<Props> = ({ userId }) => {
  const session = useSession();
  const { data } = api.users.getById.useQuery({ id: userId });
  const { data: friendship } = api.friendships.get.useQuery(
    {
      userId1: userId,
      userId2: session.data?.user?.id || "",
    },
    { enabled: !!session.data?.user },
  );
  const { mutate: addFriend } = api.friendships.create.useMutation({
    onSuccess: () => {
      toast.success("Friend request sent!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const addFriendOnClick = () => {
    addFriend({ userId: userId });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-center">{data?.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {data?.image && (
          <Image
            height={128}
            width={128}
            src={data.image}
            alt="profile"
            className="rounded-full"
          />
        )}
        <p>{friendship ? "Friends" : "Not Friends"}</p>
        <div className="flex gap-2">
          {!friendship && (
            <Button onClick={addFriendOnClick}>
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Friend
            </Button>
          )}
          {friendship?.status === FriendshipStatus.ACCEPTED && (
            <Button variant="destructive">
              <TrashIcon className="mr-2 h-4 w-4" /> Delete{" "}
              {friendship.status === FriendshipStatus.ACCEPTED ? "Friend" : "Request"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;

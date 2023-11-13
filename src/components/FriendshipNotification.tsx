import { useGetUser } from "@/hooks/use-get-user";
import { UserPicture } from "./UserPicture";
import { Button } from "./shadcn/button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAcceptFriendship } from "@/hooks/use-accept-friendship";
import { useDeleteFriendship } from "@/hooks/use-delete-friendship";
import { Friendship } from "@/services/friendships";

type Props = {
  friendship: Friendship;
};

export function FriendshipNotification({ friendship }: Props) {
  const getUser = useGetUser(friendship.requesterId);
  const acceptFriendship = useAcceptFriendship();
  const deleteFriendship = useDeleteFriendship();

  const onAccept = () => acceptFriendship.mutate(friendship.id);
  const onDelete = () => deleteFriendship.mutate(friendship.id);

  if (getUser.isError) return <div>Error: {getUser.error.message}</div>;
  if (getUser.isPending) return <div>Loading...</div>;

  const user = getUser.data;

  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-2">
        <UserPicture userId={friendship.requesterId} size={24} />
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="default" className="h-6 w-6 p-0" onClick={onAccept}>
          <CheckIcon className="h-4 w-4" />
        </Button>
        <Button variant="secondary" className="h-6 w-6 p-0" onClick={onDelete}>
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

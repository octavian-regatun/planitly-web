import { Friendship, User } from "@prisma/client";
import AddFriendButton from "./AddFriendButton";
import DeleteFriendButton from "./DeleteFriendButton";
import AcceptFriendButton from "./AcceptFriendButton";

interface Props {
  user: User;
  friendship?: Friendship;
  className?: string;
  addFriendButton?: boolean;
  deleteFriendButton?: boolean;
  acceptFriendButton?: boolean;
  pending?: boolean;
}

export default function ActionButtons({
  user,
  friendship,
  addFriendButton,
  deleteFriendButton,
  acceptFriendButton,
  pending,
}: Props) {
  return (
    <div className="ml-auto flex gap-2">
      {addFriendButton && <AddFriendButton user={user} />}
      {pending && <p className="rounded bg-neutral-200 p-2 text-xs">PENDING</p>}
      {friendship && deleteFriendButton && (
        <DeleteFriendButton friendship={friendship} />
      )}
      {friendship && acceptFriendButton && (
        <AcceptFriendButton friendship={friendship} />
      )}
    </div>
  );
}

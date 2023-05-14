import { Friendship, User } from "@prisma/client";
import ProfilePicture from "../ProfilePicture";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import AddFriendButton from "./AddFriendButton";
import DeleteFriendButton from "./DeleteFriendButton";
import ActionButtons from "./ActionButtons";
import { getUserById } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

interface Props {
  pictureSize?: number;
  displayUsername?: boolean;
  user: User;
  friendship?: Friendship;
  className?: string;
  addFriendButton?: boolean;
  deleteFriendButton?: boolean;
  acceptFriendButton?: boolean;
  pending?: boolean;
}

export default function UserCard({
  user,
  pictureSize = 48,
  displayUsername = true,
  className,
  addFriendButton,
  deleteFriendButton,
  acceptFriendButton,
  pending,
  friendship,
}: Props) {
  return (
    <div
      className={twMerge(cx("flex items-center gap-2 px-4 py-2 rounded", className))}
    >
      <ProfilePicture user={user} height={pictureSize} width={pictureSize} />
      <div>
        <p>
          {user?.firstName} {user?.lastName}
        </p>
        {displayUsername && (
          <p className="text-sm text-neutral-500">@{user?.username}</p>
        )}
      </div>
      {user && (addFriendButton || pending || deleteFriendButton) && (
        <ActionButtons
          addFriendButton={addFriendButton}
          deleteFriendButton={deleteFriendButton}
          acceptFriendButton={acceptFriendButton}
          pending={pending}
          user={user}
          friendship={friendship}
        />
      )}
    </div>
  );
}

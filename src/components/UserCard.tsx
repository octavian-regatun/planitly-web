import { User } from "@prisma/client"
import Link from "next/link"
import ProfilePicture from "./ProfilePicture"

type Props = {
  actionButton?: JSX.Element
  user: User
}

export default function UserCard({ user, actionButton }: Props) {
  return (
    <Link
      href={`/users/${user.username}`}
      className="flex items-center gap-2 p-2"
    >
      <ProfilePicture size={32} user={user} />
      <div className="flex flex-col">
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-600">{user.username}</p>
      </div>
      {actionButton}
    </Link>
  )
}

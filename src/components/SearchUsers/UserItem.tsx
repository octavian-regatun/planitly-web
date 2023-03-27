import type { User } from "@prisma/client"
import ProfilePicture from "../ProfilePicture"

export const UserItem: React.FC<{
  user: User
  onClick: (user: User) => void
}> = ({ user, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 p-2"
      type="button"
      onClick={() => onClick(user)}
    >
      <ProfilePicture size={32} user={user} />
      <h1 key={`friends-list-friend-${user.id}`} className="text-sm font-bold">
        {user.firstName} {user.lastName}
      </h1>
    </button>
  )
}

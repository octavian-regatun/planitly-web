import type { User } from "@prisma/client"
import ProfilePicture from "../../ProfilePicture"

export const UsersList: React.FC<{
  users: (User & {
    loading: boolean
  })[]
  onUserClick?: (e: React.MouseEvent<HTMLButtonElement>, user: User) => void
}> = ({ users, onUserClick }) => {
  return (
    <div className="flex flex-wrap">
      {users.map((user) => (
        <button
          onClick={(e) => onUserClick?.(e, user)}
          type="button"
          key={`members-profile-picture-${user.id}`}
        >
          <ProfilePicture src={user.image} size={36} loading={user.loading} />
        </button>
      ))}
    </div>
  )
}

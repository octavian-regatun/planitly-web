import type { User } from "@prisma/client"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import ProfilePicture from "../ProfilePicture"
import { SearchUsersModal } from "../Groups/SearchUsersModal"

export const UsersListWithSearch: React.FC<{
  users: (User & {
    loading: boolean
  })[]
  onUserClick: (user: User & { loading: boolean }) => void
  onSearchUserClick: (user: User) => void
}> = ({ users, onUserClick, onSearchUserClick }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-wrap">
      {users.map((user) => (
        <button
          onClick={() => {
            onUserClick(user)
          }}
          type="button"
          key={`members-profile-picture-${user.id}`}
        >
          <ProfilePicture
            firstName={user.firstName}
            lastName={user.lastName}
            size={36}
            loading={user.loading}
          />
        </button>
      ))}
      <button type="button" onClick={() => setIsOpen(true)}>
        <PlusIcon className="box-content h-7 w-7 rounded-full bg-gray-200 p-1" />
      </button>
      <SearchUsersModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={(user) => onSearchUserClick(user)}
        excludeUsersFromSearch={users}
      />
    </div>
  )
}

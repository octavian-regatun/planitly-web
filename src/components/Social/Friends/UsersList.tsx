import ProfilePicture from "../../ProfilePicture"
import type { User } from "@prisma/client"
import { UserPlusIcon } from "@heroicons/react/24/outline"
import { api } from "../../../utils/api"

export const UsersList: React.FC<{ users: User[] }> = ({ users }) => {
  const addFriendMutation = api.friendships.addFriend.useMutation()

  function addFriend(id: string) {
    addFriendMutation.mutate({ recipientId: id })
  }

  return (
    <div className="flex w-[calc(100%-42px)] flex-col rounded-b-3xl border border-t-0 border-black">
      {users.map((user) => (
        <div
          key={`friends-list-friend-${user.id}`}
          className="flex items-center gap-2 p-2"
        >
          <ProfilePicture size={32} />
          <h1
            key={`friends-list-friend-${user.id}`}
            className="text-sm font-bold"
          >
            {user.firstName} {user.lastName}
          </h1>
          <button className="ml-auto" onClick={() => addFriend(user.id)}>
            <UserPlusIcon className="h-6 w-6" />
          </button>
        </div>
      ))}
    </div>
  )
}

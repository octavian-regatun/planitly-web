import { ArrowPathIcon } from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import { useState } from "react"
import { api } from "../../utils/api"
import { UserItem } from "./UserItem"

export const SearchUsers: React.FC<{
  onClick: (user: User) => void
  friendsOnly?: boolean
  excludeUsersFromSearch: (User & { loading: boolean })[]
}> = ({ onClick, friendsOnly, excludeUsersFromSearch }) => {
  const [users, setUsers] = useState<User[]>([])
  const [friendsQuery, setFriendsQuery] = useState("")

  const searchUsersQuery = api.users.search.useQuery(
    { query: friendsQuery },
    {
      onSuccess: () => {
        // FIXME: This might be a bug (data is unused)
        if (!friendsOnly) setUsers(users)
      },
    }
  )

  api.users.searchFriends.useQuery(
    {
      query: friendsQuery,
    },
    {
      onSuccess: data => {
        if (friendsOnly) setUsers(data)
      },
    }
  )

  const filteredData = users.filter(
    user => !excludeUsersFromSearch.some(u => u.id === user.id)
  )

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        <input
          placeholder="Search friend..."
          className="w-full rounded-full border border-black px-4 py-2 outline-black"
          value={friendsQuery}
          onChange={e => setFriendsQuery(e.target.value)}
        />
        {searchUsersQuery.isFetching && (
          <ArrowPathIcon className="absolute top-[calc(50%-8px)] right-8 h-4 w-4 animate-spin" />
        )}
      </div>
      {filteredData && (
        <div className="flex w-[calc(100%-42px)] flex-col rounded-b-3xl border border-t-0 border-black">
          {filteredData.map(user => (
            <UserItem
              key={`friends-list-friend-${user.id}`}
              user={user}
              onClick={() => onClick(user)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

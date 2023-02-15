import { UsersList } from "./UsersList"
import { useState } from "react"
import { api } from "../../../utils/api"
import type { User } from "@prisma/client"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

export const SearchTab: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [friendsQuery, setFriendsQuery] = useState("")
  const usersQuery = api.users.search.useQuery(
    { query: friendsQuery },
    {
      onSuccess: (data) => setUsers(data),
    }
  )

  return (
    <>
      <div className="relative w-full">
        <input
          placeholder="Search friend..."
          className="w-full rounded-full border border-black px-4 py-2 outline-black"
          value={friendsQuery}
          onChange={(e) => setFriendsQuery(e.target.value)}
        />
        {usersQuery.isFetching && (
          <ArrowPathIcon className="absolute top-[calc(50%-8px)] right-8 h-4 w-4 animate-spin" />
        )}
      </div>
      {users && <UsersList users={users} />}
    </>
  )
}

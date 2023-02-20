import { ArrowPathIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import { useState } from "react"
import toast from "react-hot-toast"
import { api } from "../../../utils/api"
import ProfilePicture from "../../ProfilePicture"

export const SearchTab: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [friendsQuery, setFriendsQuery] = useState("")

  const incomingFriendshipsQuery = api.friendships.getAll.useQuery({
    type: "INCOMING",
    status: "PENDING",
  })

  const outgoingFriendshipsQuery = api.friendships.getAll.useQuery({
    type: "OUTGOING",
    status: "PENDING",
  })

  const getFriendsQuery = api.friendships.getAll.useQuery({
    type: null,
    status: "ACCEPTED",
  })

  const usersQuery = api.users.search.useQuery(
    { query: friendsQuery },
    {
      onSuccess: (data) => setUsers(data),
    }
  )

  const addFriendMutation = api.friendships.addFriend.useMutation({
    onSuccess() {
      void outgoingFriendshipsQuery.refetch()
      toast.success("Friend request sent!", {
        id: "friend-request-sent",
      })
    },
  })

  function addFriend(id: string) {
    addFriendMutation.mutate({ recipientId: id })
  }

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
      {users && (
        <div className="flex w-[calc(100%-42px)] flex-col rounded-b-3xl border border-t-0 border-black">
          {users.map((user) => {
            // if we are already friends display nothing
            if (
              getFriendsQuery.data &&
              getFriendsQuery.data.some(
                (friendship) =>
                  friendship.requester.id === user.id ||
                  friendship.recipient.id === user.id
              )
            )
              return null

            // if we have a pending request from the user display pending
            if (
              (incomingFriendshipsQuery.data &&
                incomingFriendshipsQuery.data.some(
                  (friendship) => friendship.requester.id === user.id
                )) ||
              (outgoingFriendshipsQuery.data &&
                outgoingFriendshipsQuery.data.some(
                  (friendship) => friendship.recipient.id === user.id
                ))
            )
              return (
                <div
                  key={`friends-list-friend-${user.id}`}
                  className="flex items-center gap-2 p-2"
                >
                  <ProfilePicture size={32} src={user.image} />
                  <h1
                    key={`friends-list-friend-${user.id}`}
                    className="text-sm font-bold"
                  >
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="ml-auto rounded-full bg-gray-200 p-2 text-xs">
                    PENDING
                  </p>
                </div>
              )

            // else display user with the add button
            return (
              <div
                key={`friends-list-friend-${user.id}`}
                className="flex items-center gap-2 p-2"
              >
                <ProfilePicture size={32} src={user.image} />
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
            )
          })}
        </div>
      )}
    </>
  )
}

import {
  ArrowPathIcon,
  CheckIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import Layout from "../../components/Layout/Layout"
import ProfilePicture from "../../components/ProfilePicture"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"
import UserCard from "../../components/UserCard"

type Tabs = "friends" | "requests" | "search"

const FriendsPage: React.FC = () => {
  const [tab, setTab] = useState<Tabs>("friends")

  function getActiveStyles(currentTab: Tabs) {
    if (tab === currentTab) return "bg-black text-white"
    return ""
  }

  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Link
              href="/friends"
              className="rounded-full border bg-teal-600 px-8 py-2 text-lg text-white transition-all"
            >
              FRIENDS
            </Link>
            <Link
              href="/groups"
              className="rounded-full border border-teal-600 px-8 py-2 text-lg text-teal-600 transition-all"
            >
              GROUPS
            </Link>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            {/* tabs buttons */}
            <div className="flex w-[calc(100%-42px)] rounded-t-3xl border border-b-0 border-black">
              <button
                className={`flex-1 rounded-tl-3xl border-r border-black px-4 py-2 transition-all ${getActiveStyles(
                  "friends"
                )}`}
                onClick={() => setTab("friends")}
              >
                Friends
              </button>
              <button
                className={`flex-1 border-r border-black px-4 py-2 transition-all ${getActiveStyles(
                  "requests"
                )}`}
                onClick={() => setTab("requests")}
              >
                Requests
              </button>
              <button
                className={`flex-1 rounded-tr-3xl py-2 px-4 transition-all ${getActiveStyles(
                  "search"
                )}`}
                onClick={() => setTab("search")}
              >
                Search
              </button>
            </div>
            {/* tabs content */}
            {tab === "friends" && <FriendsTab />}
            {tab === "requests" && <RequestsTab />}
            {tab === "search" && <SearchTab />}
          </div>
        </div>
      </Layout>
    </RequireAuth>
  )
}

const FriendsTab: React.FC = () => {
  const session = useSession()

  const friendshipsQuery = api.friendships.getAll.useQuery({
    status: "ACCEPTED",
    type: null,
  })

  const deleteFriendshipMutation = api.friendships.deleteFriendship.useMutation(
    {
      onSuccess() {
        void friendshipsQuery.refetch()
        toast.success("Friendship deleted!", {
          id: "friendship-deleted",
        })
      },
    }
  )

  if (!friendshipsQuery.data || friendshipsQuery.data?.length === 0) return null

  return (
    <div className="w-[calc(100%-42px)] rounded-b-3xl border border-black p-2">
      {friendshipsQuery.data?.map(friendship => {
        const friend =
          friendship.requester.id === session.data?.user.id
            ? friendship.recipient
            : friendship.requester
        return (
          <UserCard
            user={friend}
            key={friend.id}
            actionButton={
              <button
                className="ml-auto"
                onClick={() => {
                  deleteFriendshipMutation.mutate({
                    friendshipId: friendship.id,
                  })
                }}
              >
                <XMarkIcon className="box-content h-6 w-6 rounded-full bg-gray-200 p-1 text-red-500" />
              </button>
            }
          />
        )
      })}
    </div>
  )
}

export const RequestsTab: React.FC = () => {
  const incomingFriendshipsQuery = api.friendships.getAll.useQuery({
    type: "INCOMING",
    status: "PENDING",
  })

  const outgoingFriendshipsQuery = api.friendships.getAll.useQuery({
    type: "OUTGOING",
    status: "PENDING",
  })

  const acceptFriendMutation = api.friendships.acceptFriend.useMutation({
    onSuccess() {
      void incomingFriendshipsQuery.refetch()
      toast.success("Friend request accepted!", {
        id: "friend-request-accepted",
      })
    },
  })

  const deleteFriendshipMutation = api.friendships.deleteFriendship.useMutation(
    {
      onSuccess() {
        void incomingFriendshipsQuery.refetch()
        void outgoingFriendshipsQuery.refetch()
        toast.success("Friend request deleted!", {
          id: "friend-request-deleted",
        })
      },
    }
  )

  if (
    (!incomingFriendshipsQuery.data ||
      incomingFriendshipsQuery.data.length === 0) &&
    (!outgoingFriendshipsQuery.data ||
      outgoingFriendshipsQuery.data.length === 0)
  )
    return null

  return (
    <div className="w-[calc(100%-42px)] rounded-b-3xl border border-black p-2">
      {incomingFriendshipsQuery.data &&
        incomingFriendshipsQuery.data.length > 0 && (
          <p className="text-center font-bold">Incoming</p>
        )}
      {incomingFriendshipsQuery.data?.map(friendship => (
        <UserCard
          user={friendship.requester}
          key={friendship.id}
          actionButton={
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => {
                  acceptFriendMutation.mutate({
                    requesterId: friendship.requesterId,
                  })
                }}
              >
                <CheckIcon className="box-content h-6 w-6 rounded-full bg-gray-200 p-1 text-green-500" />
              </button>
              <button>
                <XMarkIcon className="box-content h-6 w-6 rounded-full bg-gray-200 p-1 text-red-500" />
              </button>
            </div>
          }
        />
      ))}
      {outgoingFriendshipsQuery.data &&
        outgoingFriendshipsQuery.data?.length > 0 && (
          <p className="text-center font-bold">Outgoing</p>
        )}
      {outgoingFriendshipsQuery.data?.map(friendship => (
        <div
          key={`friendship-${friendship.id}`}
          className="flex items-center gap-2 p-2"
        >
          <ProfilePicture size={32} user={friendship.recipient} />
          <p className="text-sm">
            {friendship.recipient.firstName} {friendship.recipient.lastName}
          </p>
          <p className="ml-auto rounded-full bg-gray-200 p-2 text-xs">
            PENDING
          </p>
          <button
            onClick={() =>
              deleteFriendshipMutation.mutate({
                friendshipId: friendship.id,
              })
            }
          >
            <XMarkIcon className="box-content h-6 w-6 rounded-full bg-gray-200 p-1 text-red-600" />
          </button>
        </div>
      ))}
    </div>
  )
}

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
      onSuccess: data => setUsers(data),
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
          onChange={e => setFriendsQuery(e.target.value)}
        />
        {usersQuery.isFetching && (
          <ArrowPathIcon className="absolute top-[calc(50%-8px)] right-8 h-4 w-4 animate-spin" />
        )}
      </div>
      {users && (
        <div className="flex w-[calc(100%-42px)] flex-col rounded-b-3xl border border-t-0 border-black">
          {users.map(user => {
            // if we are already friends display nothing
            if (
              getFriendsQuery.data &&
              getFriendsQuery.data.some(
                friendship =>
                  friendship.requester.id === user.id ||
                  friendship.recipient.id === user.id
              )
            )
              return null

            // if we have a pending request from the user display pending
            if (
              (incomingFriendshipsQuery.data &&
                incomingFriendshipsQuery.data.some(
                  friendship => friendship.requester.id === user.id
                )) ||
              (outgoingFriendshipsQuery.data &&
                outgoingFriendshipsQuery.data.some(
                  friendship => friendship.recipient.id === user.id
                ))
            )
              return (
                <div
                  key={`friends-list-friend-${user.id}`}
                  className="flex items-center gap-2 p-2"
                >
                  <ProfilePicture size={32} user={user} />
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
              <UserCard
                key={`friends-list-friend-${user.id}`}
                user={user}
                actionButton={
                  <button
                    className="ml-auto"
                    onClick={() => addFriend(user.id)}
                  >
                    <UserPlusIcon className="h-6 w-6" />
                  </button>
                }
              />
            )
          })}
        </div>
      )}
    </>
  )
}

export default FriendsPage

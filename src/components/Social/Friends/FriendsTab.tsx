import { api } from "../../../utils/api"
import { XMarkIcon } from "@heroicons/react/24/outline"
import ProfilePicture from "../../ProfilePicture"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

export const FriendsTab: React.FC = () => {
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
      {friendshipsQuery.data?.map((friendship) => {
        const friend =
          friendship.requester.id === session.data?.user.id
            ? friendship.recipient
            : friendship.requester
        return (
          <div
            key={`friendship-${friendship.id}`}
            className="flex items-center gap-2 p-2"
          >
            <ProfilePicture size={32} src={friend.image} />
            <p>
              {friend.firstName} {friend.lastName}
            </p>
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
          </div>
        )
      })}
    </div>
  )
}

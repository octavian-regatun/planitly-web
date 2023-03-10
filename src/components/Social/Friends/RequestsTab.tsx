import { api } from "../../../utils/api"
import ProfilePicture from "../../ProfilePicture"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { toast } from "react-hot-toast"

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

        console.log("deleted")
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
      {incomingFriendshipsQuery.data?.map((friendship) => (
        <div
          key={`friendship-${friendship.id}`}
          className="flex items-center gap-2 p-2"
        >
          <ProfilePicture size={32} src={friendship.requester.image} />
          <p>
            {friendship.requester.firstName} {friendship.requester.lastName}
          </p>
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
        </div>
      ))}
      {outgoingFriendshipsQuery.data &&
        outgoingFriendshipsQuery.data?.length > 0 && (
          <p className="text-center font-bold">Outgoing</p>
        )}
      {outgoingFriendshipsQuery.data?.map((friendship) => (
        <div
          key={`friendship-${friendship.id}`}
          className="flex items-center gap-2 p-2"
        >
          <ProfilePicture size={32} src={friendship.recipient.image} />
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

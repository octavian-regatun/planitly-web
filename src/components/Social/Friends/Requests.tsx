import { api } from "../../../utils/api"
import ProfilePicture from "../../ProfilePicture"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"

export const Requests: React.FC = () => {
  const incomingFriendshipsQuery = api.friendships.getFriendships.useQuery({
    type: "INCOMING",
    status: "PENDING",
  })

  const outgoingFriendshipsQuery = api.friendships.getFriendships.useQuery({
    type: "OUTGOING",
    status: "PENDING",
  })

  return (
    <div className="w-[calc(100%-42px)] border border-black p-2">
      {incomingFriendshipsQuery.data &&
        incomingFriendshipsQuery.data.length > 0 && (
          <p className="text-center font-bold">Incoming</p>
        )}
      {incomingFriendshipsQuery.data?.map((friendship) => (
        <div
          key={`friendship-${friendship.id}`}
          className="flex items-center gap-2 p-2"
        >
          <ProfilePicture size={32} />
          <p>
            {friendship.requester.firstName} {friendship.requester.lastName}
          </p>
          <button>
            <CheckIcon />
          </button>
          <button>
            <XMarkIcon />
          </button>
        </div>
      ))}
      {<p className="text-center font-bold">Outgoing</p>}
      {outgoingFriendshipsQuery.data?.map((friendship) => (
        <div
          key={`friendship-${friendship.id}`}
          className="flex items-center gap-2 p-2"
        >
          <ProfilePicture size={32} />
          <p className="text-sm">
            {friendship.requester.firstName} {friendship.requester.lastName}
          </p>
          <p className="ml-auto rounded-full bg-gray-200 p-2 text-xs">
            PENDING
          </p>
          <button>
            <XMarkIcon className="box-content h-6 w-6 rounded-full bg-black p-1 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  )
}

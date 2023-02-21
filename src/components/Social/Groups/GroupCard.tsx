import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import type { Group, GroupMember, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { api } from "../../../utils/api"
import { mainGradient } from "../../../utils/gradient"
import { MembersListWithSearch } from "./MembersListWithSearch"

export const GroupCard: React.FC<{
  group: Group & {
    GroupMember: (GroupMember & {
      user: User
    })[]
  }
}> = ({ group }) => {
  const myUser = useSession()
  const apiContext = api.useContext()

  const members = group.GroupMember.map((member) => member.user)

  const myGroupMember = group.GroupMember.find(
    (member) => member.userId === myUser?.data?.user.id
  )

  const acceptGroupInvitationMutation =
    api.groups.acceptGroupInvitation.useMutation({
      onSuccess() {
        void apiContext.groups.getGroups.invalidate()
      },
    })

  const deleteGroupInvitationMutation =
    api.groups.deleteGroupInvitation.useMutation({
      onSuccess() {
        void apiContext.groups.getGroups.invalidate()
      },
    })

  return (
    <Link
      href={`/groups/${group.id}`}
      className={
        "flex w-full flex-col gap-2 rounded-3xl p-4 text-white transition-all hover:opacity-90 " +
        mainGradient
      }
    >
      {myGroupMember?.status === "PENDING" && (
        <div className="flex w-full items-center gap-2 self-center rounded-full bg-gray-200 px-4 py-2">
          <p className="text-sm text-black">PENDING INVITATION</p>
          <button
            className="ml-auto rounded-full bg-gray-300"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              acceptGroupInvitationMutation.mutate({ id: group.id })
              e.stopPropagation()
            }}
          >
            <CheckIcon className="box-content h-6 w-6 rounded-full p-1 text-green-500" />
          </button>
          <button
            className="rounded-full bg-gray-300"
            onClick={() =>
              deleteGroupInvitationMutation.mutate({ id: group.id })
            }
          >
            <XMarkIcon className="box-content h-6 w-6 rounded-full p-1 text-red-500" />
          </button>
        </div>
      )}
      <p className="text-xl">{group.name}</p>
      <MembersListWithSearch members={members} />
    </Link>
  )
}

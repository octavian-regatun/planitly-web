import { mainGradient } from "../../../utils/gradient"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { GroupsRouter } from "../../../server/api/routers/groups"
import type { inferRouterOutputs } from "@trpc/server"
import { api } from "../../../utils/api"
import { UsersList } from "./UsersList"

export const Group: React.FC<{
  group: NonNullable<inferRouterOutputs<GroupsRouter>["getGroup"]>
  toggleEditingState: () => void
}> = ({ group, toggleEditingState }) => {
  const members = group.GroupMember.map((member) => {
    let loading = false
    if (member.status === "PENDING") loading = true
    return { ...member.user, loading }
  })

  const isGroupAdminQuery = api.groups.isGroupAdmin.useQuery({ id: group.id })

  return (
    <div
      className={
        "flex flex-col gap-4 rounded-3xl p-4 text-white " + mainGradient
      }
    >
      {isGroupAdminQuery?.data && (
        <button onClick={() => toggleEditingState()}>
          <PencilSquareIcon className="ml-auto box-content h-6 w-6 rounded-full border border-white p-2 text-white" />
        </button>
      )}
      <p className="text-center text-2xl">{group.name}</p>
      <p className="w-full text-left text-lg">Description</p>
      <div dangerouslySetInnerHTML={{ __html: group.description || "" }} />
      <p className="w-full text-left text-lg">Members</p>
      <UsersList users={members} />
    </div>
  )
}

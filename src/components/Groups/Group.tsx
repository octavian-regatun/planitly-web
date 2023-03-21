import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { inferRouterOutputs } from "@trpc/server"
import type { GroupsRouter } from "../../server/api/routers/groups"
import { api } from "../../utils/api"
import { UsersList } from "../UserList/UsersList"

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
        "relative flex flex-col gap-4 rounded-3xl bg-teal-600 bg-gradient-to-r p-4 text-white"
      }
    >
      <p className="px-12 text-center text-2xl">{group.name}</p>
      {isGroupAdminQuery?.data && (
        <button onClick={() => toggleEditingState()}>
          <PencilSquareIcon className="p-2 absolute right-4 top-4 ml-auto box-content h-6 w-6 rounded-full bg-yellow-200 text-black" />
        </button>
      )}
      <p className="w-full text-left text-lg">Description</p>
      <div dangerouslySetInnerHTML={{ __html: group.description || "" }} />
      <p className="w-full text-left text-lg">Members</p>
      <UsersList users={members} />
    </div>
  )
}

import { mainGradient } from "../../../utils/gradient"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { MembersList } from "./MembersList"
import { GroupsRouter } from "../../../server/api/routers/groups"
import { inferRouterOutputs } from "@trpc/server"
import { api } from "../../../utils/api"

export const Group: React.FC<{
  group: NonNullable<inferRouterOutputs<GroupsRouter>["getGroup"]>
  toggleEditingState: () => void
}> = ({ group, toggleEditingState }) => {
  const members = group?.GroupMember.map((member) => member.user)

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
      <MembersList members={members} />
    </div>
  )
}

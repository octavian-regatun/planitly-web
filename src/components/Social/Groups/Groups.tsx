import { api } from "../../../utils/api"
import CreateGroupButton from "./AddEventButton"
import { GroupCard } from "./GroupCard"

export const Groups: React.FC = () => {
  const getGroupsQuery = api.groups.getGroups.useQuery()

  return (
    <div className="flex h-full flex-col items-center gap-4 w-full">
      {getGroupsQuery.data?.map((group) => (
        <GroupCard key={`group-${group.id}`} group={group} />
      ))}
      <CreateGroupButton />
    </div>
  )
}

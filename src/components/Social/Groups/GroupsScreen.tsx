import { api } from "../../../utils/api"
import CreateGroupButton from "./AddEventButton"
import { GroupCard } from "./GroupCard"

export const GroupsScreen: React.FC = () => {
  const getGroupsQuery = api.groups.getGroups.useQuery()

  return (
    <div className="flex w-full flex-col items-center gap-4 pb-20">
      {getGroupsQuery.data?.map((group) => (
        <GroupCard key={`group-${group.id}`} group={group} />
      ))}
      <CreateGroupButton />
    </div>
  )
}

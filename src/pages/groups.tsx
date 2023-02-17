import Layout from "../components/Layout/Layout"
import RequireAuth from "../components/RequireAuth"
import CreateGroupButton from "../components/Social/Groups/AddEventButton"
import { GroupCard } from "../components/Social/Groups/GroupCard"
import { api } from "../utils/api"

const GroupsPage: React.FC = () => {
  const getGroupsQuery = api.groups.getGroups.useQuery()

  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">Groups</h1>
          {getGroupsQuery.data?.map((group) => (
            <GroupCard key={`group-${group.id}`} group={group} />
          ))}
          <CreateGroupButton />
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default GroupsPage

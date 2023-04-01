import Link from "next/link"
import CreateGroupButton from "../../components/Groups/CreateGroupButton"
import { GroupCard } from "../../components/Groups/GroupCard"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"

const GroupsPage = () => {
  const getGroupsQuery = api.groups.getGroups.useQuery({})

  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Link
              href="/friends"
              className="rounded-full border border-teal-600 px-8 py-2 text-lg text-teal-600 transition-all"
            >
              FRIENDS
            </Link>
            <Link
              href="/groups"
              className="rounded-full border bg-teal-600 px-8 py-2 text-lg text-white transition-all"
            >
              GROUPS
            </Link>
          </div>
          <div className="flex w-full flex-col items-center gap-4 pb-20">
            {getGroupsQuery.data?.map(group => (
              <GroupCard key={`group-${group.id}`} group={group} />
            ))}
            <CreateGroupButton />
          </div>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default GroupsPage

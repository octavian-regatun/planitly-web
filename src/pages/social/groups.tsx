import Link from "next/link"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { GroupsScreen } from "../../components/Social/Groups/GroupsScreen"

const GroupsPage = () => {
  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Link
              href="/social/friends"
              className="rounded-full border border-black px-8 py-2 text-lg transition-all "
            >
              FRIENDS
            </Link>
            <Link
              href="/social/groups"
              className="rounded-full border border-black bg-black px-8 py-2 text-lg text-white transition-all"
            >
              GROUPS
            </Link>
          </div>
          <GroupsScreen />
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default GroupsPage

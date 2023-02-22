import Link from "next/link"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { FriendsScreen } from "../../components/Social/Friends/FriendsScreen"

const FriendsPage: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <Link
              href="/social/friends"
              className="rounded-full border border-black bg-black px-8 py-2 text-lg text-white transition-all"
            >
              FRIENDS
            </Link>
            <Link
              href="/social/groups"
              className="rounded-full border border-black px-8 py-2 text-lg transition-all "
            >
              GROUPS
            </Link>
          </div>
          <FriendsScreen />
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default FriendsPage

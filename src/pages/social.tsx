import RequireAuth from "../components/RequireAuth"
import Layout from "../components/Layout/Layout"
import { Friends } from "../components/Social/Friends/Friends"

const SocialPage: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col items-center">
          <Friends />
          <div className="flex w-full flex-1 flex-col items-center gap-2">
            <h1 className="text-4xl font-bold">Groups</h1>
            <input
              placeholder="Search group..."
              className="w-3/4 rounded-full border border-black px-4 py-2 outline-black"
            />
          </div>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default SocialPage

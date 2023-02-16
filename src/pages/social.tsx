import RequireAuth from "../components/RequireAuth"
import Layout from "../components/Layout/Layout"
import { Friends } from "../components/Social/Friends/Friends"

const SocialPage: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col items-center">
          <Friends />
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default SocialPage

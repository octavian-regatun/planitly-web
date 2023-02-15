import RequireAuth from "../components/RequireAuth"
import Layout from "../components/Layout/Layout"
import { api } from "../utils/api"

const ProfilePage: React.FC = () => {
  const getMeQuery = api.users.getMe.useQuery()

  if (!getMeQuery.data) return null

  const { username, email, firstName, lastName } = getMeQuery.data

  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col items-center gap-4">
          <h1 className="text-4xl font-bold">
            {firstName} {lastName}
          </h1>
          <table>
            <tr>
              <td className="font-bold text-right pr-2">username:</td>
              <td>{username}</td>
            </tr>
            <tr>
              <td className="font-bold text-right pr-2">email:</td>
              <td>{email}</td>
            </tr>
          </table>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default ProfilePage

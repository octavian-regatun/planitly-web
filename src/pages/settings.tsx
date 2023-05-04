import { Layout } from "antd"
import { signOut } from "next-auth/react"
import RequireAuth from "../components/RequireAuth"

export default function SettingsPage() {
  function handleSignOut() {
    void signOut({
      callbackUrl: `${window.location.origin}`,
    })
  }

  return (
    <RequireAuth>
      <Layout>
        <button
          className={"-mt-2 w-48 rounded-full bg-red-600 py-2 text-white"}
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </Layout>
    </RequireAuth>
  )
}

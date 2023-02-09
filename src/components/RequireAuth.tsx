import { useSession } from "next-auth/react"

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return <>{children}</>
}

export default RequireAuth

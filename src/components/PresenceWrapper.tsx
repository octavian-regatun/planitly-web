import { useSession } from "next-auth/react"
import { FC, ReactElement, useEffect } from "react"
import { io } from "socket.io-client"

export const PresenceWrapper: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const session = useSession()

  useEffect(() => {
    if (session.status !== "authenticated") return

    const socket = io("http://localhost:8080", {
      auth: {
        user: session.data.user,
      },
    })

    return () => void socket.disconnect()
  }, [session.status])

  return children
}

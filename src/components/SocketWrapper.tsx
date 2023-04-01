import type { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import type { FC, ReactElement } from "react"
import { useEffect } from "react"
import { io } from "socket.io-client"
import { shallow } from "zustand/shallow"
import { useSocketStore } from "../store/socket"
import { env } from "../env/client.mjs"

export const SocketWrapper: FC<{ children: ReactElement }> = ({ children }) => {
  const session = useSession()

  const [socket, setSocket] = useSocketStore(x => [x.socket, x.setSocket])
  shallow
  const setOnlineUsers = useSocketStore(x => x.setOnlineUsers)
  useEffect(() => {
    if (session.status !== "authenticated") return

    const socket = io(env.NEXT_PUBLIC_REALTIME_URL, {
      auth: {
        user: session.data.user,
      },
    })

    setSocket(socket)

    return () => void socket.disconnect()
  }, [session.status])

  useEffect(() => {
    if (!socket) return

    socket.on("presence", (data: User[]) => {
      setOnlineUsers(data)
    })
  }, [socket])

  return children
}
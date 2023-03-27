import type { User } from "@prisma/client"
import type { Socket } from "socket.io-client"
import { create } from "zustand"

type State = {
  socket?: Socket
  onlineUsers: User[]
}

type Action = {
  setSocket: (socket: Socket) => void
  setOnlineUsers: (users: User[]) => void
}

export const useSocketStore = create<State & Action>(set => ({
  socket: undefined,
  onlineUsers: [],
  setSocket: socket => set({ socket }),
  setOnlineUsers: users => set({ onlineUsers: users }),
}))

import type { User } from "@prisma/client"

export type UserWithLoading = User & {
  loading: boolean
}

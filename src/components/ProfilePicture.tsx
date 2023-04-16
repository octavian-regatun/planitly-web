import { ArrowPathIcon } from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import Image from "next/image"
import { useSocketStore } from "../store/socket"

const ProfilePicture: React.FC<{
  className?: string
  size?: number
  user: User
  loading?: boolean
  shouldDisplayOnline?: boolean
}> = ({ size, className, loading, shouldDisplayOnline, user }) => {
  const onlineUsers = useSocketStore(x => x.onlineUsers)

  const isOnline = onlineUsers.some(x => x.id === user.id)

  return (
    <div className="relative">
      <Image
        src={user.image}
        width={size || 42}
        height={size || 42}
        alt="Profile Picture"
        className={`rounded-full ${className || ""} object-cover`}
        style={{
          width: size || 42,
          height: size || 42,
        }}
      />
      {loading && (
        <ArrowPathIcon
          className="absolute -bottom-2 -right-2 box-content h-3 w-3 animate-spin rounded-full bg-black p-1 text-white"
          width={size || 42}
          height={size || 42}
        />
      )}
      {!loading && shouldDisplayOnline && isOnline && (
        <span className="absolute bottom-0 right-0 flex">
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-600" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 animate-ping rounded-full bg-green-600" />
        </span>
      )}
    </div>
  )
}

export default ProfilePicture

import { ArrowPathIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

const ProfilePicture: React.FC<{
  size?: number
  src: string
  className?: string
  loading?: boolean
}> = ({ size, src, className, loading }) => {
  if (loading)
    return (
      <div className="relative">
        <Image
          src={src}
          width={size || 42}
          height={size || 42}
          alt="Profile Picture"
          className={`rounded-full ${className || ""}`}
          style={{
            width: size || 42,
            height: size || 42,
          }}
        />
        <ArrowPathIcon
          className="absolute top-0 animate-spin rounded-full bg-black bg-opacity-50 p-2"
          width={size || 42}
          height={size || 42}
        />
      </div>
    )

  return (
    <Image
      src={src}
      width={size || 42}
      height={size || 42}
      alt="Profile Picture"
      className={`rounded-full ${className || ""}`}
      style={{
        width: size || 42,
        height: size || 42,
      }}
    />
  )
}

export default ProfilePicture

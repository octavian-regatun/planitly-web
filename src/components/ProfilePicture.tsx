import { openPeeps } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useMemo } from "react"

const ProfilePicture: React.FC<{
  size?: number
  className?: string
  loading?: boolean
  firstName: string
  lastName: string
}> = ({ size, className, loading, firstName, lastName }) => {
  const src = useMemo(
    () =>
      createAvatar(openPeeps, {
        seed: firstName + " " + lastName,
        size: size || 42,
        backgroundType: ["gradientLinear"],
      }).toDataUriSync(),
    [firstName, lastName]
  )

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

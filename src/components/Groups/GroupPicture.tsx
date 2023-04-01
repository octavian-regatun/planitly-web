import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { Group } from "@prisma/client"
import Image from "next/image"
import type { FC } from "react"
import { useMemo } from "react"

export const GroupPicture: FC<{
  group: Group
  size: number
  className?: string
}> = ({ size, className, group }) => {
  const avatarSrc = useMemo(
    () =>
      createAvatar(initials, {
        seed: group.name,
        size: 32,
        backgroundType: ["gradientLinear"],
      }).toDataUriSync(),
    [group.name]
  )

  return (
    <Image
      width={size || 24}
      height={size || 24}
      src={avatarSrc}
      alt="group avatar"
      className={`rounded-full ${className || ""}`}
    />
  )
}

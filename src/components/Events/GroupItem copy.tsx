import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import type { Group, User } from "@prisma/client"
import Image from "next/image"
import { useMemo } from "react"

export const GroupItem: React.FC<{
  group: Group
  onClick: (group: Group) => void
}> = ({ group, onClick }) => {
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
    <button
      className="flex items-center gap-2 p-4"
      type="button"
      onClick={() => onClick(group)}
    >
      <Image
        className="rounded-full"
        width={32}
        height={32}
        alt="avatar"
        src={avatarSrc}
      />
      <h1 key={`friends-list-friend-${group.id}`}>{group.name}</h1>
    </button>
  )
}

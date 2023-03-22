import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { XMarkIcon } from "@heroicons/react/24/outline"
import type { Group } from "@prisma/client"
import Image from "next/image"
import { useMemo } from "react"

export const GroupChip: React.FC<{
  group: Group
  onCloseClick: (group: Group) => void
}> = ({ group, onCloseClick }) => {
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
    <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 p-2">
      <Image
        width={24}
        height={24}
        src={avatarSrc}
        alt="group avatar"
        className="rounded-full"
      />
      <p className="text-xs">{group.name}</p>

      <button type="button" onClick={() => onCloseClick(group)}>
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

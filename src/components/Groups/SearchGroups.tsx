import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import type { Group } from "@prisma/client"
import Image from "next/image"
import { useMemo, useState } from "react"
import { api } from "../../utils/api"

export const SearchGroups: React.FC<{
  onClick: (group: Group) => void
  exclude?: number[]
}> = ({ onClick, exclude }) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [groupsQuery, setGroupsQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)
  const onBlur = () => setTimeout(() => setFocused(false), 200)

  const searchGroupsQuery = api.groups.search.useQuery(
    { query: groupsQuery },
    {
      onSuccess: (data) => {
        setGroups(data)
      },
    }
  )

  const filteredGroups = useMemo(() => {
    if (!exclude) return groups
    return groups.filter((group) => !exclude.includes(group.id))
  }, [groups, exclude])

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full">
        <input
          className="w-full border-b-2 border-b-gray-200 py-2 outline-none"
          value={groupsQuery}
          onChange={(e) => setGroupsQuery(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {searchGroupsQuery.isFetching && (
          <ArrowPathIcon className="absolute top-[calc(50%-8px)] right-8 h-4 w-4 animate-spin" />
        )}
      </div>
      {focused && filteredGroups.length > 0 && (
        <div className="absolute top-[42px] flex w-full flex-col rounded-b border-2 border-t-0 border-gray-200 bg-white text-black">
          {filteredGroups.map((group) => (
            <GroupItem
              group={group}
              key={`group-item-${group.id}`}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const GroupItem: React.FC<{
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

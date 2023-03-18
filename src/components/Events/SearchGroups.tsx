import { ArrowPathIcon } from "@heroicons/react/24/outline"
import type { Group } from "@prisma/client"
import { useState } from "react"
import { api } from "../../utils/api"
import { GroupItem } from "./GroupItem"

export const SearchGroups: React.FC<{
  onClick: (group: Group) => void
}> = ({ onClick }) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [groupsQuery, setGroupsQuery] = useState("")

  const searchGroupsQuery = api.groups.search.useQuery(
    { query: groupsQuery },
    {
      onSuccess: (data) => {
        setGroups(data)
      },
    }
  )

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full">
        <input
          placeholder="Search groups..."
          className="rounded-lg bg-teal-700 p-2 text-white placeholder-gray-200 outline-teal-500 w-full"
          value={groupsQuery}
          onChange={(e) => setGroupsQuery(e.target.value)}
        />
        {searchGroupsQuery.isFetching && (
          <ArrowPathIcon className="absolute top-[calc(50%-8px)] right-8 h-4 w-4 animate-spin" />
        )}
      </div>
      {groups.length>0 && (
        <div className="flex w-full flex-col rounded-b-3xl bg-teal-700 text-white border border-black">
          {groups.map((group) => (
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

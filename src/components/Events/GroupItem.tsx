import type { Group, User } from "@prisma/client"

export const GroupItem: React.FC<{
  group: Group
  onClick: (group: Group) => void
}> = ({ group, onClick }) => {
  return (
    <button
      className="flex items-center gap-2 p-4"
      type="button"
      onClick={() => onClick(group)}
    >
      <h1 key={`friends-list-friend-${group.id}`}>
        {group.name}
      </h1>
    </button>
  )
}

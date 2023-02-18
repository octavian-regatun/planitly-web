import { Group } from "@prisma/client"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { MembersList } from "../../components/Social/Groups/MembersList"
import { api } from "../../utils/api"

const GroupPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const getGroupQuery = api.groups.getGroup.useQuery(
    {
      id: parseInt(id as string),
    },
    {
      onSuccess(data) {
        setGroup(data)
      },
    }
  )

  const deleteGroupMutation = api.groups.deleteGroup.useMutation({
    onSuccess() {
      void router.push("/social")
    },
  })

  const [group, setGroup] = useState<typeof getGroupQuery.data | null>(null)

  if (!group) return <p>Loading...</p>

  const members = group?.GroupMember.map((member) => member.user)

  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col gap-4">
          <p className="text-center text-2xl">{group.name}</p>
          <p className="w-full text-left text-2xl">Members</p>
          <MembersList members={members} />
          <button
            className="w-fit self-center rounded-full bg-red-600 px-8 py-2 font-bold text-white transition-all hover:bg-red-800"
            onClick={() => deleteGroupMutation.mutate({ id: group.id })}
          >
            DELETE GROUP
          </button>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default GroupPage

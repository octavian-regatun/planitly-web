import type { inferRouterOutputs } from "@trpc/server"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { EditGroup } from "../../components/Social/Groups/EditGroup"
import { Group } from "../../components/Social/Groups/Group"
import type { GroupsRouter } from "../../server/api/routers/groups"
import { api } from "../../utils/api"

const GroupPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [group, setGroup] =
    useState<inferRouterOutputs<GroupsRouter>["getGroup"]>(null)
  const { id } = useRouter().query

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

  function toggleEditingState() {
    setIsEditing((prevState) => !prevState)
  }

  if (!group) return <p>Loading...</p>

  return (
    <RequireAuth>
      <Layout>
        <div className="pb-20">
          {isEditing ? (
            <EditGroup group={group} toggleEditingState={toggleEditingState} />
          ) : (
            <Group group={group} toggleEditingState={toggleEditingState} />
          )}
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default GroupPage

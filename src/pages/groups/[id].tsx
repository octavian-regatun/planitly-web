import type { inferRouterOutputs } from "@trpc/server"
import { useRouter } from "next/router"
import { useState } from "react"
import { EditGroup } from "../../components/Groups/EditGroup"
import { Group } from "../../components/Groups/Group"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import type { GroupsRouter } from "../../server/api/routers/groups"
import { api } from "../../utils/api"

const GroupPage: React.FC = () => {
  const { id } = useRouter().query

  const [isEditing, setIsEditing] = useState(false)
  const [group, setGroup] =
    useState<inferRouterOutputs<GroupsRouter>["getGroup"]>(null)

  api.groups.getGroup.useQuery(
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

  return (
    <RequireAuth>
      <Layout>
        <div className="pb-20">
          {group && isEditing && (
            <EditGroup group={group} toggleEditingState={toggleEditingState} />
          )}
          {group && !isEditing && (
            <Group group={group} toggleEditingState={toggleEditingState} />
          )}
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default GroupPage

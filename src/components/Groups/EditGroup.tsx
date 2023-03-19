import { PencilSquareIcon } from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import type { inferRouterOutputs } from "@trpc/server"
import { Field, Form, Formik, FormikProps } from "formik"
import { useRouter } from "next/router"
import { toast } from "react-hot-toast"
import { GroupMemberModal } from "./GroupMemberModal"
import { useState } from "react"
import { GroupsRouter } from "../../server/api/routers/groups"
import { api } from "../../utils/api"
import { mainGradient } from "../../utils/gradient"
import RichTextEditor from "../RichTextEditor"
import { UsersListWithSearch } from "../UserList/UsersListWithSearch"

type EditGroupFormikValues = {
  name: string
  description: string
  members: (User & {
    loading: boolean
  })[]
}

export const EditGroup: React.FC<{
  group: NonNullable<inferRouterOutputs<GroupsRouter>["getGroup"]>
  toggleEditingState: () => void
}> = ({ group, toggleEditingState }) => {
  const [isGroupMemberModalOpen, setIsGroupMemberModalOpen] = useState(false)
  const [selectedGroupMember, setSelectedGroupMember] = useState<
    User & { loading: boolean }
  >()

  const apiContext = api.useContext()
  const router = useRouter()

  const deleteGroupMutation = api.groups.deleteGroup.useMutation({
    onSuccess() {
      void router.push("/groups")
      toast.success("Group deleted successfully!", {
        id: "group-deleted",
      })
    },
  })

  const updateGroupMutation = api.groups.updateGroup.useMutation({
    onSuccess() {
      void apiContext.groups.getGroup.invalidate({ id: group.id })
      toast.success("Group updated successfully!", {
        id: "group-updated",
      })
    },
  })

  const members = group?.GroupMember.map((member) => {
    let loading = false
    if (member.status === "PENDING") loading = true
    return { ...member.user, loading }
  })

  const initialValues: EditGroupFormikValues = {
    name: group.name,
    description: group.description || "",
    members,
  }

  function onSubmit(data: EditGroupFormikValues) {
    const membersId = data.members.map((member) => member.id)

    updateGroupMutation.mutate({ id: group.id, ...data, membersId })
  }

  function onSearchUserClick(
    formik: FormikProps<EditGroupFormikValues>,
    user: User
  ) {
    formik.setFieldValue("members", [
      ...formik.values.members,
      { ...user, loading: true },
    ])
  }

  function onGroupMemberRemoveClick(
    formik: FormikProps<EditGroupFormikValues>,
    user: User
  ) {
    setIsGroupMemberModalOpen(false)

    const newMembers = formik.values.members.filter(
      (member) => member.id !== user.id
    )

    formik.setFieldValue("members", newMembers)
  }

  function onUserClick(user: User & { loading: boolean }) {
    setSelectedGroupMember(user)
    setIsGroupMemberModalOpen(true)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <>
            <Form
              className={
                "flex flex-col gap-4 rounded-3xl p-4 text-white " + mainGradient
              }
            >
              <div className="flex items-center">
                <p className="relative -right-12 mx-auto rounded-full bg-gray-200 px-4 py-2 text-sm text-black">
                  EDIT MODE
                </p>
                <button
                  className="ml-auto"
                  onClick={() => toggleEditingState()}
                >
                  <PencilSquareIcon className="ml-auto box-content h-6 w-6 rounded-full bg-white p-2 text-black" />
                </button>
              </div>
              <Field
                name="name"
                type="text"
                className="rounded-full p-2 text-center text-black"
                placeholder="Title"
              />
              <RichTextEditor
                value={formik.values.description}
                onChange={(content) =>
                  formik.setFieldValue("description", content)
                }
              />
              <p className="w-full text-left text-lg">Members</p>
              <UsersListWithSearch
                users={formik.values.members}
                onUserClick={onUserClick}
                onSearchUserClick={(user) => onSearchUserClick(formik, user)}
              />
              <button
                className="w-fit self-center rounded-full bg-red-600 px-8 py-2 transition-all hover:bg-red-700"
                onClick={() => deleteGroupMutation.mutate({ id: group.id })}
                type="button"
              >
                DELETE GROUP
              </button>
              <button
                type="submit"
                className="w-fit self-center rounded-full bg-white px-8 py-2 text-black"
              >
                SAVE CHANGES
              </button>
            </Form>
            {selectedGroupMember && (
              <GroupMemberModal
                isOpen={isGroupMemberModalOpen}
                setIsOpen={setIsGroupMemberModalOpen}
                user={selectedGroupMember}
                onRemoveClick={(user) => onGroupMemberRemoveClick(formik, user)}
              />
            )}
          </>
        )
      }}
    </Formik>
  )
}

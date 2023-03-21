import type { User } from "@prisma/client"
import type { FormikProps } from "formik"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import { GroupMemberModal } from "../../components/Groups/GroupMemberModal"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { UsersListWithSearch } from "../../components/UserList/UsersListWithSearch"
import type { UserWithLoading } from "../../types/user"
import { api } from "../../utils/api"
import { mainGradient } from "../../utils/gradient"

export type CreateGroupFormikValues = {
  name: string
  members: User[]
}

const GroupsCreatePage: React.FC = () => {
  const [isGroupMemberModalOpen, setIsGroupMemberModalOpen] = useState(false)
  const [selectedGroupMember, setSelectedGroupMember] =
    useState<UserWithLoading>()

  const router = useRouter()

  const createGroup = api.groups.createGroup.useMutation({
    onSuccess() {
      void router.push("/groups")
    },
  })

  const getMeQuery = api.users.getMe.useQuery()

  function onSubmit(values: CreateGroupFormikValues) {
    const { name, members } = values

    const membersIds = members.map((member) => member.id)

    createGroup.mutate({ name, membersIds })
  }

  function onSearchUserClick(
    formik: FormikProps<CreateGroupFormikValues>,
    user: User
  ) {
    const members = [...formik.values.members, user]
    formik.setFieldValue("members", members)
  }

  function onGroupMemberRemoveClick(
    formik: FormikProps<CreateGroupFormikValues>,
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

  if (!getMeQuery.data) return null

  const initialValues: CreateGroupFormikValues = {
    name: "",
    members: [getMeQuery.data],
  }

  return (
    <RequireAuth>
      <Layout>
        <Formik
          initialValues={initialValues}
          validate={() => {
            const errors = {}

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values)
            setSubmitting(false)
          }}
        >
          {(formik) => {
            const members = formik.values.members.map((member) => {
              if (member.id === getMeQuery.data?.id)
                return { ...member, loading: false }
              return {
                ...member,
                loading: true,
              }
            })
            return (
              <>
                <Form className="flex flex-col items-center gap-4">
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-center text-xl font-bold">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className="rounded-full border border-black p-2 text-center"
                    />
                    <ErrorMessage name="name" component="div" />
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <label className="text-center text-xl font-bold">
                      Members
                    </label>

                    <UsersListWithSearch
                      users={members}
                      onUserClick={onUserClick}
                      onSearchUserClick={(user) =>
                        onSearchUserClick(formik, user)
                      }
                    />
                    <ErrorMessage name="title" component="div" />
                  </div>

                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={
                      "w-fit rounded-full px-8 py-2 font-bold uppercase text-white " +
                      mainGradient
                    }
                  >
                    Create Group
                  </button>
                </Form>
                {selectedGroupMember && (
                  <GroupMemberModal
                    isOpen={isGroupMemberModalOpen}
                    setIsOpen={setIsGroupMemberModalOpen}
                    user={selectedGroupMember}
                    onRemoveClick={(user) =>
                      onGroupMemberRemoveClick(formik, user)
                    }
                  />
                )}
              </>
            )
          }}
        </Formik>
      </Layout>
    </RequireAuth>
  )
}
export default GroupsCreatePage

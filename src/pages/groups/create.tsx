import type { User } from "@prisma/client"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect } from "react"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { MembersList } from "../../components/Social/Groups/MembersList"
import { api } from "../../utils/api"
import { mainGradient } from "../../utils/gradient"
import { useRouter } from "next/router"

export type CreateGroupFormikValues = {
  name: string
  members: User[]
}

const GroupsCreatePage: React.FC = () => {
  const router = useRouter()

  const initialValues: CreateGroupFormikValues = { name: "", members: [] }

  const createGroup = api.groups.createGroup.useMutation({
    onSuccess() {
      void router.push("/social")
    },
  })

  function onSubmit(values: CreateGroupFormikValues) {
    const { name, members } = values

    const membersIds = members.map((member) => member.id)

    createGroup.mutate({ name, membersIds })
  }

  return (
    <RequireAuth>
      <Layout>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {}

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values)
            setSubmitting(false)
          }}
        >
          {(formik) => (
            <Form className="flex flex-col items-center gap-4">
              <div className="flex w-full flex-col gap-2">
                <label className="text-center text-xl font-bold">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="rounded-full border border-black p-2 text-center"
                />
                <ErrorMessage name="name" component="div" />
              </div>
              <div className="flex w-full flex-col gap-2">
                <label className="text-center text-xl font-bold">Members</label>
                <MembersList members={formik.values.members} formik={formik} />
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
          )}
        </Formik>
      </Layout>
    </RequireAuth>
  )
}

export default GroupsCreatePage

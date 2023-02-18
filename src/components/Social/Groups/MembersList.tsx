import { Dialog } from "@headlessui/react"
import { PlusIcon } from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import type { FormikProps } from "formik"
import { useEffect, useState } from "react"
import type { CreateGroupFormikValues } from "../../../pages/groups/create"
import { api } from "../../../utils/api"
import ProfilePicture from "../../ProfilePicture"
import { SearchUsers } from "../../SearchUsers/SearchUsers"

export const MembersList: React.FC<{
  members: User[]
  formik?: FormikProps<CreateGroupFormikValues>
}> = ({ members, formik }) => {
  const [meUser, setMeUser] = useState<User>()
  const [isOpen, setIsOpen] = useState(false)

  const getMeQuery = api.users.getMe.useQuery(undefined, {
    onSuccess(data) {
      setMeUser(data as User)
    },
  })

  useEffect(() => {
    void getMeQuery.refetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (meUser) formik?.setFieldValue("members", [meUser, ...members])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meUser])

  function handleAddMember(
    user: User,
    formik: FormikProps<CreateGroupFormikValues>
  ) {
    const { setFieldValue, values } = formik
    if (!values.members.some((member) => member.id === user.id))
      setFieldValue("members", [...values.members, user])
  }

  return (
    <div className="flex flex-wrap">
      {members.map((member) => (
        <ProfilePicture
          key={`members-profile-picture-${member.id}`}
          src={member.image}
          size={36}
        />
      ))}
      {formik && (
        <>
          <button type="button" onClick={() => setIsOpen(true)}>
            <PlusIcon className="box-content h-7 w-7 rounded-full bg-gray-200 p-1" />
          </button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel>
                <div className="flex w-80 flex-col rounded-3xl border border-black bg-white p-4">
                  <SearchUsers
                    friendsOnly
                    onClick={(user) => handleAddMember(user, formik)}
                  />
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </>
      )}
    </div>
  )
}

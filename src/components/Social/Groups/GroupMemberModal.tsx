import { Dialog } from "@headlessui/react"
import type { User } from "@prisma/client"
import type { FormikProps } from "formik"
import type { Dispatch, SetStateAction } from "react"
import ProfilePicture from "../../ProfilePicture"

export const GroupMemberModal: React.FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: User
  formik: FormikProps<any>
}> = ({ isOpen, setIsOpen, user, formik }) => {
  function handleRemoveMember(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { setFieldValue, values } = formik

    setFieldValue(
      "members",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      values.members.filter((member: User) => member.id !== user.id)
    )
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-10 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div className="flex w-80 flex-col items-center justify-center gap-4 rounded-3xl border border-black bg-white p-4">
            <div className="flex items-center gap-2">
              <ProfilePicture src={user.image} size={36} />
              <p className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <button
              className="rounded-full bg-red-600 px-8 py-2 font-bold text-white"
              onClick={() => {
                handleRemoveMember(user)
                setIsOpen(false)
              }}
            >
              REMOVE MEMBER
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

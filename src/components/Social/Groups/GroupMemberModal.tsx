import { Dialog } from "@headlessui/react"
import type { User } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"
import ProfilePicture from "../../ProfilePicture"
import type { UserWithLoading } from "../../../types/user"

export const GroupMemberModal: React.FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: UserWithLoading
  onRemoveClick: (user: User) => void
}> = ({ isOpen, setIsOpen, user, onRemoveClick }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-10 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div className="flex w-80 flex-col items-center justify-center gap-4 rounded-3xl border border-black bg-white p-4">
            {user.loading && (
              <p className="w-fit rounded-full bg-gray-300 px-4 py-2 text-xs text-black">
                PENDING
              </p>
            )}
            <div className="flex items-center gap-2">
              <ProfilePicture src={user.image} size={36} />
              <p className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className={"flex flex-col items-center gap-2"}>
              <button className="w-full rounded-full border border-black px-8 py-2 font-bold text-black text-white">
                VIEW PROFILE
              </button>
              <button
                className="w-full rounded-full bg-red-600 px-8 py-2 font-bold text-white"
                onClick={() => {
                  onRemoveClick(user)
                  setIsOpen(false)
                }}
              >
                REMOVE MEMBER
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

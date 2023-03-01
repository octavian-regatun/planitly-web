import { Dialog } from "@headlessui/react"
import type { User } from "@prisma/client"
import type { Dispatch, SetStateAction } from "react"
import { SearchUsers } from "../../SearchUsers/SearchUsers"

export const SearchUsersModal: React.FC<{
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClick: (user: User) => void
  excludeUsersFromSearch: (User & { loading: boolean })[]
}> = ({ isOpen, setIsOpen, onClick, excludeUsersFromSearch }) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-10 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
        <Dialog.Panel>
          <div className="flex w-80 flex-col rounded-3xl border border-black bg-white p-4">
            <SearchUsers
              friendsOnly
              onClick={(user) => onClick(user)}
              excludeUsersFromSearch={excludeUsersFromSearch}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

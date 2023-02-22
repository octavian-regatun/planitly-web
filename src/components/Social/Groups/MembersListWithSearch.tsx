/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusIcon } from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import type { FormikProps } from "formik"
import { useEffect, useState } from "react"
import type { CreateGroupFormikValues } from "../../../pages/groups/create"
import { api } from "../../../utils/api"
import ProfilePicture from "../../ProfilePicture"
import { GroupMemberModal } from "./GroupMemberModal"
import { SearchUsersModal } from "./SearchUsersModal"

export const MembersListWithSearch: React.FC<{
  members: User[]
  groupId?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: FormikProps<any>
}> = ({ members, formik, groupId }) => {
  const [meUser, setMeUser] = useState<User>()
  const [isOpenMemberModal, setIsOpenMemberModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [pickedUser, setPickedUser] = useState<User>()

  const getMeQuery = api.users.getMe.useQuery(undefined, {
    onSuccess(data) {
      setMeUser(data as User)
    },
  })

  const getPendingGroupMembersQuery =
    api.groupMembers.getPendingGroupMembers.useQuery(
      { groupId: groupId as number },
      {
        enabled: !!groupId,
      }
    )

  useEffect(() => {
    void getMeQuery.refetch()
  }, [])

  useEffect(() => {
    if (!formik) return

    const { values } = formik

    if (
      meUser &&
      !values.members.some((member: User) => member.id === meUser.id)
    )
      formik?.setFieldValue("members", [meUser, ...members])
  }, [meUser])

  function handleAddMember(
    user: User,
    formik: FormikProps<CreateGroupFormikValues>
  ) {
    const { setFieldValue, values } = formik

    if (!values.members.some((member) => member.id === user.id))
      setFieldValue("members", [...values.members, user])
  }

  function isProfilePictureLoading(memberId: string) {
    return (
      getPendingGroupMembersQuery.data?.some(
        (pendingMember) => pendingMember.userId === memberId
      ) || false
    )
  }

  return (
    <div className="flex flex-wrap">
      {members.map((member) => (
        <button
          onClick={() => {
            setIsOpenMemberModal(true)
            setPickedUser(member)
          }}
          type="button"
          key={`members-profile-picture-${member.id}`}
        >
          <ProfilePicture
            src={member.image}
            size={36}
            loading={isProfilePictureLoading(member.id)}
          />
        </button>
      ))}
      {formik && (
        <>
          <button type="button" onClick={() => setIsOpen(true)}>
            <PlusIcon className="box-content h-7 w-7 rounded-full bg-gray-200 p-1" />
          </button>
          <SearchUsersModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={(user) => handleAddMember(user, formik)}
          />
          {pickedUser && meUser && meUser.id !== pickedUser.id && (
            <GroupMemberModal
              isOpen={isOpenMemberModal}
              setIsOpen={setIsOpenMemberModal}
              user={pickedUser}
              formik={formik}
            />
          )}
        </>
      )}
    </div>
  )
}

import {
  ArrowPathRoundedSquareIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import type { User } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"
import Layout from "../../components/Layout/Layout"
import ProfilePicture from "../../components/ProfilePicture"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"
import { toBase64 } from "../../utils/image"

const ProfilePage: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isMe = router.query.username === session.data?.user.username

  const getUserQuery = api.users.getUser.useQuery(
    { username: router.query.username as string },
    {
      enabled: !!router.query.username,
    }
  )

  const getMeQuery = api.users.getMe.useQuery(undefined, {
    enabled:
      typeof router.query.username === "string" &&
      router.query.username === session.data?.user.username,
  })

  const updateMeMutation = api.users.updateMe.useMutation({
    onSuccess() {
      void getUserQuery.refetch()
      toast.success("Profile updated!", { id: "profile-updated" })
    },
  })

  function handleImageClick() {
    fileInputRef.current?.click()
  }

  function onSubmit() {
    if (!fileInputRef.current) return
    if (!fileInputRef.current.files) return

    const file = fileInputRef.current?.files[0]

    if (!file) return

    void toBase64(file).then(base64 => {
      updateMeMutation.mutate({ image: base64 })
    })
  }

  if (!getUserQuery.data) return null

  const { username, firstName, lastName } = getUserQuery.data

  return (
    <RequireAuth>
      <Layout className="p-0">
        <Image
          alt="cover"
          width={2560}
          height={1440}
          src="https://picsum.photos/2560/1441"
        />
        <div className="relative -top-8 flex h-full flex-col items-center gap-4 rounded-t-3xl bg-white px-4">
          <button
            className="absolute -top-24 rounded-full transition-all hover:brightness-75"
            onClick={handleImageClick}
          >
            <input type="file" className="hidden" ref={fileInputRef} />
            <ProfilePicture
              size={196}
              user={getUserQuery.data as User}
              className="rounded-full bg-white"
            />
          </button>
          <div className="mt-32 flex w-full flex-col items-center gap-4">
            <div className="flex w-full justify-between">
              {isMe && (
                <button className="rounded border border-teal-600 py-2 px-4">
                  Edit Profile
                </button>
              )}
              <button className="rounded border border-teal-600 py-2 px-4">
                Share Profile
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-[1px] w-screen bg-black" />
              <div className="flex w-full justify-around">
                <button>
                  <PhotoIcon className="h-8 w-8" />
                </button>
                <button>
                  <UserGroupIcon className="h-8 w-8" />
                </button>
                <button>
                  <ArrowPathRoundedSquareIcon className="h-8 w-8" />
                </button>
              </div>
              <div className="h-[1px] w-screen bg-black" />
            </div>
            <h1 className="text-center text-xl font-bold">
              {firstName} {lastName}
            </h1>
            <table>
              <tbody>
                <tr>
                  <td className="pr-2 text-right font-bold">username:</td>
                  <td>{username}</td>
                </tr>
                {getMeQuery.data &&
                  router.query.username === session.data?.user.username && (
                    <tr>
                      <td className="pr-2 text-right font-bold">email:</td>
                      <td>{getMeQuery.data.email}</td>
                    </tr>
                  )}
              </tbody>
            </table>
            <button
              className={"w-48 rounded-full bg-teal-600 py-2 text-white"}
              onClick={onSubmit}
            >
              Save Profile
            </button>
          </div>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default ProfilePage

import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRef } from "react"
import toast from "react-hot-toast"
import Layout from "../components/Layout/Layout"
import ProfilePicture from "../components/ProfilePicture"
import RequireAuth from "../components/RequireAuth"
import { api } from "../utils/api"
import { toBase64 } from "../utils/image"
import {
  ArrowPathRoundedSquareIcon,
  PhotoIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"

const ProfilePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getMeQuery = api.users.getMe.useQuery()

  const updateMeMutation = api.users.updateMe.useMutation({
    onSuccess() {
      void getMeQuery.refetch()
      toast.success("Profile updated!", { id: "profile-updated" })
    },
  })

  function handleSignOut() {
    void signOut({
      callbackUrl: `${window.location.origin}`,
    })
  }

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

  if (!getMeQuery.data) return null

  const { username, email, firstName, lastName } = getMeQuery.data

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
              user={getMeQuery.data}
              className="rounded-full bg-white"
            />
          </button>
          <div className="mt-32 flex w-full flex-col items-center gap-4">
            <div className="flex w-full justify-between">
              <button className="rounded border border-teal-600 py-2 px-4">
                Edit Profile
              </button>
              <button className="rounded border border-teal-600 py-2 px-4">
                Share Profile
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-[1px] w-screen bg-black" />
              <div className="flex w-full justify-around">
                <PhotoIcon className="h-8 w-8" />
                <UserGroupIcon className="h-8 w-8" />
                <ArrowPathRoundedSquareIcon className="h-8 w-8" />
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
                <tr>
                  <td className="pr-2 text-right font-bold">email:</td>
                  <td>{email}</td>
                </tr>
              </tbody>
            </table>
            <button
              className={"w-48 rounded-full bg-teal-600 py-2 text-white"}
              onClick={onSubmit}
            >
              Save Profile
            </button>
            <button
              className={"-mt-2 w-48 rounded-full bg-red-600 py-2 text-white"}
              onClick={handleSignOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default ProfilePage

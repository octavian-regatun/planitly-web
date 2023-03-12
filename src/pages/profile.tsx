import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"
import Layout from "../components/Layout/Layout"
import RequireAuth from "../components/RequireAuth"
import { api } from "../utils/api"
import { mainGradient } from "../utils/gradient"
import { toBase64 } from "../utils/image"

const ProfilePage: React.FC = () => {
  const router = useRouter()

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

    void toBase64(file).then((base64) => {
      updateMeMutation.mutate({ image: base64 })
    })
  }

  if (!getMeQuery.data) return null

  const { username, email, firstName, lastName, image } = getMeQuery.data

  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col items-center gap-4">
          <button
            className="relative rounded-full transition-all hover:brightness-75"
            onClick={handleImageClick}
          >
            <input type="file" className="hidden" ref={fileInputRef} />
            <Image
              width={128}
              height={128}
              src={image}
              alt="profile"
              className="rounded-full"
            />
          </button>
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
            className={
              "w-48 rounded-full py-2 font-bold uppercase text-white " +
              mainGradient
            }
            onClick={onSubmit}
          >
            save profile
          </button>
          <button
            className={
              "-mt-2 w-48 rounded-full bg-red-600 py-2 font-bold uppercase text-white"
            }
            onClick={handleSignOut}
          >
            logout
          </button>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default ProfilePage

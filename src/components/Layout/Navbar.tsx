import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import { api } from "../../utils/api"
import { getNavbarTitle } from "../../utils/navbar"
import ProfilePicture from "../ProfilePicture"

const Navbar: React.FC = () => {
  const router = useRouter()

  const getMeQuery = api.users.getMe.useQuery()

  return (
    <nav className="flex h-16 items-center justify-center border-b border-gray-200 p-4 text-2xl">
      <button onClick={() => router.back()}>
        <ArrowLeftIcon className="box-content h-6 w-6 rounded-full p-2 text-black" />
      </button>
      {/* offset the (ProfilePicture width)/2 so title can be absolutely centered */}
      <h1 className="relative -right-[1px] mx-auto">
        {getNavbarTitle(router.pathname)}
      </h1>
      <Link href="/profile" className="transition-all hover:brightness-90">
        {getMeQuery.data && (
          <ProfilePicture
            firstName={getMeQuery.data.firstName}
            lastName={getMeQuery.data.lastName}
          />
        )}
      </Link>
    </nav>
  )
}

export default Navbar

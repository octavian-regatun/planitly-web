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
    <nav className="sticky top-0 z-[9999999] flex h-12 items-center justify-center border-gray-200 p-4 text-2xl backdrop-blur-lg">
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
            size={32}
            firstName={getMeQuery.data.firstName}
            lastName={getMeQuery.data.lastName}
          />
        )}
      </Link>
    </nav>
  )
}

export default Navbar

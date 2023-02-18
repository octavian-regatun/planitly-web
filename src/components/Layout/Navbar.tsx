import { useRouter } from "next/router"
import { getNavbarTitle } from "../../utils/navbar"
import ProfilePicture from "../ProfilePicture"
import Link from "next/link"
import { api } from "../../utils/api"
import {
  ArrowLeftIcon,
  BackspaceIcon,
  BackwardIcon,
} from "@heroicons/react/24/outline"

const Navbar: React.FC = () => {
  const router = useRouter()

  const getMeQuery = api.users.getMe.useQuery()

  return (
    <nav className="flex h-16 items-center justify-center border-b-2 border-b-black p-4 text-2xl font-bold">
      <button onClick={() => router.back()}>
        <ArrowLeftIcon className="box-content h-6 w-6 rounded-full bg-black p-2 text-white" />
      </button>
      {/* offset the (ProfilePicture width)/2 so title can be absolutely centered */}
      <h1 className="relative -right-[1px] mx-auto uppercase">
        {getNavbarTitle(router.pathname)}
      </h1>
      <Link href="/profile" className="transition-all hover:brightness-90">
        {getMeQuery.data?.image && (
          <ProfilePicture src={getMeQuery.data?.image} />
        )}
      </Link>
    </nav>
  )
}

export default Navbar

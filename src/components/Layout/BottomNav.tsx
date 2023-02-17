import { HomeIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-0 flex h-16 w-screen items-center border-t-2 border-t-black">
      <Link
        href="/dashboard"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <HomeIcon />
      </Link>
      <Link
        href="/social"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <UsersIcon />
      </Link>
      <Link
        href="/groups"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <UserGroupIcon />
      </Link>
    </div>
  )
}

export default BottomNav

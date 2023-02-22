import { HomeIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex h-16 w-screen items-center border-t-2 border-t-black bg-white">
      <Link
        href="/dashboard"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <HomeIcon />
      </Link>
      <Link
        href="/social/friends"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <UsersIcon />
      </Link>
    </div>
  )
}

export default BottomNav

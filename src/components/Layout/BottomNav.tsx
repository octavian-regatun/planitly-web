import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 flex h-16 w-[clamp(0px,100vw,640px)] items-center backdrop-blur-lg z-[99999]">
      <Link
        href="/dashboard/calendar"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <HomeIcon />
      </Link>
      <Link
        href="/friends"
        className="mx-auto box-content h-6 w-6 rounded-full bg-black p-2 text-white"
      >
        <UsersIcon />
      </Link>
    </div>
  )
}

export default BottomNav

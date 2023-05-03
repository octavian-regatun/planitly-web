import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 z-[99999] flex h-16 w-[clamp(0px,100vw,640px)] items-center rounded-t-3xl border bg-white border-teal-600">
      <Link
        href="/dashboard/calendar"
        className="mx-auto box-content h-8 w-8 rounded-ful text-black"
      >
        <HomeIcon />
      </Link>
      <Link
        href="/friends"
        className="mx-auto box-content h-8 w-8 rounded-ful text-black"
      >
        <UsersIcon />
      </Link>
    </div>
  )
}

export default BottomNav

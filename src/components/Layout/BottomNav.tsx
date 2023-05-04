import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-0 z-[99999] flex h-16 w-[clamp(0px,100vw,640px)] items-center rounded-t-3xl border border-teal-600 bg-white">
      <Link
        href="/dashboard/calendar"
        className="rounded-ful mx-auto box-content h-8 w-8 text-black"
      >
        <HomeIcon />
      </Link>
      <Link
        href="/events"
        className="rounded-ful mx-auto box-content h-8 w-8 text-black"
      >
        <CalendarDaysIcon />
      </Link>
      <Link
        href="/events/create"
        className={
          "relative -top-6 rounded-full bg-teal-600 p-6 text-white drop-shadow-lg"
        }
      >
        <PlusIcon className="h-6 w-6" />
      </Link>
      <Link
        href="/friends"
        className="rounded-ful mx-auto box-content h-8 w-8 text-black"
      >
        <UsersIcon />
      </Link>
      <Link
        href="/dashboard/calendar"
        className="rounded-ful mx-auto box-content h-8 w-8 text-black"
      >
        <Cog6ToothIcon />
      </Link>
    </div>
  )
}

export default BottomNav

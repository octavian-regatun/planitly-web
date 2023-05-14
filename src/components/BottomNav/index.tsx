import {
  CalendarDaysIcon,
  Cog6ToothIcon,
  HomeIcon,
  PlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 z-10 flex h-16 w-screen items-center justify-evenly rounded-t-3xl border-t border-teal-500 bg-white text-teal-500 shadow-inner">
      <Link href="/calendar">
        <HomeIcon className="h-8 w-8" />
      </Link>
      <Link href="/events">
        <CalendarDaysIcon className="h-8 w-8" />
      </Link>
      <Link href="/events/create">
        <PlusIcon className="relative -top-6 z-10 border border-teal-600 box-content h-8 w-8 rounded-full bg-teal-500 p-4 text-white drop-shadow-lg" />
      </Link>
      <Link href="/groups">
        <UserGroupIcon className="h-8 w-8" />
      </Link>
      <Link href="/settings">
        <Cog6ToothIcon className="h-8 w-8" />
      </Link>
    </div>
  );
}

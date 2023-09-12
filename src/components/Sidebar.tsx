"use client";
import {
  CalendarIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./shadcn/Button";
import { usePathname } from "next/navigation";

const pages = [
  "dashboard",
  "calendar",
  "friends",
  "groups",
  "settings",
] as const;

export type Page = (typeof pages)[number];

export function Sidebar() {
  const pathname = usePathname();

  const isLinkActive = (page: Page) => {
    return pathname === `/${page}`;
  };

  const getIcon = (page: Page) => {
    switch (page) {
      case "dashboard":
        return <HomeIcon className="h-4 w-4" />;
      case "calendar":
        return <CalendarIcon className="h-4 w-4" />;
      case "friends":
        return <UsersIcon className="h-4 w-4" />;
      case "groups":
        return <UserGroupIcon className="h-4 w-4" />;
      case "settings":
        return <SettingsIcon className="h-4 w-4" />;
    }
  };

  return (
    <aside className="px-4 pt-6 w-64 border h-screen absolute bg-white">
      <p className="font-semibold text-2xl pl-4">PlanITLY</p>
      <div className="flex flex-col mt-8 gap-2">
        {pages.map(page => (
          <Link href={`/${page}`} key={page}>
            <Button
              variant={isLinkActive(page) ? "default" : "ghost"}
              className="flex gap-2 items-center"
            >
              {getIcon(page)}
              {page[0].toUpperCase() + page.slice(1)}
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  );
}

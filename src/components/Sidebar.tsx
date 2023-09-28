"use client";
import { useSidebarIcon } from "@/hooks/use-sidebar-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./shadcn/Button";

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

  const icon = useSidebarIcon();

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
              {icon(page)}
              {page[0].toUpperCase() + page.slice(1)}
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  );
}

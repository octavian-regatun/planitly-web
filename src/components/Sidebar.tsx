"use client";
import { useSidebarIcon } from "@/hooks/use-sidebar-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./shadcn/button";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { useLayoutStore } from "@/store/layout";
import { shallow } from "zustand/shallow";

const pages = [
  "dashboard",
  "calendar",
  "friends",
  "groups",
  "settings",
] as const;

export type Page = (typeof pages)[number];

export function Sidebar() {
  const sidebarOpen = useLayoutStore(store => store.sidebarOpen);
  const setSidebarOpen = useLayoutStore(store => store.setSidebarOpen);
  const pathname = usePathname();
  const icon = useSidebarIcon();

  const toggleDrawer = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLinkActive = (page: Page) => {
    return pathname === `/${page}`;
  };

  return (
    <>
      <Drawer open={sidebarOpen} onClose={toggleDrawer} direction="left">
        <aside className="px-4 pt-6 w-64 border h-screen absolute bg-white dark:bg-black">
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
      </Drawer>
      <aside className="px-4 pt-6 w-64 border h-screen absolute bg-white dark:bg-neutral-950 hidden md:block">
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
    </>
  );
}

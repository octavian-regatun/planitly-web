"use client";
import {
  CalendarIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Page = {
  icon: any;
  name: string;
  href: string;
};

const Sidebar: FC = () => {
  const pages: Page[] = [
    {
      icon: <CalendarIcon className="h-4 w-4" />,
      name: "Calendar",
      href: "/app/calendar",
    },
    {
      icon: <UserGroupIcon className="h-4 w-4" />,
      name: "Social",
      href: "/app/social",
    },
    {
      icon: <Cog6ToothIcon className="h-4 w-4" />,
      name: "Settings",
      href: "/app/settings",
    },
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 flex h-screen w-20 flex-col items-center gap-8 border-r border-neutral-200 bg-white py-4">
        <span className="w-fit select-none bg-gradient-to-tr from-blue-700 to-indigo-900 bg-clip-text font-bold text-transparent">
          PlanITLY
        </span>
        <ul className="flex flex-col gap-2">
          {pages.map((page) => (
            <li key={page.href}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={page.href} className="gap-2">
                        {page.icon}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{page.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

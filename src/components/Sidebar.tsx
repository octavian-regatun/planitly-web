"use client";
import Link from "next/link";
import { FC } from "react";
import { sidebarPages } from "~/lib/constants";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Sidebar: FC = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-20 flex-col items-center gap-8 border-r border-neutral-200 bg-white py-5">
      <span className="w-fit select-none bg-gradient-to-tr from-neutral-500 to-black bg-clip-text font-bold text-transparent">
        PlanITLY
      </span>
      <ul className="flex flex-col gap-2">
        {sidebarPages.map((page) => (
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
  );
};

export default Sidebar;

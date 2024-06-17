import { FC } from "react";
import { SidebarPage } from "~/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  pages: SidebarPage[];
};

const InnerSidebar: FC<Props> = ({ pages }) => {
  return (
    <aside className="h-[calc(100vh-4rem)] w-20 border-r border-neutral-200 bg-white flex flex-col items-center py-3">
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
  );
};

export default InnerSidebar;

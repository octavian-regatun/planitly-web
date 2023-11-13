"use client";
import { authService } from "@/services/auth";
import { useStore } from "@/store/store";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./shadcn/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/dropdown-menu";
import { Input } from "./shadcn/input";
import { useCurrentPage } from "@/hooks/use-current-page";
import { MenuIcon } from "lucide-react";
import { useLayoutStore } from "@/store/layout";
import { Notifications } from "./Notifications";

export function Navbar() {
  const setSidebarOpen = useLayoutStore(store => store.setSidebarOpen);
  const user = useStore(store => store.me);

  const currentPage = useCurrentPage();

  return (
    <nav className="absolute h-16 md:h-20 w-screen items-center flex gap-4 px-4 md:pl-64 border">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setSidebarOpen(true)}
        className="md:hidden"
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <div className="ml-4">
        <p className="text-lg md:text-2xl font-semibold">{currentPage}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-2 px-4 ml-auto"
          >
            <p className="font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <Image
              src={
                user?.picture || "https://www.pexels.com/photo/771742/download/"
              }
              width={32}
              height={32}
              alt="profile"
              className=" rounded-full w-8 h-8 object-cover border"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href={`/users/${user?.id}`}>Go To Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={authService.signOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Notifications />
    </nav>
  );
}

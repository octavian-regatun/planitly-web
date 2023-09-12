"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./shadcn/Button";
import { Input } from "./shadcn/Input";
import { Popover, PopoverContent, PopoverTrigger } from "./shadcn/Popover";
import { authService } from "@/services/auth";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./shadcn/DropdownMenu";
import { useStore } from "@/store/store";
import Link from "next/link";

export function Navbar() {
  const user = useStore(store => store.me);
  const pathname = usePathname();

  const getCurrentPage = () => {
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/calendar")) return "Calendar";
    if (pathname.includes("/friends")) return "Friends";
    if (pathname.includes("/groups")) return "Groups";
    if (pathname.includes("/settings")) return "Settings";
  };

  return (
    <nav className="absolute h-20 w-screen items-center flex pl-64 pr-4 border">
      <div className="ml-4">
        <p className="text-2xl font-medium">Calendar</p>
      </div>
      <Input className="ml-auto w-48 mr-8" placeholder="Search" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            className="flex items-center gap-2 px-4"
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
    </nav>
  );
}

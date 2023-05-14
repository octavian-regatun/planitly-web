"use client";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export default function PageToggle() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center">
      <Link
        href="/friends"
        className={twMerge(
          cx(
            "rounded-l border border-teal-500 bg-white px-4 py-2 text-teal-500 transition-colors",
            { "bg-teal-500 text-white": pathname === "/friends" }
          )
        )}
      >
        Friends
      </Link>
      <Link
        href="/groups"
        className={twMerge(
          cx(
            "rounded-r border border-teal-500 bg-white px-4 py-2 text-teal-500 transition-colors",
            { "bg-teal-500 text-white": pathname === "/groups" }
          )
        )}
      >
        Groups
      </Link>
    </div>
  );
}

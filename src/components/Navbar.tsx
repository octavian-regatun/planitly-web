"use client";
import { signOut } from "next-auth/react";
import { FC } from "react";
import NavbarBreadcrumb from "./NavbarBreadcrumb";
import { Button } from "./ui/button";

const Navbar: FC = () => {
  return (
    <nav className="fixed top-0 ml-20 flex h-16 w-[calc(100vw-4rem)] items-center justify-between border-b border-b-neutral-200 bg-white px-4 pr-8">
      <NavbarBreadcrumb />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </nav>
  );
};

export default Navbar;

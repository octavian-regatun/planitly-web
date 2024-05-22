import { FC } from "react";
import { getServerAuthSession } from "~/server/auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import NavbarBreadcrumb from "./NavbarBreadcrumb";

const Navbar: FC = async () => {
  return (
    <nav className="fixed top-0 ml-20 flex h-16 w-[calc(100vw-4rem)] items-center border-b border-b-neutral-200 bg-white px-4">
      <NavbarBreadcrumb />
    </nav>
  );
};

export default Navbar;

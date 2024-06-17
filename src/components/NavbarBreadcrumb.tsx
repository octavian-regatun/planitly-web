"use client";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { capitalize } from "lodash";

const NavbarBreadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname
    .split("/")
    .filter((path) => path !== "app" && path !== "");
  const isLastPath = (index: number) => index === paths.length - 1;

  let currentPath = "";
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          currentPath += `/${path}`;
          return (
            <Fragment key={path}>
              <BreadcrumbItem>
                {!isLastPath(index) ? (
                  <BreadcrumbLink href={currentPath}>
                    {capitalize(path)}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLastPath(index) && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavbarBreadcrumb;

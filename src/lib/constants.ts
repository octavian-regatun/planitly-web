import {
  CalendarIcon,
  ContactIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { createElement } from "react";
import { SidebarPage } from "./types";

export const sidebarPages: SidebarPage[] = [
  {
    icon: createElement(CalendarIcon, { className: "h-4 w-4" }),
    name: "Calendar",
    href: "/app/calendar",
  },
  {
    icon: createElement(UsersIcon, { className: "h-4 w-4" }),
    name: "Social",
    href: "/app/social/friends",
  },
  {
    icon: createElement(SettingsIcon, { className: "h-4 w-4" }),
    name: "Settings",
    href: "/app/settings",
  },
];

export const socialSidebarPages: SidebarPage[] = [
  {
    name: "Friends",
    href: "/app/social/friends",
    icon: createElement(ContactIcon, { className: "h-4 w-4" }),
  },
  {
    name: "Groups",
    href: "/app/social/groups",
    icon: createElement(UsersIcon, { className: "h-4 w-4" }),
  },
];

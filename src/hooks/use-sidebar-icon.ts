import { Page } from "@/components/Sidebar";
import {
  CalendarIcon,
  Cog6ToothIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { createElement } from "react";

export function useSidebarIcon() {
  const SidebarIcon = (page: Page) => {
    switch (page) {
      case "dashboard":
        return createElement(HomeIcon, { className: "w-4 h-4" });
      case "calendar":
        return createElement(CalendarIcon, { className: "w-4 h-4" });
      case "friends":
        return createElement(UsersIcon, { className: "w-4 h-4" });
      case "groups":
        return createElement(UserGroupIcon, { className: "w-4 h-4" });
      case "settings":
        return createElement(Cog6ToothIcon, { className: "w-4 h-4" });
    }
  };

  return SidebarIcon;
}

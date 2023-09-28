import { usePathname } from "next/navigation";

export function useCurrentPage() {
  const pathname = usePathname();

  if (pathname.includes("/dashboard")) return "Dashboard";
  if (pathname.includes("/calendar")) return "Calendar";
  if (pathname.includes("/friends")) return "Friends";
  if (pathname.includes("/groups")) return "Groups";
  if (pathname.includes("/settings")) return "Settings";
}

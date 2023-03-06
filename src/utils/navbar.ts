export function getNavbarTitle(route: string) {
  if (route.startsWith("/dashboard")) return "Dashboard"
  if (route.startsWith("/social")) return "Social"
  if (route.startsWith("/profile")) return "Profile"
  if (route.startsWith("/groups/create")) return "Create Group"
  if (route.startsWith("/groups")) return "Groups"
  if (route.startsWith("/events/create")) return "Create Event"
  if (route.startsWith("/events")) return "Events"
}

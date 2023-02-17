export function getNavbarTitle(route: string) {
  switch (route) {
    case "/dashboard":
      return "Dashboard"
    case "/social":
      return "Social"
    case "/profile":
      return "Profile"
    case "/groups":
      return "Groups"
    case "/groups/create":
      return "Create Group"

    default:
      return "Sample Title"
  }
}

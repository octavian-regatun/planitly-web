export function getNavbarTitle(route: string) {
  switch (route) {
    case "/dashboard":
      return "Dashboard"
    case "/social":
      return "Social"
    case "/profile":
      return "Profile"

    default:
      return "Sample Title"
  }
}

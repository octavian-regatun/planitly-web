export function getNavbarTitle(route: string) {
  switch (route) {
    case "/dashboard":
      return "Dashboard"
    case "/social":
      return "Social"

    default:
      return "Sample Title"
  }
}

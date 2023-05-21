export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/api/:path*",
    "/calendar",
    "/friends/:path*",
    "/groups/:path*",
    "/events/:path*",
    "/users/:path*",
    "/settings/:path*",
  ],
};

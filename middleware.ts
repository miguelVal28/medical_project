import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Function executed only if the user is not authenticated
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        // Redirect to dashboard if already authenticated
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth) {
      // Redirect to login if unauthenticated
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware to these paths
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

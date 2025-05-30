import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // get the protected routes
  let unProtectedRoutes = ["/signin"];

  // Logic
  // case1 : if the user is authenticated , and if the current routes is protected , then continue the original request
  // case2 : if the user is authenticated , and if the current routes is not protected , then redirect the user to "/"
  // case3 : if the user is unAuthenticated , and if the current routes is  protected , then redirect the user to "/signin"

  const currentPath = request.nextUrl.pathname;
  // Figure out if the current route is protected or not
  const isNotProtectedRoute = unProtectedRoutes.every((unProtectedRoute) =>
    currentPath.includes(unProtectedRoute)
  );
  const isUserAuthenticated = request.cookies.get("next-auth.session-token");

  if (isUserAuthenticated && isNotProtectedRoute) {
    // case 1
    // "/signin"
    // redirect the user to "/"
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!isUserAuthenticated && !isNotProtectedRoute) {
    // case 3
    // "other protected routes"
    // redirect to "/signin"
    return NextResponse.redirect(new URL("/signin", request.url));
  } else {
    // case 2
    // continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.).*)",
  ],
};

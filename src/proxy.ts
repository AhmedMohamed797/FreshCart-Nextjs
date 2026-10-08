import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/cart",
  "/wishlist",
  "/orders",
  "/checkout",
  "/profile",
];

const authRoutes = ["/login", "/signup", "/forget-password", "/reset-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isAuthenticated = !!token;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginURL = new URL("/login", request.url);
    return NextResponse.redirect(loginURL);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/orders/:path*",
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",
  ],
};

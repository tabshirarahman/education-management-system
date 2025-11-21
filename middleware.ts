import { type NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const protectedRoutes = {
  admin: ["/admin"],
  student: ["/student"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("auth_token")?.value;

  // Check if route is protected
  const isAdminRoute = protectedRoutes.admin.some((route) =>
    pathname.startsWith(route)
  );
  const isStudentRoute = protectedRoutes.student.some((route) =>
    pathname.startsWith(route)
  );

  // If no token and trying to access protected route, redirect to login
  if ((isAdminRoute || isStudentRoute) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If token exists, verify it
  if (token && (isAdminRoute || isStudentRoute)) {
    const payload = verifyToken(token);

    if (!payload) {
      // Token is invalid or expired
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth_token");
      return response;
    }

    // Check role-based access
    if (isAdminRoute && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isStudentRoute && payload.role !== "student") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If user is logged in and tries to access login/register, redirect to dashboard
  if (token && (pathname === "/login" || pathname === "/register")) {
    const payload = verifyToken(token);
    if (payload) {
      const dashboardUrl = payload.role === "admin" ? "/admin" : "/student";
      return NextResponse.redirect(new URL(dashboardUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
  runtime: "nodejs",
};

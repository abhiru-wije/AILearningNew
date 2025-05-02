import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/children"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isPublicRoute = PUBLIC_ROUTES.includes(req.nextUrl.pathname);

  // If user is not authenticated and trying to access a protected page
  if (!isAuth && !isPublicRoute) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname); // Save where they were trying to go
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access a public page (like login)
  if (isAuth && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next(); // allow to continue
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)"],
};

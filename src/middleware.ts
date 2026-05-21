import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "resumeforge-dev-secret"
);
const COOKIE_NAME = "resumeforge_token";

const protectedPaths = ["/dashboard"];
const authPaths = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};

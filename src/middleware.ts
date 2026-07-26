import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (req.nextUrl.pathname === "/admin/login") {
      if (token) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    if (!token || (token as any).role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

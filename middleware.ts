import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
}

export const config = {
  matcher: "/auth/login",
};

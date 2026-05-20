// src/proxy.js

import { NextResponse } from "next/server";

export async function proxy(request) {
  // better-auth session cookie
  const sessionCookie =
    request.cookies.get("better-auth.session_token")?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/booked-sessions/:path*",
    "/tutors/:path*",
    "/add-tutor/:path*",
    "/my-tutors/:path*",
    "/update-tutor/:path*",
  ],
};
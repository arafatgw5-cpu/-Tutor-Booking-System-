// src/proxy.js

import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request) {
  // Use Better Auth's built-in helper instead of manually guessing the cookie name
  const sessionCookie = getSessionCookie(request);

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
import { NextResponse } from "next/server";

export async function proxy(request) {
 
  const isProduction = process.env.BETTER_AUTH_URL === "production";
  const cookieName = isProduction 
    ? "__Secure-better-auth.session_token" 
    : "better-auth.session_token";

  const sessionCookie = request.cookies.get(cookieName)?.value;

  console.log("Extracted Cookie:", sessionCookie);

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
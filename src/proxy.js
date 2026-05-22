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
// This middleware will run on all routes that match the specified patterns in the config below. It checks for the presence of the session cookie and redirects to the login page if it's not found.
export const config = {
  matcher: [
    "/booked-sessions/:path*",
   
    "/update-tutor/:path*",
  ],
};

 
import { NextResponse } from "next/server";

export async function proxy(request) {
  
  // লোকালহোস্ট এবং প্রোডাকশন (লাইভ) উভয়ের কুকি একসাথে চেক করার সবচেয়ে সেফ উপায়:
  const sessionCookie = 
    request.cookies.get("better-auth.session_token")?.value || 
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  console.log("Extracted Cookie:", sessionCookie);

  // যদি টোকেন না পাওয়া যায়, তবেই লগিন পেজে পাঠাবে
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
import { NextResponse } from "next/server";

export async function proxy(request) {
  // Better Auth লোকালহোস্টে এক নাম এবং প্রোডাকশনে অন্য নামে কুকি সেভ করে
  const isProduction = process.env.NODE_ENV === "production";
  const cookieName = isProduction 
    ? "__Secure-better-auth.session_token" 
    : "better-auth.session_token";

  // Next.js এর নেটিভ মেথড দিয়ে কুকি রিড করা
  const sessionCookie = request.cookies.get(cookieName)?.value;

  // ডিবাগ করার জন্য টার্মিনালে চেক করুন কুকি আসছে কি না
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
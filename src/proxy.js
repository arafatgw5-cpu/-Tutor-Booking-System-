import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // npm install jose

export async function proxy(request) {
  // ১. কুকি এক্সট্রাক্ট করা
  const sessionCookie = 
    request.cookies.get("better-auth.session_token")?.value || 
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // ২. কুকি না থাকলে লগইনে পাঠানো
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ৩. JWT ভেরিফাই করা
  try {
    // আপনার .env ফাইলে যে সিক্রেট কী দেওয়া আছে, সেটা দিয়ে ভেরিফাই করুন
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); 
    
    // টোকেনটি ভ্যালিড কি না এবং এক্সপায়ার হয়েছে কি না তা চেক করবে
    await jwtVerify(sessionCookie, secret); 
    
    // টোকেন সঠিক হলে রিকোয়েস্ট সামনে এগোতে দেবে
    return NextResponse.next();
    
  } catch (error) {
    // টোকেন ফেক হলে, টেম্পারড হলে বা এক্সপায়ার হয়ে গেলে ইউজারকে লগইনে পাঠিয়ে দেবে
    console.error("Invalid Token:", error.message);
    
    // ঐচ্ছিক: ইনভ্যালিড কুকিটি ডিলিট করে দেওয়া
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("better-auth.session_token");
    response.cookies.delete("__Secure-better-auth.session_token");
    
    return response;
  }
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
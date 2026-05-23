import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // npm install jose

export async function proxy(request) {
  // রিকোয়েস্টটি API নাকি সাধারণ পেজ সেটি চেক করা হচ্ছে
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');

  // ১. কুকি এক্সট্রাক্ট করা
  const sessionCookie = 
    request.cookies.get("better-auth.session_token")?.value || 
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // ২. কুকি না থাকলে লগইনে বা আনঅথরাইজড রেসপন্সে পাঠানো
  if (!sessionCookie) {
    if (isApiRoute) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ৩. JWT ভেরিফাই করা
  try {
    // Environment variable থেকে secret key নেওয়া
    const secretKey = process.env.JWT_SECRET_KEY || process.env.BETTER_AUTH_SECRET;
    
    if (!secretKey) {
      throw new Error("Secret key is missing in environment variables.");
    }

    const secret = new TextEncoder().encode(secretKey); 
    
    // টোকেনটি ভ্যালিড কি না এবং এক্সপায়ার হয়েছে কি না তা চেক করবে
    await jwtVerify(sessionCookie, secret); 
    
    // টোকেন সঠিক হলে রিকোয়েস্ট সামনে এগোতে দেবে
    return NextResponse.next();
    
  } catch (error) {
    // টোকেন ফেক হলে, টেম্পারড হলে বা এক্সপায়ার হয়ে গেলে:
    console.error("Proxy Auth Error:", error.message);
    
    // API রিকোয়েস্ট হলে 401 রেসপন্স দেবে
    if (isApiRoute) {
      return NextResponse.json({ message: "Invalid or expired token." }, { status: 401 });
    }

    // পেজ রিকোয়েস্ট হলে ইনভ্যালিড কুকি ডিলিট করে লগইনে পাঠিয়ে দেবে
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("better-auth.session_token");
    response.cookies.delete("__Secure-better-auth.session_token");
    
    return response;
  }
}

export const config = {
  // যেসব রাউটে এই প্রক্সি কাজ করবে তার লিস্ট
  matcher: [
    "/booked-sessions/:path*",
    "/tutors/:path*",
    "/add-tutor/:path*",
    "/my-tutors/:path*",
    "/update-tutor/:path*",
    // API রাউট প্রোটেক্ট করতে চাইলে নিচের লাইনটি আনকমেন্ট করুন:
    // "/api/tutors/:path*", 
  ], 
};
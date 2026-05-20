// src/proxy.js

import { NextResponse } from "next/server";

export async function proxy(request) {
  const token = request.cookies.get("token")?.value;

  // login না থাকলে login page এ যাবে
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/services/:path*",
  ],
};
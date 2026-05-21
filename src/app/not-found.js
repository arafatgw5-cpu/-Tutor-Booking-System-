// src/app/not-found.js

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>

      <p className="mt-4 text-lg text-gray-600">
        Page Not Found
      </p>

      <Link
        href="/"
        className="mt-6 px-5 py-2 bg-black text-white rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
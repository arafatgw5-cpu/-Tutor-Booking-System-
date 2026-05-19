"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (isPending) {
    return (
      <nav className="px-8 py-4 border-b">
        <p>Loading...</p>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link
          href="/"
          className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors"
        >
          Tutors-Finder
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
        >
          Home
        </Link>

        <Link
          href="/tutors"
          className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
        >
          Tutors
        </Link>

        {/* Logged In User Only */}
        {user && (
          <>
            <Link
              href="/add-tutor"
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              Add Tutors
            </Link>

            <Link
              href="/my-tutors"
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              My Tutors
            </Link>

            <Link
              href="/booked-sessions"
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              My Booked Session
            </Link>
          </>
        )}

        {/* Guest User Only */}
        {!user && (
          <>
            <Link
              href="/services"
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              Services
            </Link>

            <Link
              href="/about"
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 hover:text-teal-600 transition-all"
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all shadow-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
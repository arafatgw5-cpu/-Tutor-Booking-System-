"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current route
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Better Auth session
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  // Helper functions for dynamic classes based on active route
  const isActive = (path) => pathname === path;

  const desktopLinkClass = (path) =>
    `px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "text-teal-600 bg-teal-50 shadow-sm"
        : "text-gray-600 hover:text-teal-600 hover:bg-teal-50/50"
    }`;

  const mobileLinkClass = (path) =>
    `block px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
      isActive(path)
        ? "text-teal-600 bg-teal-50 shadow-sm border-l-4 border-teal-500"
        : "text-gray-700 hover:bg-teal-50 hover:text-teal-600 border-l-4 border-transparent"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (সবসময় থাকবে) */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-teal-600 hover:text-teal-700 transition-colors duration-200"
            >
              Tutors<span className="text-gray-800">Finder</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link href="/" className={desktopLinkClass("/")}>
              Home
            </Link>
            <Link href="/tutors" className={desktopLinkClass("/tutors")}>
              Tutors
            </Link>

            {isPending ? (
              // Loading Skeleton for Links
              <div className="flex space-x-2 px-2">
                <div className="h-8 w-20 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-8 w-24 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ) : user ? (
              // Logged In User Only
              <>
                <Link href="/add-tutor" className={desktopLinkClass("/add-tutor")}>
                  Add Tutors
                </Link>
                <Link href="/my-tutors" className={desktopLinkClass("/my-tutors")}>
                  My Tutors
                </Link>
                <Link href="/booked-sessions" className={desktopLinkClass("/booked-sessions")}>
                  My Booked Session
                </Link>
              </>
            ) : (
              // Guest User Only
              <>
                <Link href="/services" className={desktopLinkClass("/services")}>
                  Services
                </Link>
                <Link href="/about" className={desktopLinkClass("/about")}>
                  About
                </Link>
                <Link href="/contact" className={desktopLinkClass("/contact")}>
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              // Loading Skeleton for Auth
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-9 w-20 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-teal-100"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-semibold text-sm">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-red-50 hover:text-red-600 border border-gray-200/60 hover:border-red-100 rounded-xl transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm shadow-teal-600/10 hover:shadow transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200/80 rounded-xl transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {isPending ? (
              <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              user.image ? (
                <img src={user.image} alt="User" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-semibold text-xs border border-teal-100">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )
            ) : null}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/")}>Home</Link>
          <Link href="/tutors" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/tutors")}>Tutors</Link>

          {isPending ? (
             <div className="px-3 py-2 space-y-3">
                <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
             </div>
          ) : user ? (
            <>
              <Link href="/add-tutor" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/add-tutor")}>Add Tutors</Link>
              <Link href="/my-tutors" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/my-tutors")}>My Tutors</Link>
              <Link href="/booked-sessions" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/booked-sessions")}>My Booked Session</Link>
              <div className="pt-4 border-t border-gray-100 mt-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2.5 text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/services")}>Services</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/about")}>About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClass("/contact")}>Contact</Link>
              <div className="pt-4 border-t border-gray-100 mt-2 grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-4 py-2.5 text-base font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-sm transition-all">
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-4 py-2.5 text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
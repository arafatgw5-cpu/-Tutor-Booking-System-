"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
// import { useSession, signOut } from "@/lib/auth-client";

const NAV_LINKS = {
  guest: [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  user: [
    { href: "/tutors", label: "Tutors" },
    { href: "/add-tutor", label: "Add Tutors" },
    { href: "/my-tutors", label: "My Tutors" },
    { href: "/booked-sessions", label: "My Booked Session" },
  ],
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Better Auth সেশন হুক
  const { data: session, isPending } =authClient.useSession();
  const user = session?.user;

  // সেফ লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setIsMobileMenuOpen(false);
      router.push("/login");
      router.refresh(); // সার্ভার কম্পোনেন্টের ক্যাশ রিফ্রেশ করার জন্য
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // একটিভ রুট চেকার
  const isActive = (path) => pathname === path;

  // ডায়নামিক ক্লাসের ফাংশনসমূহ
  const getDesktopClass = (path) =>
    `px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "text-teal-600 bg-teal-50 shadow-sm"
        : "text-gray-600 hover:text-teal-600 hover:bg-teal-50/50"
    }`;

  const getMobileClass = (path) =>
    `block px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
      isActive(path)
        ? "text-teal-600 bg-teal-50 shadow-sm border-l-4 border-teal-500"
        : "text-gray-700 hover:bg-teal-50 hover:text-teal-600 border-l-4 border-transparent"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
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
            <Link href="/" className={getDesktopClass("/")}>
              Home
            </Link>

            {isPending ? (
              /* লিংক লোডিং কঙ্কাল (Skeleton) */
              <div className="flex space-x-2 px-2">
                <div className="h-8 w-20 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-8 w-24 bg-gray-100 rounded-xl animate-pulse" />
              </div>
            ) : user ? (
              /* শুধুমাত্র লগইন করা ইউজারদের জন্য */
              NAV_LINKS.user.map((link) => (
                <Link key={link.href} href={link.href} className={getDesktopClass(link.href)}>
                  {link.label}
                </Link>
              ))
            ) : (
              /* গেস্ট ইউজারদের জন্য */
              NAV_LINKS.guest.map((link) => (
                <Link key={link.href} href={link.href} className={getDesktopClass(link.href)}>
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
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
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
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
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileClass("/")}>
            Home
          </Link>

          {isPending ? (
             <div className="px-3 py-2 space-y-3">
                <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-10 w-full bg-gray-100 rounded-xl animate-pulse" />
             </div>
          ) : user ? (
            <>
              {NAV_LINKS.user.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={getMobileClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2.5 text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {NAV_LINKS.guest.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={getMobileClass(link.href)}
                >
                  {link.label}
                </Link>
              ))}
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
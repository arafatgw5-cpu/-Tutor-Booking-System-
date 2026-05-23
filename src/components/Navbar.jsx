// components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration mismatch এড়ানোর জন্য
  useEffect(() => setMounted(true), []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setIsMobileMenuOpen(false);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => pathname === path;

  const getDesktopClass = (path) =>
    `px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive(path)
        ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 shadow-sm"
        : "text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/20"
    }`;

  const getMobileClass = (path) =>
    `block px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
      isActive(path)
        ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 shadow-sm border-l-4 border-teal-500"
        : "text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400 border-l-4 border-transparent"
    }`;

  const ThemeToggle = () => {
    if (!mounted) return <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />;
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {theme === "dark" ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-black tracking-tight text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200">
              Tutors<span className="text-gray-800 dark:text-gray-100">Finder</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link href="/" className={getDesktopClass("/")}>Home</Link>
            {isPending ? (
              <div className="flex space-x-2 px-2">
                <div className="h-8 w-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-8 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              </div>
            ) : user ? (
              NAV_LINKS.user.map((link) => (
                <Link key={link.href} href={link.href} className={getDesktopClass(link.href)}>{link.label}</Link>
              ))
            ) : (
              NAV_LINKS.guest.map((link) => (
                <Link key={link.href} href={link.href} className={getDesktopClass(link.href)}>{link.label}</Link>
              ))
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? (
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
                <div className="h-9 w-20 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
              </div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                {user.image ? (
                  <img src={user.image} alt={user.name || "User"} className="h-9 w-9 rounded-full object-cover ring-2 ring-teal-100 dark:ring-teal-900" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-400 font-semibold text-sm">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 border border-gray-200/60 dark:border-gray-800 hover:border-red-100 dark:hover:border-red-900/50 rounded-xl transition-all duration-200">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-xl shadow-sm shadow-teal-600/10 hover:shadow transition-all duration-200">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/80 dark:border-gray-800 rounded-xl transition-all duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            {isPending ? (
              <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
            ) : user ? (
              user.image ? (
                <img src={user.image} alt="User" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-700 dark:text-teal-400 font-semibold text-xs border border-teal-100 dark:border-teal-800">
                  {user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )
            ) : null}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors duration-200" aria-label="Toggle menu">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 pt-2 pb-4 space-y-1 shadow-inner animate-in fade-in slide-in-from-top-2 duration-200">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileClass("/")}>Home</Link>
          {isPending ? (
             <div className="px-3 py-2 space-y-3">
                <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                <div className="h-10 w-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
             </div>
          ) : user ? (
            <>
              {NAV_LINKS.user.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={getMobileClass(link.href)}>{link.label}</Link>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
                <button onClick={handleLogout} className="w-full text-center px-4 py-2.5 text-base font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-all">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {NAV_LINKS.guest.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={getMobileClass(link.href)}>{link.label}</Link>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-2 grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-4 py-2.5 text-base font-medium text-white bg-teal-600 dark:bg-teal-500 hover:bg-teal-700 dark:hover:bg-teal-600 rounded-xl shadow-sm transition-all">Login</Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center px-4 py-2.5 text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-xl transition-all">Register</Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
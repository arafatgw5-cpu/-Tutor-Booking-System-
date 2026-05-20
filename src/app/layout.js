import { Inter, DM_Sans, DM_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import dns from 'dns'; // ❌ const dns = require("dns") বাদ দিয়ে ES Import ব্যবহার করুন

// ✅ DNS Fix for MongoDB Connection
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const inter = Inter({ subsets: ["latin"] });

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
});

export const metadata = {
  title: "MediQueue - Smart Tutor Booking",
  description: "Book expert tutors for personalized learning",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dmSans.variable} ${dmMono.variable} ${dmSerif.variable} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors`}>
        <Toaster position="top-right" />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
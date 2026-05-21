/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Proxy Setup (Backend এর সাথে কানেক্ট করার জন্য)
  // Auth routes (/api/auth/*) are excluded so Better Auth handles them in Next.js.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/auth/:path*',
          destination: '/api/auth/:path*',  // keep auth routes local
        },
      ],
      afterFiles: [],
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/:path*`,
        },
      ],
    };
  },

  // ✅ Image Optimization (বাহিরের ইমেজ লোড করার জন্য)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'arafat-nexus-2.vercel.app', // ✅ নতুন লিংকটি এখানে অ্যাড করা হয়েছে
      },
    ],
  },
  

};  

export default nextConfig; // ✅ ES Module সিনট্যাক্স
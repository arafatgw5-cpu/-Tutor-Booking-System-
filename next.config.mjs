/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      // Local API routes (like /api/auth) will run before fallback kicks in
      // fallback: [
      //   {
      //     source: '/api/:path*',
      //     destination: `${process.env.NEXT_PUBLIC_URL || "https://tutor-booking-system-b-9-13.vercel.app"}/api/:path*`,
      //   },
      // ],
    };
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**' },
      { protocol: 'https', hostname: 'arafat-nexus-2.vercel.app' },
    ],
  },
};  

export default nextConfig;
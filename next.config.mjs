/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Proxy Setup (Backend এর সাথে কানেক্ট করার জন্য)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
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
  
  // 💡 নোট: Turbopack এর 'turbo' কি (key) টি রিমুভ করা হয়েছে যা ওয়ার্নিং দিচ্ছিল।
  // Next.js এখন ডিফল্টভাবেই সব স্ট্যান্ডার্ড এক্সটেনশন (.js, .jsx, ইত্যাদি) নিজে থেকেই চিনে নেয়।
};  

export default nextConfig; // ✅ ES Module সিনট্যাক্স
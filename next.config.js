/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'img.youtube.com',
      'i.ytimg.com',
      'encrypted-tbn0.gstatic.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Enable static exports
  output: 'standalone',
  // Enable CSS optimization
  optimizeFonts: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Enable modern CSS features
    optimizeCss: true,
    // Enable modern JavaScript features
    optimizePackageImports: ['framer-motion'],
  },
}

module.exports = nextConfig
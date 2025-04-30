/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure output is standalone for better compatibility
  output: 'standalone',
  
  // Enable React strict mode for better development
  reactStrictMode: true,
  
  // Add any experimental features if needed
  // experimental: {},
  
  // Add any redirects if needed
  async redirects() {
    return [
      // Example redirect if needed
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ]
  },
  
  // Add any rewrites if needed
  async rewrites() {
    return [
      // Example rewrite if needed
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ]
  },
}

module.exports = nextConfig
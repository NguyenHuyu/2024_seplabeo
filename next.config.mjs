/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        hostname: 'tailwindcss.com',
        protocol: 'https'
      },
      {
        hostname: 'images.pexels.com',
        protocol: 'https'
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https'
      },
      {
        hostname: 'plus.unsplash.com',
        protocol: 'https'
      },
      {
        hostname: 'www.stockvault.net',
        protocol: 'https'
      },
      {
        hostname: 'flowbite.s3.amazonaws.com',
        protocol: 'https'
      },
      {
        hostname: 'utfs.io',
        protocol: 'https'
      },
      {
        hostname: 'localhost',
        protocol: 'https'
      },
      {
        hostname: 'raw.githubusercontent.com',
        protocol: 'https'
      },
      {
        hostname: 'seplabeo.com',
        protocol: 'https'
      },
      {
        hostname: 'app-router.vercel.app',
        protocol: 'https'
      }
    ]
  }
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true // Needed for static export to avoid Next.js Image errors
  }
}

module.exports = nextConfig

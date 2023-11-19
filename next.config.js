/** @type {import('next').NextConfig} */
const nextConfig = {
  // To prevent certain packages from being included in the client bundle
  // EX: Do not want bcrypt on the browser
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
  },
  images: {
    remotePatterns: [
      { hostname: 'lufqyyqknnqe84vp.public.blob.vercel-storage.com' }
    ]
  }
}

module.exports = nextConfig

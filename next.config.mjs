/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: [ "image/avif", "image/webp" ],
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ]
  },
  // Enable compression for better performance
  compress: true,
  // Production source maps disabled for better performance
  productionBrowserSourceMaps: false,
  // Optimize bundle size
  optimizeFonts: true,
  // Trailing slash for consistency
  trailingSlash: false,
  // Clean URLs
  cleanUrls: true,
}

export default nextConfig

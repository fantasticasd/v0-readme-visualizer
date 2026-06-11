/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — produces a fully self-contained `out/` directory.
  // Compatible with GitHub Pages, Netlify, Cloudflare Pages, and local file serving.
  output: 'export',

  // Emit index.html inside each route directory so static hosts resolve
  // /viewer → /viewer/index.html without needing a server rewrite rule.
  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  // Images must be unoptimized for static export (no Next.js image server).
  images: {
    unoptimized: true,
  },
}

export default nextConfig

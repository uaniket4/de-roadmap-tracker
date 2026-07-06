/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    // ESLint runs separately in CI; skip during next build to avoid dep conflicts
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;


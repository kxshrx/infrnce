/** @type {import('next').NextConfig} */
const nextConfig = {
  // Clean production build configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

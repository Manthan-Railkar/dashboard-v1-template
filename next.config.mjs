/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Optimize package imports to speed up dev compilation and tree-shaking
  experimental: {
    optimizePackageImports: ["lucide-react", "motion/react", "motion", "gsap"],
  },
  // Ensure source maps don't slow down dev rebuilds
  productionBrowserSourceMaps: false,
};

export default nextConfig;

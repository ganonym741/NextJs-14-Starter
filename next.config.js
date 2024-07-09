/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
      ignoreDuringBuilds: true,
  },
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  skipTrailingSlashRedirect: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);

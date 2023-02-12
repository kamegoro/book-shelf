/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  env: {
    PINATA_API: process.env.PINATA_API_KEY,
    PINATA_SECRET: process.env.PINATA_SECRET_API_KEY,
  }
};

module.exports = nextConfig;

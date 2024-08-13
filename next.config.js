// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables strict mode for React
    swcMinify: true, // Enables SWC-based minification for faster builds
    images: {
      domains: ['images.unsplash.com'], // List of allowed image domains
    },
    webpack: (config, { isServer }) => {
      // Custom webpack configurations (if needed)
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      return config;
    },
    // Uncomment and configure the following lines if using environment variables
    // env: {
    //   CUSTOM_API_URL: process.env.CUSTOM_API_URL,
    // },
  };
  
  module.exports = nextConfig;
  
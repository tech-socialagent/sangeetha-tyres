/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const withVideos = require('next-videos')

module.exports = {
  ...nextConfig,
  ...withVideos(),
  images: {
      domains: ['firebasestorage.googleapis.com'],
  },
};
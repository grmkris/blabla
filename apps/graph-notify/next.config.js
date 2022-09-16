/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: true,
  distDir: 'build',
  images: {
    domains: ['defillama.com'],
  },
});
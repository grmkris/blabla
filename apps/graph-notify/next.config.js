/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui", "react-icons"]);

module.exports = withTM({
  reactStrictMode: true,
  distDir: "build",
  images: {
    domains: ["defillama.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});

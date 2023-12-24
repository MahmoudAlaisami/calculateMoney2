/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // distDir: "build",
  output: "export",
  distDir: "dist",
  trailingSlash: true,
};

module.exports = nextConfig;

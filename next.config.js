/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // Note: redirects are not supported in static export mode
  // favicon.ico -> favicon.svg redirect is handled by src/worker.js
};

module.exports = nextConfig;



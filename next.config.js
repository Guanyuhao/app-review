/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      // 不提供 .ico，统一让浏览器用 svg，避免 /favicon.ico 被动态路由误匹配导致 dev 500
      { source: "/favicon.ico", destination: "/favicon.svg", permanent: true }
    ];
  }
};

module.exports = nextConfig;



/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  exportPathMap: () => {
    return { "/": { page: "/home" } };
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true
      }
    ];
  },
  images: {
    domains: ["k.kakaocdn.net"]
  },
  webpack: config => {
    config.resolve.alias["@"] = path.join(__dirname, "src");

    return config;
  }
};

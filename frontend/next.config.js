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
  webpack: config => {
    config.resolve.alias["@"] = path.join(__dirname, "./");

    return config;
  }
};

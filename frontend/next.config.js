/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  exportPathMap: () => {
    return { "/": { page: "/home" } };
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(__dirname, "src");

    return config;
  },
};

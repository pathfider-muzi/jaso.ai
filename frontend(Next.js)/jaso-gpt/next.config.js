/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  exportPathMap: () => {
    return { "/": { page: "/home" } };
  },
};

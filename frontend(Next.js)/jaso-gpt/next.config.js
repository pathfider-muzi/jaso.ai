/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    async redirects() {
      return [
        { source: "/", destination: "/home", permanent: true }, // a permanent redirect
      ];
    },
  },
};

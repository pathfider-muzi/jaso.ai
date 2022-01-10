const path = require("path");
const resolvePath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ["../components/**/__tests__/stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  typescript: { reactDocgen: false },
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@emotion/styled": resolvePath("node_modules/@emotion/styled"),
      },
    },
  }),
};

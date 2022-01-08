module.exports = {
  stories: ["../components/**/__tests__/stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  typescript: { reactDocgen: false },
};

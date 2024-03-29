module.exports = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/*.stores.@(js|jsx|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],

  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },

  docs: {
    autodocs: true
  }
}
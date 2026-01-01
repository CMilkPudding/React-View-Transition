import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import WindiCss from 'vite-plugin-windicss';

const config: StorybookConfig = {
  "stories": [
    "../storybook/**/*.mdx",
    '../storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [WindiCss()],
    });
  },
};
export default config;
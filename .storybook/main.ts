import type { StorybookConfig } from '@storybook/react-vite'
import type { InlineConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config: InlineConfig) {
    return {
      ...config,
      server: {
        ...config.server,
        headers: {
          'X-Frame-Options': 'ALLOWALL',
        },
      },
    }
  },
}

export default config

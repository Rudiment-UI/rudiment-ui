import type { StorybookConfig } from '@storybook/react-vite'
import type { InlineConfig } from 'vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
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

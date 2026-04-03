import { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import '../src/app.css'

const preview: Preview = {
  parameters: {
    options: {
      categorySort: {
        order: ['Appearance', 'Content', 'Layout', 'State', 'Events'],
      },
      storySort: {
        order: [
          'Getting Started',
          [
            'Introduction',
            'Accessibility',
            'Token Architecture',
            'Layout Primitives',
            'Typography',
            'Component Guidelines',
            'Theming',
          ],
          'Components',
          'Layouts',
          'Typography',
          'Examples',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {},
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Default Light', icon: 'sun' },
          { value: 'dark', title: 'Default Dark', icon: 'moon' },
          { value: 'teal', title: 'Teal Light', icon: 'sun' },
          { value: 'teal-dark', title: 'Teal Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light'
      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        return () => document.documentElement.removeAttribute('data-theme')
      }, [theme])
      return (
        <div
          style={{
            padding: '2rem',
            backgroundColor: 'var(--token-color-background-surface)',
            color: 'var(--token-color-text-default)',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview

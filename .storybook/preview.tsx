import { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import { useArgs } from 'storybook/preview-api'
import { create } from 'storybook/theming/create'
import '../src/app.css'

// Light docs theme so the "Show code" Source block renders the dark-on-light
// `lightSyntaxColors` palette. Without it the block falls back to the dark
// syntax palette (light tokens), which is illegible on the light code surface
// set in preview-head.html. Mirrors the light brand theme in manager.ts.
const docsTheme = create({
  base: 'light',
  fontBase:
    '"InterVariable", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  fontCode:
    '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
})

const preview: Preview = {
  parameters: {
    docs: {
      theme: docsTheme,
    },
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
          { value: 'cyberpunk', title: 'Cyberpunk Light', icon: 'sun' },
          { value: 'cyberpunk-dark', title: 'Cyberpunk Dark', icon: 'moon' },
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
            backgroundColor: 'var(--rudi-color-background-surface)',
            color: 'var(--rudi-color-text-default)',
            fontFamily:
              '"InterVariable", "Inter", ui-sans-serif, system-ui, sans-serif',
          }}
        >
          <Story />
        </div>
      )
    },
    // Sync controlled-prop args with onChange so form elements (Checkbox,
    // Switch, Input, RadioGroup, Select) remain interactive when a controlled
    // prop like `value`, `isSelected`, or `selectedKey` is set in meta.args.
    (Story) => {
      const [args, updateArgs] = useArgs<Record<string, unknown>>()
      const hasIsSelected = 'isSelected' in args
      const hasValue = 'value' in args
      const hasSelectedKey = 'selectedKey' in args

      if (!hasIsSelected && !hasValue && !hasSelectedKey) {
        return <Story />
      }

      const originalOnChange = args.onChange as
        | ((v: unknown) => void)
        | undefined
      const originalOnSelectionChange = args.onSelectionChange as
        | ((v: unknown) => void)
        | undefined

      const override: Record<string, unknown> = {}

      if (hasIsSelected || hasValue) {
        override.onChange = (newValue: unknown) => {
          if (hasIsSelected) updateArgs({ isSelected: newValue })
          if (hasValue) updateArgs({ value: newValue })
          originalOnChange?.(newValue)
        }
      }

      if (hasSelectedKey) {
        override.onSelectionChange = (newValue: unknown) => {
          updateArgs({ selectedKey: newValue })
          originalOnSelectionChange?.(newValue)
        }
      }

      return <Story args={{ ...args, ...override }} />
    },
  ],
}

export default preview

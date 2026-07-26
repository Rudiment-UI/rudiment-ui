import type { Meta, StoryObj } from '@storybook/react'
import { RudiLink } from './Link'

const meta = {
  title: 'Components/Link',
  component: RudiLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled anchor with variants, configurable underline behavior, and safe external-link handling.',
      },
    },
  },
  args: {
    href: '#',
    variant: 'default',
    underline: 'hover',
    external: false,
    children: 'Learn more',
  },
  argTypes: {
    href: { control: 'text', table: { category: 'Content' } },
    children: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'inline-radio',
      options: ['default', 'subtle', 'standalone'],
      table: { category: 'Appearance' },
    },
    underline: {
      control: 'inline-radio',
      options: ['always', 'hover', 'none'],
      table: { category: 'Appearance' },
    },
    external: { control: 'boolean', table: { category: 'Behavior' } },
  },
} satisfies Meta<typeof RudiLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Subtle: Story = {
  args: { variant: 'subtle', children: 'Terms of service' },
}

export const Standalone: Story = {
  args: { variant: 'standalone', external: true, children: 'View the docs' },
}

export const InProse: Story = {
  render: () => (
    <p>
      Read the <RudiLink href="#">getting-started guide</RudiLink> or browse the{' '}
      <RudiLink href="https://example.com" external>
        API reference
      </RudiLink>
      .
    </p>
  ),
}

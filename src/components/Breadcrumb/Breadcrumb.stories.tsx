import type { Meta, StoryObj } from '@storybook/react'
import { RudiBreadcrumb } from './Breadcrumb'

const meta = {
  title: 'Components/Breadcrumb',
  component: RudiBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A navigation trail. The last item is the current page; earlier items with an `href` are links.',
      },
    },
  },
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Shoes', href: '/shoes' },
      { label: 'Running', href: '/shoes/running' },
      { label: 'Trail Blazer 2' },
    ],
    separator: 'lucide:chevron-right',
  },
  argTypes: {
    separator: { control: 'text', table: { category: 'Appearance' } },
    label: { control: 'text', table: { category: 'Accessibility' } },
  },
} satisfies Meta<typeof RudiBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SlashSeparator: Story = {
  args: { separator: 'lucide:slash' },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings' },
    ],
  },
}

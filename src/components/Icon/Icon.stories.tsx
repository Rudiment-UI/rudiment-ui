import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper component for rendering icons with consistent sizing and color via Iconify.',
      },
    },
  },
  args: {
    icon: 'lucide:home',
    size: 'md',
    label: 'Icon label',
    className: '',
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'The Iconify icon identifier (e.g. "lucide:home")',
      table: { category: 'Content' },
    },
    label: {
      control: 'text',
      description:
        'Accessible label for the icon. When provided, the icon is treated as meaningful (role="img"). When omitted, the icon is decorative (aria-hidden="true").',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        'Preset size or a custom numeric pixel value for width and height',
      table: { category: 'Appearance' },
    },
    color: {
      control: 'color',
      description: 'Custom color applied via inline style',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the icon wrapper',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const CustomSize: Story = {
  args: {
    size: 32,
  },
}

export const CustomColor: Story = {
  args: {
    color: 'red',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Home',
  },
}

export const Decorative: Story = {
  args: {
    icon: 'lucide:star',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Icon icon="lucide:home" size="sm" label="Small" />
      <Icon icon="lucide:home" size="md" label="Medium" />
      <Icon icon="lucide:home" size="lg" label="Large" />
    </div>
  ),
}

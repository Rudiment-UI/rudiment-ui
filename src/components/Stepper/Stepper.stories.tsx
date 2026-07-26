import type { Meta, StoryObj } from '@storybook/react'
import { RudiStepper } from './Stepper'

const meta = {
  title: 'Components/Stepper',
  component: RudiStepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A discrete step indicator. Use `orientation="horizontal"` for a progress track (checkout, delivery) or `orientation="vertical"` for a timeline.',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    size: 'md',
    steps: [
      { label: 'Ordered', icon: 'lucide:package', status: 'complete' },
      { label: 'Packed', icon: 'lucide:box', status: 'complete' },
      { label: 'Shipped', icon: 'lucide:truck', status: 'current' },
      { label: 'Delivered', icon: 'lucide:home', status: 'upcoming' },
    ],
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { category: 'Layout' },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof RudiStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      {
        label: 'Order placed',
        description: 'We received your order.',
        icon: 'lucide:package',
        status: 'complete',
      },
      {
        label: 'In transit',
        description: 'Your package is on the way.',
        icon: 'lucide:truck',
        status: 'current',
      },
      {
        label: 'Out for delivery',
        description: 'Arriving today.',
        icon: 'lucide:map-pin',
        status: 'upcoming',
      },
    ],
  },
}

export const Numbered: Story = {
  args: {
    steps: [
      { label: 'Cart', status: 'complete' },
      { label: 'Shipping', status: 'current' },
      { label: 'Payment', status: 'upcoming' },
      { label: 'Review', status: 'upcoming' },
    ],
  },
}

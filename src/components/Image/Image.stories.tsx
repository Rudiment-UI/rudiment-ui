import type { Meta, StoryObj } from '@storybook/react'
import { RudiImage } from './Image'
import { RudiBadge } from '../Badge/Badge'

const PHOTO =
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80'

const meta = {
  title: 'Components/Image',
  component: RudiImage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A framed, aspect-ratio-aware image with object-fit control, radius presets, and an overlay slot for badges or scrims.',
      },
    },
  },
  args: {
    src: PHOTO,
    alt: 'A framed photograph',
    aspectRatio: '4 / 3',
    fit: 'cover',
    radius: 'md',
  },
  argTypes: {
    aspectRatio: { control: 'text', table: { category: 'Layout' } },
    fit: {
      control: 'inline-radio',
      options: ['cover', 'contain'],
      table: { category: 'Layout' },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      table: { category: 'Appearance' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RudiImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Square: Story = {
  args: { aspectRatio: '1 / 1' },
}

export const WithOverlay: Story = {
  args: {
    aspectRatio: '1 / 1',
    overlay: (
      <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
        <RudiBadge variant="error">Sale</RudiBadge>
      </div>
    ),
  },
}

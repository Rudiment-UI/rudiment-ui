import type { Meta, StoryObj } from '@storybook/react'
import { RudiSectionHeader } from './SectionHeader'
import { RudiButton } from '@/components/Button/Button'

const meta = {
  title: 'Components/SectionHeader',
  component: RudiSectionHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A section-level heading composite: a title with an optional description and a trailing action such as a "see all" link.',
      },
    },
  },
  args: {
    title: 'Recent activity',
  },
  argTypes: {
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    headingLevel: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof RudiSectionHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  args: {
    description: 'Across all projects, last 30 days.',
    action: (
      <RudiButton variant="ghost" size="sm" iconAfter="lucide:arrow-right">
        See all
      </RudiButton>
    ),
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { RudiCard } from './Card'

const meta = {
  title: 'Components/Card',
  component: RudiCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A container component with optional Header, Body, and Footer slots. Supports outlined and elevated styles.',
      },
    },
  },
  args: {
    variant: 'outlined',
    padding: 'md',
    className: '',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'The visual style of the card',
      table: { category: 'Appearance' },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'The internal padding applied to card slots',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the card',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof RudiCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <RudiCard {...args}>
      <RudiCard.Body>
        <p>This is a basic card with body content.</p>
      </RudiCard.Body>
    </RudiCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card variant="outlined" padding="md">
  <Card.Body>
    <p>This is a basic card with body content.</p>
  </Card.Body>
</Card>`,
      },
    },
  },
}

export const WithHeaderAndFooter: Story = {
  args: {
    children: undefined,
  },
  render: (args) => (
    <RudiCard {...args}>
      <RudiCard.Header>
        <h3>Card Title</h3>
      </RudiCard.Header>
      <RudiCard.Body>
        <p>
          This card uses all three slots: Header, Body, and Footer. Each slot
          inherits the padding set on the parent Card.
        </p>
      </RudiCard.Body>
      <RudiCard.Footer>
        <button type="button">Action</button>
      </RudiCard.Footer>
    </RudiCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card variant="outlined" padding="md">
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>This card uses all three slots: Header, Body, and Footer.</p>
  </Card.Body>
  <Card.Footer>
    <button type="button">Action</button>
  </Card.Footer>
</Card>`,
      },
    },
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: undefined,
  },
  render: (args) => (
    <RudiCard {...args}>
      <RudiCard.Body>
        <p>An outlined card with a visible border.</p>
      </RudiCard.Body>
    </RudiCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card variant="outlined">
  <Card.Body>
    <p>An outlined card with a visible border.</p>
  </Card.Body>
</Card>`,
      },
    },
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: undefined,
  },
  render: (args) => (
    <RudiCard {...args}>
      <RudiCard.Body>
        <p>An elevated card with a box shadow.</p>
      </RudiCard.Body>
    </RudiCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card variant="elevated">
  <Card.Body>
    <p>An elevated card with a box shadow.</p>
  </Card.Body>
</Card>`,
      },
    },
  },
}

export const NoPadding: Story = {
  args: {
    variant: 'outlined',
    padding: 'none',
    children: undefined,
  },
  render: (args) => (
    <RudiCard {...args}>
      <RudiCard.Body>
        <p>
          A card with no padding, useful for full-bleed content like images.
        </p>
      </RudiCard.Body>
    </RudiCard>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card variant="outlined" padding="none">
  <Card.Body>
    <p>A card with no padding.</p>
  </Card.Body>
</Card>`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <RudiCard variant="default" padding="md">
        <RudiCard.Header>
          <h3>Default</h3>
        </RudiCard.Header>
        <RudiCard.Body>
          <p>Background only.</p>
        </RudiCard.Body>
      </RudiCard>
      <RudiCard variant="outlined" padding="md">
        <RudiCard.Header>
          <h3>Outlined</h3>
        </RudiCard.Header>
        <RudiCard.Body>
          <p>With a border.</p>
        </RudiCard.Body>
      </RudiCard>
      <RudiCard variant="elevated" padding="md">
        <RudiCard.Header>
          <h3>Elevated</h3>
        </RudiCard.Header>
        <RudiCard.Body>
          <p>With a shadow.</p>
        </RudiCard.Body>
      </RudiCard>
    </div>
  ),
}

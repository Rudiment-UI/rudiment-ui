import type { Meta, StoryObj } from '@storybook/react'
import { Prose } from './Prose'

const meta = {
  title: 'Typography/Prose',
  component: Prose,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A container that applies beautiful typographic rhythm to long-form content. Automatically handles spacing for paragraphs, headings, lists, and code blocks.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'text',
      description:
        "The HTML element to render (e.g., 'div', 'article', 'section')",
      table: { category: 'Content' },
    },
    children: {
      description: 'The long-form content rendered inside the prose container',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The overall text size for the prose content',
      table: { category: 'Appearance' },
    },
    className: {
      description:
        'Additional CSS class names to apply to the prose container',
      table: { category: 'Appearance' },
    },
  },
  args: {
    size: 'base',
  },
} satisfies Meta<typeof Prose>

export default meta
type Story = StoryObj<typeof meta>

const SampleContent = () => (
  <>
    <h2>Section heading</h2>
    <p>
      This is a paragraph of body text. Prose handles the vertical rhythm
      between all child elements so you don't have to manage spacing manually.
    </p>
    <h3>Sub-section heading</h3>
    <p>
      Another paragraph. Notice the extra space before headings and the tighter
      gap between a heading and the content that follows it.
    </p>
    <pre>
      <code>{`const greeting = 'hello world'`}</code>
    </pre>
    <p>Text after a code block also gets extra breathing room.</p>
  </>
)

export const Default: Story = {
  render: (args) => (
    <Prose {...args}>
      <h2>Section heading</h2>
      <p>
        This is a paragraph of body text. Prose handles the vertical rhythm
        between all child elements so you don't have to manage spacing manually.
      </p>
      <h3>Sub-section heading</h3>
      <p>
        Another paragraph. Notice the extra space before headings and the
        tighter gap between a heading and the content that follows it.
      </p>
      <ul>
        <li>Lists get spaced out too.</li>
        <li>And nested lists...</li>
        <li>
          <ul>
            <li>...with appropriate spacing at each level.</li>
          </ul>
        </li>
      </ul>
      <p>Paragraphs after lists also get extra space.</p>
      <pre>
        <code>{`const greeting = 'hello world'`}</code>
      </pre>
      <p>Text after a code block also gets extra breathing room.</p>
    </Prose>
  ),
}

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Prose {...args}>
      <SampleContent />
    </Prose>
  ),
}

export const Large: Story = {
  args: { size: 'lg' },
  render: (args) => (
    <Prose {...args}>
      <SampleContent />
    </Prose>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {(['sm', 'base', 'lg'] as const).map((size) => (
        <div key={size}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
            size="{size}"
          </p>
          <Prose size={size}>
            <SampleContent />
          </Prose>
        </div>
      ))}
    </div>
  ),
}

export const AsArticle: Story = {
  render: () => (
    <Prose as="article">
      <SampleContent />
    </Prose>
  ),
}

export const CustomClassName: Story = {
  args: { className: 'border border-dashed p-4' },
  render: (args) => (
    <Prose {...args}>
      <SampleContent />
    </Prose>
  ),
}

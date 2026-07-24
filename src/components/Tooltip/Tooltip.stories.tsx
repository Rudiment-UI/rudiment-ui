import type { Meta, StoryObj } from '@storybook/react'
import { RudiTooltip, RudiTooltipTrigger, type RudiTooltipTriggerProps } from './Tooltip'
import { RudiButton } from '../Button/Button'
import { RudiIconButton } from '../IconButton/IconButton'

const InfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 7v4M8 5.5v.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

type TooltipStoryArgs = Omit<RudiTooltipTriggerProps, 'children'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<TooltipStoryArgs> = {
  title: 'Components/Tooltip',
  component: RudiTooltipTrigger as any,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A small text label that appears on hover or focus to provide supplementary information. Configurable open and close delays.',
      },
    },
  },
  args: {
    delay: 500,
    closeDelay: 0,
  },
  decorators: [
    (Story) => (
      <div
        style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}
      >
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <RudiTooltipTrigger {...(args as RudiTooltipTriggerProps)}>
      <RudiButton variant="secondary">Hover me</RudiButton>
      <RudiTooltip>This is a helpful tooltip</RudiTooltip>
    </RudiTooltipTrigger>
  ),
  argTypes: {
    delay: {
      control: 'number',
      description: 'Milliseconds to wait before showing the tooltip on hover',
      table: { category: 'Appearance' },
    },
    closeDelay: {
      control: 'number',
      description:
        'Milliseconds to wait before hiding the tooltip after the pointer leaves',
      table: { category: 'Appearance' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TooltipTrigger>
  <Button variant="secondary">Hover me</Button>
  <Tooltip>This is a helpful tooltip</Tooltip>
</TooltipTrigger>`,
      },
    },
  },
}

export const OnIconButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TooltipTrigger>
  <IconButton aria-label="More information" variant="ghost">
    <InfoIcon />
  </IconButton>
  <Tooltip>Additional context about this field</Tooltip>
</TooltipTrigger>`,
      },
    },
  },
  render: ({}) => (
    <RudiTooltipTrigger>
      <RudiIconButton aria-label="More information" variant="ghost">
        <InfoIcon />
      </RudiIconButton>
      <RudiTooltip>Additional context about this field</RudiTooltip>
    </RudiTooltipTrigger>
  ),
}

export const NoDelay: Story = {
  args: {
    delay: 0,
  },
  parameters: {
    docs: {
      source: {
        code: `<TooltipTrigger delay={0}>
  <Button variant="secondary">Instant tooltip</Button>
  <Tooltip>Appears immediately on hover</Tooltip>
</TooltipTrigger>`,
      },
    },
  },
  render: (args) => (
    <RudiTooltipTrigger {...(args as RudiTooltipTriggerProps)}>
      <RudiButton variant="secondary">Instant tooltip</RudiButton>
      <RudiTooltip>Appears immediately on hover</RudiTooltip>
    </RudiTooltipTrigger>
  ),
}

export const MultipleTooltips: Story = {
  parameters: {
    docs: {
      source: {
        code: `<>
  <TooltipTrigger>
    <Button variant="primary">Save</Button>
    <Tooltip>Save all changes</Tooltip>
  </TooltipTrigger>
  <TooltipTrigger>
    <Button variant="secondary">Preview</Button>
    <Tooltip>Preview before publishing</Tooltip>
  </TooltipTrigger>
  <TooltipTrigger>
    <Button variant="ghost">Discard</Button>
    <Tooltip>Discard unsaved changes</Tooltip>
  </TooltipTrigger>
</>`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '4rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: ({}) => (
    <>
      <RudiTooltipTrigger>
        <RudiButton variant="primary">Save</RudiButton>
        <RudiTooltip>Save all changes</RudiTooltip>
      </RudiTooltipTrigger>
      <RudiTooltipTrigger>
        <RudiButton variant="secondary">Preview</RudiButton>
        <RudiTooltip>Preview before publishing</RudiTooltip>
      </RudiTooltipTrigger>
      <RudiTooltipTrigger>
        <RudiButton variant="ghost">Discard</RudiButton>
        <RudiTooltip>Discard unsaved changes</RudiTooltip>
      </RudiTooltipTrigger>
    </>
  ),
}

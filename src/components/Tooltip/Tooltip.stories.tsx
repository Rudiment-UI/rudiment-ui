import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipTrigger, type TooltipTriggerProps } from './Tooltip'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

type TooltipStoryArgs = Omit<TooltipTriggerProps, 'children'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<TooltipStoryArgs> = {
  title: 'Components/Tooltip',
  component: TooltipTrigger as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <TooltipTrigger {...(args as TooltipTriggerProps)}>
      <Button variant="secondary">Hover me</Button>
      <Tooltip>This is a helpful tooltip</Tooltip>
    </TooltipTrigger>
  ),
  argTypes: {
    delay: { control: 'number' },
    closeDelay: { control: 'number' },
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
  render: () => (
    <TooltipTrigger>
      <IconButton aria-label="More information" variant="ghost">
        <InfoIcon />
      </IconButton>
      <Tooltip>Additional context about this field</Tooltip>
    </TooltipTrigger>
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
    <TooltipTrigger {...(args as TooltipTriggerProps)}>
      <Button variant="secondary">Instant tooltip</Button>
      <Tooltip>Appears immediately on hover</Tooltip>
    </TooltipTrigger>
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
      <div style={{ padding: '4rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
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
    </>
  ),
}

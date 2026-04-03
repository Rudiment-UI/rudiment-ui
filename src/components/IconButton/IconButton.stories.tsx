import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

// Minimal inline SVG icons for demonstration purposes
const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4l8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M8 3v10M3 8h10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "A compact button containing only an icon. Requires an accessible label via the aria-label prop. Shares Button's visual variants and sizes.",
      },
    },
  },
  args: {
    variant: 'secondary',
    size: 'md',
    isLoading: false,
    isDisabled: false,
    'aria-label': 'Action',
    className: '',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description:
        'An accessible label describing the button action (required for screen readers)',
      table: { category: 'Content' },
    },
    children: {
      control: false,
      description: 'The icon element rendered inside the button',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost'],
      description: 'The visual style of the icon button',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the icon button',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the icon button',
      table: { category: 'Appearance' },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Whether the button shows a loading state and disables interaction',
      table: { category: 'State' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the button is disabled and non-interactive',
      table: { category: 'State' },
    },
    onPress: {
      action: 'pressed',
      description: 'Called when the button is pressed',
      table: { category: 'Events' },
    },
    onPressStart: {
      action: 'pressStarted',
      description: 'Called when a press interaction starts',
      table: { category: 'Events' },
    },
    onPressEnd: {
      action: 'pressEnded',
      description: 'Called when a press interaction ends',
      table: { category: 'Events' },
    },
  },
} as Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    'aria-label': 'Close',
    children: <CloseIcon />,
  },
}

export const Primary: Story = {
  args: {
    'aria-label': 'Add item',
    variant: 'primary',
    children: <PlusIcon />,
  },
}

export const Destructive: Story = {
  args: {
    'aria-label': 'Delete item',
    variant: 'destructive',
    children: <TrashIcon />,
  },
}

export const Ghost: Story = {
  args: {
    'aria-label': 'Close',
    variant: 'ghost',
    children: <CloseIcon />,
  },
}

export const Small: Story = {
  args: {
    'aria-label': 'Close',
    size: 'sm',
    children: <CloseIcon />,
  },
}

export const Large: Story = {
  args: {
    'aria-label': 'Close',
    size: 'lg',
    children: <CloseIcon />,
  },
}

export const Disabled: Story = {
  args: {
    'aria-label': 'Add item',
    isDisabled: true,
    children: <PlusIcon />,
  },
}

export const AllVariants: Story = {
  render: ({}) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <IconButton aria-label="Add item" variant="primary">
        <PlusIcon />
      </IconButton>
      <IconButton aria-label="Close" variant="secondary">
        <CloseIcon />
      </IconButton>
      <IconButton aria-label="Delete" variant="destructive">
        <TrashIcon />
      </IconButton>
      <IconButton aria-label="Close" variant="ghost">
        <CloseIcon />
      </IconButton>
    </div>
  ),
}

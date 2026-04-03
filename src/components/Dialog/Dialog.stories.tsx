import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, type DialogProps } from './Dialog'
import { Button } from '../Button/Button'

type DialogStoryArgs = Omit<DialogProps, 'isOpen' | 'onClose' | 'children'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<DialogStoryArgs> = {
  title: 'Components/Dialog',
  component: Dialog as any,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog that overlays the page to capture user attention. Traps keyboard focus, prevents background scrolling, and supports three sizes.',
      },
    },
  },
  args: {
    size: 'md',
    isDismissable: true,
    title: 'Dialog Title',
    className: '',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The heading displayed at the top of the dialog',
      table: { category: 'Content' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The width of the dialog panel',
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the dialog panel',
      table: { category: 'Appearance' },
    },
    isDismissable: {
      control: 'boolean',
      description:
        'Whether the dialog can be closed by clicking the overlay or pressing Escape',
      table: { category: 'State' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setIsOpen] = useState(false)

<>
  <Button onPress={() => setIsOpen(true)}>Open dialog</Button>
  <Dialog
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirm action"
  >
    <p>Are you sure you want to continue? This cannot be undone.</p>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onPress={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary" onPress={() => setIsOpen(false)}>Confirm</Button>
    </div>
  </Dialog>
</>`,
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm action"
        >
          <p>Are you sure you want to continue? This cannot be undone.</p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="secondary" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onPress={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </Dialog>
      </>
    )
  },
}

export const Small: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setIsOpen] = useState(false)

<>
  <Button onPress={() => setIsOpen(true)}>Open small dialog</Button>
  <Dialog
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Delete item"
    size="sm"
  >
    <p>This item will be permanently deleted.</p>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onPress={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="destructive" onPress={() => setIsOpen(false)}>Delete</Button>
    </div>
  </Dialog>
</>`,
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open small dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete item"
          size="sm"
        >
          <p>This item will be permanently deleted.</p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="secondary" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onPress={() => setIsOpen(false)}>
              Delete
            </Button>
          </div>
        </Dialog>
      </>
    )
  },
}

export const Large: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setIsOpen] = useState(false)

<>
  <Button onPress={() => setIsOpen(true)}>Open large dialog</Button>
  <Dialog
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Terms of service"
    size="lg"
  >
    <p>Please read the following terms carefully before proceeding.</p>
    <p style={{ marginTop: '1rem', color: 'var(--token-color-text-subtle)', fontSize: '0.875rem' }}>
      Lorem ipsum dolor sit amet...
    </p>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
      <Button variant="secondary" onPress={() => setIsOpen(false)}>Decline</Button>
      <Button variant="primary" onPress={() => setIsOpen(false)}>Accept</Button>
    </div>
  </Dialog>
</>`,
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>Open large dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms of service"
          size="lg"
        >
          <p>Please read the following terms carefully before proceeding.</p>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--token-color-text-subtle)',
              fontSize: '0.875rem',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="secondary" onPress={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button variant="primary" onPress={() => setIsOpen(false)}>
              Accept
            </Button>
          </div>
        </Dialog>
      </>
    )
  },
}

export const NonDismissable: Story = {
  parameters: {
    docs: {
      source: {
        code: `const [isOpen, setIsOpen] = useState(false)

<>
  <Button onPress={() => setIsOpen(true)}>Open non-dismissable dialog</Button>
  <Dialog
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Required action"
    isDismissable={false}
  >
    <p>You must complete this step before continuing.</p>
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
      <Button variant="primary" onPress={() => setIsOpen(false)}>Got it</Button>
    </div>
  </Dialog>
</>`,
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <Button onPress={() => setIsOpen(true)}>
          Open non-dismissable dialog
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Required action"
          isDismissable={false}
        >
          <p>You must complete this step before continuing.</p>
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="primary" onPress={() => setIsOpen(false)}>
              Got it
            </Button>
          </div>
        </Dialog>
      </>
    )
  },
}

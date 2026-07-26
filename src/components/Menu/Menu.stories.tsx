import type { Meta, StoryObj } from '@storybook/react'
import { SubmenuTrigger } from 'react-aria-components'
import { RudiMenuTrigger, type RudiMenuTriggerProps } from './MenuTrigger'
import { RudiMenu } from './Menu'
import { RudiMenuItem } from './MenuItem'
import { RudiMenuSection } from './MenuSection'
import { RudiMenuSeparator } from './MenuSeparator'
import { RudiButton } from '@/components/Button/Button'
import { RudiIcon } from '@/components/Icon/Icon'

const meta: Meta<RudiMenuTriggerProps> = {
  title: 'Components/Menu',
  component: RudiMenuTrigger,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A contextual menu triggered by a button press. Supports icons, keyboard shortcuts, descriptions, sections, submenus, selection modes, disabled items, and destructive actions.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Actions</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="edit">Edit</RudiMenuItem>
        <RudiMenuItem id="duplicate">Duplicate</RudiMenuItem>
        <RudiMenuItem id="rename">Rename</RudiMenuItem>
        <RudiMenuItem id="delete">Delete</RudiMenuItem>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithIcons: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Actions</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="open" icon="lucide:folder-open" label="Open" />
        <RudiMenuItem id="rename" icon="lucide:pencil" label="Rename" />
        <RudiMenuItem id="duplicate" icon="lucide:copy" label="Duplicate" />
        <RudiMenuItem
          id="delete"
          icon="lucide:trash-2"
          label="Delete"
          isDestructive
        />
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithKeyboardShortcuts: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Edit</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="cut" label="Cut" shortcut="⌘X" />
        <RudiMenuItem id="copy" label="Copy" shortcut="⌘C" />
        <RudiMenuItem id="paste" label="Paste" shortcut="⌘V" />
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithDescriptions: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Account</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem
          id="profile"
          icon="lucide:user"
          label="Profile"
          description="View and edit your profile"
        />
        <RudiMenuItem
          id="settings"
          icon="lucide:settings"
          label="Settings"
          description="Manage your preferences"
        />
        <RudiMenuItem
          id="billing"
          icon="lucide:credit-card"
          label="Billing"
          description="Manage payment methods"
        />
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithSections: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">File</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuSection title="File">
          <RudiMenuItem
            id="new"
            icon="lucide:file-plus"
            label="New file"
            shortcut="⌘N"
          />
          <RudiMenuItem
            id="open"
            icon="lucide:folder-open"
            label="Open"
            shortcut="⌘O"
          />
          <RudiMenuItem
            id="save"
            icon="lucide:save"
            label="Save"
            shortcut="⌘S"
          />
        </RudiMenuSection>
        <RudiMenuSeparator />
        <RudiMenuSection title="Edit">
          <RudiMenuItem
            id="undo"
            icon="lucide:undo"
            label="Undo"
            shortcut="⌘Z"
          />
          <RudiMenuItem
            id="redo"
            icon="lucide:redo"
            label="Redo"
            shortcut="⇧⌘Z"
          />
        </RudiMenuSection>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const SingleSelection: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Sort by</RudiButton>
      <RudiMenu selectionMode="single" defaultSelectedKeys={['date']}>
        <RudiMenuItem id="name">Name</RudiMenuItem>
        <RudiMenuItem id="date">Date modified</RudiMenuItem>
        <RudiMenuItem id="size">Size</RudiMenuItem>
        <RudiMenuItem id="type">Type</RudiMenuItem>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const MultipleSelection: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">View</RudiButton>
      <RudiMenu selectionMode="multiple" defaultSelectedKeys={['files']}>
        <RudiMenuItem id="files">Show files</RudiMenuItem>
        <RudiMenuItem id="folders">Show folders</RudiMenuItem>
        <RudiMenuItem id="hidden">Show hidden</RudiMenuItem>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithSubmenu: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Actions</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="open" icon="lucide:folder-open" label="Open" />
        <SubmenuTrigger>
          <RudiMenuItem icon="lucide:share" label="Share" />
          <RudiMenu>
            <RudiMenuItem id="email" icon="lucide:mail" label="Email" />
            <RudiMenuItem id="sms" icon="lucide:smartphone" label="SMS" />
          </RudiMenu>
        </SubmenuTrigger>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const DisabledItems: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Options</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="copy" label="Copy" shortcut="⌘C" />
        <RudiMenuItem id="paste" label="Paste" shortcut="⌘V" isDisabled />
        <RudiMenuItem id="cut" label="Cut" shortcut="⌘X" />
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const DestructiveItems: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Manage</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="archive" icon="lucide:archive" label="Archive" />
        <RudiMenuItem id="move" icon="lucide:folder" label="Move to folder" />
        <RudiMenuItem
          id="delete"
          icon="lucide:trash-2"
          label="Delete permanently"
          isDestructive
        />
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const CompleteExample: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="ghost" aria-label="Actions">
        <RudiIcon icon="lucide:ellipsis" />
      </RudiButton>
      <RudiMenu>
        <RudiMenuSection>
          <RudiMenuItem
            onAction={() => alert('open')}
            icon="lucide:folder-open"
            label="Open"
            shortcut="⌘O"
          />
          <RudiMenuItem
            onAction={() => alert('rename')}
            icon="lucide:pencil"
            label="Rename…"
            shortcut="⌘R"
          />
          <RudiMenuItem
            onAction={() => alert('duplicate')}
            icon="lucide:copy"
            label="Duplicate"
            shortcut="⌘D"
          />
          <RudiMenuItem
            onAction={() => alert('delete')}
            icon="lucide:trash-2"
            label="Delete…"
            shortcut="⌘⌫"
            isDestructive
          />
          <SubmenuTrigger>
            <RudiMenuItem icon="lucide:share" label="Share" />
            <RudiMenu>
              <RudiMenuItem id="email" icon="lucide:mail" label="Email" />
              <RudiMenuItem id="sms" icon="lucide:smartphone" label="SMS" />
            </RudiMenu>
          </SubmenuTrigger>
        </RudiMenuSection>
        <RudiMenuSeparator />
        <RudiMenuSection
          selectionMode="multiple"
          defaultSelectedKeys={['files']}
        >
          <RudiMenuItem id="files">Show files</RudiMenuItem>
          <RudiMenuItem id="folders">Show folders</RudiMenuItem>
        </RudiMenuSection>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

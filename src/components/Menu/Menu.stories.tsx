import type { Meta, StoryObj } from '@storybook/react'
import { RudiMenuTrigger, type RudiMenuTriggerProps } from './MenuTrigger'
import { RudiMenu } from './Menu'
import { RudiMenuItem } from './MenuItem'
import { RudiMenuSection } from './MenuSection'
import { RudiKeyboard } from './Keyboard'
import { Separator, SubmenuTrigger, Text } from 'react-aria-components'
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
        <RudiMenuItem id="open" textValue="Open">
          <RudiIcon
            icon="lucide:folder-open"
            className="rudi-menu__item-icon"
          />
          <Text slot="label">Open</Text>
        </RudiMenuItem>
        <RudiMenuItem id="rename" textValue="Rename">
          <RudiIcon icon="lucide:pencil" className="rudi-menu__item-icon" />
          <Text slot="label">Rename</Text>
        </RudiMenuItem>
        <RudiMenuItem id="duplicate" textValue="Duplicate">
          <RudiIcon icon="lucide:copy" className="rudi-menu__item-icon" />
          <Text slot="label">Duplicate</Text>
        </RudiMenuItem>
        <RudiMenuItem id="delete" isDestructive textValue="Delete">
          <RudiIcon icon="lucide:trash-2" className="rudi-menu__item-icon" />
          <Text slot="label">Delete</Text>
        </RudiMenuItem>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithKeyboardShortcuts: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Edit</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="cut" textValue="Cut">
          <Text slot="label">Cut</Text>
          <RudiKeyboard>⌘X</RudiKeyboard>
        </RudiMenuItem>
        <RudiMenuItem id="copy" textValue="Copy">
          <Text slot="label">Copy</Text>
          <RudiKeyboard>⌘C</RudiKeyboard>
        </RudiMenuItem>
        <RudiMenuItem id="paste" textValue="Paste">
          <Text slot="label">Paste</Text>
          <RudiKeyboard>⌘V</RudiKeyboard>
        </RudiMenuItem>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const WithDescriptions: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Account</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="profile" textValue="Profile">
          <RudiIcon icon="lucide:user" className="rudi-menu__item-icon" />
          <div className="rudi-menu__item-content">
            <Text slot="label" className="rudi-menu__item-label">
              Profile
            </Text>
            <Text
              slot="description"
              className="rudi-menu__item-description"
            >
              View and edit your profile
            </Text>
          </div>
        </RudiMenuItem>
        <RudiMenuItem id="settings" textValue="Settings">
          <RudiIcon icon="lucide:settings" className="rudi-menu__item-icon" />
          <div className="rudi-menu__item-content">
            <Text slot="label" className="rudi-menu__item-label">
              Settings
            </Text>
            <Text
              slot="description"
              className="rudi-menu__item-description"
            >
              Manage your preferences
            </Text>
          </div>
        </RudiMenuItem>
        <RudiMenuItem id="billing" textValue="Billing">
          <RudiIcon
            icon="lucide:credit-card"
            className="rudi-menu__item-icon"
          />
          <div className="rudi-menu__item-content">
            <Text slot="label" className="rudi-menu__item-label">
              Billing
            </Text>
            <Text
              slot="description"
              className="rudi-menu__item-description"
            >
              Manage payment methods
            </Text>
          </div>
        </RudiMenuItem>
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
          <RudiMenuItem id="new" textValue="New file">
            <RudiIcon
              icon="lucide:file-plus"
              className="rudi-menu__item-icon"
            />
            <Text slot="label">New file</Text>
            <RudiKeyboard>⌘N</RudiKeyboard>
          </RudiMenuItem>
          <RudiMenuItem id="open" textValue="Open">
            <RudiIcon
              icon="lucide:folder-open"
              className="rudi-menu__item-icon"
            />
            <Text slot="label">Open</Text>
            <RudiKeyboard>⌘O</RudiKeyboard>
          </RudiMenuItem>
          <RudiMenuItem id="save" textValue="Save">
            <RudiIcon icon="lucide:save" className="rudi-menu__item-icon" />
            <Text slot="label">Save</Text>
            <RudiKeyboard>⌘S</RudiKeyboard>
          </RudiMenuItem>
        </RudiMenuSection>
        <Separator className="rudi-menu__separator" />
        <RudiMenuSection title="Edit">
          <RudiMenuItem id="undo" textValue="Undo">
            <RudiIcon icon="lucide:undo" className="rudi-menu__item-icon" />
            <Text slot="label">Undo</Text>
            <RudiKeyboard>⌘Z</RudiKeyboard>
          </RudiMenuItem>
          <RudiMenuItem id="redo" textValue="Redo">
            <RudiIcon icon="lucide:redo" className="rudi-menu__item-icon" />
            <Text slot="label">Redo</Text>
            <RudiKeyboard>⇧⌘Z</RudiKeyboard>
          </RudiMenuItem>
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
        <RudiMenuItem id="open" textValue="Open">
          <RudiIcon
            icon="lucide:folder-open"
            className="rudi-menu__item-icon"
          />
          <Text slot="label">Open</Text>
        </RudiMenuItem>
        <SubmenuTrigger>
          <RudiMenuItem textValue="Share">
            <RudiIcon icon="lucide:share" className="rudi-menu__item-icon" />
            <Text slot="label">Share</Text>
          </RudiMenuItem>
          <RudiMenu>
            <RudiMenuItem id="email" textValue="Email">
              <RudiIcon icon="lucide:mail" className="rudi-menu__item-icon" />
              <Text slot="label">Email</Text>
            </RudiMenuItem>
            <RudiMenuItem id="sms" textValue="SMS">
              <RudiIcon
                icon="lucide:smartphone"
                className="rudi-menu__item-icon"
              />
              <Text slot="label">SMS</Text>
            </RudiMenuItem>
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
        <RudiMenuItem id="copy" textValue="Copy">
          <Text slot="label">Copy</Text>
          <RudiKeyboard>⌘C</RudiKeyboard>
        </RudiMenuItem>
        <RudiMenuItem id="paste" isDisabled textValue="Paste">
          <Text slot="label">Paste</Text>
          <RudiKeyboard>⌘V</RudiKeyboard>
        </RudiMenuItem>
        <RudiMenuItem id="cut" textValue="Cut">
          <Text slot="label">Cut</Text>
          <RudiKeyboard>⌘X</RudiKeyboard>
        </RudiMenuItem>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

export const DestructiveItems: Story = {
  render: ({}) => (
    <RudiMenuTrigger>
      <RudiButton variant="secondary">Manage</RudiButton>
      <RudiMenu onAction={(key) => alert(key)}>
        <RudiMenuItem id="archive" textValue="Archive">
          <RudiIcon icon="lucide:archive" className="rudi-menu__item-icon" />
          <Text slot="label">Archive</Text>
        </RudiMenuItem>
        <RudiMenuItem id="move" textValue="Move to folder">
          <RudiIcon icon="lucide:folder" className="rudi-menu__item-icon" />
          <Text slot="label">Move to folder</Text>
        </RudiMenuItem>
        <RudiMenuItem id="delete" isDestructive textValue="Delete permanently">
          <RudiIcon icon="lucide:trash-2" className="rudi-menu__item-icon" />
          <Text slot="label">Delete permanently</Text>
        </RudiMenuItem>
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
          <RudiMenuItem onAction={() => alert('open')} textValue="Open">
            <RudiIcon
              icon="lucide:folder-open"
              className="rudi-menu__item-icon"
            />
            <Text slot="label">Open</Text>
            <RudiKeyboard>⌘O</RudiKeyboard>
          </RudiMenuItem>
          <RudiMenuItem onAction={() => alert('rename')} textValue="Rename">
            <RudiIcon icon="lucide:pencil" className="rudi-menu__item-icon" />
            <Text slot="label">Rename…</Text>
            <RudiKeyboard>⌘R</RudiKeyboard>
          </RudiMenuItem>
          <RudiMenuItem onAction={() => alert('duplicate')} textValue="Duplicate">
            <RudiIcon icon="lucide:copy" className="rudi-menu__item-icon" />
            <Text slot="label">Duplicate</Text>
            <RudiKeyboard>⌘D</RudiKeyboard>
          </RudiMenuItem>
          <RudiMenuItem
            onAction={() => alert('delete')}
            isDestructive
            textValue="Delete"
          >
            <RudiIcon icon="lucide:trash-2" className="rudi-menu__item-icon" />
            <Text slot="label">Delete…</Text>
            <RudiKeyboard>⌘⌫</RudiKeyboard>
          </RudiMenuItem>
          <SubmenuTrigger>
            <RudiMenuItem textValue="Share">
              <RudiIcon icon="lucide:share" className="rudi-menu__item-icon" />
              <Text slot="label">Share</Text>
            </RudiMenuItem>
            <RudiMenu>
              <RudiMenuItem id="email" textValue="Email">
                <RudiIcon icon="lucide:mail" className="rudi-menu__item-icon" />
                <Text slot="label">Email</Text>
              </RudiMenuItem>
              <RudiMenuItem id="sms" textValue="SMS">
                <RudiIcon
                  icon="lucide:smartphone"
                  className="rudi-menu__item-icon"
                />
                <Text slot="label">SMS</Text>
              </RudiMenuItem>
            </RudiMenu>
          </SubmenuTrigger>
        </RudiMenuSection>
        <Separator className="rudi-menu__separator" />
        <RudiMenuSection selectionMode="multiple" defaultSelectedKeys={['files']}>
          <RudiMenuItem id="files">Show files</RudiMenuItem>
          <RudiMenuItem id="folders">Show folders</RudiMenuItem>
        </RudiMenuSection>
      </RudiMenu>
    </RudiMenuTrigger>
  ),
}

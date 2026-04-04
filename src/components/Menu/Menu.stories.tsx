import type { Meta, StoryObj } from '@storybook/react'
import { MenuTrigger, type MenuTriggerProps } from './MenuTrigger'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { MenuSection } from './MenuSection'
import { Keyboard } from './Keyboard'
import { Separator, SubmenuTrigger, Text } from 'react-aria-components'
import { Button } from '@/components/Button/Button'
import { Icon } from '@/components/Icon/Icon'

const meta: Meta<MenuTriggerProps> = {
  title: 'Components/Menu',
  component: MenuTrigger,
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
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Actions</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="edit">Edit</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem id="rename">Rename</MenuItem>
        <MenuItem id="delete">Delete</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Actions</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="open" textValue="Open">
          <Icon icon="lucide:folder-open" className="rudiment-menu__item-icon" />
          <Text slot="label">Open</Text>
        </MenuItem>
        <MenuItem id="rename" textValue="Rename">
          <Icon icon="lucide:pencil" className="rudiment-menu__item-icon" />
          <Text slot="label">Rename</Text>
        </MenuItem>
        <MenuItem id="duplicate" textValue="Duplicate">
          <Icon icon="lucide:copy" className="rudiment-menu__item-icon" />
          <Text slot="label">Duplicate</Text>
        </MenuItem>
        <MenuItem id="delete" isDestructive textValue="Delete">
          <Icon icon="lucide:trash-2" className="rudiment-menu__item-icon" />
          <Text slot="label">Delete</Text>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Edit</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="cut" textValue="Cut">
          <Text slot="label">Cut</Text>
          <Keyboard>⌘X</Keyboard>
        </MenuItem>
        <MenuItem id="copy" textValue="Copy">
          <Text slot="label">Copy</Text>
          <Keyboard>⌘C</Keyboard>
        </MenuItem>
        <MenuItem id="paste" textValue="Paste">
          <Text slot="label">Paste</Text>
          <Keyboard>⌘V</Keyboard>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithDescriptions: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Account</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="profile" textValue="Profile">
          <Icon icon="lucide:user" className="rudiment-menu__item-icon" />
          <div className="rudiment-menu__item-content">
            <Text slot="label" className="rudiment-menu__item-label">Profile</Text>
            <Text slot="description" className="rudiment-menu__item-description">
              View and edit your profile
            </Text>
          </div>
        </MenuItem>
        <MenuItem id="settings" textValue="Settings">
          <Icon icon="lucide:settings" className="rudiment-menu__item-icon" />
          <div className="rudiment-menu__item-content">
            <Text slot="label" className="rudiment-menu__item-label">Settings</Text>
            <Text slot="description" className="rudiment-menu__item-description">
              Manage your preferences
            </Text>
          </div>
        </MenuItem>
        <MenuItem id="billing" textValue="Billing">
          <Icon icon="lucide:credit-card" className="rudiment-menu__item-icon" />
          <div className="rudiment-menu__item-content">
            <Text slot="label" className="rudiment-menu__item-label">Billing</Text>
            <Text slot="description" className="rudiment-menu__item-description">
              Manage payment methods
            </Text>
          </div>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithSections: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">File</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuSection title="File">
          <MenuItem id="new" textValue="New file">
            <Icon icon="lucide:file-plus" className="rudiment-menu__item-icon" />
            <Text slot="label">New file</Text>
            <Keyboard>⌘N</Keyboard>
          </MenuItem>
          <MenuItem id="open" textValue="Open">
            <Icon icon="lucide:folder-open" className="rudiment-menu__item-icon" />
            <Text slot="label">Open</Text>
            <Keyboard>⌘O</Keyboard>
          </MenuItem>
          <MenuItem id="save" textValue="Save">
            <Icon icon="lucide:save" className="rudiment-menu__item-icon" />
            <Text slot="label">Save</Text>
            <Keyboard>⌘S</Keyboard>
          </MenuItem>
        </MenuSection>
        <Separator className="rudiment-menu__separator" />
        <MenuSection title="Edit">
          <MenuItem id="undo" textValue="Undo">
            <Icon icon="lucide:undo" className="rudiment-menu__item-icon" />
            <Text slot="label">Undo</Text>
            <Keyboard>⌘Z</Keyboard>
          </MenuItem>
          <MenuItem id="redo" textValue="Redo">
            <Icon icon="lucide:redo" className="rudiment-menu__item-icon" />
            <Text slot="label">Redo</Text>
            <Keyboard>⇧⌘Z</Keyboard>
          </MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
}

export const SingleSelection: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Sort by</Button>
      <Menu selectionMode="single" defaultSelectedKeys={['date']}>
        <MenuItem id="name">Name</MenuItem>
        <MenuItem id="date">Date modified</MenuItem>
        <MenuItem id="size">Size</MenuItem>
        <MenuItem id="type">Type</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const MultipleSelection: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">View</Button>
      <Menu selectionMode="multiple" defaultSelectedKeys={['files']}>
        <MenuItem id="files">Show files</MenuItem>
        <MenuItem id="folders">Show folders</MenuItem>
        <MenuItem id="hidden">Show hidden</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Actions</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="open" textValue="Open">
          <Icon icon="lucide:folder-open" className="rudiment-menu__item-icon" />
          <Text slot="label">Open</Text>
        </MenuItem>
        <SubmenuTrigger>
          <MenuItem textValue="Share">
            <Icon icon="lucide:share" className="rudiment-menu__item-icon" />
            <Text slot="label">Share</Text>
          </MenuItem>
          <Menu>
            <MenuItem id="email" textValue="Email">
              <Icon icon="lucide:mail" className="rudiment-menu__item-icon" />
              <Text slot="label">Email</Text>
            </MenuItem>
            <MenuItem id="sms" textValue="SMS">
              <Icon icon="lucide:smartphone" className="rudiment-menu__item-icon" />
              <Text slot="label">SMS</Text>
            </MenuItem>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  ),
}

export const DisabledItems: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Options</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="copy" textValue="Copy">
          <Text slot="label">Copy</Text>
          <Keyboard>⌘C</Keyboard>
        </MenuItem>
        <MenuItem id="paste" isDisabled textValue="Paste">
          <Text slot="label">Paste</Text>
          <Keyboard>⌘V</Keyboard>
        </MenuItem>
        <MenuItem id="cut" textValue="Cut">
          <Text slot="label">Cut</Text>
          <Keyboard>⌘X</Keyboard>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const DestructiveItems: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="secondary">Manage</Button>
      <Menu onAction={(key) => alert(key)}>
        <MenuItem id="archive" textValue="Archive">
          <Icon icon="lucide:archive" className="rudiment-menu__item-icon" />
          <Text slot="label">Archive</Text>
        </MenuItem>
        <MenuItem id="move" textValue="Move to folder">
          <Icon icon="lucide:folder" className="rudiment-menu__item-icon" />
          <Text slot="label">Move to folder</Text>
        </MenuItem>
        <MenuItem id="delete" isDestructive textValue="Delete permanently">
          <Icon icon="lucide:trash-2" className="rudiment-menu__item-icon" />
          <Text slot="label">Delete permanently</Text>
        </MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

export const CompleteExample: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="ghost" aria-label="Actions">
        <Icon icon="lucide:ellipsis" />
      </Button>
      <Menu>
        <MenuSection>
          <MenuItem onAction={() => alert('open')} textValue="Open">
            <Icon icon="lucide:folder-open" className="rudiment-menu__item-icon" />
            <Text slot="label">Open</Text>
            <Keyboard>⌘O</Keyboard>
          </MenuItem>
          <MenuItem onAction={() => alert('rename')} textValue="Rename">
            <Icon icon="lucide:pencil" className="rudiment-menu__item-icon" />
            <Text slot="label">Rename…</Text>
            <Keyboard>⌘R</Keyboard>
          </MenuItem>
          <MenuItem onAction={() => alert('duplicate')} textValue="Duplicate">
            <Icon icon="lucide:copy" className="rudiment-menu__item-icon" />
            <Text slot="label">Duplicate</Text>
            <Keyboard>⌘D</Keyboard>
          </MenuItem>
          <MenuItem onAction={() => alert('delete')} isDestructive textValue="Delete">
            <Icon icon="lucide:trash-2" className="rudiment-menu__item-icon" />
            <Text slot="label">Delete…</Text>
            <Keyboard>⌘⌫</Keyboard>
          </MenuItem>
          <SubmenuTrigger>
            <MenuItem textValue="Share">
              <Icon icon="lucide:share" className="rudiment-menu__item-icon" />
              <Text slot="label">Share</Text>
            </MenuItem>
            <Menu>
              <MenuItem id="email" textValue="Email">
                <Icon icon="lucide:mail" className="rudiment-menu__item-icon" />
                <Text slot="label">Email</Text>
              </MenuItem>
              <MenuItem id="sms" textValue="SMS">
                <Icon icon="lucide:smartphone" className="rudiment-menu__item-icon" />
                <Text slot="label">SMS</Text>
              </MenuItem>
            </Menu>
          </SubmenuTrigger>
        </MenuSection>
        <Separator className="rudiment-menu__separator" />
        <MenuSection selectionMode="multiple" defaultSelectedKeys={['files']}>
          <MenuItem id="files">Show files</MenuItem>
          <MenuItem id="folders">Show folders</MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  ),
}

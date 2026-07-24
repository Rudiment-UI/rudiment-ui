import type { Meta, StoryObj } from '@storybook/react'
import { RudiNavItem } from './NavItem'
import { RudiBadge } from '@/components/Badge/Badge'

const meta = {
  title: 'Components/NavItem',
  component: RudiNavItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An interactive navigation item for sidebar menus, with optional icon and badge. Renders as a link or button depending on props.',
      },
    },
  },
  args: {
    label: 'Dashboard',
    icon: 'lucide:home',
    href: '',
    isActive: false,
    isDisabled: false,
    badge: null,
    className: '',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The text label displayed in the nav item',
      table: { category: 'Content' },
    },
    icon: {
      control: 'text',
      description: 'Iconify icon name to display before the label',
      table: { category: 'Content' },
    },
    badge: {
      control: false,
      description: 'Optional badge element rendered at the end of the nav item',
      table: { category: 'Content' },
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the nav item is currently active',
      table: { category: 'Appearance' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the nav item is disabled and non-interactive',
      table: { category: 'State' },
    },
    onPress: {
      action: 'pressed',
      description: 'Called when the nav item is pressed (button mode)',
      table: { category: 'Events' },
    },
    href: {
      control: 'text',
      description: 'When provided, renders as a link instead of a button',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply',
      table: { category: 'Appearance' },
    },
  },
} satisfies Meta<typeof RudiNavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Dashboard',
    icon: 'lucide:home',
  },
}

export const Active: Story = {
  args: {
    label: 'Dashboard',
    icon: 'lucide:home',
    isActive: true,
  },
}

export const WithBadge: Story = {
  args: {
    label: 'Notifications',
    icon: 'lucide:bell',
    badge: <RudiBadge size="sm">5</RudiBadge>,
  },
}

export const AsLink: Story = {
  args: {
    label: 'Settings',
    icon: 'lucide:settings',
    href: '#',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Dashboard',
    icon: 'lucide:home',
    isDisabled: true,
  },
}

export const WithoutIcon: Story = {
  args: {
    label: 'Dashboard',
  },
}

export const SidebarExample: Story = {
  render: () => (
    <nav
      style={{
        width: 240,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      <RudiNavItem label="Dashboard" icon="lucide:home" isActive />
      <RudiNavItem label="Projects" icon="lucide:folder" />
      <RudiNavItem
        label="Messages"
        icon="lucide:mail"
        badge={<RudiBadge size="sm">3</RudiBadge>}
      />
      <RudiNavItem label="Settings" icon="lucide:settings" />
      <RudiNavItem label="Help" icon="lucide:help-circle" isDisabled />
    </nav>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<nav style={{ width: 240, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
  <NavItem label="Dashboard" icon="lucide:home" isActive />
  <NavItem label="Projects" icon="lucide:folder" />
  <NavItem label="Messages" icon="lucide:mail" badge={<Badge size="sm">3</Badge>} />
  <NavItem label="Settings" icon="lucide:settings" />
  <NavItem label="Help" icon="lucide:help-circle" isDisabled />
</nav>`,
      },
    },
  },
}

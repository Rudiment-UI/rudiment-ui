import type { Meta, StoryObj } from '@storybook/react'
import { RudiAppShell } from './AppShell'
import { RudiTopBar } from '@/components/TopBar/TopBar'
import { RudiPageHeader } from '@/components/PageHeader/PageHeader'
import { RudiNavItem } from '@/components/NavItem/NavItem'
import { RudiText } from '@/typography/Text/Text'
import { RudiButton } from '@/components/Button/Button'
import { RudiStack } from '@/layouts/Stack/Stack'

const meta = {
  title: 'Components/AppShell',
  component: RudiAppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive application frame: a sticky sidebar, a content column, and a centered main region. Below 900px the sidebar collapses into a drawer opened by `AppShell.MenuButton`.',
      },
    },
  },
} satisfies Meta<typeof RudiAppShell>

export default meta
type Story = StoryObj<typeof meta>

const NAV = [
  { key: 'home', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { key: 'customers', label: 'Customers', icon: 'lucide:users' },
  { key: 'sales', label: 'Sales', icon: 'lucide:trending-up' },
  { key: 'settings', label: 'Settings', icon: 'lucide:settings' },
]

export const Default: Story = {
  render: () => (
    <RudiAppShell>
      <RudiAppShell.Sidebar aria-label="Primary navigation">
        <RudiText variant="overline" noMargin>
          Acme Inc
        </RudiText>
        <RudiStack space="0.25rem" as="nav" aria-label="Sections">
          {NAV.map((item, i) => (
            <RudiNavItem
              key={item.key}
              label={item.label}
              icon={item.icon}
              isActive={i === 0}
            />
          ))}
        </RudiStack>
      </RudiAppShell.Sidebar>
      <RudiAppShell.Content>
        <RudiTopBar
          start={<RudiAppShell.MenuButton />}
          end={<RudiButton size="sm">New</RudiButton>}
        >
          <RudiText noMargin weight="semibold">
            Dashboard
          </RudiText>
        </RudiTopBar>
        <RudiAppShell.Main>
          <RudiPageHeader
            title="Dashboard"
            subtitle="An overview of your account activity."
            actions={<RudiButton variant="secondary">Export</RudiButton>}
          />
          <RudiText>
            Resize the preview below 900px to see the sidebar collapse into a
            drawer.
          </RudiText>
        </RudiAppShell.Main>
      </RudiAppShell.Content>
    </RudiAppShell>
  ),
}

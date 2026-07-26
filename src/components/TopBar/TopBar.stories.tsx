import type { Meta, StoryObj } from '@storybook/react'
import { RudiTopBar } from './TopBar'
import { RudiButton } from '@/components/Button/Button'
import { RudiIconButton } from '@/components/IconButton/IconButton'
import { RudiIcon } from '@/components/Icon/Icon'
import { RudiText } from '@/typography/Text/Text'
import { RudiCluster } from '@/layouts/Cluster/Cluster'

const meta = {
  title: 'Components/TopBar',
  component: RudiTopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A sticky header bar with inline-start / center / inline-end slots and an optional announcement strip. Used inside `AppShell` and for marketing headers.',
      },
    },
  },
  argTypes: {
    sticky: { control: 'boolean', table: { category: 'Behavior' } },
  },
} satisfies Meta<typeof RudiTopBar>

export default meta
type Story = StoryObj<typeof meta>

export const AppHeader: Story = {
  render: (args) => (
    <RudiTopBar
      {...args}
      end={
        <RudiCluster space="0.5rem">
          <RudiIconButton aria-label="Notifications" variant="ghost">
            <RudiIcon icon="lucide:bell" />
          </RudiIconButton>
          <RudiButton size="sm">Create</RudiButton>
        </RudiCluster>
      }
    >
      <RudiText noMargin weight="semibold">
        Dashboard
      </RudiText>
    </RudiTopBar>
  ),
}

export const MarketingHeader: Story = {
  render: (args) => (
    <RudiTopBar
      {...args}
      announcement="✨ Free shipping on orders over $50"
      start={
        <RudiText noMargin weight="bold">
          Acme Store
        </RudiText>
      }
      end={
        <RudiCluster space="0.5rem">
          <RudiIconButton aria-label="Search" variant="ghost">
            <RudiIcon icon="lucide:search" />
          </RudiIconButton>
          <RudiIconButton aria-label="Cart" variant="ghost">
            <RudiIcon icon="lucide:shopping-cart" />
          </RudiIconButton>
        </RudiCluster>
      }
    />
  ),
}

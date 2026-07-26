import type { Meta, StoryObj } from '@storybook/react'
import { RudiFooter } from './Footer'
import { RudiStack } from '@/layouts/Stack/Stack'
import { RudiText } from '@/typography/Text/Text'
import { RudiCluster } from '@/layouts/Cluster/Cluster'

const meta = {
  title: 'Components/Footer',
  component: RudiFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive multi-column footer with an auto-fit column grid and a bottom bar for copyright and legal links.',
      },
    },
  },
} satisfies Meta<typeof RudiFooter>

export default meta
type Story = StoryObj<typeof meta>

const COLUMNS = [
  { title: 'Product', links: ['Features', 'Pricing', 'Integrations'] },
  { title: 'Company', links: ['About', 'Careers', 'Blog'] },
  { title: 'Support', links: ['Help center', 'Contact', 'Status'] },
]

export const Default: Story = {
  render: () => (
    <RudiFooter>
      <RudiFooter.Columns>
        <RudiFooter.Column>
          <RudiText noMargin weight="bold">
            Acme Inc
          </RudiText>
          <RudiText variant="caption" noMargin>
            Building better software, together.
          </RudiText>
        </RudiFooter.Column>
        {COLUMNS.map((col) => (
          <RudiFooter.Column key={col.title} title={col.title}>
            <RudiStack space="0.5rem">
              {col.links.map((link) => (
                <a key={link} href={`/${link}`}>
                  {link}
                </a>
              ))}
            </RudiStack>
          </RudiFooter.Column>
        ))}
      </RudiFooter.Columns>
      <RudiFooter.BottomBar>
        <span>© 2026 Acme Inc. All rights reserved.</span>
        <RudiCluster space="1rem">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </RudiCluster>
      </RudiFooter.BottomBar>
    </RudiFooter>
  ),
}

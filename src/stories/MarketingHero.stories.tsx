import type { Meta, StoryObj } from '@storybook/react'

import { RudiBox } from '../layouts/Box/Box'
import { RudiCenter } from '../layouts/Center/Center'
import { RudiCluster } from '../layouts/Cluster/Cluster'
import { RudiCover } from '../layouts/Cover/Cover'
import { RudiGrid } from '../layouts/Grid/Grid'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiBadge } from '../components/Badge/Badge'
import { RudiButton } from '../components/Button/Button'
import { RudiCard } from '../components/Card/Card'
import { RudiIcon } from '../components/Icon/Icon'
import { AppHeader, AppFooter } from './shared'

const meta = {
  title: 'Examples/Marketing Hero',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `\
<Stack space="4rem">
  <AppHeader />
  <Cover minHeight="80vh">
    <Center intrinsic style={{ flex: 1 }}>
      <Stack space="1.5rem" style={{ textAlign: 'center', maxWidth: '40rem' }}>
        <Cluster justify="center">
          <Badge variant="info">Now in public beta</Badge>
        </Cluster>
        <Heading level={1} size={1} style={{ fontSize: '3rem', lineHeight: 1.1 }}>
          Build products your users will love
        </Heading>
        <Text style={{ color: 'var(--rudi-color-text-subtle)' }}>
          Acme gives your team the tools to ship faster, collaborate better, and build
          with confidence — from first commit to production.
        </Text>
        <Cluster justify="center" space="0.75rem">
          <Button variant="primary" size="lg">Get started free</Button>
          <Button variant="secondary" size="lg">View demo</Button>
        </Cluster>
        <Text variant="caption">No credit card required. Free up to 3 projects.</Text>
      </Stack>
    </Center>
  </Cover>

  <Box style={{ borderBlockStart: '1px solid var(--rudi-color-border-default)', paddingBlock: '4rem' }}>
    <Center>
      <Stack space="2.5rem">
        <Stack space="0.5rem" style={{ textAlign: 'center' }}>
          <Heading level={2} size={2}>Everything your team needs</Heading>
          <Text variant="caption">One platform. Zero compromise.</Text>
        </Stack>
        <Grid minCellWidth="16rem" space="1.5rem">
          {features.map(({ title, body, icon }) => (
            <Card key={title} variant="outlined">
              <Card.Body>
                <Stack space="0.5rem">
                  <Icon icon={icon} size="lg" />
                  <Heading level={3} size={5}>{title}</Heading>
                  <Text variant="body-sm">{body}</Text>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Center>
  </Box>
  <AppFooter />
</Stack>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const features = [
  {
    title: 'Instant deploys',
    body: 'Push to any branch and see your changes live in seconds.',
    icon: 'lucide:rocket',
  },
  {
    title: 'Team collaboration',
    body: 'Comments, reviews, and approvals — all in one place.',
    icon: 'lucide:message-square',
  },
  {
    title: 'Built-in analytics',
    body: 'Know what your users are doing without leaving the dashboard.',
    icon: 'lucide:bar-chart-2',
  },
  {
    title: 'Role-based access',
    body: 'Grant the right permissions to the right people.',
    icon: 'lucide:shield',
  },
  {
    title: 'Audit logs',
    body: 'Every action is logged and searchable for compliance and debugging.',
    icon: 'lucide:scroll-text',
  },
  {
    title: 'SSO & 2FA',
    body: 'Enterprise-grade security without the enterprise headache.',
    icon: 'lucide:lock',
  },
]

export const MarketingHero: Story = {
  name: 'Marketing Hero',
  render: () => (
    <RudiStack space="4rem">
      <AppHeader />
      <RudiCover minHeight="80vh">
        <RudiCenter intrinsic style={{ flex: 1 }}>
          <RudiStack
            space="1.5rem"
            style={{ textAlign: 'center', maxWidth: '40rem' }}
          >
            <RudiCluster justify="center">
              <RudiBadge variant="info">Now in public beta</RudiBadge>
            </RudiCluster>
            <RudiHeading
              level={1}
              size={1}
              style={{ fontSize: '3rem', lineHeight: 1.1 }}
            >
              Build products your users will love
            </RudiHeading>
            <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>
              Acme gives your team the tools to ship faster, collaborate better,
              and build with confidence — from first commit to production.
            </RudiText>
            <RudiCluster justify="center" space="0.75rem">
              <RudiButton variant="primary" size="lg">
                Get started free
              </RudiButton>
              <RudiButton variant="secondary" size="lg">
                View demo
              </RudiButton>
            </RudiCluster>
            <RudiText variant="caption">
              No credit card required. Free up to 3 projects.
            </RudiText>
          </RudiStack>
        </RudiCenter>
      </RudiCover>

      {/* Feature grid */}
      <RudiBox
        style={{
          borderBlockStart: '1px solid var(--rudi-color-border-default)',
          paddingBlock: '4rem',
        }}
      >
        <RudiCenter>
          <RudiStack space="2.5rem">
            <RudiStack space="0.5rem" style={{ textAlign: 'center' }}>
              <RudiHeading level={2} size={2}>
                Everything your team needs
              </RudiHeading>
              <RudiText variant="caption">One platform. Zero compromise.</RudiText>
            </RudiStack>
            <RudiGrid minCellWidth="16rem" space="1.5rem">
              {features.map(({ title, body, icon }) => (
                <RudiCard key={title} variant="outlined">
                  <RudiCard.Body>
                    <RudiStack space="0.5rem">
                      <RudiIcon icon={icon} size="lg" />
                      <RudiHeading level={3} size={5}>
                        {title}
                      </RudiHeading>
                      <RudiText variant="body-sm">{body}</RudiText>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>
        </RudiCenter>
      </RudiBox>
      <AppFooter />
    </RudiStack>
  ),
}

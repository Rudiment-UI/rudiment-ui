import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../layouts/Box/Box'
import { Center } from '../layouts/Center/Center'
import { Cluster } from '../layouts/Cluster/Cluster'
import { Cover } from '../layouts/Cover/Cover'
import { Grid } from '../layouts/Grid/Grid'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Button } from '../components/Button/Button'
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
        <Text variant="overline">Now in public beta</Text>
        <Heading level={1} size={1} style={{ fontSize: '3rem', lineHeight: 1.1 }}>
          Build products your users will love
        </Heading>
        <Text style={{ color: 'var(--token-color-text-subtle)' }}>
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

  <Box style={{ borderBlockStart: '1px solid var(--token-color-border-default)', paddingBlock: '4rem' }}>
    <Center>
      <Stack space="2.5rem">
        <Stack space="0.5rem" style={{ textAlign: 'center' }}>
          <Heading level={2} size={2}>Everything your team needs</Heading>
          <Text variant="caption">One platform. Zero compromise.</Text>
        </Stack>
        <Grid minCellWidth="16rem" space="1.5rem">
          <Box bordered>
            <Stack space="0.5rem">
              <Heading level={3} size={5}>Instant deploys</Heading>
              <Text variant="body-sm">Push to any branch and see your changes live in seconds.</Text>
            </Stack>
          </Box>
          <Box bordered>
            <Stack space="0.5rem">
              <Heading level={3} size={5}>Team collaboration</Heading>
              <Text variant="body-sm">Comments, reviews, and approvals — all in one place.</Text>
            </Stack>
          </Box>
          <Box bordered>
            <Stack space="0.5rem">
              <Heading level={3} size={5}>Built-in analytics</Heading>
              <Text variant="body-sm">Know what your users are doing without leaving the dashboard.</Text>
            </Stack>
          </Box>
          <Box bordered>
            <Stack space="0.5rem">
              <Heading level={3} size={5}>Role-based access</Heading>
              <Text variant="body-sm">Grant the right permissions to the right people.</Text>
            </Stack>
          </Box>
          <Box bordered>
            <Stack space="0.5rem">
              <Heading level={3} size={5}>Audit logs</Heading>
              <Text variant="body-sm">Every action is logged and searchable for compliance and debugging.</Text>
            </Stack>
          </Box>
          <Box bordered>
            <Stack space="0.5rem">
              <Heading level={3} size={5}>SSO &amp; 2FA</Heading>
              <Text variant="body-sm">Enterprise-grade security without the enterprise headache.</Text>
            </Stack>
          </Box>
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

export const MarketingHero: Story = {
  name: 'Marketing Hero',
  render: () => (
    <Stack space="4rem">
      <AppHeader />
      <Cover minHeight="80vh">
        <Center intrinsic style={{ flex: 1 }}>
          <Stack
            space="1.5rem"
            style={{ textAlign: 'center', maxWidth: '40rem' }}
          >
            <Text variant="overline">Now in public beta</Text>
            <Heading
              level={1}
              size={1}
              style={{ fontSize: '3rem', lineHeight: 1.1 }}
            >
              Build products your users will love
            </Heading>
            <Text style={{ color: 'var(--token-color-text-subtle)' }}>
              Acme gives your team the tools to ship faster, collaborate better,
              and build with confidence — from first commit to production.
            </Text>
            <Cluster justify="center" space="0.75rem">
              <Button variant="primary" size="lg">
                Get started free
              </Button>
              <Button variant="secondary" size="lg">
                View demo
              </Button>
            </Cluster>
            <Text variant="caption">
              No credit card required. Free up to 3 projects.
            </Text>
          </Stack>
        </Center>
      </Cover>

      {/* Feature grid */}
      <Box
        style={{
          borderBlockStart: '1px solid var(--token-color-border-default)',
          paddingBlock: '4rem',
        }}
      >
        <Center>
          <Stack space="2.5rem">
            <Stack space="0.5rem" style={{ textAlign: 'center' }}>
              <Heading level={2} size={2}>
                Everything your team needs
              </Heading>
              <Text variant="caption">One platform. Zero compromise.</Text>
            </Stack>
            <Grid minCellWidth="16rem" space="1.5rem">
              {[
                {
                  title: 'Instant deploys',
                  body: 'Push to any branch and see your changes live in seconds.',
                },
                {
                  title: 'Team collaboration',
                  body: 'Comments, reviews, and approvals — all in one place.',
                },
                {
                  title: 'Built-in analytics',
                  body: 'Know what your users are doing without leaving the dashboard.',
                },
                {
                  title: 'Role-based access',
                  body: 'Grant the right permissions to the right people.',
                },
                {
                  title: 'Audit logs',
                  body: 'Every action is logged and searchable for compliance and debugging.',
                },
                {
                  title: 'SSO & 2FA',
                  body: 'Enterprise-grade security without the enterprise headache.',
                },
              ].map(({ title, body }) => (
                <Box key={title} bordered>
                  <Stack space="0.5rem">
                    <Heading level={3} size={5}>
                      {title}
                    </Heading>
                    <Text variant="body-sm">{body}</Text>
                  </Stack>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Center>
      </Box>
      <AppFooter />
    </Stack>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'

import { Cluster } from '../layouts/Cluster/Cluster'
import { Cover } from '../layouts/Cover/Cover'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Icon } from '../components/Icon/Icon'
import { Input } from '../components/Input/Input'

const meta = {
  title: 'Examples/Sign In Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `\
<Cover minHeight="100vh">
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
    <div style={{ width: '22rem' }}>
      <Card variant="outlined">
        <Card.Body>
          <Stack space="1.5rem">
            <Stack space="0.25rem">
              <Icon icon="lucide:log-in" size="lg" />
              <Heading level={1} size={3}>Welcome back</Heading>
              <Text variant="caption">Sign in to your account to continue.</Text>
            </Stack>
            <Stack space="1rem" as="form">
              <Input label="Email" type="email" placeholder="you@example.com" isRequired />
              <Input label="Password" type="password" placeholder="••••••••" isRequired />
              <Cluster justify="space-between" align="center">
                <Checkbox>Remember me</Checkbox>
                <Button variant="ghost" size="sm">Forgot password?</Button>
              </Cluster>
              <Button variant="primary">Sign in</Button>
            </Stack>
            <Text variant="caption" style={{ textAlign: 'center' }}>
              No account? <a href="#">Sign up free</a>
            </Text>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  </div>
</Cover>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SignInForm: Story = {
  name: 'Sign In Form',
  render: () => (
    <Cover minHeight="100vh">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ width: '22rem' }}>
          <Card variant="outlined">
            <Card.Body>
              <Stack space="1.5rem">
                <Stack space="0.25rem">
                  <Icon icon="lucide:log-in" size="lg" />
                  <Heading level={1} size={3}>Welcome back</Heading>
                  <Text variant="caption">Sign in to your account to continue.</Text>
                </Stack>
                <Stack space="1rem" as="form">
                  <Input label="Email" type="email" placeholder="you@example.com" isRequired />
                  <Input label="Password" type="password" placeholder="••••••••" isRequired />
                  <Cluster justify="space-between" align="center">
                    <Checkbox>Remember me</Checkbox>
                    <Button variant="ghost" size="sm">Forgot password?</Button>
                  </Cluster>
                  <Button variant="primary">Sign in</Button>
                </Stack>
                <Text variant="caption" style={{ textAlign: 'center' }}>
                  No account? <a href="#">Sign up free</a>
                </Text>
              </Stack>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Cover>
  ),
}

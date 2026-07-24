import type { Meta, StoryObj } from '@storybook/react'

import { RudiCluster } from '../layouts/Cluster/Cluster'
import { RudiCover } from '../layouts/Cover/Cover'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiButton } from '../components/Button/Button'
import { RudiCard } from '../components/Card/Card'
import { RudiCheckbox } from '../components/Checkbox/Checkbox'
import { RudiIcon } from '../components/Icon/Icon'
import { RudiInput } from '../components/Input/Input'

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
    <RudiCover minHeight="100vh">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ width: '22rem' }}>
          <RudiCard variant="outlined">
            <RudiCard.Body>
              <RudiStack space="1.5rem">
                <RudiStack space="0.25rem">
                  <RudiIcon icon="lucide:log-in" size="lg" />
                  <RudiHeading level={1} size={3}>Welcome back</RudiHeading>
                  <RudiText variant="caption">Sign in to your account to continue.</RudiText>
                </RudiStack>
                <RudiStack space="1rem" as="form">
                  <RudiInput label="Email" type="email" placeholder="you@example.com" isRequired />
                  <RudiInput label="Password" type="password" placeholder="••••••••" isRequired />
                  <RudiCluster justify="space-between" align="center">
                    <RudiCheckbox>Remember me</RudiCheckbox>
                    <RudiButton variant="ghost" size="sm">Forgot password?</RudiButton>
                  </RudiCluster>
                  <RudiButton variant="primary">Sign in</RudiButton>
                </RudiStack>
                <RudiText variant="caption" style={{ textAlign: 'center' }}>
                  No account? <a href="#">Sign up free</a>
                </RudiText>
              </RudiStack>
            </RudiCard.Body>
          </RudiCard>
        </div>
      </div>
    </RudiCover>
  ),
}

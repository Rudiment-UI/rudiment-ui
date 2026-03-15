import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../layouts/Box/Box'
import { Stack } from '../layouts/Stack/Stack'
import { Switcher } from '../layouts/Switcher/Switcher'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Input } from '../components/Input/Input'

const meta = {
  title: 'Examples/Simple Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: `\
<Box style={{ width: '24rem' }}>
  <Stack space="1.5rem">
    <Stack space="0.25rem">
      <Heading level={1} size={3}>Create an account</Heading>
      <Text variant="caption">Already have one? <a href="#">Log in</a></Text>
    </Stack>
    <Stack space="1rem" as="form">
      <Switcher threshold="20rem" space="1rem">
        <Input label="First name" placeholder="Jane" isRequired />
        <Input label="Last name" placeholder="Smith" isRequired />
      </Switcher>
      <Input
        label="Email address"
        type="email"
        placeholder="jane@example.com"
        isRequired
        description="We'll send a confirmation link."
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        isRequired
        description="At least 12 characters."
      />
      <Checkbox>
        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </Checkbox>
      <Button variant="primary">Create account</Button>
    </Stack>
  </Stack>
</Box>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SimpleForm: Story = {
  name: 'Simple Form',
  render: () => (
    <Box style={{ width: '24rem' }}>
      <Stack space="1.5rem">
        <Stack space="0.25rem">
          <Heading level={1} size={3}>Create an account</Heading>
          <Text variant="caption">Already have one? <a href="#">Log in</a></Text>
        </Stack>
        <Stack space="1rem" as="form">
          <Switcher threshold="20rem" space="1rem">
            <Input label="First name" placeholder="Jane" isRequired />
            <Input label="Last name" placeholder="Smith" isRequired />
          </Switcher>
          <Input label="Email address" type="email" placeholder="jane@example.com" isRequired description="We'll send a confirmation link." />
          <Input label="Password" type="password" placeholder="••••••••" isRequired description="At least 12 characters." />
          <Checkbox>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</Checkbox>
          <Button variant="primary">Create account</Button>
        </Stack>
      </Stack>
    </Box>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'

import { RudiStack } from '../layouts/Stack/Stack'
import { RudiSwitcher } from '../layouts/Switcher/Switcher'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiButton } from '../components/Button/Button'
import { RudiCard } from '../components/Card/Card'
import { RudiCheckbox } from '../components/Checkbox/Checkbox'
import { RudiInput } from '../components/Input/Input'
import { RudiProgressBar } from '../components/ProgressBar/ProgressBar'

const meta = {
  title: 'Examples/Simple Form',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code: `\
<div style={{ width: '24rem' }}>
  <Card variant="outlined">
    <Card.Body>
      <Stack space="1.5rem">
        <ProgressBar label="Step 1 of 3" value={33} size="sm" />
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
          <Checkbox>I agree to the Terms of Service and Privacy Policy.</Checkbox>
          <Button variant="primary">Create account</Button>
        </Stack>
      </Stack>
    </Card.Body>
  </Card>
</div>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const SimpleForm: Story = {
  name: 'Simple Form',
  render: () => (
    <div style={{ width: '24rem' }}>
      <RudiCard variant="outlined">
        <RudiCard.Body>
          <RudiStack space="1.5rem">
            <RudiProgressBar label="Step 1 of 3" value={33} size="sm" />
            <RudiStack space="0.25rem">
              <RudiHeading level={1} size={3}>Create an account</RudiHeading>
              <RudiText variant="caption">Already have one? <a href="#">Log in</a></RudiText>
            </RudiStack>
            <RudiStack space="1rem" as="form">
              <RudiSwitcher threshold="20rem" space="1rem">
                <RudiInput label="First name" placeholder="Jane" isRequired />
                <RudiInput label="Last name" placeholder="Smith" isRequired />
              </RudiSwitcher>
              <RudiInput label="Email address" type="email" placeholder="jane@example.com" isRequired description="We'll send a confirmation link." />
              <RudiInput label="Password" type="password" placeholder="••••••••" isRequired description="At least 12 characters." />
              <RudiCheckbox>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</RudiCheckbox>
              <RudiButton variant="primary">Create account</RudiButton>
            </RudiStack>
          </RudiStack>
        </RudiCard.Body>
      </RudiCard>
    </div>
  ),
}

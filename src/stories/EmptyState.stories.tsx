import type { Meta, StoryObj } from '@storybook/react'

import { Center } from '../layouts/Center/Center'
import { Cluster } from '../layouts/Cluster/Cluster'
import { Cover } from '../layouts/Cover/Cover'
import { Stack } from '../layouts/Stack/Stack'
import { Heading } from '../typography/Heading/Heading'
import { Text } from '../typography/Text/Text'
import { Button } from '../components/Button/Button'

const meta = {
  title: 'Examples/Empty State',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        code: `\
<Cover minHeight="60vh">
  <Center intrinsic style={{ flex: 1 }}>
    <Stack space="1rem" style={{ textAlign: 'center', maxWidth: '22rem' }}>
      <Heading level={2} size={3}>No projects yet</Heading>
      <Text variant="caption">
        Create your first project to start deploying. It only takes a minute.
      </Text>
      <Cluster justify="center" space="0.75rem">
        <Button variant="primary">New project</Button>
        <Button variant="ghost">View docs</Button>
      </Cluster>
    </Stack>
  </Center>
</Cover>`,
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const EmptyState: Story = {
  name: 'Empty State',
  render: () => (
    <Cover minHeight="60vh">
      <Center intrinsic style={{ flex: 1 }}>
        <Stack space="1rem" style={{ textAlign: 'center', maxWidth: '22rem' }}>
          <Heading level={2} size={3}>No projects yet</Heading>
          <Text variant="caption">
            Create your first project to start deploying. It only takes a minute.
          </Text>
          <Cluster justify="center" space="0.75rem">
            <Button variant="primary">New project</Button>
            <Button variant="ghost">View docs</Button>
          </Cluster>
        </Stack>
      </Center>
    </Cover>
  ),
}

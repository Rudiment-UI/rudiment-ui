import type { Meta, StoryObj } from '@storybook/react'

import { RudiCenter } from '../layouts/Center/Center'
import { RudiCluster } from '../layouts/Cluster/Cluster'
import { RudiCover } from '../layouts/Cover/Cover'
import { RudiStack } from '../layouts/Stack/Stack'
import { RudiHeading } from '../typography/Heading/Heading'
import { RudiText } from '../typography/Text/Text'
import { RudiButton } from '../components/Button/Button'
import { RudiIcon } from '../components/Icon/Icon'

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
      <Icon icon="lucide:folder-plus" size={48} style={{ marginInline: 'auto' }} />
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
    <RudiCover minHeight="60vh">
      <RudiCenter intrinsic style={{ flex: 1 }}>
        <RudiStack space="1rem" style={{ textAlign: 'center', maxWidth: '22rem' }}>
          <RudiCenter>
            <RudiIcon icon="lucide:folder-plus" size={48} />
          </RudiCenter>
          <RudiHeading level={2} size={3}>
            No projects yet
          </RudiHeading>
          <RudiText variant="caption">
            Create your first project to start deploying. It only takes a
            minute.
          </RudiText>
          <RudiCluster justify="center" space="0.75rem">
            <RudiButton variant="primary">New project</RudiButton>
            <RudiButton variant="ghost">View docs</RudiButton>
          </RudiCluster>
        </RudiStack>
      </RudiCenter>
    </RudiCover>
  ),
}

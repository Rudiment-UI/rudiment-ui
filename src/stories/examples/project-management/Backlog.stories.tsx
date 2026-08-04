import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiSidebar } from '../../../layouts/Sidebar/Sidebar'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiInput } from '../../../components/Input/Input'
import { RudiTag } from '../../../components/Tag/Tag'
import { RudiProgressBar } from '../../../components/ProgressBar/ProgressBar'
import { RudiStatCard } from '../../../components/StatCard/StatCard'

import {
  PmShell,
  PageHeader,
  Panel,
  IssueKey,
  TypeIcon,
  PriorityBadge,
  Points,
  AssigneeAvatar,
  EpicDot,
  epic,
  epics,
  stories,
  sprint,
  type Story as StoryModel,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }

// The backlog is everything not yet committed to a sprint or done.
const backlogStories = stories.filter((s) => s.status === 'backlog' || s.status === 'todo')

// Group the backlog under its epic, preserving epic declaration order.
const grouped = epics
  .map((e) => ({ epic: e, items: backlogStories.filter((s) => s.epicId === e.id) }))
  .filter((g) => g.items.length > 0)

const backlogPoints = backlogStories.reduce((sum, s) => sum + s.points, 0)

function BacklogRow({ story }: { story: StoryModel }) {
  const e = epic(story.epicId)
  return (
    <RudiCluster
      space="0.75rem"
      align="center"
      style={{
        paddingBlock: '0.625rem',
        paddingInline: '0.75rem',
        borderRadius: 'var(--rudi-radius-md)',
        borderBlockEnd: '1px solid var(--rudi-color-border-default)',
      }}
    >
      <RudiIconButton aria-label="Drag to reorder" variant="ghost" size="sm">
        <RudiIcon icon="lucide:grip-vertical" size="sm" color="var(--rudi-color-text-subtle)" />
      </RudiIconButton>
      <TypeIcon type={story.type} />
      <IssueKey>{story.key}</IssueKey>
      <RudiText variant="body-sm" style={{ ...medium, flex: 1, minInlineSize: 0 }}>
        {story.title}
      </RudiText>
      <RudiCluster space="0.375rem" align="center">
        <EpicDot color={e.color} />
        <RudiText variant="caption" style={{ whiteSpace: 'nowrap' }}>
          {e.title}
        </RudiText>
      </RudiCluster>
      <PriorityBadge priority={story.priority} />
      <Points value={story.points} />
      <AssigneeAvatar id={story.assigneeId} size="sm" />
    </RudiCluster>
  )
}


const meta = {
  title: 'Examples/Project Management/Backlog',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A groomable product backlog: issues grouped by epic with type, priority, points and assignee, a quick-filter bar, and a sprint-planning side panel that tracks capacity against velocity.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Backlog: Story = {
  name: 'Backlog',
  render: () => {
    const capacity = 75

    return (
      <PmShell active="backlog">
        <RudiStack space="1.5rem">
          <PageHeader
            title="Backlog"
            subtitle={`${backlogStories.length} unstarted issues · ${backlogPoints} points`}
            actions={
              <>
                <RudiButton variant="secondary" size="sm" iconBefore="lucide:sliders-horizontal">
                  Filters
                </RudiButton>
                <RudiButton size="sm" iconBefore="lucide:plus">
                  New issue
                </RudiButton>
              </>
            }
          />

          {/* Filter / search bar */}
          <Panel>
            <RudiCluster space="0.75rem" align="center" justify="space-between">
              <div style={{ inlineSize: 'min(22rem, 100%)' }}>
                <RudiInput label="Search backlog" type="search" placeholder="Search issues…" />
              </div>
              <RudiCluster space="0.5rem" align="center">
                <RudiText variant="caption">Quick filters:</RudiText>
                <RudiTag variant="error">Critical</RudiTag>
                <RudiTag variant="warning">Bugs</RudiTag>
                <RudiTag variant="info">Unassigned</RudiTag>
              </RudiCluster>
            </RudiCluster>
          </Panel>

          <RudiSidebar side="right" sideWidth="18rem" space="1.5rem" contentMin="55%">
            {/* Grouped backlog list */}
            <RudiStack space="1.25rem">
              {grouped.map((group) => (
                <Panel key={group.epic.id} style={{ padding: 0 }}>
                  <RudiCluster
                    justify="space-between"
                    align="center"
                    style={{
                      paddingInline: '0.75rem',
                      paddingBlock: '0.625rem',
                      borderBlockEnd: '1px solid var(--rudi-color-border-default)',
                      backgroundColor: 'var(--rudi-color-background-surface-sunken)',
                      borderStartStartRadius: 'var(--rudi-radius-lg)',
                      borderStartEndRadius: 'var(--rudi-radius-lg)',
                    }}
                  >
                    <RudiCluster space="0.5rem" align="center">
                      <EpicDot color={group.epic.color} size={10} />
                      <RudiHeading level={2} size={6} style={{ margin: 0 }}>
                        {group.epic.title}
                      </RudiHeading>
                      <IssueKey>{group.epic.key}</IssueKey>
                    </RudiCluster>
                    <RudiText variant="caption">
                      {group.items.length} issues · {group.items.reduce((s, i) => s + i.points, 0)} pts
                    </RudiText>
                  </RudiCluster>
                  <div>
                    {group.items.map((story) => (
                      <BacklogRow key={story.id} story={story} />
                    ))}
                  </div>
                </Panel>
              ))}
            </RudiStack>

            {/* Sprint capacity side panel */}
            <RudiStack space="1rem">
              <Panel>
                <RudiStack space="0.875rem">
                  <RudiHeading level={2} size={6} style={{ margin: 0 }}>
                    Next sprint planning
                  </RudiHeading>
                  <RudiStatCard label="Selected for Sprint 25" value={`${sprint.committedPoints - 12} pts`} delta="of 75 capacity" trend="neutral" />
                  <RudiProgressBar
                    label="Capacity used"
                    value={sprint.committedPoints - 12}
                    maxValue={capacity}
                    showValueLabel
                    variant="success"
                  />
                  <RudiText variant="caption">
                    Based on a rolling 3-sprint average velocity of 57 points across 6 engineers.
                  </RudiText>
                  <RudiButton size="sm" iconBefore="lucide:play">
                    Start Sprint 25
                  </RudiButton>
                </RudiStack>
              </Panel>

              <Panel>
                <RudiStack space="0.75rem">
                  <RudiHeading level={2} size={6} style={{ margin: 0 }}>
                    Points by epic
                  </RudiHeading>
                  <RudiStack space="0.625rem">
                    {grouped.map((group) => (
                      <RudiCluster key={group.epic.id} justify="space-between" align="center">
                        <RudiCluster space="0.5rem" align="center">
                          <EpicDot color={group.epic.color} />
                          <RudiText variant="body-sm">{group.epic.title}</RudiText>
                        </RudiCluster>
                        <Points value={group.items.reduce((s, i) => s + i.points, 0)} />
                      </RudiCluster>
                    ))}
                  </RudiStack>
                </RudiStack>
              </Panel>
            </RudiStack>
          </RudiSidebar>
        </RudiStack>
      </PmShell>
    )
  },
}

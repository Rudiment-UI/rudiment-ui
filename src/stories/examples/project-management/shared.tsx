import { useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import { RudiBox } from '../../../layouts/Box/Box'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiAvatar } from '../../../components/Avatar/Avatar'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiDot } from '../../../components/Dot/Dot'
import { RudiNavItem } from '../../../components/NavItem/NavItem'
import { RudiTag } from '../../../components/Tag/Tag'
import { RudiAppShell } from '../../../components/AppShell/AppShell'
import { RudiTopBar } from '../../../components/TopBar/TopBar'
import { RudiPageHeader } from '../../../components/PageHeader/PageHeader'
import { RudiMenuTrigger } from '../../../components/Menu/MenuTrigger'
import { RudiMenu } from '../../../components/Menu/Menu'
import { RudiMenuItem } from '../../../components/Menu/MenuItem'
import { RudiKeyboard } from '../../../components/Menu/Keyboard'
import { RudiMenuSeparator } from '../../../components/Menu/MenuSeparator'

// ===========================================================================
// Cadence — a project-management workspace for a software company
//
// Everything below is fictional sample data for a single active project,
// "Beacon", in "Sprint 24". It is deliberately internally consistent: the
// board columns, backlog, burndown, epics and stories all describe the same
// slice of work so the pages read as one product rather than eight unrelated
// mockups. All colour comes from --rudi-* tokens (feedback + dataviz series)
// so every screen holds up across all eight Rudiment-UI themes.
// ===========================================================================

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

export type Feedback = 'default' | 'success' | 'warning' | 'error' | 'info'

export type StoryType = 'story' | 'bug' | 'task' | 'spike'
export type Priority = 'critical' | 'high' | 'medium' | 'low'
export type StoryStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'

export interface TeamMember {
  id: string
  name: string
  role: string
  initialsColor: string
}

export interface Epic {
  id: string
  key: string
  title: string
  summary: string
  /** dataviz token used as the epic's colour accent across the app */
  color: string
  ownerId: string
  status: 'on-track' | 'at-risk' | 'off-track' | 'done'
  totalPoints: number
  donePoints: number
  targetSprint: string
}

export interface Story {
  id: string
  key: string
  title: string
  type: StoryType
  priority: Priority
  status: StoryStatus
  points: number
  epicId: string
  assigneeId: string
  labels: string[]
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export const team: TeamMember[] = [
  { id: 'u-avery', name: 'Avery Nakamura', role: 'Staff Engineer', initialsColor: 'var(--rudi-color-dataviz-1)' },
  { id: 'u-priya', name: 'Priya Raman', role: 'Product Manager', initialsColor: 'var(--rudi-color-dataviz-2)' },
  { id: 'u-diego', name: 'Diego Fuentes', role: 'Frontend Engineer', initialsColor: 'var(--rudi-color-dataviz-3)' },
  { id: 'u-mei', name: 'Mei Lin', role: 'Backend Engineer', initialsColor: 'var(--rudi-color-dataviz-4)' },
  { id: 'u-jonas', name: 'Jonas Weber', role: 'Design Engineer', initialsColor: 'var(--rudi-color-dataviz-5)' },
  { id: 'u-sara', name: 'Sara Okoye', role: 'QA Engineer', initialsColor: 'var(--rudi-color-dataviz-6)' },
]

export const currentUser = team[0]

export function member(id: string): TeamMember {
  return team.find((m) => m.id === id) ?? team[0]
}

// ---------------------------------------------------------------------------
// Epics
// ---------------------------------------------------------------------------

export const epics: Epic[] = [
  {
    id: 'e-onboarding',
    key: 'BEA-1',
    title: 'Guided onboarding',
    summary: 'A first-run flow that gets a new workspace to its first insight in under five minutes.',
    color: 'var(--rudi-color-dataviz-1)',
    ownerId: 'u-priya',
    status: 'on-track',
    totalPoints: 55,
    donePoints: 38,
    targetSprint: 'Sprint 25',
  },
  {
    id: 'e-billing',
    key: 'BEA-2',
    title: 'Usage-based billing',
    summary: 'Metered billing with proration, invoices, and a self-serve plan switcher.',
    color: 'var(--rudi-color-dataviz-2)',
    ownerId: 'u-avery',
    status: 'at-risk',
    totalPoints: 68,
    donePoints: 21,
    targetSprint: 'Sprint 26',
  },
  {
    id: 'e-realtime',
    key: 'BEA-3',
    title: 'Realtime collaboration',
    summary: 'Live cursors and presence on shared dashboards over a websocket layer.',
    color: 'var(--rudi-color-dataviz-3)',
    ownerId: 'u-avery',
    status: 'on-track',
    totalPoints: 42,
    donePoints: 42,
    targetSprint: 'Sprint 24',
  },
  {
    id: 'e-mobile',
    key: 'BEA-4',
    title: 'Mobile companion app',
    summary: 'A read-first mobile client for alerts, approvals, and quick metric checks.',
    color: 'var(--rudi-color-dataviz-4)',
    ownerId: 'u-jonas',
    status: 'off-track',
    totalPoints: 89,
    donePoints: 12,
    targetSprint: 'Sprint 28',
  },
  {
    id: 'e-search',
    key: 'BEA-5',
    title: 'Global search',
    summary: 'One command-palette search across dashboards, metrics, people, and docs.',
    color: 'var(--rudi-color-dataviz-5)',
    ownerId: 'u-diego',
    status: 'on-track',
    totalPoints: 34,
    donePoints: 19,
    targetSprint: 'Sprint 25',
  },
  {
    id: 'e-reliability',
    key: 'BEA-6',
    title: 'Reliability hardening',
    summary: 'Cut p99 query latency and reach a 99.95% ingestion SLO under peak load.',
    color: 'var(--rudi-color-dataviz-6)',
    ownerId: 'u-mei',
    status: 'at-risk',
    totalPoints: 47,
    donePoints: 28,
    targetSprint: 'Sprint 26',
  },
]

export function epic(id: string): Epic {
  return epics.find((e) => e.id === id) ?? epics[0]
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const stories: Story[] = [
  // Realtime collaboration — the epic wrapping up this sprint
  { id: 's-101', key: 'BEA-101', title: 'Broadcast presence over the websocket gateway', type: 'story', priority: 'high', status: 'done', points: 8, epicId: 'e-realtime', assigneeId: 'u-mei', labels: ['backend', 'websocket'] },
  { id: 's-102', key: 'BEA-102', title: 'Render live cursors with name badges', type: 'story', priority: 'medium', status: 'done', points: 5, epicId: 'e-realtime', assigneeId: 'u-diego', labels: ['frontend'] },
  { id: 's-103', key: 'BEA-103', title: 'Reconnect and replay after a dropped socket', type: 'task', priority: 'high', status: 'review', points: 5, epicId: 'e-realtime', assigneeId: 'u-avery', labels: ['backend', 'resilience'] },
  { id: 's-104', key: 'BEA-104', title: 'Presence flickers on rapid tab switching', type: 'bug', priority: 'medium', status: 'in-progress', points: 3, epicId: 'e-realtime', assigneeId: 'u-diego', labels: ['frontend'] },

  // Guided onboarding — in flight
  { id: 's-201', key: 'BEA-201', title: 'Welcome checklist with progress persistence', type: 'story', priority: 'high', status: 'in-progress', points: 8, epicId: 'e-onboarding', assigneeId: 'u-jonas', labels: ['frontend', 'design'] },
  { id: 's-202', key: 'BEA-202', title: 'Sample dataset seeding on workspace create', type: 'task', priority: 'medium', status: 'todo', points: 5, epicId: 'e-onboarding', assigneeId: 'u-mei', labels: ['backend'] },
  { id: 's-203', key: 'BEA-203', title: 'Empty states never explain the next action', type: 'bug', priority: 'high', status: 'todo', points: 3, epicId: 'e-onboarding', assigneeId: 'u-jonas', labels: ['frontend', 'ux'] },
  { id: 's-204', key: 'BEA-204', title: 'Spike: which activation metric predicts retention', type: 'spike', priority: 'medium', status: 'review', points: 3, epicId: 'e-onboarding', assigneeId: 'u-priya', labels: ['research'] },

  // Global search
  { id: 's-301', key: 'BEA-301', title: 'Command palette shell and keyboard routing', type: 'story', priority: 'high', status: 'in-progress', points: 8, epicId: 'e-search', assigneeId: 'u-diego', labels: ['frontend'] },
  { id: 's-302', key: 'BEA-302', title: 'Index dashboards and metrics for fuzzy search', type: 'task', priority: 'medium', status: 'todo', points: 5, epicId: 'e-search', assigneeId: 'u-mei', labels: ['backend', 'search'] },
  { id: 's-303', key: 'BEA-303', title: 'Recent and pinned results ranking', type: 'story', priority: 'low', status: 'backlog', points: 5, epicId: 'e-search', assigneeId: 'u-diego', labels: ['frontend'] },

  // Usage-based billing — at risk
  { id: 's-401', key: 'BEA-401', title: 'Meter ingestion events into a billing ledger', type: 'story', priority: 'critical', status: 'in-progress', points: 13, epicId: 'e-billing', assigneeId: 'u-avery', labels: ['backend', 'billing'] },
  { id: 's-402', key: 'BEA-402', title: 'Proration when switching plans mid-cycle', type: 'story', priority: 'high', status: 'todo', points: 8, epicId: 'e-billing', assigneeId: 'u-mei', labels: ['backend', 'billing'] },
  { id: 's-403', key: 'BEA-403', title: 'Self-serve plan switcher UI', type: 'story', priority: 'medium', status: 'backlog', points: 5, epicId: 'e-billing', assigneeId: 'u-jonas', labels: ['frontend'] },
  { id: 's-404', key: 'BEA-404', title: 'Invoice PDF totals off by a cent on rounding', type: 'bug', priority: 'critical', status: 'todo', points: 3, epicId: 'e-billing', assigneeId: 'u-avery', labels: ['backend', 'billing'] },
  { id: 's-405', key: 'BEA-405', title: 'Dunning emails for failed charges', type: 'task', priority: 'low', status: 'backlog', points: 5, epicId: 'e-billing', assigneeId: 'u-priya', labels: ['growth'] },

  // Reliability hardening
  { id: 's-501', key: 'BEA-501', title: 'Add read replicas for the query path', type: 'task', priority: 'high', status: 'review', points: 8, epicId: 'e-reliability', assigneeId: 'u-mei', labels: ['infra'] },
  { id: 's-502', key: 'BEA-502', title: 'p99 query latency exceeds 800ms under load', type: 'bug', priority: 'critical', status: 'in-progress', points: 8, epicId: 'e-reliability', assigneeId: 'u-avery', labels: ['infra', 'performance'] },
  { id: 's-503', key: 'BEA-503', title: 'Load test harness for ingestion peaks', type: 'task', priority: 'medium', status: 'todo', points: 5, epicId: 'e-reliability', assigneeId: 'u-sara', labels: ['qa', 'infra'] },

  // Mobile companion — off track / mostly backlog
  { id: 's-601', key: 'BEA-601', title: 'Push notification service for alerts', type: 'story', priority: 'medium', status: 'backlog', points: 13, epicId: 'e-mobile', assigneeId: 'u-jonas', labels: ['mobile'] },
  { id: 's-602', key: 'BEA-602', title: 'Read-only dashboard viewer for mobile', type: 'story', priority: 'medium', status: 'backlog', points: 13, epicId: 'e-mobile', assigneeId: 'u-diego', labels: ['mobile'] },
  { id: 's-603', key: 'BEA-603', title: 'Approve or reject requests from a notification', type: 'story', priority: 'low', status: 'backlog', points: 8, epicId: 'e-mobile', assigneeId: 'u-jonas', labels: ['mobile'] },
  { id: 's-604', key: 'BEA-604', title: 'Spike: evaluate cross-platform vs native shell', type: 'spike', priority: 'medium', status: 'done', points: 5, epicId: 'e-mobile', assigneeId: 'u-avery', labels: ['research'] },
]

export function storiesForStatus(status: StoryStatus): Story[] {
  return stories.filter((s) => s.status === status)
}

export function storiesForEpic(epicId: string): Story[] {
  return stories.filter((s) => s.epicId === epicId)
}

// ---------------------------------------------------------------------------
// Sprint 24 — burndown + summary
// ---------------------------------------------------------------------------

export const sprint = {
  name: 'Sprint 24',
  goal: 'Ship realtime collaboration and unblock the billing ledger.',
  committedPoints: 72,
  completedPoints: 46,
  dayOf: 7,
  totalDays: 10,
}

/**
 * Daily remaining-points for the burndown. `ideal` is the straight line from
 * the committed total to zero; `remaining` is the actual observed burn, which
 * runs a little behind after a mid-sprint scope bump on day 5.
 */
export const burndown = [
  { day: 'Day 1', ideal: 72, remaining: 72 },
  { day: 'Day 2', ideal: 64, remaining: 70 },
  { day: 'Day 3', ideal: 56, remaining: 63 },
  { day: 'Day 4', ideal: 48, remaining: 58 },
  { day: 'Day 5', ideal: 40, remaining: 55 },
  { day: 'Day 6', ideal: 32, remaining: 41 },
  { day: 'Day 7', ideal: 24, remaining: 26 },
  { day: 'Day 8', ideal: 16, remaining: null },
  { day: 'Day 9', ideal: 8, remaining: null },
  { day: 'Day 10', ideal: 0, remaining: null },
]

/** Completed story points per sprint, for the velocity chart. */
export const velocity = [
  { sprint: 'S20', committed: 58, completed: 52 },
  { sprint: 'S21', committed: 63, completed: 60 },
  { sprint: 'S22', committed: 66, completed: 55 },
  { sprint: 'S23', committed: 70, completed: 68 },
  { sprint: 'S24', committed: 72, completed: 46 },
]

// ---------------------------------------------------------------------------
// Activity feed
// ---------------------------------------------------------------------------

export interface Activity {
  id: string
  actorId: string
  action: string
  target: string
  when: string
  icon: string
}

export const activity: Activity[] = [
  { id: 'a1', actorId: 'u-mei', action: 'moved', target: 'BEA-101 to Done', when: '12m ago', icon: 'lucide:check' },
  { id: 'a2', actorId: 'u-avery', action: 'commented on', target: 'BEA-401', when: '48m ago', icon: 'lucide:message-square' },
  { id: 'a3', actorId: 'u-diego', action: 'opened', target: 'BEA-104', when: '2h ago', icon: 'lucide:bug' },
  { id: 'a4', actorId: 'u-priya', action: 'closed the spike', target: 'BEA-204', when: '3h ago', icon: 'lucide:flask-conical' },
  { id: 'a5', actorId: 'u-jonas', action: 'attached a design to', target: 'BEA-201', when: '5h ago', icon: 'lucide:paperclip' },
  { id: 'a6', actorId: 'u-sara', action: 'added tests to', target: 'BEA-501', when: 'Yesterday', icon: 'lucide:shield-check' },
]

// ---------------------------------------------------------------------------
// Presentational mappings
// ---------------------------------------------------------------------------

export const priorityMeta: Record<Priority, { label: string; variant: Feedback; icon: string }> = {
  critical: { label: 'Critical', variant: 'error', icon: 'lucide:chevrons-up' },
  high: { label: 'High', variant: 'warning', icon: 'lucide:chevron-up' },
  medium: { label: 'Medium', variant: 'info', icon: 'lucide:equal' },
  low: { label: 'Low', variant: 'default', icon: 'lucide:chevron-down' },
}

export const typeMeta: Record<StoryType, { label: string; icon: string; color: string }> = {
  story: { label: 'Story', icon: 'lucide:bookmark', color: 'var(--rudi-color-feedback-success)' },
  bug: { label: 'Bug', icon: 'lucide:bug', color: 'var(--rudi-color-feedback-error)' },
  task: { label: 'Task', icon: 'lucide:square-check-big', color: 'var(--rudi-color-feedback-info-text)' },
  spike: { label: 'Spike', icon: 'lucide:flask-conical', color: 'var(--rudi-color-feedback-warning)' },
}

export const statusMeta: Record<StoryStatus, { label: string; variant: Feedback }> = {
  backlog: { label: 'Backlog', variant: 'default' },
  todo: { label: 'To Do', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'info' },
  review: { label: 'In Review', variant: 'warning' },
  done: { label: 'Done', variant: 'success' },
}

export const epicStatusMeta: Record<Epic['status'], { label: string; variant: Feedback }> = {
  'on-track': { label: 'On track', variant: 'success' },
  'at-risk': { label: 'At risk', variant: 'warning' },
  'off-track': { label: 'Off track', variant: 'error' },
  done: { label: 'Done', variant: 'info' },
}

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

/** Monospace issue key, e.g. BEA-101. */
export function IssueKey({ children }: { children: ReactNode }) {
  return (
    <RudiText
      as="span"
      variant="code"
      style={{ color: 'var(--rudi-color-text-subtle)', fontSize: 'var(--rudi-font-size-xs)', whiteSpace: 'nowrap' }}
    >
      {children}
    </RudiText>
  )
}

/** A coloured dot standing in for an epic. Now backed by `RudiDot`. */
export function EpicDot({ color, size = 8 }: { color: string; size?: number }) {
  return (
    <RudiDot color={color} size={size <= 6 ? 'sm' : size >= 12 ? 'lg' : 'md'} />
  )
}

export function TypeIcon({ type }: { type: StoryType }) {
  const meta = typeMeta[type]
  return <RudiIcon icon={meta.icon} size="sm" color={meta.color} label={meta.label} />
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = priorityMeta[priority]
  return (
    <RudiBadge variant={meta.variant} size="sm">
      {meta.label}
    </RudiBadge>
  )
}

/** A compact "points" pill. */
export function Points({ value }: { value: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minInlineSize: '1.5rem',
        blockSize: '1.5rem',
        paddingInline: '0.375rem',
        borderRadius: 'var(--rudi-radius-full)',
        backgroundColor: 'var(--rudi-color-background-surface-sunken)',
        color: 'var(--rudi-color-text-subtle)',
        fontSize: 'var(--rudi-font-size-xs)',
        fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'],
      }}
      title={`${value} story points`}
    >
      {value}
    </span>
  )
}

export function AssigneeAvatar({ id, size = 'sm' }: { id: string; size?: 'sm' | 'md' | 'lg' }) {
  return <RudiAvatar name={member(id).name} size={size} />
}

/** Percentage complete for an epic. */
export function epicPct(e: Epic): number {
  return Math.round((e.donePoints / e.totalPoints) * 100)
}

// ---------------------------------------------------------------------------
// App chrome — persistent sidebar + top bar shell
// ---------------------------------------------------------------------------

export type NavKey =
  | 'dashboard'
  | 'backlog'
  | 'board'
  | 'epics'
  | 'stories'
  | 'burndown'
  | 'profile'

const NAV: { key: NavKey; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { key: 'backlog', label: 'Backlog', icon: 'lucide:list-todo' },
  { key: 'board', label: 'Board', icon: 'lucide:columns-3' },
  { key: 'epics', label: 'Epics', icon: 'lucide:layers' },
  { key: 'stories', label: 'Stories', icon: 'lucide:bookmark' },
  { key: 'burndown', label: 'Burndown', icon: 'lucide:chart-line' },
]

function WorkspaceMark() {
  return (
    <RudiCluster space="0.5rem" align="center">
      <span
        aria-hidden="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          inlineSize: '1.75rem',
          blockSize: '1.75rem',
          borderRadius: 'var(--rudi-radius-md)',
          backgroundColor: 'var(--rudi-color-brand-primary)',
          color: 'var(--rudi-color-text-on-brand)',
        }}
      >
        <RudiIcon icon="lucide:activity" size="sm" />
      </span>
      <RudiHeading level={2} size={4} style={{ margin: 0, letterSpacing: '0.01em' }}>
        Cadence
      </RudiHeading>
    </RudiCluster>
  )
}

/** Sticky top bar for the Cadence shell, built on RudiTopBar. */
function ShellTopbar() {
  return (
    <RudiTopBar
      start={
        <>
          <RudiAppShell.MenuButton />
          <RudiTag variant="info">Sprint 24</RudiTag>
          <RudiText variant="caption">Day {sprint.dayOf} of {sprint.totalDays}</RudiText>
        </>
      }
      end={
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingInline: '0.75rem',
              blockSize: '2rem',
              borderRadius: 'var(--rudi-radius-full)',
              border: '1px solid var(--rudi-color-border-default)',
              color: 'var(--rudi-color-text-subtle)',
            }}
          >
            <RudiIcon icon="lucide:search" size="sm" />
            <RudiText variant="caption">Search or jump to…</RudiText>
            <RudiKeyboard>⌘K</RudiKeyboard>
          </div>
          <RudiIconButton aria-label="Create issue" variant="ghost">
            <RudiIcon icon="lucide:plus" />
          </RudiIconButton>
          <RudiIconButton aria-label="Notifications" variant="ghost">
            <RudiIcon icon="lucide:bell" />
          </RudiIconButton>
          <RudiMenuTrigger>
            <RudiButton variant="ghost" size="sm" aria-label="Account menu">
              <AssigneeAvatar id={currentUser.id} size="sm" />
            </RudiButton>
            <RudiMenu onAction={() => {}}>
              <RudiMenuItem id="profile" icon="lucide:user" label="Your profile" />
              <RudiMenuItem id="prefs" icon="lucide:settings" label="Preferences" />
              <RudiMenuSeparator />
              <RudiMenuItem id="sign-out" icon="lucide:log-out" label="Sign out" isDestructive />
            </RudiMenu>
          </RudiMenuTrigger>
        </>
      }
    />
  )
}

/** Page title block with optional actions on the right. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return <RudiPageHeader title={title} subtitle={subtitle} actions={actions} />
}

/**
 * Full-app shell: fixed left sidebar + sticky top bar + scrolling main.
 * Every project-management page renders its content inside this.
 */
export function PmShell({ active, children }: { active: NavKey; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <RudiAppShell isSidebarOpen={menuOpen} onSidebarOpenChange={setMenuOpen}>
      <RudiAppShell.Sidebar aria-label="Cadence navigation">
        <div style={{ paddingInline: '0.25rem', paddingBlockStart: '0.25rem' }}>
          <WorkspaceMark />
        </div>

        <RudiStack space="0.5rem" as="nav" aria-label="Project">
          <RudiText variant="overline" style={{ paddingInline: '0.25rem' }}>
            Project · Beacon
          </RudiText>
          <RudiStack space="0.125rem">
            {NAV.map((item) => (
              <RudiNavItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                isActive={item.key === active}
                onPress={closeMenu}
              />
            ))}
          </RudiStack>
        </RudiStack>

        <RudiStack space="0.5rem" as="nav" aria-label="Team">
          <RudiText variant="overline" style={{ paddingInline: '0.25rem' }}>
            Team
          </RudiText>
          <RudiStack space="0.125rem">
            <RudiNavItem label="Members" icon="lucide:users" onPress={closeMenu} />
            <RudiNavItem label="Settings" icon="lucide:settings" onPress={closeMenu} />
          </RudiStack>
        </RudiStack>

        <div style={{ marginBlockStart: 'auto' }}>
          <RudiBox
            bordered
            padding="0.625rem"
            style={{ borderRadius: 'var(--rudi-radius-md)' }}
          >
            <RudiCluster space="0.625rem" align="center">
              <AssigneeAvatar id={currentUser.id} size="sm" />
              <RudiStack space="0" style={{ minInlineSize: 0 }}>
                <RudiText variant="body-sm" style={{ fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }}>
                  {currentUser.name}
                </RudiText>
                <RudiText variant="caption">{currentUser.role}</RudiText>
              </RudiStack>
            </RudiCluster>
          </RudiBox>
        </div>
      </RudiAppShell.Sidebar>

      <RudiAppShell.Content>
        <ShellTopbar />
        <RudiAppShell.Main>{children}</RudiAppShell.Main>
      </RudiAppShell.Content>
    </RudiAppShell>
  )
}

/** A reusable surface panel (outlined card look) for page sections. */
export function Panel({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <RudiBox
      bordered
      padding="1rem"
      style={{ borderRadius: 'var(--rudi-radius-lg)', backgroundColor: 'var(--rudi-color-background-surface)', ...style }}
    >
      {children}
    </RudiBox>
  )
}

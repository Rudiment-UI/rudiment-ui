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
import { RudiSectionHeader } from '../../../components/SectionHeader/SectionHeader'
import { RudiKeyboard } from '../../../components/Menu/Keyboard'
import { RudiMenuTrigger } from '../../../components/Menu/MenuTrigger'
import { RudiMenu } from '../../../components/Menu/Menu'
import { RudiMenuItem } from '../../../components/Menu/MenuItem'
import { RudiMenuSeparator } from '../../../components/Menu/MenuSeparator'

// ===========================================================================
// Meridian — a CRM / revenue-operations workspace for a SaaS company
//
// Everything below is fictional sample data for one company, "Meridian", and
// its book of business. It is deliberately internally consistent: the same
// account executives own the same customers and deals, the revenue the finance
// page reports is the revenue the sales pipeline produces, and headcount on the
// team pages matches the employee directory — so the six screens read as one
// product rather than six unrelated mockups. Every colour comes from --rudi-*
// tokens (feedback + dataviz series) so every screen holds up across all eight
// Rudiment-UI themes.
// ===========================================================================

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

export type Feedback = 'default' | 'success' | 'warning' | 'error' | 'info'

export type EmployeeStatus = 'active' | 'remote' | 'on-leave'
export type Segment = 'enterprise' | 'mid-market' | 'smb'
export type Health = 'healthy' | 'at-risk' | 'churning'
export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
export type InvoiceStatus = 'paid' | 'due' | 'overdue'

export interface Department {
  id: string
  name: string
  headId: string
  headcount: number
  openRoles: number
  /** monthly operating budget in whole dollars */
  budget: number
  budgetSpent: number
  /** dataviz token used as the department's accent across the app */
  color: string
  icon: string
}

export interface Employee {
  id: string
  name: string
  role: string
  departmentId: string
  status: EmployeeStatus
  email: string
  location: string
  startDate: string
}

export interface Customer {
  id: string
  name: string
  industry: string
  segment: Segment
  /** monthly recurring revenue in whole dollars */
  mrr: number
  health: Health
  ownerId: string
  seats: number
  since: string
}

export interface Deal {
  id: string
  name: string
  customerId: string
  stage: DealStage
  value: number
  ownerId: string
  probability: number
  closeDate: string
}

export interface Invoice {
  id: string
  number: string
  customerId: string
  amount: number
  status: InvoiceStatus
  dueDate: string
}

// ---------------------------------------------------------------------------
// Departments
// ---------------------------------------------------------------------------

export const departments: Department[] = [
  { id: 'd-sales', name: 'Sales', headId: 'u-mara', headcount: 12, openRoles: 3, budget: 180000, budgetSpent: 154000, color: 'var(--rudi-color-dataviz-1)', icon: 'lucide:trending-up' },
  { id: 'd-eng', name: 'Engineering', headId: 'u-arjun', headcount: 24, openRoles: 5, budget: 420000, budgetSpent: 388000, color: 'var(--rudi-color-dataviz-2)', icon: 'lucide:code' },
  { id: 'd-finance', name: 'Finance', headId: 'u-noah', headcount: 6, openRoles: 1, budget: 96000, budgetSpent: 71000, color: 'var(--rudi-color-dataviz-3)', icon: 'lucide:wallet' },
  { id: 'd-cs', name: 'Customer Success', headId: 'u-lena', headcount: 10, openRoles: 2, budget: 132000, budgetSpent: 118000, color: 'var(--rudi-color-dataviz-4)', icon: 'lucide:heart-handshake' },
  { id: 'd-marketing', name: 'Marketing', headId: 'u-tomas', headcount: 8, openRoles: 1, budget: 150000, budgetSpent: 141000, color: 'var(--rudi-color-dataviz-5)', icon: 'lucide:megaphone' },
  { id: 'd-people', name: 'People', headId: 'u-idris', headcount: 4, openRoles: 0, budget: 72000, budgetSpent: 58000, color: 'var(--rudi-color-dataviz-6)', icon: 'lucide:users' },
]

export function department(id: string): Department {
  return departments.find((d) => d.id === id) ?? departments[0]
}

// ---------------------------------------------------------------------------
// Employees — the people who show up as owners / heads elsewhere
// ---------------------------------------------------------------------------

export const employees: Employee[] = [
  { id: 'u-mara', name: 'Mara Delgado', role: 'VP of Sales', departmentId: 'd-sales', status: 'active', email: 'mara@meridian.io', location: 'Austin, TX', startDate: '2021-03-01' },
  { id: 'u-arjun', name: 'Arjun Patel', role: 'VP of Engineering', departmentId: 'd-eng', status: 'active', email: 'arjun@meridian.io', location: 'Seattle, WA', startDate: '2020-06-15' },
  { id: 'u-noah', name: 'Noah Feldman', role: 'CFO', departmentId: 'd-finance', status: 'active', email: 'noah@meridian.io', location: 'New York, NY', startDate: '2020-01-10' },
  { id: 'u-lena', name: 'Lena Hoffmann', role: 'Head of Customer Success', departmentId: 'd-cs', status: 'active', email: 'lena@meridian.io', location: 'Denver, CO', startDate: '2021-09-20' },
  { id: 'u-tomas', name: 'Tomas Ricci', role: 'Head of Marketing', departmentId: 'd-marketing', status: 'remote', email: 'tomas@meridian.io', location: 'Lisbon, PT', startDate: '2022-02-14' },
  { id: 'u-idris', name: 'Idris Bello', role: 'Head of People', departmentId: 'd-people', status: 'active', email: 'idris@meridian.io', location: 'Chicago, IL', startDate: '2021-11-08' },
  { id: 'u-sofia', name: 'Sofia Marchetti', role: 'Senior Account Executive', departmentId: 'd-sales', status: 'active', email: 'sofia@meridian.io', location: 'Austin, TX', startDate: '2022-04-04' },
  { id: 'u-david', name: 'David Okoro', role: 'Account Executive', departmentId: 'd-sales', status: 'remote', email: 'david@meridian.io', location: 'Remote', startDate: '2023-01-16' },
  { id: 'u-yuki', name: 'Yuki Tanaka', role: 'Account Executive', departmentId: 'd-sales', status: 'active', email: 'yuki@meridian.io', location: 'Austin, TX', startDate: '2023-07-10' },
  { id: 'u-priya', name: 'Priya Nair', role: 'Customer Success Manager', departmentId: 'd-cs', status: 'active', email: 'priya@meridian.io', location: 'Denver, CO', startDate: '2022-08-22' },
  { id: 'u-gabe', name: 'Gabe Wilson', role: 'Customer Success Manager', departmentId: 'd-cs', status: 'on-leave', email: 'gabe@meridian.io', location: 'Denver, CO', startDate: '2022-05-30' },
  { id: 'u-hana', name: 'Hana Kim', role: 'Staff Engineer', departmentId: 'd-eng', status: 'remote', email: 'hana@meridian.io', location: 'Remote', startDate: '2021-10-11' },
]

export function employee(id: string): Employee {
  return employees.find((e) => e.id === id) ?? employees[0]
}

/** The signed-in user for the app chrome. */
export const currentUser = employees[0]

// ---------------------------------------------------------------------------
// Customers — the book of business
// ---------------------------------------------------------------------------

export const customers: Customer[] = [
  { id: 'c-northwind', name: 'Northwind Traders', industry: 'Logistics', segment: 'enterprise', mrr: 18400, health: 'healthy', ownerId: 'u-sofia', seats: 240, since: '2021-05-01' },
  { id: 'c-contoso', name: 'Contoso Retail', industry: 'Retail', segment: 'enterprise', mrr: 15200, health: 'at-risk', ownerId: 'u-sofia', seats: 180, since: '2021-08-12' },
  { id: 'c-fabrikam', name: 'Fabrikam Health', industry: 'Healthcare', segment: 'enterprise', mrr: 13800, health: 'healthy', ownerId: 'u-david', seats: 210, since: '2022-01-20' },
  { id: 'c-tailspin', name: 'Tailspin Toys', industry: 'Consumer Goods', segment: 'mid-market', mrr: 6400, health: 'healthy', ownerId: 'u-yuki', seats: 64, since: '2022-06-15' },
  { id: 'c-wingtip', name: 'Wingtip Media', industry: 'Media', segment: 'mid-market', mrr: 5200, health: 'at-risk', ownerId: 'u-david', seats: 48, since: '2022-09-30' },
  { id: 'c-proseware', name: 'Proseware Inc.', industry: 'Publishing', segment: 'mid-market', mrr: 4800, health: 'churning', ownerId: 'u-yuki', seats: 40, since: '2022-11-05' },
  { id: 'c-adventure', name: 'Adventure Works', industry: 'Manufacturing', segment: 'mid-market', mrr: 4100, health: 'healthy', ownerId: 'u-sofia', seats: 52, since: '2023-02-18' },
  { id: 'c-lucerne', name: 'Lucerne Financial', industry: 'Fintech', segment: 'enterprise', mrr: 12600, health: 'healthy', ownerId: 'u-david', seats: 160, since: '2023-03-27' },
  { id: 'c-graphic', name: 'Graphic Design Co.', industry: 'Creative', segment: 'smb', mrr: 1400, health: 'healthy', ownerId: 'u-yuki', seats: 12, since: '2023-06-09' },
  { id: 'c-relecloud', name: 'Relecloud', industry: 'Software', segment: 'smb', mrr: 980, health: 'at-risk', ownerId: 'u-yuki', seats: 9, since: '2023-08-14' },
]

export function customer(id: string): Customer {
  return customers.find((c) => c.id === id) ?? customers[0]
}

// ---------------------------------------------------------------------------
// Deals — the active pipeline
// ---------------------------------------------------------------------------

export const deals: Deal[] = [
  { id: 'dl-1', name: 'Northwind — platform expansion', customerId: 'c-northwind', stage: 'negotiation', value: 84000, ownerId: 'u-sofia', probability: 80, closeDate: '2026-08-14' },
  { id: 'dl-2', name: 'Lucerne — enterprise rollout', customerId: 'c-lucerne', stage: 'proposal', value: 120000, ownerId: 'u-david', probability: 55, closeDate: '2026-09-01' },
  { id: 'dl-3', name: 'Fabrikam — added regions', customerId: 'c-fabrikam', stage: 'qualified', value: 48000, ownerId: 'u-david', probability: 35, closeDate: '2026-09-20' },
  { id: 'dl-4', name: 'Adventure Works — annual renewal', customerId: 'c-adventure', stage: 'negotiation', value: 52000, ownerId: 'u-sofia', probability: 75, closeDate: '2026-08-05' },
  { id: 'dl-5', name: 'Tailspin — seat upgrade', customerId: 'c-tailspin', stage: 'proposal', value: 24000, ownerId: 'u-yuki', probability: 60, closeDate: '2026-08-28' },
  { id: 'dl-6', name: 'Contoso — win-back', customerId: 'c-contoso', stage: 'qualified', value: 60000, ownerId: 'u-sofia', probability: 30, closeDate: '2026-10-10' },
  { id: 'dl-7', name: 'Wingtip — new team', customerId: 'c-wingtip', stage: 'lead', value: 18000, ownerId: 'u-david', probability: 15, closeDate: '2026-10-22' },
  { id: 'dl-8', name: 'Graphic Design — upsell', customerId: 'c-graphic', stage: 'won', value: 9600, ownerId: 'u-yuki', probability: 100, closeDate: '2026-07-18' },
  { id: 'dl-9', name: 'Relecloud — expansion', customerId: 'c-relecloud', stage: 'lost', value: 12000, ownerId: 'u-yuki', probability: 0, closeDate: '2026-07-02' },
  { id: 'dl-10', name: 'Proseware — enterprise tier', customerId: 'c-proseware', stage: 'lead', value: 30000, ownerId: 'u-yuki', probability: 20, closeDate: '2026-11-04' },
  { id: 'dl-11', name: 'Northwind — support add-on', customerId: 'c-northwind', stage: 'won', value: 21600, ownerId: 'u-sofia', probability: 100, closeDate: '2026-07-11' },
  { id: 'dl-12', name: 'Lucerne — data warehouse', customerId: 'c-lucerne', stage: 'qualified', value: 44000, ownerId: 'u-david', probability: 40, closeDate: '2026-10-01' },
]

/** Deals still in flight (not won or lost). */
export const openDeals = deals.filter((d) => d.stage !== 'won' && d.stage !== 'lost')

// ---------------------------------------------------------------------------
// Invoices — accounts receivable
// ---------------------------------------------------------------------------

export const invoices: Invoice[] = [
  { id: 'inv-1', number: 'INV-2041', customerId: 'c-northwind', amount: 18400, status: 'paid', dueDate: '2026-07-01' },
  { id: 'inv-2', number: 'INV-2042', customerId: 'c-fabrikam', amount: 13800, status: 'paid', dueDate: '2026-07-01' },
  { id: 'inv-3', number: 'INV-2043', customerId: 'c-contoso', amount: 15200, status: 'due', dueDate: '2026-08-01' },
  { id: 'inv-4', number: 'INV-2044', customerId: 'c-lucerne', amount: 12600, status: 'due', dueDate: '2026-08-01' },
  { id: 'inv-5', number: 'INV-2045', customerId: 'c-wingtip', amount: 5200, status: 'overdue', dueDate: '2026-07-15' },
  { id: 'inv-6', number: 'INV-2046', customerId: 'c-proseware', amount: 4800, status: 'overdue', dueDate: '2026-07-10' },
  { id: 'inv-7', number: 'INV-2047', customerId: 'c-tailspin', amount: 6400, status: 'due', dueDate: '2026-08-05' },
  { id: 'inv-8', number: 'INV-2048', customerId: 'c-adventure', amount: 4100, status: 'paid', dueDate: '2026-07-01' },
]

// ---------------------------------------------------------------------------
// Time series — for the charts
// ---------------------------------------------------------------------------

/** Company revenue and operating expenses by month (thousands of dollars). */
export const revenueTrend = [
  { month: 'Feb', revenue: 268, expenses: 214 },
  { month: 'Mar', revenue: 284, expenses: 221 },
  { month: 'Apr', revenue: 301, expenses: 233 },
  { month: 'May', revenue: 322, expenses: 240 },
  { month: 'Jun', revenue: 338, expenses: 248 },
  { month: 'Jul', revenue: 361, expenses: 256 },
]

/** Monthly recurring revenue by month (thousands of dollars). */
export const mrrTrend = [
  { month: 'Feb', mrr: 74 },
  { month: 'Mar', mrr: 79 },
  { month: 'Apr', mrr: 83 },
  { month: 'May', mrr: 88 },
  { month: 'Jun', mrr: 92 },
  { month: 'Jul', mrr: 98 },
]

/** Net cash flow by month (thousands of dollars). */
export const cashFlow = [
  { month: 'Feb', net: 54 },
  { month: 'Mar', net: 63 },
  { month: 'Apr', net: 68 },
  { month: 'May', net: 82 },
  { month: 'Jun', net: 90 },
  { month: 'Jul', net: 105 },
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
  { id: 'a1', actorId: 'u-sofia', action: 'moved', target: 'Northwind — platform expansion to Negotiation', when: '18m ago', icon: 'lucide:trending-up' },
  { id: 'a2', actorId: 'u-yuki', action: 'closed', target: 'Graphic Design — upsell ($9.6k)', when: '1h ago', icon: 'lucide:party-popper' },
  { id: 'a3', actorId: 'u-lena', action: 'flagged', target: 'Contoso Retail as at-risk', when: '2h ago', icon: 'lucide:triangle-alert' },
  { id: 'a4', actorId: 'u-noah', action: 'sent invoice', target: 'INV-2043 to Contoso Retail', when: '4h ago', icon: 'lucide:receipt' },
  { id: 'a5', actorId: 'u-david', action: 'logged a call with', target: 'Lucerne Financial', when: 'Yesterday', icon: 'lucide:phone' },
  { id: 'a6', actorId: 'u-idris', action: 'opened a req for', target: 'Account Executive · Sales', when: 'Yesterday', icon: 'lucide:user-plus' },
]

// ---------------------------------------------------------------------------
// Presentational mappings
// ---------------------------------------------------------------------------

export const dealStageMeta: Record<DealStage, { label: string; variant: Feedback; color: string }> = {
  lead: { label: 'Lead', variant: 'default', color: 'var(--rudi-color-dataviz-6)' },
  qualified: { label: 'Qualified', variant: 'info', color: 'var(--rudi-color-dataviz-5)' },
  proposal: { label: 'Proposal', variant: 'info', color: 'var(--rudi-color-dataviz-2)' },
  negotiation: { label: 'Negotiation', variant: 'warning', color: 'var(--rudi-color-dataviz-1)' },
  won: { label: 'Won', variant: 'success', color: 'var(--rudi-color-feedback-success)' },
  lost: { label: 'Lost', variant: 'error', color: 'var(--rudi-color-feedback-error)' },
}

export const healthMeta: Record<Health, { label: string; variant: Feedback; icon: string }> = {
  healthy: { label: 'Healthy', variant: 'success', icon: 'lucide:heart-pulse' },
  'at-risk': { label: 'At risk', variant: 'warning', icon: 'lucide:triangle-alert' },
  churning: { label: 'Churning', variant: 'error', icon: 'lucide:trending-down' },
}

export const segmentMeta: Record<Segment, { label: string; variant: Feedback }> = {
  enterprise: { label: 'Enterprise', variant: 'info' },
  'mid-market': { label: 'Mid-market', variant: 'default' },
  smb: { label: 'SMB', variant: 'default' },
}

export const employeeStatusMeta: Record<EmployeeStatus, { label: string; variant: Feedback; avatarStatus?: 'success' | 'warning' | 'error' | 'info' }> = {
  active: { label: 'Active', variant: 'success', avatarStatus: 'success' },
  remote: { label: 'Remote', variant: 'info', avatarStatus: 'info' },
  'on-leave': { label: 'On leave', variant: 'warning', avatarStatus: 'warning' },
}

export const invoiceStatusMeta: Record<InvoiceStatus, { label: string; variant: Feedback }> = {
  paid: { label: 'Paid', variant: 'success' },
  due: { label: 'Due', variant: 'info' },
  overdue: { label: 'Overdue', variant: 'error' },
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** $1,234 — whole-dollar currency. */
export function formatCurrency(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

/** $1.2M / $12k — compact currency for tight spaces. */
export function formatCompact(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (Math.abs(n) >= 1_000) return `$${Math.round(n / 1_000)}k`
  return `$${n}`
}

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

/** A coloured dot standing in for a category accent. Now backed by `RudiDot`. */
export function StatusDot({ color, size = 8 }: { color: string; size?: number }) {
  return (
    <RudiDot color={color} size={size <= 6 ? 'sm' : size >= 12 ? 'lg' : 'md'} />
  )
}

export function HealthBadge({ health }: { health: Health }) {
  const meta = healthMeta[health]
  return (
    <RudiBadge variant={meta.variant} size="sm">
      {meta.label}
    </RudiBadge>
  )
}

/** Avatar for a person by id. */
export function AvatarFor({ id, size = 'sm' }: { id: string; size?: 'sm' | 'md' | 'lg' }) {
  return <RudiAvatar name={employee(id).name} size={size} />
}

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }

// ---------------------------------------------------------------------------
// App chrome — responsive sidebar drawer + top bar shell
// ---------------------------------------------------------------------------

export type NavKey = 'dashboard' | 'sales' | 'finance' | 'team' | 'employees' | 'customers'

const NAV: { key: NavKey; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
  { key: 'sales', label: 'Sales', icon: 'lucide:trending-up' },
  { key: 'finance', label: 'Finance', icon: 'lucide:wallet' },
  { key: 'team', label: 'Team', icon: 'lucide:network' },
  { key: 'employees', label: 'Employees', icon: 'lucide:users' },
  { key: 'customers', label: 'Customers', icon: 'lucide:building-2' },
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
        <RudiIcon icon="lucide:orbit" size="sm" />
      </span>
      <RudiHeading level={2} size={4} style={{ margin: 0, letterSpacing: '0.01em' }}>
        Meridian
      </RudiHeading>
    </RudiCluster>
  )
}

/** Sticky top bar for the Meridian shell, built on RudiTopBar. */
function ShellTopbar() {
  return (
    <RudiTopBar
      start={
        <>
          <RudiAppShell.MenuButton />
          <RudiTag variant="info">Q3 FY26</RudiTag>
          <RudiText variant="caption">All systems operational</RudiText>
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
            <RudiText variant="caption">Search customers, deals…</RudiText>
            <RudiKeyboard>⌘K</RudiKeyboard>
          </div>
          <RudiIconButton aria-label="Create" variant="ghost">
            <RudiIcon icon="lucide:plus" />
          </RudiIconButton>
          <RudiIconButton aria-label="Notifications" variant="ghost">
            <RudiIcon icon="lucide:bell" />
          </RudiIconButton>
          <RudiMenuTrigger>
            <RudiButton variant="ghost" size="sm" aria-label="Account menu">
              <AvatarFor id={currentUser.id} size="sm" />
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

/** Section heading with an optional trailing "see all" action. */
export function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <RudiSectionHeader
      title={title}
      action={
        action ? (
          <RudiButton variant="ghost" size="sm" iconAfter="lucide:arrow-right">
            {action}
          </RudiButton>
        ) : undefined
      }
    />
  )
}

/** A reusable surface panel (outlined card look) for page sections. */
export function Panel({ children, style }: { children: ReactNode; style?: CSSProperties }) {
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

/**
 * Full-app shell: responsive left sidebar (drawer on mobile) + sticky top bar +
 * scrolling main. Every Meridian page renders its content inside this.
 */
export function CrmShell({ active, children }: { active: NavKey; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <RudiAppShell isSidebarOpen={menuOpen} onSidebarOpenChange={setMenuOpen}>
      <RudiAppShell.Sidebar aria-label="Meridian navigation">
        <div style={{ paddingInline: '0.25rem', paddingBlockStart: '0.25rem' }}>
          <WorkspaceMark />
        </div>

        <RudiStack space="0.5rem" as="nav" aria-label="Workspace">
          <RudiText variant="overline" style={{ paddingInline: '0.25rem' }}>
            Workspace
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

        <RudiStack space="0.5rem" as="nav" aria-label="Account">
          <RudiText variant="overline" style={{ paddingInline: '0.25rem' }}>
            Account
          </RudiText>
          <RudiStack space="0.125rem">
            <RudiNavItem label="Reports" icon="lucide:bar-chart-3" onPress={closeMenu} />
            <RudiNavItem label="Settings" icon="lucide:settings" onPress={closeMenu} />
          </RudiStack>
        </RudiStack>

        <div style={{ marginBlockStart: 'auto' }}>
          <RudiBox bordered padding="0.625rem" style={{ borderRadius: 'var(--rudi-radius-md)' }}>
            <RudiCluster space="0.625rem" align="center">
              <AvatarFor id={currentUser.id} size="sm" />
              <RudiStack space="0" style={{ minInlineSize: 0 }}>
                <RudiText variant="body-sm" style={medium}>
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

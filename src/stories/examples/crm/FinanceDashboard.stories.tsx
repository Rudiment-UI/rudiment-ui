import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiLineChart } from '../../../components/Charts/LineChart/LineChart'
import { RudiBarChart } from '../../../components/Charts/BarChart/BarChart'
import { RudiDonutChart } from '../../../components/Charts/DonutChart/DonutChart'
import { RudiAlert } from '../../../components/Alert/Alert'
import { RudiBadge } from '../../../components/Badge/Badge'

import {
  CrmShell,
  PageHeader,
  Panel,
  SectionHeading,
  invoices,
  customer,
  revenueTrend,
  cashFlow,
  invoiceStatusMeta,
  formatCurrency,
  formatCompact,
  type InvoiceStatus,
} from './shared'

const medium = { fontWeight: 'var(--rudi-font-weight-medium)' as CSSProperties['fontWeight'] }
const semibold = { fontWeight: 'var(--rudi-font-weight-semibold)' as CSSProperties['fontWeight'] }

// --- Derived finance metrics, all from the shared data model ---------------
const thisMonth = revenueTrend[revenueTrend.length - 1]
const prevMonth = revenueTrend[revenueTrend.length - 2]

const revenue = thisMonth.revenue * 1000
const expenses = thisMonth.expenses * 1000
const netMargin = (thisMonth.revenue - thisMonth.expenses) / thisMonth.revenue
const prevMargin = (prevMonth.revenue - prevMonth.expenses) / prevMonth.revenue

const revenueDelta = (thisMonth.revenue - prevMonth.revenue) / prevMonth.revenue
const expensesDelta = (thisMonth.expenses - prevMonth.expenses) / prevMonth.expenses
const marginDeltaPts = (netMargin - prevMargin) * 100

const openInvoices = invoices.filter((inv) => inv.status !== 'paid')
const outstandingAr = openInvoices.reduce((sum, inv) => sum + inv.amount, 0)

const overdueInvoices = invoices.filter((inv) => inv.status === 'overdue')
const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0)

/** Invoiced amount grouped by status, for the donut. */
const statusOrder: InvoiceStatus[] = ['paid', 'due', 'overdue']
const invoicesByStatus = statusOrder.map((status) => ({
  name: invoiceStatusMeta[status].label,
  value: invoices.filter((inv) => inv.status === status).reduce((sum, inv) => sum + inv.amount, 0),
}))

/** Outstanding invoices, most urgent first. */
const statusRank: Record<InvoiceStatus, number> = { overdue: 0, due: 1, paid: 2 }
const outstandingSorted = [...openInvoices].sort((a, b) => statusRank[a.status] - statusRank[b.status])

const pct = (n: number) => `${n >= 0 ? '+' : ''}${(n * 100).toFixed(1)}%`

const invoiceRow: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '7rem minmax(9rem, 1fr) 7rem 6rem 6rem',
  gap: '0.75rem',
  alignItems: 'center',
  paddingBlock: '0.625rem',
  borderBlockEnd: '1px solid var(--rudi-color-border-default)',
}

const alignEnd: CSSProperties = { textAlign: 'end' }

const meta = {
  title: 'Examples/CRM/Finance Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The finance command-center for Meridian: revenue, expenses, net margin, and outstanding accounts-receivable KPIs, an overdue-invoice alert, a revenue-vs-expenses trend, invoiced amount by status, monthly cash flow, and a scrollable table of unpaid invoices — a mobile-friendly shell built entirely from Rudiment-UI primitives and themed with design tokens.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FinanceDashboard: Story = {
  name: 'Finance Dashboard',
  render: () => (
    <CrmShell active="finance">
      <RudiStack space="1.5rem">
        <PageHeader
          title="Finance dashboard"
          subtitle="Meridian · Q3 FY26 · revenue, margin, cash flow, and accounts receivable at a glance"
          actions={
            <>
              <RudiButton variant="secondary" size="sm" iconBefore="lucide:calendar">
                This quarter
              </RudiButton>
              <RudiButton size="sm" iconBefore="lucide:plus">
                New invoice
              </RudiButton>
            </>
          }
        />

        {/* KPI row */}
        <RudiGrid minCellWidth="13rem" space="1rem">
          <RudiStatCard label="Revenue (this month)" value={formatCompact(revenue)} delta={pct(revenueDelta)} trend="up" />
          <RudiStatCard label="Expenses (this month)" value={formatCompact(expenses)} delta={pct(expensesDelta)} trend="neutral" />
          <RudiStatCard
            label="Net margin"
            value={`${(netMargin * 100).toFixed(0)}%`}
            delta={`${marginDeltaPts >= 0 ? '+' : ''}${marginDeltaPts.toFixed(1)} pts`}
            trend="up"
          />
          <RudiStatCard
            label="Outstanding AR"
            value={formatCompact(outstandingAr)}
            delta={`${openInvoices.length} open`}
            trend="neutral"
          />
        </RudiGrid>

        <RudiAlert variant="error" icon="lucide:triangle-alert" title={`Two invoices are past due — ${formatCurrency(overdueTotal)} overdue.`}>
          Wingtip Media and Proseware Inc. are both past their due dates. Finance has sent reminders and flagged the accounts
          for a follow-up call this week.
        </RudiAlert>

        {/* Charts row */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          <Panel style={{ gridColumn: 'span 2' }}>
            <RudiStack space="0.75rem">
              <SectionHeading title="Revenue vs. expenses" action="Reports" />
              <RudiLineChart
                data={revenueTrend}
                dataKeys={['revenue', 'expenses']}
                indexKey="month"
                height={260}
                showLegend
                curved
                label="Monthly company revenue against operating expenses, in thousands of dollars"
              />
            </RudiStack>
          </Panel>
          <Panel>
            <RudiStack space="0.75rem">
              <SectionHeading title="Invoice status" />
              <RudiDonutChart
                data={invoicesByStatus}
                height={260}
                showLegend
                label="Invoiced amount broken down by payment status"
              />
            </RudiStack>
          </Panel>
        </RudiGrid>

        {/* Cash flow + outstanding invoices */}
        <RudiGrid minCellWidth="22rem" space="1rem">
          <Panel>
            <RudiStack space="0.75rem">
              <SectionHeading title="Cash flow" />
              <RudiBarChart
                data={cashFlow}
                dataKeys={['net']}
                indexKey="month"
                showGrid
                height={240}
                label="Net monthly cash flow, in thousands of dollars"
              />
            </RudiStack>
          </Panel>

          <Panel>
            <RudiStack space="1rem">
              <SectionHeading title="Outstanding invoices" action="All invoices" />
              <div style={{ overflowX: 'auto' }}>
                <div style={{ minInlineSize: '35rem' }}>
                  <RudiStack space="0">
                    <div style={{ ...invoiceRow, borderBlockEnd: '1px solid var(--rudi-color-border-default)' }}>
                      <RudiText variant="overline">Invoice</RudiText>
                      <RudiText variant="overline">Customer</RudiText>
                      <RudiText variant="overline" style={alignEnd}>
                        Amount
                      </RudiText>
                      <RudiText variant="overline">Due</RudiText>
                      <RudiText variant="overline">Status</RudiText>
                    </div>
                    {outstandingSorted.map((inv) => (
                      <div key={inv.id} style={invoiceRow}>
                        <RudiText variant="body-sm" style={medium}>
                          {inv.number}
                        </RudiText>
                        <RudiText variant="body-sm" style={{ minInlineSize: 0 }}>
                          {customer(inv.customerId).name}
                        </RudiText>
                        <RudiText variant="body-sm" style={{ ...semibold, ...alignEnd }}>
                          {formatCurrency(inv.amount)}
                        </RudiText>
                        <RudiText variant="body-sm">{inv.dueDate}</RudiText>
                        <RudiCluster space="0">
                          <RudiBadge variant={invoiceStatusMeta[inv.status].variant} size="sm">
                            {invoiceStatusMeta[inv.status].label}
                          </RudiBadge>
                        </RudiCluster>
                      </div>
                    ))}
                  </RudiStack>
                </div>
              </div>
            </RudiStack>
          </Panel>
        </RudiGrid>
      </RudiStack>
    </CrmShell>
  ),
}

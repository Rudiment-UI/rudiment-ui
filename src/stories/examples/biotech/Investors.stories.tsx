import type { Meta, StoryObj } from '@storybook/react'

import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiButton } from '../../../components/Button/Button'
import { RudiCard } from '../../../components/Card/Card'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiStatCard } from '../../../components/StatCard/StatCard'
import { RudiTag } from '../../../components/Tag/Tag'
import { RudiBarChart } from '../../../components/Charts/BarChart/BarChart'
import { RudiDonutChart } from '../../../components/Charts/DonutChart/DonutChart'
import { RudiLineChart } from '../../../components/Charts/LineChart/LineChart'
import {
  BioFooter,
  BioHeader,
  GlowSection,
  GradientText,
  SectionHead,
  TEAL,
  filings,
  financials,
  glass,
} from './shared'

const meta = {
  title: 'Examples/Biotech/Investors & Stakeholders',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const kpis = [
  { label: 'Share price (HLXB)', value: '$74.20', delta: '+3.8% today', trend: 'up' as const },
  { label: 'Market cap', value: '$9.6B', delta: '+1.2% MTD', trend: 'up' as const },
  { label: 'Cash & equivalents', value: '$1.8B', delta: 'Runway into 2029', trend: 'neutral' as const },
  { label: 'TTM R&D investment', value: '$486M', delta: '+18% YoY', trend: 'up' as const },
]

const metrics = [
  { label: 'Programs in clinic', value: '12' },
  { label: 'Phase 3 readouts (2026)', value: '3' },
  { label: 'Partnered programs', value: '9' },
  { label: 'Patents granted', value: '340+' },
  { label: 'Employees', value: '620' },
  { label: 'cGMP suites online', value: '8' },
]

const governance = [
  { icon: 'lucide:users', title: 'Independent board', body: '8 of 10 directors are independent, with dedicated audit, science, and compensation committees.' },
  { icon: 'lucide:leaf', title: 'ESG commitments', body: 'Carbon-neutral operations by 2030 and expanded access programs in low-income regions.' },
  { icon: 'lucide:scale', title: 'Bioethics oversight', body: 'An external bioethics board reviews every germline-adjacent program before it advances.' },
]

function filingIcon(type: string) {
  if (type === 'SEC Filing') return 'lucide:file-text'
  if (type === 'Presentation') return 'lucide:presentation'
  if (type === 'Letter') return 'lucide:mail'
  return 'lucide:file-chart-column'
}

export const InvestorsAndStakeholders: Story = {
  name: 'Investors & Stakeholders',
  render: () => (
    <RudiStack space="0">
      <BioHeader active="Investors" />

      {/* Ticker hero */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="2rem" style={{ paddingBlock: '4.5rem' }}>
            <RudiGrid minCellWidth="18rem" space="2rem" style={{ alignItems: 'center' }}>
              <RudiStack space="1rem" style={{ maxWidth: '34rem' }}>
                <div>
                  <RudiBadge variant="info">Investors &amp; Stakeholders</RudiBadge>
                </div>
                <RudiHeading level={1} size={1} style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.08 }}>
                  A platform built to <GradientText>compound</GradientText>
                </RudiHeading>
                <RudiText style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.15rem' }}>
                  Every clinical readout sharpens the discovery engine that produced it. That
                  flywheel is how we turn one platform into decades of medicines.
                </RudiText>
                <RudiCluster space="0.75rem">
                  <RudiButton variant="primary" size="lg" iconAfter="lucide:download">
                    Latest shareholder letter
                  </RudiButton>
                  <RudiButton variant="secondary" size="lg" iconBefore="lucide:calendar">
                    Upcoming events
                  </RudiButton>
                </RudiCluster>
              </RudiStack>

              {/* Live-ish ticker card */}
              <div style={{ ...glass, padding: '1.75rem 2rem' }}>
                <RudiStack space="1rem">
                  <RudiCluster justify="space-between" align="center">
                    <RudiStack space="0">
                      <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        NASDAQ
                      </RudiText>
                      <RudiText style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.06em' }}>
                        HLXB
                      </RudiText>
                    </RudiStack>
                    <RudiStack space="0" style={{ textAlign: 'right' }}>
                      <RudiText style={{ color: '#fff', fontWeight: 800, fontSize: '2rem', lineHeight: 1 }}>
                        $74.20
                      </RudiText>
                      <RudiCluster space="0.25rem" align="center" justify="flex-end">
                        <RudiIcon icon="lucide:trending-up" size="sm" color={TEAL} />
                        <RudiText variant="caption" style={{ color: TEAL, fontWeight: 700 }}>
                          +$2.70 (3.8%)
                        </RudiText>
                      </RudiCluster>
                    </RudiStack>
                  </RudiCluster>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)' }} />
                  <RudiGrid minCellWidth="6rem" space="1rem">
                    {[
                      ['Open', '$71.90'],
                      ['Day range', '$71.4–74.6'],
                      ['52-wk high', '$88.10'],
                      ['Volume', '2.4M'],
                    ].map(([k, v]) => (
                      <RudiStack key={k} space="0.1rem">
                        <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          {k}
                        </RudiText>
                        <RudiText style={{ color: '#fff', fontWeight: 600 }}>{v}</RudiText>
                      </RudiStack>
                    ))}
                  </RudiGrid>
                  <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Illustrative data. Delayed at least 20 minutes.
                  </RudiText>
                </RudiStack>
              </div>
            </RudiGrid>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <RudiCenter gutters="1.5rem" style={{ paddingBlock: '4rem' }}>
        <RudiStack space="4rem">
          {/* KPI cards */}
          <RudiGrid minCellWidth="13rem" space="1.5rem">
            {kpis.map((k) => (
              <RudiStatCard key={k.label} label={k.label} value={k.value} delta={k.delta} trend={k.trend} />
            ))}
          </RudiGrid>

          {/* Charts */}
          <RudiGrid minCellWidth="22rem" space="1.5rem">
            <RudiCard variant="outlined" padding="lg">
              <RudiCard.Body>
                <RudiStack space="1rem">
                  <RudiStack space="0.15rem">
                    <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                      Revenue vs. R&amp;D investment
                    </RudiHeading>
                    <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      USD millions · FY2021–FY2025
                    </RudiText>
                  </RudiStack>
                  <RudiLineChart
                    label="Revenue versus R&D investment, 2021 to 2025"
                    data={financials.revenue}
                    dataKeys={['Revenue', 'R&D']}
                    indexKey="year"
                    height={280}
                  />
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>

            <RudiCard variant="outlined" padding="lg">
              <RudiCard.Body>
                <RudiStack space="1rem">
                  <RudiStack space="0.15rem">
                    <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                      Risk-adjusted pipeline value
                    </RudiHeading>
                    <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      USD billions, by therapeutic area
                    </RudiText>
                  </RudiStack>
                  <RudiBarChart
                    label="Risk-adjusted pipeline value by therapeutic area"
                    data={financials.pipelineValue}
                    dataKeys={['Value']}
                    indexKey="area"
                    showLegend={false}
                    height={280}
                  />
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>
          </RudiGrid>

          <RudiGrid minCellWidth="20rem" space="1.5rem" style={{ alignItems: 'stretch' }}>
            <RudiCard variant="outlined" padding="lg">
              <RudiCard.Body>
                <RudiStack space="1rem">
                  <RudiStack space="0.15rem">
                    <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                      Capital allocation
                    </RudiHeading>
                    <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      Share of FY2025 operating spend
                    </RudiText>
                  </RudiStack>
                  <RudiDonutChart
                    label="Capital allocation across R&D, manufacturing, clinical operations, and G&A"
                    data={financials.allocation}
                    height={280}
                    showLabels
                  />
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>

            {/* Key metrics */}
            <RudiCard variant="outlined" padding="lg">
              <RudiCard.Body>
                <RudiStack space="1.25rem">
                  <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                    Key metrics
                  </RudiHeading>
                  <RudiGrid minCellWidth="8rem" space="1.25rem">
                    {metrics.map((m) => (
                      <RudiStack key={m.label} space="0.1rem">
                        <RudiHeading level={4} size={3} style={{ margin: 0 }}>
                          <GradientText>{m.value}</GradientText>
                        </RudiHeading>
                        <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                          {m.label}
                        </RudiText>
                      </RudiStack>
                    ))}
                  </RudiGrid>
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>
          </RudiGrid>

          {/* Filings */}
          <RudiStack space="1.5rem">
            <RudiCluster justify="space-between" align="flex-end">
              <SectionHead overline="Filings & reports" title="Financial reports and SEC filings" />
              <RudiButton variant="ghost" iconAfter="lucide:arrow-right">
                All filings
              </RudiButton>
            </RudiCluster>
            <RudiCard variant="outlined" padding="none">
              {filings.map((f, i) => (
                <RudiCluster
                  key={f.title}
                  justify="space-between"
                  align="center"
                  space="1rem"
                  style={{
                    padding: '1rem 1.5rem',
                    borderBlockStart: i === 0 ? 'none' : '1px solid var(--rudi-color-border-default)',
                  }}
                >
                  <RudiCluster space="1rem" align="center" style={{ flexWrap: 'nowrap' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        padding: '0.6rem',
                        borderRadius: '0.5rem',
                        background: 'var(--rudi-color-background-surface-sunken)',
                      }}
                    >
                      <RudiIcon icon={filingIcon(f.type)} />
                    </span>
                    <RudiStack space="0.1rem">
                      <RudiText style={{ fontWeight: 600 }}>{f.title}</RudiText>
                      <RudiCluster space="0.5rem" align="center">
                        <RudiTag variant="default">{f.type}</RudiTag>
                        <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                          {f.date} · {f.size}
                        </RudiText>
                      </RudiCluster>
                    </RudiStack>
                  </RudiCluster>
                  <RudiIconButton aria-label={`Download ${f.title}`} variant="ghost">
                    <RudiIcon icon="lucide:download" />
                  </RudiIconButton>
                </RudiCluster>
              ))}
            </RudiCard>
          </RudiStack>

          {/* Governance */}
          <RudiStack space="2rem">
            <SectionHead overline="Governance & responsibility" title="How we steward the science" align="center" />
            <RudiGrid minCellWidth="16rem" space="1.5rem">
              {governance.map((g) => (
                <RudiCard key={g.title} variant="outlined" padding="lg">
                  <RudiCard.Body>
                    <RudiStack space="0.6rem">
                      <RudiIcon icon={g.icon} size="lg" />
                      <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                        {g.title}
                      </RudiHeading>
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {g.body}
                      </RudiText>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>
        </RudiStack>
      </RudiCenter>

      {/* IR CTA */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiCluster
            justify="space-between"
            align="center"
            space="1.5rem"
            style={{ paddingBlock: '3.5rem', rowGap: '1.5rem' }}
          >
            <RudiStack space="0.35rem">
              <RudiHeading level={2} size={3} style={{ color: '#fff', margin: 0 }}>
                Stay on our investor list
              </RudiHeading>
              <RudiText style={{ color: 'rgba(255,255,255,0.72)' }}>
                Earnings alerts, event invitations, and filings — the moment they publish.
              </RudiText>
            </RudiStack>
            <RudiCluster space="0.75rem">
              <RudiButton variant="primary" size="lg" iconAfter="lucide:arrow-right">
                Subscribe to alerts
              </RudiButton>
              <RudiButton variant="secondary" size="lg">
                Contact IR
              </RudiButton>
            </RudiCluster>
          </RudiCluster>
        </RudiCenter>
      </GlowSection>

      <BioFooter />
    </RudiStack>
  ),
}

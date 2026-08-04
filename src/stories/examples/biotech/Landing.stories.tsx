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
import { RudiTag } from '../../../components/Tag/Tag'
import {
  BioFooter,
  BioHeader,
  Duotone,
  GlowSection,
  GradientText,
  PhaseBar,
  SectionHead,
  TEAL,
  glass,
  img,
  partners,
  pipeline,
  platformCapabilities,
  therapeuticAreas,
} from './shared'

const meta = {
  title: 'Examples/Biotech/Landing Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const heroStats = [
  { value: '40+', label: 'Active programs' },
  { value: '12', label: 'In the clinic' },
  { value: '340+', label: 'Patents granted' },
  { value: '98%', label: 'On-target edits' },
]

function LandingRender() {
  return (
    <RudiStack space="0">
      <BioHeader active="Platform" />

      {/* Hero */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiGrid minCellWidth="20rem" space="3rem" style={{ paddingBlock: '5rem', alignItems: 'center' }}>
            <RudiStack space="1.5rem" style={{ maxWidth: '38rem' }}>
              <div>
                <RudiBadge variant="info">Genomic medicine · Nasdaq: HLXB</RudiBadge>
              </div>
              <RudiHeading
                level={1}
                size={1}
                style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5.5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
              >
                Engineering the <GradientText>code of life</GradientText>
              </RudiHeading>
              <RudiText style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.2rem', maxWidth: '34rem' }}>
                Helexa designs, edits, and manufactures one-time genetic medicines — pairing a
                precision editing platform with an AI discovery engine to reach diseases once
                thought undruggable.
              </RudiText>
              <RudiCluster space="0.75rem">
                <RudiButton variant="primary" size="lg" iconAfter="lucide:arrow-right">
                  Explore the platform
                </RudiButton>
                <RudiButton variant="secondary" size="lg" iconBefore="lucide:play">
                  Watch the science
                </RudiButton>
              </RudiCluster>
              <RudiCluster space="1.25rem" align="center" style={{ paddingBlockStart: '0.5rem' }}>
                <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Backed by
                </RudiText>
                {['Meridian', 'Fjord Ventures', 'Sundial'].map((p) => (
                  <RudiText key={p} variant="caption" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, letterSpacing: '0.08em' }}>
                    {p.toUpperCase()}
                  </RudiText>
                ))}
              </RudiCluster>
            </RudiStack>

            <div style={{ position: 'relative' }}>
              <Duotone photo={img.heroLab} alt="A Helexa scientist working at a genomics lab bench" ratio="4 / 5" radius="0.5rem" />
              {/* Floating glass metric */}
              <div style={{ ...glass, position: 'absolute', insetBlockEnd: '-1.25rem', insetInlineStart: '-1.25rem', padding: '1rem 1.25rem' }}>
                <RudiCluster space="0.75rem" align="center">
                  <RudiIcon icon="lucide:activity" color={TEAL} />
                  <RudiStack space="0">
                    <RudiText style={{ color: '#fff', fontWeight: 700, fontSize: '1.25rem' }}>HLX-201</RudiText>
                    <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Phase 3 · FDA priority review
                    </RudiText>
                  </RudiStack>
                </RudiCluster>
              </div>
            </div>
          </RudiGrid>

          {/* Hero stat band */}
          <div style={{ ...glass, marginBlockEnd: '-3rem', padding: '1.75rem 2rem' }}>
            <RudiGrid minCellWidth="9rem" space="1.5rem">
              {heroStats.map((s) => (
                <RudiStack key={s.label} space="0.15rem">
                  <RudiText style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
                    <GradientText>{s.value}</GradientText>
                  </RudiText>
                  <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.66)' }}>
                    {s.label}
                  </RudiText>
                </RudiStack>
              ))}
            </RudiGrid>
          </div>
        </RudiCenter>
      </GlowSection>

      <RudiCenter gutters="1.5rem" style={{ paddingBlockStart: '6rem' }}>
        <RudiStack space="5rem">
          {/* Therapeutic areas */}
          <RudiStack space="2rem">
            <SectionHead
              overline="Where we focus"
              title="Four areas. One platform."
              sub="We concentrate on diseases where a single, precise genetic change can be transformational."
            />
            <RudiGrid minCellWidth="15rem" space="1.5rem">
              {therapeuticAreas.map((a) => (
                <RudiCard key={a.name} variant="outlined" padding="none">
                  <div style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
                    <Duotone photo={a.photo} alt={`${a.name} research`} ratio="16 / 10" radius="0" overlay />
                  </div>
                  <RudiCard.Body>
                    <RudiStack space="0.6rem">
                      <RudiCluster justify="space-between" align="center">
                        <RudiIcon icon={a.icon} size="lg" />
                        <RudiTag variant="info">{a.programs} programs</RudiTag>
                      </RudiCluster>
                      <RudiHeading level={3} size={4} style={{ margin: 0 }}>
                        {a.name}
                      </RudiHeading>
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {a.blurb}
                      </RudiText>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Platform split */}
          <RudiGrid minCellWidth="20rem" space="3rem" style={{ alignItems: 'center' }}>
            <Duotone photo={img.dnaStrand} alt="A rendered DNA double helix" ratio="4 / 3" />
            <RudiStack space="1.5rem">
              <SectionHead
                overline="The platform"
                title="GenomeForge™ meets the Atlas engine"
                titleSize={3}
              />
              <RudiStack space="1rem">
                {platformCapabilities.slice(0, 3).map((c) => (
                  <RudiCluster key={c.title} space="1rem" align="flex-start" style={{ flexWrap: 'nowrap' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        padding: '0.6rem',
                        borderRadius: '0.5rem',
                        background: 'var(--rudi-color-background-surface-sunken)',
                        flexShrink: 0,
                      }}
                    >
                      <RudiIcon icon={c.icon} />
                    </span>
                    <RudiStack space="0.15rem">
                      <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                        {c.title}
                      </RudiHeading>
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {c.body}
                      </RudiText>
                    </RudiStack>
                  </RudiCluster>
                ))}
              </RudiStack>
              <RudiCluster>
                <RudiButton variant="secondary" iconAfter="lucide:arrow-right">
                  See how it works
                </RudiButton>
              </RudiCluster>
            </RudiStack>
          </RudiGrid>

          {/* Pipeline preview */}
          <RudiStack space="1.5rem">
            <RudiCluster justify="space-between" align="flex-end">
              <SectionHead overline="Pipeline" title="Programs advancing now" />
              <RudiButton variant="ghost" iconAfter="lucide:arrow-right">
                Full pipeline
              </RudiButton>
            </RudiCluster>
            <RudiCard variant="outlined" padding="none">
              {pipeline.slice(0, 5).map((p, i) => (
                <RudiCluster
                  key={p.code}
                  justify="space-between"
                  align="center"
                  space="1rem"
                  style={{
                    padding: '1.1rem 1.5rem',
                    borderBlockStart: i === 0 ? 'none' : '1px solid var(--rudi-color-border-default)',
                  }}
                >
                  <RudiStack space="0.15rem" style={{ minWidth: '12rem' }}>
                    <RudiCluster space="0.5rem" align="center">
                      <RudiText style={{ fontWeight: 700 }}>{p.name}</RudiText>
                      <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {p.code}
                      </RudiText>
                    </RudiCluster>
                    <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      {p.indication}
                    </RudiText>
                  </RudiStack>
                  <RudiTag variant="info">{p.area}</RudiTag>
                  <PhaseBar phase={p.phase} />
                </RudiCluster>
              ))}
            </RudiCard>
          </RudiStack>

          {/* Trusted by strip */}
          <RudiStack space="1.5rem" style={{ textAlign: 'center' }}>
            <RudiText variant="overline" style={{ color: 'var(--rudi-color-text-subtle)' }}>
              Trusted by the people who move medicine forward
            </RudiText>
            <RudiCluster justify="center" space="2.5rem" align="center" style={{ rowGap: '1rem', opacity: 0.75 }}>
              {partners.slice(0, 6).map((p) => (
                <RudiText key={p.name} style={{ fontWeight: 800, letterSpacing: '0.12em', fontSize: '1.1rem' }}>
                  {p.name}
                </RudiText>
              ))}
            </RudiCluster>
          </RudiStack>
        </RudiStack>
      </RudiCenter>

      {/* CTA band */}
      <GlowSection style={{ marginBlockStart: '6rem' }}>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="1.5rem" style={{ paddingBlock: '5rem', textAlign: 'center', alignItems: 'center', maxWidth: '46rem', marginInline: 'auto' }}>
            <RudiHeading level={2} size={2} style={{ color: '#fff', lineHeight: 1.1 }}>
              Let’s engineer what medicine can’t reach yet
            </RudiHeading>
            <RudiText style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.1rem' }}>
              Partner with Helexa on discovery, licensing, or manufacturing — or join a team
              rewriting the rules of genetic medicine.
            </RudiText>
            <RudiCluster justify="center" space="0.75rem">
              <RudiButton variant="primary" size="lg" iconAfter="lucide:arrow-right">
                Start a partnership
              </RudiButton>
              <RudiButton variant="secondary" size="lg">
                See open roles
              </RudiButton>
            </RudiCluster>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <BioFooter />
    </RudiStack>
  )
}

export const LandingPage: Story = {
  name: 'Landing Page',
  render: () => <LandingRender />,
}

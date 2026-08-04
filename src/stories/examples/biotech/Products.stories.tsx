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
  PHASE_LABELS,
  PhaseBar,
  SectionHead,
  TEAL,
  img,
  pipeline,
  platformCapabilities,
  services,
  therapeuticAreas,
} from './shared'

const meta = {
  title: 'Examples/Biotech/Products & Services',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const areaTagVariant: Record<string, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
  Oncology: 'error',
  'Rare Disease': 'info',
  Neurology: 'warning',
  Immunology: 'success',
  Cardiology: 'default',
}

function ProductsRender() {
  return (
    <RudiStack space="0">
      <BioHeader active="Platform" />

      {/* Intro */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiGrid minCellWidth="20rem" space="3rem" style={{ paddingBlock: '5rem', alignItems: 'center' }}>
            <RudiStack space="1.5rem" style={{ maxWidth: '38rem' }}>
              <div>
                <RudiBadge variant="info">Products &amp; Services</RudiBadge>
              </div>
              <RudiHeading level={1} size={1} style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.08 }}>
                One platform, from <GradientText>target to therapy</GradientText>
              </RudiHeading>
              <RudiText style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.15rem' }}>
                Helexa builds genomic medicines end-to-end — and licenses the same tools,
                capacity, and expertise to partners advancing their own programs.
              </RudiText>
              <RudiCluster space="0.75rem">
                <RudiButton variant="primary" size="lg" iconAfter="lucide:arrow-right">
                  Explore the pipeline
                </RudiButton>
                <RudiButton variant="secondary" size="lg">
                  Partner with us
                </RudiButton>
              </RudiCluster>
            </RudiStack>
            <Duotone photo={img.dnaStrand} alt="Inside a Helexa genomics laboratory" ratio="4 / 3" radius="0.5rem" />
          </RudiGrid>
        </RudiCenter>
      </GlowSection>

      <RudiCenter gutters="1.5rem" style={{ paddingBlockStart: '5rem' }}>
        <RudiStack space="5rem">
          {/* Therapeutic areas */}
          <RudiStack space="2rem">
            <SectionHead
              overline="Therapeutic areas"
              title="Diseases where a precise edit changes everything"
            />
            <RudiGrid minCellWidth="15rem" space="1.5rem">
              {therapeuticAreas.map((a) => (
                <RudiCard key={a.name} variant="outlined" padding="lg">
                  <RudiCard.Body>
                    <RudiStack space="0.75rem">
                      <RudiCluster justify="space-between" align="center">
                        <span
                          style={{
                            display: 'inline-flex',
                            padding: '0.7rem',
                            borderRadius: '0.5rem',
                            background: 'var(--rudi-color-background-surface-sunken)',
                          }}
                        >
                          <RudiIcon icon={a.icon} size="lg" />
                        </span>
                        <RudiTag variant={areaTagVariant[a.name] ?? 'default'}>{a.programs} programs</RudiTag>
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

          {/* Platform capabilities */}
          <RudiStack space="2rem">
            <SectionHead
              overline="Platform capabilities"
              title="The integrated stack behind every program"
              sub="Six proprietary systems that let us go from a genomic hypothesis to a validated, manufacturable medicine."
            />
            <RudiGrid minCellWidth="17rem" space="1.5rem">
              {platformCapabilities.map((c) => (
                <RudiCard key={c.title} variant="outlined" padding="lg">
                  <RudiCard.Body>
                    <RudiStack space="0.6rem">
                      <RudiIcon icon={c.icon} size="lg" />
                      <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                        {c.title}
                      </RudiHeading>
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {c.body}
                      </RudiText>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Services */}
          <RudiStack space="2rem">
            <SectionHead overline="Services" title="Ways to work with Helexa" />
            <RudiGrid minCellWidth="18rem" space="1.5rem">
              {services.map((s) => (
                <RudiCard key={s.title} variant="elevated" padding="lg">
                  <RudiCard.Body>
                    <RudiStack space="1rem">
                      <RudiCluster space="0.75rem" align="center">
                        <span
                          style={{
                            display: 'inline-flex',
                            padding: '0.6rem',
                            borderRadius: '0.5rem',
                            background: TEAL,
                          }}
                        >
                          <RudiIcon icon={s.icon} color="#070b14" />
                        </span>
                        <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                          {s.title}
                        </RudiHeading>
                      </RudiCluster>
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {s.body}
                      </RudiText>
                      <RudiStack space="0.5rem">
                        {s.points.map((p) => (
                          <RudiCluster key={p} space="0.5rem" align="center">
                            <RudiIcon icon="lucide:check" size="sm" color="var(--rudi-color-feedback-success)" />
                            <RudiText variant="body-sm">{p}</RudiText>
                          </RudiCluster>
                        ))}
                      </RudiStack>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Pipeline table */}
          <RudiStack space="1.5rem">
            <RudiCluster justify="space-between" align="flex-end">
              <SectionHead overline="Full pipeline" title="Every program, every phase" />
              <RudiButton variant="secondary" iconAfter="lucide:download">
                Download pipeline (PDF)
              </RudiButton>
            </RudiCluster>

            <RudiCard variant="outlined" padding="none">
              {/* Header row (hidden on narrow screens via caption fallback in each row) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 0.9fr 1.4fr 1fr 0.9fr',
                  gap: '1rem',
                  padding: '0.9rem 1.5rem',
                  borderBlockEnd: '1px solid var(--rudi-color-border-default)',
                  background: 'var(--rudi-color-background-surface-sunken)',
                }}
              >
                {['Program', 'Area', 'Indication', 'Modality', 'Phase'].map((h) => (
                  <RudiText key={h} variant="overline" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                    {h}
                  </RudiText>
                ))}
              </div>

              {pipeline.map((p, i) => (
                <div
                  key={p.code}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 0.9fr 1.4fr 1fr 0.9fr',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    borderBlockStart: i === 0 ? 'none' : '1px solid var(--rudi-color-border-default)',
                  }}
                >
                  <RudiStack space="0.1rem">
                    <RudiText style={{ fontWeight: 700 }}>{p.name}</RudiText>
                    <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      {p.code}
                    </RudiText>
                  </RudiStack>
                  <div>
                    <RudiTag variant={areaTagVariant[p.area] ?? 'default'}>{p.area}</RudiTag>
                  </div>
                  <RudiText variant="body-sm">{p.indication}</RudiText>
                  <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                    {p.modality}
                  </RudiText>
                  <PhaseBar phase={p.phase} />
                </div>
              ))}
            </RudiCard>

            {/* Phase legend */}
            <RudiCluster space="1.25rem" align="center" style={{ rowGap: '0.5rem' }}>
              <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)', fontWeight: 600 }}>
                Phases:
              </RudiText>
              {PHASE_LABELS.map((label, i) => (
                <RudiCluster key={label} space="0.4rem" align="center">
                  <span
                    style={{
                      inlineSize: '0.75rem',
                      blockSize: '0.75rem',
                      borderRadius: '999px',
                      background: i === 0 ? 'var(--rudi-color-background-surface-sunken)' : TEAL,
                      border: '1px solid var(--rudi-color-border-default)',
                      display: 'inline-block',
                    }}
                  />
                  <RudiText variant="caption">{label}</RudiText>
                </RudiCluster>
              ))}
            </RudiCluster>
          </RudiStack>
        </RudiStack>
      </RudiCenter>

      {/* CTA */}
      <GlowSection style={{ marginBlockStart: '6rem' }}>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="1.5rem" style={{ paddingBlock: '5rem', textAlign: 'center', alignItems: 'center', maxWidth: '44rem', marginInline: 'auto' }}>
            <RudiHeading level={2} size={2} style={{ color: '#fff' }}>
              Bring your target. We’ll bring the platform.
            </RudiHeading>
            <RudiText style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.1rem' }}>
              License GenomeForge™ and Vireo, or reserve cGMP capacity for your next program.
            </RudiText>
            <RudiCluster justify="center" space="0.75rem">
              <RudiButton variant="primary" size="lg" iconAfter="lucide:arrow-right">
                Talk to partnerships
              </RudiButton>
              <RudiButton variant="secondary" size="lg">
                Read the platform paper
              </RudiButton>
            </RudiCluster>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <BioFooter />
    </RudiStack>
  )
}

export const ProductsAndServices: Story = {
  name: 'Products & Services',
  render: () => <ProductsRender />,
}

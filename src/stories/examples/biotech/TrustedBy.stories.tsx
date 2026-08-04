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
import {
  BioFooter,
  BioHeader,
  Duotone,
  GlowSection,
  GradientText,
  SectionHead,
  TEAL,
  certifications,
  glass,
  img,
  partners,
  testimonials,
} from './shared'

const meta = {
  title: 'Examples/Biotech/Trusted By',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const outcomes = [
  { value: '30+', label: 'Active partnerships' },
  { value: '2.1 yrs', label: 'Average timeline saved' },
  { value: '9', label: 'Partnered programs in clinic' },
  { value: '4.9/5', label: 'Partner satisfaction' },
]

const caseStudies = [
  {
    partner: 'Meridian Therapeutics',
    area: 'Oncology',
    result: 'First-in-class edit to clinic in 14 months',
    body: 'By pairing Meridian’s target with GenomeForge™, the joint team compressed a typical three-year lead program into fourteen months.',
    photo: img.labWork,
  },
  {
    partner: 'Aster Health System',
    area: 'Clinical',
    result: 'Adaptive trial redesigned around real-time biomarkers',
    body: 'Closed-loop data from the Atlas engine let investigators adjust dosing cohorts mid-study, improving the odds of a clean readout.',
    photo: img.clinical,
  },
  {
    partner: 'Vantea Bio',
    area: 'Delivery',
    result: 'CNS delivery achieved on the first attempt',
    body: 'Vantea licensed the Vireo nanoparticle system and reached target neural tissue without immunogenicity in preclinical models.',
    photo: img.healthTech,
  },
]

function TrustedByRender() {
  return (
    <RudiStack space="0">
      <BioHeader active="Partners" />

      {/* Header */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="2.5rem" style={{ paddingBlock: '4.5rem' }}>
            <RudiStack space="1rem" style={{ maxWidth: '46rem', textAlign: 'center', alignItems: 'center', marginInline: 'auto' }}>
              <div>
                <RudiBadge variant="info">Trusted by</RudiBadge>
              </div>
              <RudiHeading level={1} size={1} style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.08 }}>
                The names that <GradientText>bet on the platform</GradientText>
              </RudiHeading>
              <RudiText style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.15rem' }}>
                Global pharma, health systems, diagnostics leaders, and research institutions
                run their most ambitious programs on Helexa.
              </RudiText>
            </RudiStack>

            {/* Logo wall */}
            <RudiGrid minCellWidth="9rem" space="1rem">
              {partners.map((p) => (
                <div
                  key={p.name}
                  style={{
                    ...glass,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    padding: '1.25rem 1rem',
                    textAlign: 'center',
                  }}
                >
                  <RudiText style={{ color: '#fff', fontWeight: 800, letterSpacing: '0.1em' }}>
                    {p.name}
                  </RudiText>
                  <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {p.category}
                  </RudiText>
                </div>
              ))}
            </RudiGrid>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <RudiCenter gutters="1.5rem" style={{ paddingBlock: '4rem' }}>
        <RudiStack space="4.5rem">
          {/* Outcomes */}
          <RudiGrid minCellWidth="11rem" space="1.5rem">
            {outcomes.map((o) => (
              <RudiStack key={o.label} space="0.25rem" style={{ textAlign: 'center' }}>
                <RudiHeading level={2} size={1} style={{ margin: 0 }}>
                  <GradientText>{o.value}</GradientText>
                </RudiHeading>
                <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                  {o.label}
                </RudiText>
              </RudiStack>
            ))}
          </RudiGrid>

          {/* Testimonials */}
          <RudiStack space="2rem">
            <SectionHead overline="In their words" title="Why partners choose Helexa" align="center" />
            <RudiGrid minCellWidth="18rem" space="1.5rem">
              {testimonials.map((t) => (
                <RudiCard key={t.name} variant="outlined" padding="lg">
                  <RudiCard.Body>
                    <RudiStack space="1.25rem">
                      <RudiIcon icon="lucide:quote" size="lg" color={TEAL} />
                      <RudiText style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                        “{t.quote}”
                      </RudiText>
                      <RudiCluster space="0.75rem" align="center">
                        <img
                          src={`https://images.unsplash.com/${t.photo}?auto=format&fit=crop&q=80&w=96&h=96`}
                          alt={t.name}
                          loading="lazy"
                          style={{
                            inlineSize: '2.75rem',
                            blockSize: '2.75rem',
                            borderRadius: '999px',
                            objectFit: 'cover',
                            backgroundColor: 'var(--rudi-color-background-surface-sunken)',
                          }}
                        />
                        <RudiStack space="0">
                          <RudiText style={{ fontWeight: 600 }}>{t.name}</RudiText>
                          <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                            {t.title}, {t.org}
                          </RudiText>
                        </RudiStack>
                      </RudiCluster>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Certifications */}
          <RudiStack space="1.5rem">
            <SectionHead
              overline="Compliance & quality"
              title="Held to the standards medicine demands"
              align="center"
            />
            <RudiGrid minCellWidth="10rem" space="1rem">
              {certifications.map((c) => (
                <RudiCard key={c.label} variant="outlined" padding="md">
                  <RudiCard.Body>
                    <RudiCluster space="0.75rem" align="center" justify="center">
                      <RudiIcon icon={c.icon} size="lg" color={TEAL} />
                      <RudiText style={{ fontWeight: 600 }}>{c.label}</RudiText>
                    </RudiCluster>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Case studies */}
          <RudiStack space="2rem">
            <SectionHead overline="Case studies" title="Partnerships that changed the timeline" />
            <RudiStack space="1.5rem">
              {caseStudies.map((cs, i) => (
                <RudiCard key={cs.partner} variant="outlined" padding="none">
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
                      direction: i % 2 === 1 ? 'rtl' : 'ltr',
                    }}
                  >
                    <div style={{ direction: 'ltr' }}>
                      <Duotone photo={cs.photo} alt={`${cs.partner} case study`} ratio="16 / 10" radius="0" style={{ blockSize: '100%' }} />
                    </div>
                    <RudiStack space="0.75rem" style={{ direction: 'ltr', padding: '2rem', justifyContent: 'center' }}>
                      <RudiCluster space="0.5rem" align="center">
                        <RudiBadge variant="info">{cs.area}</RudiBadge>
                        <RudiText variant="overline" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                          {cs.partner}
                        </RudiText>
                      </RudiCluster>
                      <RudiHeading level={3} size={4} style={{ margin: 0 }}>
                        {cs.result}
                      </RudiHeading>
                      <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>{cs.body}</RudiText>
                      <RudiCluster>
                        <RudiButton variant="ghost" iconAfter="lucide:arrow-right">
                          Read the case study
                        </RudiButton>
                      </RudiCluster>
                    </RudiStack>
                  </div>
                </RudiCard>
              ))}
            </RudiStack>
          </RudiStack>
        </RudiStack>
      </RudiCenter>

      {/* CTA */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="1.5rem" style={{ paddingBlock: '5rem', textAlign: 'center', alignItems: 'center', maxWidth: '44rem', marginInline: 'auto' }}>
            <RudiHeading level={2} size={2} style={{ color: '#fff' }}>
              Join the partners advancing medicine with us
            </RudiHeading>
            <RudiText style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.1rem' }}>
              From a single licensed tool to a full co-development program — let’s find the
              right shape for working together.
            </RudiText>
            <RudiCluster justify="center" space="0.75rem">
              <RudiButton variant="primary" size="lg" iconAfter="lucide:arrow-right">
                Become a partner
              </RudiButton>
              <RudiButton variant="secondary" size="lg">
                Download partner kit
              </RudiButton>
            </RudiCluster>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <BioFooter />
    </RudiStack>
  )
}

export const TrustedBy: Story = {
  name: 'Trusted By',
  render: () => <TrustedByRender />,
}

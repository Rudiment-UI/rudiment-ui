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
  glass,
  img,
  leadership,
  milestones,
  values,
} from './shared'

const meta = {
  title: 'Examples/Biotech/About Us',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const impactStats = [
  { value: '1.4M', label: 'Patients reachable by programs in the clinic' },
  { value: '620', label: 'Scientists, clinicians & engineers' },
  { value: '3', label: 'Continents with cGMP capacity' },
  { value: '$2.1B', label: 'Committed R&D through 2028' },
]

export const AboutUs: Story = {
  name: 'About Us',
  render: () => (
    <RudiStack space="0">
      <BioHeader active="About" />

      {/* Mission hero */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiStack
            space="1.5rem"
            style={{ paddingBlock: '5.5rem', maxWidth: '52rem', textAlign: 'center', alignItems: 'center', marginInline: 'auto' }}
          >
            <div>
              <RudiBadge variant="info">Our mission</RudiBadge>
            </div>
            <RudiHeading
              level={1}
              size={1}
              style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              We exist to make <GradientText>genetic disease optional</GradientText>
            </RudiHeading>
            <RudiText style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.2rem' }}>
              For most of history a broken gene meant a life sentence. Helexa was founded on a
              simple, stubborn belief: if we can read the genome, we can learn to rewrite it —
              safely, precisely, and for everyone who needs it.
            </RudiText>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      {/* Impact stat band bleeding out of the hero */}
      <RudiCenter gutters="1.5rem">
        <div style={{ ...glass, marginBlockStart: '-3rem', padding: '1.75rem 2rem', background: 'var(--rudi-color-background-surface)', border: '1px solid var(--rudi-color-border-default)', boxShadow: 'var(--rudi-shadow-lg, 0 20px 45px rgba(7,11,20,0.18))' }}>
          <RudiGrid minCellWidth="11rem" space="1.5rem">
            {impactStats.map((s) => (
              <RudiStack key={s.label} space="0.25rem">
                <RudiHeading level={3} size={2} style={{ margin: 0 }}>
                  <GradientText>{s.value}</GradientText>
                </RudiHeading>
                <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                  {s.label}
                </RudiText>
              </RudiStack>
            ))}
          </RudiGrid>
        </div>
      </RudiCenter>

      <RudiCenter gutters="1.5rem" style={{ paddingBlockStart: '5rem' }}>
        <RudiStack space="5rem">
          {/* Founding story */}
          <RudiGrid minCellWidth="20rem" space="3rem" style={{ alignItems: 'center' }}>
            <RudiStack space="1.25rem">
              <SectionHead overline="Our story" title="Started in a shared lab bench in 2016" titleSize={3} />
              <RudiText style={{ color: 'var(--rudi-color-text-subtle)', fontSize: '1.05rem' }}>
                Dr. Ada Okonkwo and Dr. Rafael Moreau met sharing microscope time at a
                university core facility. Ada had spent a decade on delivery chemistry;
                Rafael had built one of the first high-fidelity base editors. Over a
                whiteboard and far too much coffee, they realised each held half of the
                same answer.
              </RudiText>
              <RudiText style={{ color: 'var(--rudi-color-text-subtle)', fontSize: '1.05rem' }}>
                Ten years later, Helexa is a fully integrated genomic-medicine company —
                discovering targets, editing genomes, and manufacturing the result under a
                single quality system. The whiteboard is still in the lobby.
              </RudiText>
              <RudiCluster>
                <RudiButton variant="secondary" iconAfter="lucide:arrow-right">
                  Meet the science
                </RudiButton>
              </RudiCluster>
            </RudiStack>
            <RudiGrid minCellWidth="8rem" space="1rem">
              <Duotone photo={img.researcher} alt="Two founders reviewing results at a bench" ratio="3 / 4" />
              <RudiStack space="1rem">
                <Duotone photo={img.microscope} alt="A microscope in the Helexa lab" ratio="1 / 1" />
                <Duotone photo={img.vials} alt="Sample vials in a rack" ratio="1 / 1" />
              </RudiStack>
            </RudiGrid>
          </RudiGrid>

          {/* Values */}
          <RudiStack space="2rem">
            <SectionHead
              overline="What we believe"
              title="Four principles we don’t compromise"
              align="center"
            />
            <RudiGrid minCellWidth="15rem" space="1.5rem">
              {values.map((v) => (
                <RudiCard key={v.title} variant="outlined" padding="lg">
                  <RudiCard.Body>
                    <RudiStack space="0.75rem">
                      <span
                        style={{
                          display: 'inline-flex',
                          padding: '0.7rem',
                          borderRadius: '0.5rem',
                          background: 'var(--rudi-color-background-surface-sunken)',
                          width: 'fit-content',
                        }}
                      >
                        <RudiIcon icon={v.icon} size="lg" />
                      </span>
                      <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                        {v.title}
                      </RudiHeading>
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {v.body}
                      </RudiText>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>
        </RudiStack>
      </RudiCenter>

      {/* Timeline on a dark band */}
      <GlowSection style={{ marginBlockStart: '5rem' }}>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="2.5rem" style={{ paddingBlock: '4.5rem' }}>
            <SectionHead overline="Milestones" title="Ten years, briefly" onDark align="center" />
            <RudiStack space="0">
              {milestones.map((m, i) => (
                <RudiCluster
                  key={m.year}
                  space="1.5rem"
                  align="flex-start"
                  style={{
                    flexWrap: 'nowrap',
                    paddingBlock: '1.25rem',
                    borderBlockStart: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <RudiHeading level={3} size={4} style={{ margin: 0, minWidth: '5rem' }}>
                    <GradientText>{m.year}</GradientText>
                  </RudiHeading>
                  <RudiText style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem' }}>
                    {m.event}
                  </RudiText>
                </RudiCluster>
              ))}
            </RudiStack>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      {/* Leadership */}
      <RudiCenter gutters="1.5rem" style={{ paddingBlock: '5rem' }}>
        <RudiStack space="2rem">
          <SectionHead
            overline="Leadership"
            title="The people accountable for the science"
            sub="A team drawn from academia, biopharma, and the clinic — united by the patients waiting on the other side."
          />
          <RudiGrid minCellWidth="14rem" space="1.5rem">
            {leadership.map((l) => (
              <RudiStack key={l.name} space="0.75rem">
                <Duotone photo={l.photo} alt={l.name} ratio="1 / 1" overlay={false} radius="0.5rem" />
                <RudiStack space="0.15rem">
                  <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                    {l.name}
                  </RudiHeading>
                  <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                    {l.role}
                  </RudiText>
                </RudiStack>
                <RudiCluster space="0.4rem">
                  <RudiIcon icon="lucide:linkedin" size="sm" color="var(--rudi-color-text-subtle)" />
                  <RudiIcon icon="lucide:mail" size="sm" color="var(--rudi-color-text-subtle)" />
                </RudiCluster>
              </RudiStack>
            ))}
          </RudiGrid>
        </RudiStack>
      </RudiCenter>

      <BioFooter />
    </RudiStack>
  ),
}

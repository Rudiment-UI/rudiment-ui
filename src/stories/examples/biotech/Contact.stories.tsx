import type { Meta, StoryObj } from '@storybook/react'
import { RudiOption } from '../../../components/Select/Option'

import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiAlert } from '../../../components/Alert/Alert'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiButton } from '../../../components/Button/Button'
import { RudiCard } from '../../../components/Card/Card'
import { RudiCheckbox } from '../../../components/Checkbox/Checkbox'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiInput } from '../../../components/Input/Input'
import { RudiTextarea } from '../../../components/Textarea/Textarea'
import { RudiSelect } from '../../../components/Select/Select'
import {
  BioFooter,
  BioHeader,
  Duotone,
  GlowSection,
  GradientText,
  SectionHead,
  TEAL,
  glass,
  img,
} from './shared'

const meta = {
  title: 'Examples/Biotech/Contact Us',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const inquiryTypes = [
  { id: 'partnership', label: 'Business development & partnerships' },
  { id: 'investor', label: 'Investor relations' },
  { id: 'media', label: 'Media & press' },
  { id: 'clinical', label: 'Clinical trials & medical' },
  { id: 'careers', label: 'Careers & recruiting' },
  { id: 'patient', label: 'Patient support' },
]

const channels = [
  { icon: 'lucide:handshake', title: 'Partnerships', line: 'bd@helexabio.com', sub: 'Licensing, co-development & manufacturing' },
  { icon: 'lucide:trending-up', title: 'Investors', line: 'ir@helexabio.com', sub: 'Nasdaq: HLXB · quarterly & filings' },
  { icon: 'lucide:newspaper', title: 'Media', line: 'press@helexabio.com', sub: 'Interviews, assets & statements' },
  { icon: 'lucide:heart-pulse', title: 'Patients', line: '1-800-HELEXA-1', sub: 'Trial eligibility & access programs' },
]

const offices = [
  { city: 'Cambridge, MA', role: 'Global HQ & Discovery', address: '88 Genome Way, Cambridge, MA 02142', photo: img.officeGlass },
  { city: 'Research Triangle, NC', role: 'cGMP Biomanufacturing', address: '400 Helix Blvd, Durham, NC 27709', photo: img.campus },
  { city: 'Basel, Switzerland', role: 'European Operations', address: 'Aeschenplatz 12, 4052 Basel', photo: img.meeting },
]

function TextArea({ label, placeholder }: { label: string; placeholder: string }) {
  return <RudiTextarea label={label} placeholder={placeholder} rows={5} />
}

export const ContactUs: Story = {
  name: 'Contact Us',
  render: () => (
    <RudiStack space="0">
      <BioHeader active="About" />

      {/* Header */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="1rem" style={{ paddingBlock: '4rem', maxWidth: '44rem' }}>
            <div>
              <RudiBadge variant="info">Contact</RudiBadge>
            </div>
            <RudiHeading level={1} size={1} style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.08 }}>
              Let’s talk about <GradientText>what’s possible</GradientText>
            </RudiHeading>
            <RudiText style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.15rem' }}>
              Whether you’re a partner, an investor, a journalist, or a patient — reach the
              right team directly. We answer every message.
            </RudiText>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <RudiCenter gutters="1.5rem" style={{ paddingBlock: '4rem' }}>
        <RudiStack space="4rem">
          {/* Form + channels */}
          <RudiGrid minCellWidth="20rem" space="3rem" style={{ alignItems: 'start' }}>
            {/* Form */}
            <RudiCard variant="elevated" padding="lg">
              <RudiCard.Body>
                <RudiStack space="1.25rem">
                  <RudiStack space="0.25rem">
                    <RudiHeading level={2} size={4} style={{ margin: 0 }}>
                      Send us a message
                    </RudiHeading>
                    <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      Typical response within one business day.
                    </RudiText>
                  </RudiStack>
                  <RudiGrid minCellWidth="12rem" space="1rem">
                    <RudiInput label="First name" placeholder="Jordan" isRequired />
                    <RudiInput label="Last name" placeholder="Rivera" isRequired />
                  </RudiGrid>
                  <RudiGrid minCellWidth="12rem" space="1rem">
                    <RudiInput label="Work email" type="email" placeholder="you@company.com" isRequired />
                    <RudiInput label="Organization" placeholder="Company or institution" />
                  </RudiGrid>
                  <RudiSelect label="How can we help?" items={inquiryTypes} defaultSelectedKey="partnership">
                    {(item) => <RudiOption key={item.id}>{item.label}</RudiOption>}
                  </RudiSelect>
                  <TextArea label="Message" placeholder="Tell us a little about what you’re looking for…" />
                  <RudiCheckbox defaultSelected>
                    I agree to Helexa’s privacy policy and consent to being contacted.
                  </RudiCheckbox>
                  <RudiCluster justify="space-between" align="center">
                    <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      We never sell your information.
                    </RudiText>
                    <RudiButton variant="primary" size="lg" iconAfter="lucide:send">
                      Send message
                    </RudiButton>
                  </RudiCluster>
                </RudiStack>
              </RudiCard.Body>
            </RudiCard>

            {/* Channels */}
            <RudiStack space="1.5rem">
              <SectionHead overline="Direct lines" title="Reach the right team" titleSize={4} />
              <RudiStack space="1rem">
                {channels.map((c) => (
                  <RudiCard key={c.title} variant="outlined" padding="md">
                    <RudiCard.Body>
                      <RudiCluster space="1rem" align="flex-start" style={{ flexWrap: 'nowrap' }}>
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
                          <RudiText style={{ fontWeight: 600, color: TEAL }}>{c.line}</RudiText>
                          <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                            {c.sub}
                          </RudiText>
                        </RudiStack>
                      </RudiCluster>
                    </RudiCard.Body>
                  </RudiCard>
                ))}
              </RudiStack>
              <RudiAlert variant="info" title="Medical emergencies">
                If you are experiencing a medical emergency, call your local emergency number.
                Helexa cannot provide medical advice through this form.
              </RudiAlert>
            </RudiStack>
          </RudiGrid>

          {/* Offices */}
          <RudiStack space="2rem">
            <SectionHead overline="Global offices" title="Where you’ll find us" align="center" />
            <RudiGrid minCellWidth="16rem" space="1.5rem">
              {offices.map((o) => (
                <RudiCard key={o.city} variant="outlined" padding="none">
                  <div style={{ overflow: 'hidden', borderStartStartRadius: 'inherit', borderStartEndRadius: 'inherit' }}>
                    <Duotone photo={o.photo} alt={`${o.city} office`} ratio="16 / 10" radius="0" />
                  </div>
                  <RudiCard.Body>
                    <RudiStack space="0.4rem">
                      <RudiBadge variant="default">{o.role}</RudiBadge>
                      <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                        {o.city}
                      </RudiHeading>
                      <RudiCluster space="0.4rem" align="flex-start" style={{ flexWrap: 'nowrap' }}>
                        <RudiIcon icon="lucide:map-pin" size="sm" color="var(--rudi-color-text-subtle)" />
                        <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                          {o.address}
                        </RudiText>
                      </RudiCluster>
                    </RudiStack>
                  </RudiCard.Body>
                </RudiCard>
              ))}
            </RudiGrid>
          </RudiStack>
        </RudiStack>
      </RudiCenter>

      {/* Quick CTA */}
      <RudiCenter gutters="1.5rem" style={{ paddingBlockEnd: '4rem' }}>
        <div style={{ ...glass, background: 'var(--rudi-color-background-surface-sunken)', border: '1px solid var(--rudi-color-border-default)', padding: '2rem' }}>
          <RudiCluster justify="space-between" align="center" space="1rem" style={{ rowGap: '1rem' }}>
            <RudiStack space="0.25rem">
              <RudiHeading level={2} size={4} style={{ margin: 0 }}>
                Prefer to talk to sales or BD live?
              </RudiHeading>
              <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>
                Book a 30-minute intro call with our partnerships team.
              </RudiText>
            </RudiStack>
            <RudiButton variant="primary" size="lg" iconAfter="lucide:calendar">
              Book a call
            </RudiButton>
          </RudiCluster>
        </div>
      </RudiCenter>

      <BioFooter />
    </RudiStack>
  ),
}

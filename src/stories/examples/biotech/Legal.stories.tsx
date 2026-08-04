import type { Meta, StoryObj } from '@storybook/react'
import type { ReactNode } from 'react'

import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiProse } from '../../../typography/Prose/Prose'
import { RudiText } from '../../../typography/Text/Text'
import { RudiAlert } from '../../../components/Alert/Alert'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiNavItem } from '../../../components/NavItem/NavItem'
import { BioFooter, BioHeader, GlowSection, GradientText } from './shared'

const meta = {
  title: 'Examples/Biotech/Terms & Privacy',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface Section {
  id: string
  title: string
  group: 'Terms of Service' | 'Privacy Policy'
  body: ReactNode
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of terms',
    group: 'Terms of Service',
    body: (
      <>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of the websites,
          content, and services offered by Helexa Biosciences, Inc. (“Helexa,” “we,” “us”).
          By accessing our sites you agree to be bound by these Terms and by our Privacy
          Policy below.
        </p>
        <p>
          If you are using our services on behalf of an organization, you represent that you
          have authority to bind that organization to these Terms.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: '2. Permitted use',
    group: 'Terms of Service',
    body: (
      <>
        <p>You agree to use our services only for lawful purposes. You will not:</p>
        <ul>
          <li>attempt to gain unauthorized access to any systems or data;</li>
          <li>reverse engineer or misuse any Helexa platform, tool, or documentation;</li>
          <li>misrepresent our scientific claims, pipeline status, or investor materials;</li>
          <li>use our content to provide medical advice or diagnosis to third parties.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'ip',
    title: '3. Intellectual property',
    group: 'Terms of Service',
    body: (
      <>
        <p>
          GenomeForge™, Vireo™, Atlas™, the Helexa name, and all associated logos are
          trademarks of Helexa Biosciences. All platform methods, sequences, and materials
          are protected by patents and trade-secret law. Nothing in these Terms grants you a
          license to any Helexa intellectual property except as expressly agreed in a signed
          written agreement.
        </p>
      </>
    ),
  },
  {
    id: 'forward',
    title: '4. Forward-looking statements',
    group: 'Terms of Service',
    body: (
      <>
        <p>
          Materials on our sites may contain forward-looking statements about clinical
          programs, regulatory timelines, and financial expectations. These involve risks and
          uncertainties; actual results may differ materially. Nothing here constitutes an
          offer to sell or a solicitation to buy any security.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '5. Disclaimers & liability',
    group: 'Terms of Service',
    body: (
      <>
        <p>
          Our sites and content are provided “as is” without warranties of any kind. To the
          fullest extent permitted by law, Helexa is not liable for any indirect, incidental,
          or consequential damages arising from your use of the services.
        </p>
      </>
    ),
  },
  {
    id: 'collection',
    title: '6. Information we collect',
    group: 'Privacy Policy',
    body: (
      <>
        <p>We collect information in the following categories:</p>
        <ul>
          <li>
            <strong>Information you provide</strong> — name, email, organization, and message
            content when you contact us, apply for a role, or subscribe to updates.
          </li>
          <li>
            <strong>Usage data</strong> — pages viewed, referring links, and device/browser
            details collected automatically.
          </li>
          <li>
            <strong>Cookies</strong> — small files used to remember preferences and measure
            site performance.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'usage',
    title: '7. How we use information',
    group: 'Privacy Policy',
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>respond to inquiries and route them to the right team;</li>
          <li>send investor alerts, event invitations, and product updates you request;</li>
          <li>improve our sites, content, and platform documentation;</li>
          <li>meet legal, regulatory, and security obligations.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </>
    ),
  },
  {
    id: 'rights',
    title: '8. Your rights & choices',
    group: 'Privacy Policy',
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or
          port your personal data, and to object to certain processing. To exercise any of
          these rights, contact <a href="#">privacy@helexabio.com</a>. You can unsubscribe
          from any marketing email using the link in its footer.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '9. Contacting us',
    group: 'Privacy Policy',
    body: (
      <>
        <p>
          Questions about these Terms or our Privacy Policy can be sent to our Data Protection
          Officer at <a href="#">privacy@helexabio.com</a> or by mail to Helexa Biosciences,
          Attn: Legal, 88 Genome Way, Cambridge, MA 02142, USA.
        </p>
      </>
    ),
  },
]

export const TermsAndPrivacy: Story = {
  name: 'Terms & Privacy',
  render: () => (
    <RudiStack space="0">
      <BioHeader />

      {/* Slim header */}
      <GlowSection>
        <RudiCenter gutters="1.5rem">
          <RudiStack space="1rem" style={{ paddingBlock: '3.5rem', maxWidth: '46rem' }}>
            <div>
              <RudiBadge variant="info">Legal</RudiBadge>
            </div>
            <RudiHeading level={1} size={2} style={{ color: '#fff', lineHeight: 1.1 }}>
              Terms &amp; <GradientText>Privacy</GradientText>
            </RudiHeading>
            <RudiText style={{ color: 'rgba(255,255,255,0.7)' }}>
              The rules of the road for using Helexa’s sites and services, and how we handle
              your information.
            </RudiText>
            <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Last updated: July 25, 2026 · Effective immediately
            </RudiText>
          </RudiStack>
        </RudiCenter>
      </GlowSection>

      <RudiCenter gutters="1.5rem" style={{ paddingBlock: '3.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 8fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Sticky table of contents */}
          <nav style={{ position: 'sticky', insetBlockStart: '6rem', alignSelf: 'start' }}>
            <RudiStack space="1.25rem">
              <RudiStack space="0.4rem">
                <RudiText variant="overline" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                  Terms of Service
                </RudiText>
                {sections
                  .filter((s) => s.group === 'Terms of Service')
                  .map((s) => (
                    <RudiNavItem key={s.id} label={s.title} href={`#${s.id}`} icon="lucide:chevron-right" />
                  ))}
              </RudiStack>
              <RudiStack space="0.4rem">
                <RudiText variant="overline" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                  Privacy Policy
                </RudiText>
                {sections
                  .filter((s) => s.group === 'Privacy Policy')
                  .map((s) => (
                    <RudiNavItem key={s.id} label={s.title} href={`#${s.id}`} icon="lucide:chevron-right" />
                  ))}
              </RudiStack>
            </RudiStack>
          </nav>

          {/* Body */}
          <RudiStack space="2.5rem">
            <RudiAlert variant="warning" title="Not legal or medical advice">
              This page is an illustrative example for a fictional company. It is not legal
              advice, and nothing here should be used to make medical decisions.
            </RudiAlert>

            {(['Terms of Service', 'Privacy Policy'] as const).map((group) => (
              <RudiStack key={group} space="2rem">
                <RudiHeading level={2} size={3} style={{ margin: 0 }}>
                  {group}
                </RudiHeading>
                {sections
                  .filter((s) => s.group === group)
                  .map((s) => (
                    <RudiStack key={s.id} space="0.75rem" id={s.id} style={{ scrollMarginBlockStart: '6rem' }}>
                      <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                        {s.title}
                      </RudiHeading>
                      <RudiProse style={{ color: 'var(--rudi-color-text-subtle)' }}>{s.body}</RudiProse>
                    </RudiStack>
                  ))}
              </RudiStack>
            ))}

            <div
              style={{
                borderBlockStart: '1px solid var(--rudi-color-border-default)',
                paddingBlockStart: '1.5rem',
              }}
            >
              <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                © 2026 Helexa Biosciences, Inc. These Terms may be updated from time to time;
                material changes will be posted here with a new effective date.
              </RudiText>
            </div>
          </RudiStack>
        </div>
      </RudiCenter>

      <BioFooter />
    </RudiStack>
  ),
}

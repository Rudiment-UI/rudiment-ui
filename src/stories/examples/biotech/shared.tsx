import type { CSSProperties, ElementType, ReactNode } from 'react'

import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiInput } from '../../../components/Input/Input'
import { RudiTopBar } from '../../../components/TopBar/TopBar'
import { RudiFooter } from '../../../components/Footer/Footer'

// ---------------------------------------------------------------------------
// Helexa Biosciences — a genomic-medicine brand used across the Biotech suite.
//
// Design intent: this suite intentionally stands apart from the other examples.
// "Signature" surfaces (header, footer, heroes, CTAs, stat bands) commit to a
// fixed cinematic dark palette with a teal→indigo glow and a molecular dot grid,
// so the brand reads the same in every theme — exactly the way the eCommerce
// hero fixes white text over a photo. Everything *between* those bands is built
// from `var(--rudi-*)` tokens and adapts across all eight Rudiment-UI themes.
//
// Imagery is science / lab / genomics photography from unsplash.com.
// ---------------------------------------------------------------------------

/** Build a responsive Unsplash CDN URL from a bare photo id. */
export function unsplash(id: string, width = 1200, height?: number): string {
  const crop = height ? `&fit=crop&h=${height}` : ''
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${width}${crop}`
}

// ---------------------------------------------------------------------------
// Signature palette (fixed — brand colours, not theme tokens)
//
// One deep-ink base and one calibrated teal accent. No gradients, no glow, no
// texture: the brand reads precise and clinical, and the accent appears only as
// a solid, never as a wash. Everything between the signature bands still adapts
// to the eight Rudiment-UI themes.
// ---------------------------------------------------------------------------

export const INK = '#070b14' // near-black canvas for signature bands
export const INK_2 = '#0e1521' // a barely-lifted ink for gentle vertical tone
export const INK_ELEV = '#121a2b' // elevated panel surface on the dark canvas
export const TEAL = '#2dd4bf' // the single brand accent, used solid and sparingly

/** Shared corner radius for signature surfaces — tight and crisp. */
export const RADIUS = '0.5rem'

/** Hairline used to frame and separate elements on the dark canvas. */
const HAIRLINE = 'rgba(255,255,255,0.09)'

/** A solid, crisply-framed elevated panel for cards on the dark canvas. */
export const glass: CSSProperties = {
  background: INK_ELEV,
  border: `1px solid ${HAIRLINE}`,
  borderRadius: RADIUS,
}

/**
 * Emphasised inline text in the brand accent. Inside signature dark bands the
 * accent resolves to the bright teal (set via `--rudi-emph` on GlowSection); on
 * theme-driven light sections it falls back to the theme's own brand colour, so
 * it always meets contrast. A single solid colour — no gradient fill.
 */
export function GradientText({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}) {
  return (
    <span
      style={{
        color: 'var(--rudi-emph, var(--rudi-color-text-brand, var(--rudi-color-primary)))',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Imagery
// ---------------------------------------------------------------------------

export const img = {
  heroLab: 'photo-1532187863486-abf9dbad1b69',
  dnaStrand: 'photo-1583911860205-72f8ac8ddcbe',
  microscope: 'photo-1518152006812-edab29b069ac',
  vials: 'photo-1576086213369-97a306d36557',
  researcher: 'photo-1581093588401-fbb62a02f120',
  genomicsAbstract: 'photo-1530026405186-ed1f139313f8',
  helix: 'photo-1628595351029-c2bf17511435',
  team: 'photo-1522071820081-009f0129c71c',
  culture: 'photo-1580281658626-ee379f3cce93',
  dataScience: 'photo-1551288049-bebda4e38f71',
  testTubes: 'photo-1579165466741-7f35e4755660',
  compounds: 'photo-1584308666744-24d5c474f2ae',
  bioAbstract: 'photo-1614935151651-0bea6508db6b',
  labBench: 'photo-1559757148-5c350d0d3c56',
  scientist: 'photo-1579154204601-01588f351e67',
  analysis: 'photo-1554475900-0a0350e3fc7b',
  labWork: 'photo-1559757175-0eb30cd8c063',
  cells: 'photo-1607619056574-7b8d3ee536b2',
  sequencing: 'photo-1585435557343-3b092031a831',
  molecularBlue: 'photo-1620712943543-bcc4688e7485',
  clinical: 'photo-1563986768609-322da13575f3',
  laptopData: 'photo-1581091226825-a6a2a5aee158',
  healthTech: 'photo-1576091160399-112ba8d25d1d',
  campus: 'photo-1486406146926-c627a92ad1ab',
  officeGlass: 'photo-1512069772995-ec65ed45afd6',
  meeting: 'photo-1516549655169-df83a0774514',
}

// ---------------------------------------------------------------------------
// Navigation + brand data
// ---------------------------------------------------------------------------

export const nav = [
  { label: 'Platform', href: '#' },
  { label: 'Pipeline', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Investors', href: '#' },
  { label: 'Partners', href: '#' },
]

export type Phase = 0 | 1 | 2 | 3 | 4
/** 0 = Preclinical, 1 = Phase 1, 2 = Phase 2, 3 = Phase 3, 4 = Filed/Approved. */
export const PHASE_LABELS = ['Preclinical', 'Phase 1', 'Phase 2', 'Phase 3', 'Filed'] as const

export interface Program {
  code: string
  name: string
  area: string
  indication: string
  modality: string
  phase: Phase
}

export const pipeline: Program[] = [
  { code: 'HLX-201', name: 'Exabrio', area: 'Oncology', indication: 'Metastatic melanoma', modality: 'In-vivo gene edit', phase: 3 },
  { code: 'HLX-114', name: 'Nevoxen', area: 'Rare Disease', indication: 'Transthyretin amyloidosis', modality: 'siRNA', phase: 3 },
  { code: 'HLX-330', name: 'Cortiva', area: 'Neurology', indication: 'Early Alzheimer’s', modality: 'ASO', phase: 2 },
  { code: 'HLX-208', name: 'Immuvy', area: 'Immunology', indication: 'Lupus nephritis', modality: 'Cell therapy', phase: 2 },
  { code: 'HLX-451', name: 'Regenex', area: 'Rare Disease', indication: 'Duchenne muscular dystrophy', modality: 'AAV gene therapy', phase: 1 },
  { code: 'HLX-577', name: 'Oncolyx', area: 'Oncology', indication: 'Pancreatic carcinoma', modality: 'mRNA vaccine', phase: 1 },
  { code: 'HLX-609', name: 'Cardiex', area: 'Cardiology', indication: 'Familial hypercholesterolemia', modality: 'Base editing', phase: 0 },
  { code: 'HLX-742', name: 'Neurova', area: 'Neurology', indication: 'ALS', modality: 'ASO', phase: 0 },
]

export interface TherapeuticArea {
  name: string
  icon: string
  blurb: string
  programs: number
  photo: string
}

export const therapeuticAreas: TherapeuticArea[] = [
  { name: 'Oncology', icon: 'lucide:target', blurb: 'Precision therapies that teach the immune system to find and clear tumours.', programs: 9, photo: img.cells },
  { name: 'Rare Disease', icon: 'lucide:dna', blurb: 'One-time genetic medicines for inherited disorders with no approved options.', programs: 7, photo: img.sequencing },
  { name: 'Neurology', icon: 'lucide:brain', blurb: 'Antisense and gene-silencing programs for neurodegenerative disease.', programs: 5, photo: img.genomicsAbstract },
  { name: 'Immunology', icon: 'lucide:shield-plus', blurb: 'Engineered cell therapies that reset the immune response at its source.', programs: 4, photo: img.culture },
]

export interface Capability {
  title: string
  icon: string
  body: string
}

export const platformCapabilities: Capability[] = [
  { title: 'GenomeForge™ editing', icon: 'lucide:scissors', body: 'A proprietary base- and prime-editing toolkit with single-nucleotide precision and industry-low off-target rates.' },
  { title: 'Atlas discovery engine', icon: 'lucide:cpu', body: 'Foundation models trained on 40M patient genomes surface novel targets in weeks, not years.' },
  { title: 'Vireo delivery system', icon: 'lucide:send', body: 'Tissue-selective lipid nanoparticles that reach the liver, CNS, and muscle without immunogenicity.' },
  { title: 'cGMP biomanufacturing', icon: 'lucide:factory', body: 'Fully owned suites produce clinical and commercial supply under one quality system.' },
  { title: 'Closed-loop clinical data', icon: 'lucide:activity', body: 'Real-time biomarker readouts flow back into the discovery engine to refine every next candidate.' },
  { title: 'Responsible AI governance', icon: 'lucide:scale', body: 'Every model decision is auditable, versioned, and reviewed by our bioethics board.' },
]

export interface Service {
  title: string
  icon: string
  body: string
  points: string[]
}

export const services: Service[] = [
  {
    title: 'Target-to-lead discovery',
    icon: 'lucide:search-code',
    body: 'Partner on target identification and lead optimisation powered by the Atlas engine.',
    points: ['Multi-omic target nomination', 'AI-guided candidate design', 'Preclinical validation'],
  },
  {
    title: 'Editing & delivery licensing',
    icon: 'lucide:git-branch',
    body: 'License GenomeForge™ and Vireo for your own therapeutic programs.',
    points: ['Non-exclusive platform access', 'Chemistry & tooling transfer', 'Milestone-based terms'],
  },
  {
    title: 'Contract biomanufacturing',
    icon: 'lucide:flask-conical',
    body: 'Reserve capacity in our cGMP suites for clinical and commercial supply.',
    points: ['Process development', 'Fill-finish & release', 'Global cold-chain logistics'],
  },
  {
    title: 'Companion diagnostics',
    icon: 'lucide:scan-line',
    body: 'Co-develop genomic assays that match the right patient to the right therapy.',
    points: ['NGS panel design', 'Regulatory co-submission', 'Lab network deployment'],
  },
]

export interface Leader {
  name: string
  role: string
  photo: string
}

export const leadership: Leader[] = [
  { name: 'Dr. Ada Okonkwo', role: 'Co-founder & Chief Executive Officer', photo: img.scientist },
  { name: 'Dr. Rafael Moreau', role: 'Co-founder & Chief Scientific Officer', photo: img.researcher },
  { name: 'Priya Ramanathan', role: 'Chief Medical Officer', photo: img.clinical },
  { name: 'Marcus Feld', role: 'Chief Financial Officer', photo: img.dataScience },
  { name: 'Dr. Lena Vogt', role: 'Head of Platform', photo: img.analysis },
  { name: 'Tomás Herrera', role: 'General Counsel', photo: img.meeting },
]

export const values = [
  { title: 'Patients set the pace', icon: 'lucide:heart-pulse', body: 'Every decision starts and ends with the people waiting for a therapy.' },
  { title: 'Rigor over hype', icon: 'lucide:microscope', body: 'We follow the data even when it is inconvenient, and we publish what we learn.' },
  { title: 'Build in the open', icon: 'lucide:handshake', body: 'Science moves faster when platforms are shared and results are reproducible.' },
  { title: 'Engineer responsibly', icon: 'lucide:shield-check', body: 'The power to edit genomes demands the highest bar for safety and ethics.' },
]

export const milestones = [
  { year: '2016', event: 'Helexa founded in Cambridge around the GenomeForge editing platform.' },
  { year: '2018', event: 'Series B closes at $220M; first preclinical program in rare disease.' },
  { year: '2020', event: 'Atlas discovery engine goes live, trained on 12M genomes.' },
  { year: '2022', event: 'HLX-201 enters the clinic; IPO on Nasdaq under ticker HLXB.' },
  { year: '2024', event: 'First Phase 3 readout; cGMP campus opens in Research Triangle Park.' },
  { year: '2026', event: 'Two programs under FDA priority review; 40+ active programs.' },
]

export interface Partner {
  name: string
  category: string
}

export const partners: Partner[] = [
  { name: 'MERIDIAN', category: 'Pharma' },
  { name: 'NORTHWIND', category: 'Pharma' },
  { name: 'Vantea', category: 'Biotech' },
  { name: 'HELICON', category: 'Genomics' },
  { name: 'Quorum Bio', category: 'CRO' },
  { name: 'Aster Health', category: 'Health system' },
  { name: 'BlueRidge Dx', category: 'Diagnostics' },
  { name: 'CALYX', category: 'Academic' },
  { name: 'Orbital Labs', category: 'Cloud' },
  { name: 'Fjord Ventures', category: 'Investor' },
  { name: 'Sundial', category: 'Foundation' },
  { name: 'Kestrel Pharma', category: 'Pharma' },
]

export interface Testimonial {
  quote: string
  name: string
  title: string
  org: string
  photo: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Helexa’s editing platform cut two years off our program timeline. The precision and the off-target data are simply the best we have benchmarked.',
    name: 'Dr. Susan Whitfield',
    title: 'SVP, Research',
    org: 'Meridian Therapeutics',
    photo: img.researcher,
  },
  {
    quote:
      'Their team treats our patients as their own. The closed-loop biomarker data changed how our trial was designed for the better.',
    name: 'Dr. Aaron Cole',
    title: 'Principal Investigator',
    org: 'Aster Health System',
    photo: img.clinical,
  },
  {
    quote:
      'We licensed Vireo for CNS delivery and reached the target tissue on the first attempt. That never happens.',
    name: 'Mei-Ling Chen',
    title: 'Head of Platform',
    org: 'Vantea Bio',
    photo: img.analysis,
  },
]

export const certifications = [
  { label: 'FDA registered', icon: 'lucide:badge-check' },
  { label: 'ISO 9001', icon: 'lucide:award' },
  { label: 'GxP compliant', icon: 'lucide:clipboard-check' },
  { label: 'HIPAA', icon: 'lucide:lock' },
  { label: 'SOC 2 Type II', icon: 'lucide:shield' },
  { label: 'GDPR', icon: 'lucide:globe-lock' },
]

// Investors ------------------------------------------------------------------

export const financials = {
  revenue: [
    { year: '2021', Revenue: 42, 'R&D': 180 },
    { year: '2022', Revenue: 96, 'R&D': 240 },
    { year: '2023', Revenue: 168, 'R&D': 310 },
    { year: '2024', Revenue: 274, 'R&D': 402 },
    { year: '2025', Revenue: 418, 'R&D': 486 },
  ],
  pipelineValue: [
    { area: 'Oncology', Value: 3.2 },
    { area: 'Rare', Value: 2.6 },
    { area: 'Neuro', Value: 1.8 },
    { area: 'Immuno', Value: 1.1 },
    { area: 'Cardio', Value: 0.6 },
  ],
  allocation: [
    { name: 'R&D', value: 58 },
    { name: 'Manufacturing', value: 20 },
    { name: 'Clinical ops', value: 14 },
    { name: 'G&A', value: 8 },
  ],
}

export const filings = [
  { title: 'Q2 2026 Shareholder Letter', type: 'Letter', date: 'Jul 22, 2026', size: 'PDF · 1.2 MB' },
  { title: 'Form 10-Q — Q2 2026', type: 'SEC Filing', date: 'Jul 22, 2026', size: 'PDF · 3.8 MB' },
  { title: 'Annual Report 2025', type: 'Report', date: 'Feb 14, 2026', size: 'PDF · 9.1 MB' },
  { title: 'Form 10-K — FY2025', type: 'SEC Filing', date: 'Feb 14, 2026', size: 'PDF · 6.4 MB' },
  { title: 'ESG & Bioethics Report 2025', type: 'Report', date: 'Jan 30, 2026', size: 'PDF · 4.7 MB' },
  { title: 'Analyst Day Presentation', type: 'Presentation', date: 'Nov 12, 2025', size: 'PDF · 12.3 MB' },
]

// ---------------------------------------------------------------------------
// Signature layout helpers
// ---------------------------------------------------------------------------

/**
 * The signature dark band: a flat, deep-ink canvas with light text and a single
 * hairline seam. No glow, no texture — the composition carries it. Used for
 * heroes, CTAs, stat bands, and the footer.
 */
export function GlowSection({
  children,
  style,
  bleedTop = false,
  as: Element = 'section',
}: {
  children: ReactNode
  style?: CSSProperties
  /** Pull the section up under a preceding one for a seamless dark run. */
  bleedTop?: boolean
  as?: ElementType
}) {
  return (
    <Element
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${INK} 0%, ${INK_2} 100%)`,
        color: '#fff',
        // The accent GradientText resolves to inside dark bands.
        ['--rudi-emph' as string]: TEAL,
        // A crisp hairline marks the seam where a light section meets this band.
        borderBlockStart: bleedTop ? undefined : `1px solid ${HAIRLINE}`,
        marginBlockStart: bleedTop ? '-1px' : undefined,
        ...style,
      }}
    >
      {children}
    </Element>
  )
}

/**
 * A crisply-framed, true-colour photo. Real lab and genomics imagery reads far
 * more premium than a colour wash, so there is no duotone. `overlay` adds only a
 * subtle neutral scrim, for the rare case where text sits over the image.
 */
export function Duotone({
  photo,
  alt,
  ratio = '4 / 3',
  width = 1200,
  radius = RADIUS,
  overlay = false,
  style,
}: {
  photo: string
  alt: string
  ratio?: CSSProperties['aspectRatio']
  width?: number
  radius?: string
  overlay?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        aspectRatio: ratio,
        backgroundColor: 'var(--rudi-color-background-surface-sunken)',
        boxShadow: 'inset 0 0 0 1px rgba(120,124,136,0.16)',
        ...style,
      }}
    >
      <img
        src={unsplash(photo, width)}
        alt={alt}
        loading="lazy"
        style={{ display: 'block', inlineSize: '100%', blockSize: '100%', objectFit: 'cover' }}
      />
      {overlay && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 52%, rgba(7,11,20,0.5))',
          }}
        />
      )}
    </div>
  )
}

/** A consistent section header used across the suite. */
export function SectionHead({
  overline,
  title,
  sub,
  align = 'start',
  onDark = false,
  titleSize = 2,
}: {
  overline?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'start' | 'center'
  onDark?: boolean
  titleSize?: 1 | 2 | 3 | 4 | 5 | 6
}) {
  return (
    <RudiStack
      space="0.75rem"
      style={{
        textAlign: align === 'center' ? 'center' : 'start',
        alignItems: align === 'center' ? 'center' : undefined,
        maxWidth: align === 'center' ? '44rem' : undefined,
        marginInline: align === 'center' ? 'auto' : undefined,
      }}
    >
      {overline && (
        <RudiText
          variant="overline"
          style={{ color: onDark ? TEAL : 'var(--rudi-color-text-brand, var(--rudi-color-primary))' }}
        >
          {overline}
        </RudiText>
      )}
      <RudiHeading level={2} size={titleSize} style={{ color: onDark ? '#fff' : undefined, lineHeight: 1.1 }}>
        {title}
      </RudiHeading>
      {sub && (
        <RudiText
          style={{
            fontSize: '1.05rem',
            color: onDark ? 'rgba(255,255,255,0.72)' : 'var(--rudi-color-text-subtle)',
            maxWidth: '42rem',
            marginInline: align === 'center' ? 'auto' : undefined,
          }}
        >
          {sub}
        </RudiText>
      )}
    </RudiStack>
  )
}

/**
 * A segmented clinical-phase indicator. `phase` is the number of stages reached
 * (0 = Preclinical … 4 = Filed). Reads correctly on both light and dark surfaces.
 */
export function PhaseBar({ phase, onDark = false }: { phase: Phase; onDark?: boolean }) {
  const stages = 4 // Preclinical → Phase 1 → Phase 2 → Phase 3
  return (
    <RudiStack space="0.4rem" style={{ minWidth: '9rem' }}>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {Array.from({ length: stages }).map((_, i) => {
          const filled = i < phase
          return (
            <span
              key={i}
              style={{
                flex: 1,
                height: '0.375rem',
                borderRadius: '999px',
                background: filled
                  ? TEAL
                  : onDark
                    ? 'rgba(255,255,255,0.14)'
                    : 'var(--rudi-color-background-surface-sunken)',
                border: filled ? 'none' : `1px solid ${onDark ? 'rgba(255,255,255,0.14)' : 'var(--rudi-color-border-default)'}`,
              }}
            />
          )
        })}
      </div>
      <RudiText
        variant="caption"
        style={{ color: onDark ? 'rgba(255,255,255,0.75)' : 'var(--rudi-color-text-subtle)', fontWeight: 600 }}
      >
        {PHASE_LABELS[phase]}
      </RudiText>
    </RudiStack>
  )
}

// ---------------------------------------------------------------------------
// Brand + chrome
// ---------------------------------------------------------------------------

export function HelexaLogo({ light = false, size = 3 }: { light?: boolean; size?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return (
    <RudiCluster space="0.6rem" align="center">
      <span
        aria-hidden
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          inlineSize: '2rem',
          blockSize: '2rem',
          borderRadius: RADIUS,
          background: TEAL,
          color: INK,
        }}
      >
        <RudiIcon icon="lucide:dna" size="sm" color={INK} />
      </span>
      <RudiHeading
        level={2}
        size={size}
        style={{
          margin: 0,
          letterSpacing: '0.14em',
          fontWeight: 700,
          color: light ? '#fff' : undefined,
        }}
      >
        HELEXA
      </RudiHeading>
    </RudiCluster>
  )
}

export function BioHeader({ active }: { active?: string }) {
  // Helexa deliberately opts out of the token system for its fixed dark brand
  // skin, so the structural chrome comes from RudiTopBar while the announcement
  // strip and solid ink background stay as inline brand styling. The outer
  // wrapper owns the sticky behaviour so the strip and bar stick together.
  return (
    <div style={{ position: 'sticky', insetBlockStart: 0, zIndex: 20 }}>
      <div style={{ background: INK, borderBlockEnd: `1px solid ${HAIRLINE}` }}>
        <RudiCenter gutters="1.5rem">
          <RudiCluster
            justify="center"
            align="center"
            space="0.5rem"
            style={{ paddingBlock: '0.45rem' }}
          >
            <RudiIcon icon="lucide:sparkles" size="sm" color={TEAL} />
            <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.78)', fontWeight: 600 }}>
              HLX-201 and HLX-114 accepted for FDA priority review.
            </RudiText>
            <RudiText
              as="a"
              href="#"
              variant="caption"
              style={{ color: TEAL, fontWeight: 700, textDecoration: 'none' }}
            >
              Read the announcement
            </RudiText>
            <RudiIcon icon="lucide:arrow-right" size="sm" color={TEAL} />
          </RudiCluster>
        </RudiCenter>
      </div>

      <RudiTopBar
        sticky={false}
        style={{
          borderBlockEnd: `1px solid ${HAIRLINE}`,
          background: INK,
          color: '#fff',
        }}
        start={<HelexaLogo light />}
        end={
          <>
            <RudiText
              as="a"
              href="#"
              variant="body-sm"
              style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontWeight: 600 }}
            >
              Investor login
            </RudiText>
            <RudiButton variant="primary" size="sm" iconAfter="lucide:arrow-right">
              Contact
            </RudiButton>
          </>
        }
      >
        <RudiCluster as="nav" space="1.5rem" align="center">
          {nav.map((n) => (
            <RudiText
              key={n.label}
              as="a"
              href={n.href}
              variant="body-sm"
              style={{
                textDecoration: 'none',
                fontWeight: 600,
                color: active === n.label ? '#fff' : 'rgba(255,255,255,0.66)',
              }}
            >
              {n.label}
            </RudiText>
          ))}
        </RudiCluster>
      </RudiTopBar>
    </div>
  )
}

export function BioFooter() {
  const columns = [
    { head: 'Platform', links: ['GenomeForge™', 'Atlas engine', 'Vireo delivery', 'Manufacturing'] },
    { head: 'Company', links: ['About', 'Leadership', 'Careers', 'Newsroom'] },
    { head: 'Investors', links: ['Overview', 'SEC filings', 'Events', 'Governance'] },
    { head: 'Resources', links: ['Publications', 'Patients', 'Partners', 'Contact'] },
  ]
  // GlowSection keeps Helexa's dark glow + dot-grid brand decoration as the
  // <footer>, while the RudiFooter structural parts (Columns/Column/BottomBar)
  // provide the layout. Brand colours stay inline because biotech opts out of
  // the token system.
  return (
    <GlowSection as="footer" style={{ marginBlockStart: '0' }}>
      <RudiCenter gutters="1.5rem">
        <RudiStack space="2.5rem" style={{ paddingBlock: '3.5rem' }}>
          <RudiFooter.Columns minColumnWidth="12rem">
            <RudiFooter.Column>
              <HelexaLogo light />
              <RudiText variant="body-sm" style={{ color: 'rgba(255,255,255,0.66)', maxWidth: '20rem' }}>
                Engineering the code of life. Genomic medicines designed, edited, and
                manufactured under one roof.
              </RudiText>
              <RudiCluster space="0.4rem">
                {['lucide:linkedin', 'lucide:twitter', 'lucide:youtube', 'lucide:github'].map((icon) => (
                  <RudiIconButton
                    key={icon}
                    aria-label={icon.replace('lucide:', '')}
                    variant="ghost"
                    size="sm"
                  >
                    <RudiIcon icon={icon} color="rgba(255,255,255,0.85)" />
                  </RudiIconButton>
                ))}
              </RudiCluster>
            </RudiFooter.Column>
            {columns.map((col) => (
              <RudiFooter.Column key={col.head}>
                <RudiText variant="overline" style={{ color: TEAL }}>
                  {col.head}
                </RudiText>
                {col.links.map((l) => (
                  <RudiText
                    key={l}
                    as="a"
                    href="#"
                    variant="body-sm"
                    style={{ color: 'rgba(255,255,255,0.66)', textDecoration: 'none' }}
                  >
                    {l}
                  </RudiText>
                ))}
              </RudiFooter.Column>
            ))}
          </RudiFooter.Columns>

          <div style={{ ...glass, padding: '1.5rem' }}>
            <RudiCluster justify="space-between" align="center" space="1rem" style={{ rowGap: '1rem' }}>
              <RudiStack space="0.25rem">
                <RudiHeading level={3} size={5} style={{ color: '#fff', margin: 0 }}>
                  Science, straight to your inbox
                </RudiHeading>
                <RudiText variant="body-sm" style={{ color: 'rgba(255,255,255,0.66)' }}>
                  Quarterly platform updates and clinical readouts. No spam.
                </RudiText>
              </RudiStack>
              <RudiCluster space="0.5rem" align="flex-end">
                <RudiInput label="Work email" type="email" placeholder="you@lab.org" />
                <RudiButton variant="primary" iconAfter="lucide:arrow-right">
                  Subscribe
                </RudiButton>
              </RudiCluster>
            </RudiCluster>
          </div>

          <RudiFooter.BottomBar
            style={{
              marginBlockStart: 0,
              borderBlockStart: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <RudiText variant="caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
              © 2026 Helexa Biosciences, Inc. Nasdaq: HLXB. All rights reserved.
            </RudiText>
            <RudiCluster space="1.25rem">
              {['Terms', 'Privacy', 'Cookies', 'Accessibility'].map((l) => (
                <RudiText
                  key={l}
                  as="a"
                  href="#"
                  variant="caption"
                  style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}
                >
                  {l}
                </RudiText>
              ))}
            </RudiCluster>
          </RudiFooter.BottomBar>
        </RudiStack>
      </RudiCenter>
    </GlowSection>
  )
}

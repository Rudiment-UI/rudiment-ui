import type { Meta, StoryObj } from '@storybook/react'

import { RudiBox } from '../../../layouts/Box/Box'
import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import {
  ProductCard,
  StoreFooter,
  StoreHeader,
  StoreImage,
  categories,
  lifestyle,
  products,
  unsplash,
} from './shared'

const meta = {
  title: 'Examples/eCommerce/Landing Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const categoryImages: Record<string, string> = {
  Sofas: 'photo-1493663284031-b7e3aefcae8e',
  Chairs: 'photo-1567538096630-e0c55bd6374c',
  Lighting: lifestyle.arcLampRoom,
  Bedroom: 'photo-1505693416388-ac5ce068fe85',
  Workspace: 'photo-1449247709967-d4461a6a6103',
}

const valueProps = [
  { icon: 'lucide:truck', title: 'Free delivery', body: 'On every order over $250, to your door.' },
  { icon: 'lucide:rotate-ccw', title: '30-day returns', body: 'Not the right fit? Send it back, on us.' },
  { icon: 'lucide:shield-check', title: '10-year warranty', body: 'Built to outlast trends and moves.' },
  { icon: 'lucide:sprout', title: 'Sustainably made', body: 'FSC-certified wood, recycled textiles.' },
]

export const LandingPage: Story = {
  name: 'Landing Page',
  render: () => (
    <RudiStack space="0">
      <StoreHeader />

      {/* Hero */}
      <div style={{ position: 'relative' }}>
        <StoreImage
          photo={lifestyle.heroLiving}
          alt="A calm, neutral living room styled with Maison furniture"
          ratio="16 / 7"
          width={1600}
          radius="0"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 75%)',
          }}
        >
          <RudiCenter style={{ inlineSize: '100%' }}>
            <RudiStack space="1.25rem" style={{ maxWidth: '34rem', color: '#fff' }}>
              <div>
                <RudiBadge variant="info">Spring Collection 2026</RudiBadge>
              </div>
              <RudiHeading
                level={1}
                size={1}
                style={{ color: '#fff', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
              >
                Furniture that makes a house feel like home
              </RudiHeading>
              <RudiText style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.125rem' }}>
                Considered, comfortable pieces designed to last for decades — not seasons.
                Free delivery and 30-day returns on everything.
              </RudiText>
              <RudiCluster space="0.75rem">
                <RudiButton variant="primary" size="lg">
                  Shop the collection
                </RudiButton>
                <RudiButton variant="secondary" size="lg">
                  Book a design consult
                </RudiButton>
              </RudiCluster>
            </RudiStack>
          </RudiCenter>
        </div>
      </div>

      <RudiCenter style={{ paddingBlock: '3.5rem' }}>
        <RudiStack space="4rem">
          {/* Categories */}
          <RudiStack space="1.5rem">
            <RudiCluster justify="space-between" align="flex-end">
              <RudiStack space="0.25rem">
                <RudiHeading level={2} size={3}>
                  Shop by room
                </RudiHeading>
                <RudiText variant="caption">Find your next piece by where it lives.</RudiText>
              </RudiStack>
              <RudiButton variant="ghost">
                View all
                <RudiIcon icon="lucide:arrow-right" />
              </RudiButton>
            </RudiCluster>
            <RudiGrid minCellWidth="10rem" space="1rem">
              {categories.map((c) => (
                <a key={c.label} href="#" style={{ textDecoration: 'none' }}>
                  <RudiStack space="0.625rem">
                    <StoreImage photo={categoryImages[c.label]} alt={c.label} ratio="3 / 4" />
                    <RudiCluster space="0.375rem" align="center">
                      <RudiIcon icon={c.icon} size="sm" />
                      <RudiText style={{ fontWeight: 600 }}>{c.label}</RudiText>
                    </RudiCluster>
                  </RudiStack>
                </a>
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Bestsellers */}
          <RudiStack space="1.5rem">
            <RudiCluster justify="space-between" align="flex-end">
              <RudiStack space="0.25rem">
                <RudiHeading level={2} size={3}>
                  Bestsellers
                </RudiHeading>
                <RudiText variant="caption">The pieces our customers keep coming back for.</RudiText>
              </RudiStack>
              <RudiButton variant="ghost">
                Shop all
                <RudiIcon icon="lucide:arrow-right" />
              </RudiButton>
            </RudiCluster>
            <RudiGrid minCellWidth="15rem" space="1.5rem">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </RudiGrid>
          </RudiStack>

          {/* Promo banner */}
          <div style={{ position: 'relative' }}>
            <StoreImage
              photo={lifestyle.sectional}
              alt="A large sectional styled in a bright, open living room"
              ratio="21 / 9"
              width={1600}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '2rem',
                background:
                  'linear-gradient(270deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 60%)',
                borderRadius: 'var(--rudi-radius-lg)',
              }}
            >
              <RudiStack space="0.75rem" style={{ maxWidth: '24rem', color: '#fff', textAlign: 'right' }}>
                <RudiHeading level={2} size={2} style={{ color: '#fff' }}>
                  The Modular Sectional, reimagined
                </RudiHeading>
                <RudiText style={{ color: 'rgba(255,255,255,0.88)' }}>
                  Configure it your way with 12 modules and 30 fabrics. Ships in a week.
                </RudiText>
                <RudiCluster justify="flex-end">
                  <RudiButton variant="primary" size="lg">
                    Build yours
                  </RudiButton>
                </RudiCluster>
              </RudiStack>
            </div>
          </div>

          {/* Value props */}
          <RudiGrid minCellWidth="13rem" space="1.5rem">
            {valueProps.map((v) => (
              <RudiStack key={v.title} space="0.5rem">
                <RudiIcon icon={v.icon} size="lg" />
                <RudiHeading level={3} size={5} style={{ margin: 0 }}>
                  {v.title}
                </RudiHeading>
                <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                  {v.body}
                </RudiText>
              </RudiStack>
            ))}
          </RudiGrid>

          {/* Editorial split */}
          <RudiBox
            bordered
            style={{ padding: 0, overflow: 'hidden' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))' }}>
              <img
                src={unsplash(lifestyle.brightRoom, 800)}
                alt="A styled corner of a Maison living room"
                loading="lazy"
                style={{ inlineSize: '100%', blockSize: '100%', objectFit: 'cover', minHeight: '18rem' }}
              />
              <RudiStack space="1rem" style={{ padding: '2.5rem', justifyContent: 'center' }}>
                <RudiText variant="overline">Our story</RudiText>
                <RudiHeading level={2} size={3}>
                  Designed in Copenhagen, made to be lived in
                </RudiHeading>
                <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>
                  We work directly with family-run workshops to make furniture the slow way —
                  solid frames, natural materials, and finishes that only get better with age.
                </RudiText>
                <RudiCluster>
                  <RudiButton variant="secondary">Read our story</RudiButton>
                </RudiCluster>
              </RudiStack>
            </div>
          </RudiBox>
        </RudiStack>
      </RudiCenter>

      <StoreFooter />
    </RudiStack>
  ),
}

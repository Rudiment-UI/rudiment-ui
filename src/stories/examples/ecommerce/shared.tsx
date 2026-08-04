import type { CSSProperties } from 'react'

import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiInput } from '../../../components/Input/Input'
import { RudiImage } from '../../../components/Image/Image'
import { RudiRating } from '../../../components/Rating/Rating'
import { RudiLink } from '../../../components/Link/Link'
import { RudiTag } from '../../../components/Tag/Tag'
import { RudiTopBar } from '../../../components/TopBar/TopBar'
import { RudiFooter } from '../../../components/Footer/Footer'

// ---------------------------------------------------------------------------
// Catalog data
//
// Every image is a neutral home / furniture photograph from unsplash.com, so
// the storefront reads cleanly across all eight Rudiment-UI themes (light,
// dark, roomy, soft, compressed) without any per-theme art direction.
// ---------------------------------------------------------------------------

/** Build a responsive Unsplash CDN URL from a bare photo id. */
export function unsplash(id: string, width = 800, height?: number): string {
  const crop = height ? `&fit=crop&h=${height}` : ''
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${width}${crop}`
}

export interface Product {
  slug: string
  name: string
  category: string
  price: number
  compareAt?: number
  rating: number
  reviews: number
  photo: string
  blurb: string
  badge?: { label: string; variant: 'success' | 'warning' | 'info' }
}

export const products: Product[] = [
  {
    slug: 'marlowe-velvet-sofa',
    name: 'Marlowe Velvet Sofa',
    category: 'Sofas',
    price: 1899,
    compareAt: 2200,
    rating: 4.8,
    reviews: 214,
    photo: 'photo-1555041469-a586c61ea9bc',
    blurb: 'A three-seat sofa in emerald performance velvet on solid ash legs.',
    badge: { label: 'Bestseller', variant: 'success' },
  },
  {
    slug: 'halden-leather-sofa',
    name: 'Halden Leather Sofa',
    category: 'Sofas',
    price: 2199,
    rating: 4.9,
    reviews: 168,
    photo: 'photo-1540574163026-643ea20ade25',
    blurb: 'Full-grain camel leather that softens beautifully with everyday use.',
  },
  {
    slug: 'ember-loveseat',
    name: 'Ember Loveseat',
    category: 'Sofas',
    price: 1299,
    rating: 4.6,
    reviews: 92,
    photo: 'photo-1567016432779-094069958ea5',
    blurb: 'A compact two-seater in warm terracotta bouclé — made for small rooms.',
    badge: { label: 'New', variant: 'info' },
  },
  {
    slug: 'margaux-accent-chair',
    name: 'Margaux Accent Chair',
    category: 'Chairs',
    price: 549,
    rating: 4.7,
    reviews: 137,
    photo: 'photo-1567538096630-e0c55bd6374c',
    blurb: 'A hand-tufted ivory occasional chair with turned hardwood legs.',
  },
  {
    slug: 'sol-lounge-chair',
    name: 'Sol Lounge Chair',
    category: 'Chairs',
    price: 629,
    rating: 4.5,
    reviews: 74,
    photo: 'photo-1550226891-ef816aed4a98',
    blurb: 'A high-back reading chair in mustard weave with a matching ottoman.',
  },
  {
    slug: 'kioko-dining-chair',
    name: 'Kioko Dining Chair',
    category: 'Chairs',
    price: 149,
    compareAt: 189,
    rating: 4.4,
    reviews: 311,
    photo: 'photo-1592078615290-033ee584e267',
    blurb: 'A molded-shell dining chair on beech dowel legs. Sold individually.',
    badge: { label: 'Sale', variant: 'warning' },
  },
  {
    slug: 'lucent-arc-lamp',
    name: 'Lucent Arc Floor Lamp',
    category: 'Lighting',
    price: 429,
    rating: 4.7,
    reviews: 58,
    photo: 'photo-1519710164239-da123dc03ef4',
    blurb: 'A brushed-steel arc lamp that reaches out over a sofa or reading nook.',
  },
  {
    slug: 'beaumont-bed',
    name: 'Beaumont Upholstered Bed',
    category: 'Bedroom',
    price: 1499,
    rating: 4.8,
    reviews: 121,
    photo: 'photo-1505693416388-ac5ce068fe85',
    blurb: 'A tufted wingback bed frame in oatmeal linen, available in three sizes.',
  },
  {
    slug: 'studio-writing-desk',
    name: 'Studio Writing Desk',
    category: 'Workspace',
    price: 329,
    rating: 4.3,
    reviews: 89,
    photo: 'photo-1449247709967-d4461a6a6103',
    blurb: 'A pared-back desk with a lacquered top and slim trestle base.',
  },
]

export const categories = [
  { label: 'Sofas', icon: 'lucide:sofa' },
  { label: 'Chairs', icon: 'lucide:armchair' },
  { label: 'Lighting', icon: 'lucide:lamp' },
  { label: 'Bedroom', icon: 'lucide:bed-double' },
  { label: 'Workspace', icon: 'lucide:pen-tool' },
]

/** Lifestyle / room photography used for heroes and collection banners. */
export const lifestyle = {
  heroLiving: 'photo-1631679706909-1844bbd07221',
  sectional: 'photo-1616486338812-3dadae4b4ace',
  loft: 'photo-1538688525198-9b88f6f53126',
  brightRoom: 'photo-1560448204-e02f11c3d0e2',
  greySofa: 'photo-1493663284031-b7e3aefcae8e',
  arcLampRoom: 'photo-1524758631624-e2822e304c36',
}

export function formatPrice(value: number): string {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })
}

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------

export function StoreLogo({ size = 4 }: { size?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return (
    <RudiCluster space="0.5rem" align="center">
      <RudiIcon icon="lucide:house-plus" size="lg" />
      <RudiHeading level={2} size={size} style={{ margin: 0, letterSpacing: '0.02em' }}>
        Maison
      </RudiHeading>
    </RudiCluster>
  )
}

/**
 * A framed product / lifestyle photograph. Now backed by `RudiImage`, which
 * provides the sunken loading backdrop, aspect-ratio frame, and object-fit.
 */
export function StoreImage({
  photo,
  alt,
  ratio = '4 / 3',
  width = 800,
  radius = 'lg',
}: {
  photo: string
  alt: string
  ratio?: CSSProperties['aspectRatio']
  width?: number
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full' | '0'
}) {
  return (
    <RudiImage
      src={unsplash(photo, width)}
      alt={alt}
      aspectRatio={ratio}
      radius={radius === '0' ? 'none' : radius}
    />
  )
}

/** Star rating with review count. Now backed by `RudiRating`. */
export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return <RudiRating value={rating} count={reviews} size="sm" showValue />
}

/** Product tile used across the landing and category pages. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <RudiStack space="0.75rem" as="article">
      <div style={{ position: 'relative' }}>
        <StoreImage photo={product.photo} alt={product.name} ratio="1 / 1" />
        {product.badge && (
          <div style={{ position: 'absolute', insetBlockStart: '0.75rem', insetInlineStart: '0.75rem' }}>
            <RudiBadge variant={product.badge.variant}>{product.badge.label}</RudiBadge>
          </div>
        )}
        <div style={{ position: 'absolute', insetBlockStart: '0.75rem', insetInlineEnd: '0.75rem' }}>
          <RudiIconButton aria-label={`Add ${product.name} to wishlist`} variant="secondary" size="sm">
            <RudiIcon icon="lucide:heart" />
          </RudiIconButton>
        </div>
      </div>
      <RudiStack space="0.25rem">
        <RudiText variant="overline">{product.category}</RudiText>
        <RudiHeading level={3} size={5} style={{ margin: 0 }}>
          {product.name}
        </RudiHeading>
        <Stars rating={product.rating} reviews={product.reviews} />
      </RudiStack>
      <RudiCluster justify="space-between" align="center">
        <RudiCluster space="0.5rem" align="baseline">
          <RudiText style={{ fontWeight: 600 }}>{formatPrice(product.price)}</RudiText>
          {product.compareAt && (
            <RudiText
              variant="caption"
              style={{ textDecoration: 'line-through', color: 'var(--rudi-color-text-subtle)' }}
            >
              {formatPrice(product.compareAt)}
            </RudiText>
          )}
        </RudiCluster>
        <RudiButton variant="secondary" size="sm">
          Add to cart
        </RudiButton>
      </RudiCluster>
    </RudiStack>
  )
}

// ---------------------------------------------------------------------------
// Chrome
// ---------------------------------------------------------------------------

export function StoreHeader({ cartCount = 3 }: { cartCount?: number }) {
  return (
    <RudiTopBar
      start={<StoreLogo />}
      end={
        <>
          <RudiIconButton aria-label="Search" variant="ghost">
            <RudiIcon icon="lucide:search" />
          </RudiIconButton>
          <RudiIconButton aria-label="Account" variant="ghost">
            <RudiIcon icon="lucide:user" />
          </RudiIconButton>
          <RudiIconButton aria-label="Wishlist" variant="ghost">
            <RudiIcon icon="lucide:heart" />
          </RudiIconButton>
          <div style={{ position: 'relative' }}>
            <RudiIconButton aria-label={`Cart, ${cartCount} items`} variant="ghost">
              <RudiIcon icon="lucide:shopping-bag" />
            </RudiIconButton>
            {cartCount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  insetBlockStart: '-0.25rem',
                  insetInlineEnd: '-0.25rem',
                  pointerEvents: 'none',
                }}
              >
                <RudiBadge variant="error" size="sm">
                  {cartCount}
                </RudiBadge>
              </div>
            )}
          </div>
        </>
      }
    >
      <RudiCluster as="nav" space="1.25rem" align="center">
        {categories.map((c) => (
          <RudiLink key={c.label} href="#" variant="subtle" underline="hover">
            {c.label}
          </RudiLink>
        ))}
        <RudiTag variant="error">Sale</RudiTag>
      </RudiCluster>
    </RudiTopBar>
  )
}

export function StoreFooter() {
  return (
    <RudiFooter style={{ marginBlockStart: '4rem' }}>
      <RudiFooter.Columns minColumnWidth="14rem">
        <RudiFooter.Column>
          <StoreLogo size={3} />
          <RudiText variant="caption" noMargin>
            Modern furniture for considered living. Designed in Copenhagen, made to last.
          </RudiText>
          <RudiCluster space="0.25rem">
            <RudiIconButton aria-label="Instagram" variant="ghost" size="sm">
              <RudiIcon icon="lucide:instagram" />
            </RudiIconButton>
            <RudiIconButton aria-label="Pinterest" variant="ghost" size="sm">
              <RudiIcon icon="lucide:image" />
            </RudiIconButton>
            <RudiIconButton aria-label="YouTube" variant="ghost" size="sm">
              <RudiIcon icon="lucide:youtube" />
            </RudiIconButton>
          </RudiCluster>
        </RudiFooter.Column>
        <RudiFooter.Column title="Shop">
          {categories.map((c) => (
            <RudiLink key={c.label} href="#" variant="subtle">
              {c.label}
            </RudiLink>
          ))}
        </RudiFooter.Column>
        <RudiFooter.Column title="Support">
          <RudiLink href="#" variant="subtle">
            Shipping &amp; returns
          </RudiLink>
          <RudiLink href="#" variant="subtle">
            Track your order
          </RudiLink>
          <RudiLink href="#" variant="subtle">
            Assembly guides
          </RudiLink>
          <RudiLink href="#" variant="subtle">
            Contact us
          </RudiLink>
        </RudiFooter.Column>
        <RudiFooter.Column title="Newsletter">
          <RudiText variant="caption" noMargin>
            Join for early access to new collections and 10% off your first order.
          </RudiText>
          <RudiCluster space="0.5rem" align="flex-end">
            <RudiInput label="Email address" type="email" placeholder="you@example.com" />
            <RudiButton variant="primary">Subscribe</RudiButton>
          </RudiCluster>
        </RudiFooter.Column>
      </RudiFooter.Columns>
      <RudiFooter.BottomBar>
        <RudiText variant="caption" noMargin>
          © 2026 Maison Furniture Co. All rights reserved.
        </RudiText>
        <RudiCluster space="1rem">
          <RudiLink href="#" variant="subtle">
            Privacy
          </RudiLink>
          <RudiLink href="#" variant="subtle">
            Terms
          </RudiLink>
        </RudiCluster>
      </RudiFooter.BottomBar>
    </RudiFooter>
  )
}

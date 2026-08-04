import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RudiOption } from '../../../components/Select/Option'

import { RudiBox } from '../../../layouts/Box/Box'
import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiSwitcher } from '../../../layouts/Switcher/Switcher'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiAlert } from '../../../components/Alert/Alert'
import { RudiBadge } from '../../../components/Badge/Badge'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiSelect } from '../../../components/Select/Select'
import {
  ProductCard,
  Stars,
  StoreFooter,
  StoreHeader,
  StoreImage,
  formatPrice,
  lifestyle,
  products,
  unsplash,
} from './shared'

const meta = {
  title: 'Examples/eCommerce/Product Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const product = products[0] // Marlowe Velvet Sofa

const gallery = [product.photo, lifestyle.greySofa, lifestyle.loft, lifestyle.brightRoom]

const colors = [
  { id: 'emerald', label: 'Emerald', swatch: '#2f5d50' },
  { id: 'navy', label: 'Deep Navy', swatch: '#2b3a55' },
  { id: 'clay', label: 'Clay', swatch: '#b5643f' },
  { id: 'oat', label: 'Oatmeal', swatch: '#d8cdb8' },
]

const configs = [
  { id: '2-seat', label: '2-seat (78")' },
  { id: '3-seat', label: '3-seat (90")' },
  { id: 'sectional', label: 'Sectional (112")' },
]

const specs = [
  ['Dimensions', '90"W × 38"D × 33"H'],
  ['Frame', 'Kiln-dried solid ash'],
  ['Upholstery', 'Performance velvet, 100k double rubs'],
  ['Fill', 'High-resilience foam + feather-wrap cushions'],
  ['Assembly', 'Legs attach in minutes, no tools'],
]

function ProductRender() {
  const [active, setActive] = useState(0)
  const [color, setColor] = useState('emerald')
  const [qty, setQty] = useState(1)

  return (
    <RudiStack space="0">
      <StoreHeader />
      <RudiCenter style={{ paddingBlock: '2rem' }}>
        <RudiStack space="3rem">
          {/* Breadcrumb */}
          <RudiCluster space="0.5rem" align="center">
            <RudiText variant="caption" as="a" href="#">
              Home
            </RudiText>
            <RudiIcon icon="lucide:chevron-right" size="sm" color="var(--rudi-color-text-subtle)" />
            <RudiText variant="caption" as="a" href="#">
              Sofas
            </RudiText>
            <RudiIcon icon="lucide:chevron-right" size="sm" color="var(--rudi-color-text-subtle)" />
            <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-default)' }}>
              {product.name}
            </RudiText>
          </RudiCluster>

          {/* Gallery + buy box */}
          <RudiSwitcher threshold="34rem" space="2.5rem">
            {/* Gallery */}
            <RudiStack space="0.75rem">
              <StoreImage photo={gallery[active]} alt={product.name} ratio="1 / 1" width={1000} />
              <RudiCluster space="0.75rem">
                {gallery.map((photo, i) => (
                  <button
                    key={photo}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === active}
                    style={{
                      padding: 0,
                      border: `2px solid ${i === active ? 'var(--rudi-color-brand-primary)' : 'transparent'}`,
                      borderRadius: 'var(--rudi-radius-md)',
                      background: 'none',
                      cursor: 'pointer',
                      lineHeight: 0,
                      inlineSize: '4.5rem',
                    }}
                  >
                    <img
                      src={unsplash(photo, 160)}
                      alt=""
                      loading="lazy"
                      style={{
                        inlineSize: '100%',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: 'var(--rudi-radius-sm)',
                        display: 'block',
                      }}
                    />
                  </button>
                ))}
              </RudiCluster>
            </RudiStack>

            {/* Buy box */}
            <RudiStack space="1.25rem">
              <RudiStack space="0.5rem">
                {product.badge && (
                  <div>
                    <RudiBadge variant={product.badge.variant}>{product.badge.label}</RudiBadge>
                  </div>
                )}
                <RudiHeading level={1} size={2} style={{ margin: 0 }}>
                  {product.name}
                </RudiHeading>
                <Stars rating={product.rating} reviews={product.reviews} />
              </RudiStack>

              <RudiCluster space="0.75rem" align="baseline">
                <RudiHeading level={2} size={3} style={{ margin: 0 }}>
                  {formatPrice(product.price)}
                </RudiHeading>
                {product.compareAt && (
                  <RudiText
                    style={{ textDecoration: 'line-through', color: 'var(--rudi-color-text-subtle)' }}
                  >
                    {formatPrice(product.compareAt)}
                  </RudiText>
                )}
                {product.compareAt && (
                  <RudiBadge variant="success">
                    Save {formatPrice(product.compareAt - product.price)}
                  </RudiBadge>
                )}
              </RudiCluster>

              <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>{product.blurb}</RudiText>

              {/* Colour */}
              <RudiStack space="0.5rem">
                <RudiText variant="overline">
                  Colour — {colors.find((c) => c.id === color)?.label}
                </RudiText>
                <RudiCluster space="0.5rem">
                  {colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.id)}
                      aria-label={c.label}
                      aria-pressed={c.id === color}
                      style={{
                        inlineSize: '2rem',
                        blockSize: '2rem',
                        borderRadius: 'var(--rudi-radius-full)',
                        backgroundColor: c.swatch,
                        cursor: 'pointer',
                        border: `2px solid ${c.id === color ? 'var(--rudi-color-brand-primary)' : 'var(--rudi-color-border-default)'}`,
                        outlineOffset: '2px',
                      }}
                    />
                  ))}
                </RudiCluster>
              </RudiStack>

              {/* Config */}
              <RudiSelect label="Configuration" items={configs} defaultSelectedKey="3-seat">
                {(item) => <RudiOption key={item.id}>{item.label}</RudiOption>}
              </RudiSelect>

              {/* Quantity + add */}
              <RudiCluster space="0.75rem" align="flex-end">
                <RudiStack space="0.5rem">
                  <RudiText variant="overline">Quantity</RudiText>
                  <RudiCluster
                    space="0"
                    align="center"
                    style={{
                      border: '1px solid var(--rudi-color-border-default)',
                      borderRadius: 'var(--rudi-radius-md)',
                    }}
                  >
                    <RudiIconButton
                      aria-label="Decrease quantity"
                      variant="ghost"
                      size="sm"
                      onPress={() => setQty((q) => Math.max(1, q - 1))}
                    >
                      <RudiIcon icon="lucide:minus" />
                    </RudiIconButton>
                    <RudiText style={{ minWidth: '2rem', textAlign: 'center' }}>{qty}</RudiText>
                    <RudiIconButton
                      aria-label="Increase quantity"
                      variant="ghost"
                      size="sm"
                      onPress={() => setQty((q) => q + 1)}
                    >
                      <RudiIcon icon="lucide:plus" />
                    </RudiIconButton>
                  </RudiCluster>
                </RudiStack>
                <div style={{ flex: 1, display: 'grid' }}>
                  <RudiButton variant="primary" size="lg">
                    <RudiIcon icon="lucide:shopping-bag" />
                    Add to cart · {formatPrice(product.price * qty)}
                  </RudiButton>
                </div>
                <RudiIconButton aria-label="Add to wishlist" variant="secondary" size="lg">
                  <RudiIcon icon="lucide:heart" />
                </RudiIconButton>
              </RudiCluster>

              <RudiAlert variant="success" title="Free delivery by Fri, Aug 1">
                Order within 6 hours. White-glove assembly available at checkout.
              </RudiAlert>

              {/* Specs */}
              <RudiBox bordered>
                <RudiStack space="0.75rem">
                  <RudiText variant="overline">Details</RudiText>
                  {specs.map(([k, v]) => (
                    <RudiCluster key={k} justify="space-between" space="1rem" align="baseline">
                      <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                        {k}
                      </RudiText>
                      <RudiText variant="body-sm" style={{ textAlign: 'right' }}>
                        {v}
                      </RudiText>
                    </RudiCluster>
                  ))}
                </RudiStack>
              </RudiBox>
            </RudiStack>
          </RudiSwitcher>

          {/* Complete the look */}
          <RudiStack space="1.5rem">
            <RudiHeading level={2} size={3}>
              Complete the look
            </RudiHeading>
            <RudiGrid minCellWidth="15rem" space="1.5rem">
              {products.slice(1, 5).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </RudiGrid>
          </RudiStack>
        </RudiStack>
      </RudiCenter>
      <StoreFooter />
    </RudiStack>
  )
}

export const ProductPage: Story = {
  name: 'Product Page',
  render: () => <ProductRender />,
}

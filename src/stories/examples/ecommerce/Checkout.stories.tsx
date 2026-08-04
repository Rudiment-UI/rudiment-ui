import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RudiOption } from '../../../components/Select/Option'

import { RudiBox } from '../../../layouts/Box/Box'
import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiSwitcher } from '../../../layouts/Switcher/Switcher'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiCheckbox } from '../../../components/Checkbox/Checkbox'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiInput } from '../../../components/Input/Input'
import { RudiSelect } from '../../../components/Select/Select'
import {
  StoreImage,
  StoreLogo,
  formatPrice,
  products,
  type Product,
} from './shared'

const meta = {
  title: 'Examples/eCommerce/Checkout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

interface CartLine {
  product: Product
  qty: number
  variant: string
}

const cart: CartLine[] = [
  { product: products[0], qty: 1, variant: 'Emerald · 3-seat' },
  { product: products[3], qty: 2, variant: 'Ivory' },
  { product: products[6], qty: 1, variant: 'Brushed steel' },
]

const countries = [
  { id: 'us', label: 'United States' },
  { id: 'ca', label: 'Canada' },
  { id: 'uk', label: 'United Kingdom' },
  { id: 'dk', label: 'Denmark' },
]

const delivery = [
  { id: 'standard', label: 'Standard', detail: '5–7 business days', price: 0 },
  { id: 'express', label: 'Express', detail: '2–3 business days', price: 25 },
  { id: 'white-glove', label: 'White-glove', detail: 'Scheduled delivery + assembly', price: 99 },
]

function SectionCard({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: React.ReactNode
}) {
  return (
    <RudiBox bordered>
      <RudiStack space="1.25rem">
        <RudiCluster space="0.625rem" align="center">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              inlineSize: '1.75rem',
              blockSize: '1.75rem',
              borderRadius: 'var(--rudi-radius-full)',
              backgroundColor: 'var(--rudi-color-brand-primary)',
              color: 'var(--rudi-color-text-on-brand)',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {step}
          </span>
          <RudiHeading level={2} size={4} style={{ margin: 0 }}>
            {title}
          </RudiHeading>
        </RudiCluster>
        {children}
      </RudiStack>
    </RudiBox>
  )
}

function DeliveryOptions() {
  const [selected, setSelected] = useState('express')
  return (
    <RudiStack space="0.75rem">
      {delivery.map((d) => {
        const isActive = d.id === selected
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => setSelected(d.id)}
            aria-pressed={isActive}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              inlineSize: '100%',
              textAlign: 'left',
              padding: '0.875rem 1rem',
              cursor: 'pointer',
              background: 'none',
              borderRadius: 'var(--rudi-radius-md)',
              border: `2px solid ${isActive ? 'var(--rudi-color-brand-primary)' : 'var(--rudi-color-border-default)'}`,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                inlineSize: '1.125rem',
                blockSize: '1.125rem',
                borderRadius: 'var(--rudi-radius-full)',
                border: `2px solid ${isActive ? 'var(--rudi-color-brand-primary)' : 'var(--rudi-color-border-default)'}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {isActive && (
                <span
                  style={{
                    inlineSize: '0.5rem',
                    blockSize: '0.5rem',
                    borderRadius: 'var(--rudi-radius-full)',
                    backgroundColor: 'var(--rudi-color-brand-primary)',
                  }}
                />
              )}
            </span>
            <RudiStack space="0.125rem" style={{ flex: 1 }}>
              <RudiText style={{ fontWeight: 600 }}>{d.label}</RudiText>
              <RudiText variant="caption">{d.detail}</RudiText>
            </RudiStack>
            <RudiText style={{ fontWeight: 600 }}>
              {d.price === 0 ? 'Free' : formatPrice(d.price)}
            </RudiText>
          </button>
        )
      })}
    </RudiStack>
  )
}

function OrderSummary() {
  const subtotal = cart.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const shipping = 25
  const tax = Math.round(subtotal * 0.0825)
  const total = subtotal + shipping + tax

  return (
    <RudiBox bordered style={{ position: 'sticky', insetBlockStart: '6rem' }}>
      <RudiStack space="1.25rem">
        <RudiHeading level={2} size={4} style={{ margin: 0 }}>
          Order summary
        </RudiHeading>

        <RudiStack space="1rem">
          {cart.map((line) => (
            <RudiCluster key={line.product.slug} space="0.875rem" align="center">
              <div style={{ position: 'relative', flexShrink: 0, inlineSize: '4rem' }}>
                <StoreImage photo={line.product.photo} alt={line.product.name} ratio="1 / 1" width={160} />
                <span
                  style={{
                    position: 'absolute',
                    insetBlockStart: '-0.5rem',
                    insetInlineEnd: '-0.5rem',
                    minWidth: '1.25rem',
                    blockSize: '1.25rem',
                    padding: '0 0.25rem',
                    borderRadius: 'var(--rudi-radius-full)',
                    backgroundColor: 'var(--rudi-color-background-inverted)',
                    color: 'var(--rudi-color-text-on-inverted)',
                    fontSize: '0.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {line.qty}
                </span>
              </div>
              <RudiStack space="0.125rem" style={{ flex: 1 }}>
                <RudiText variant="body-sm" style={{ fontWeight: 600 }}>
                  {line.product.name}
                </RudiText>
                <RudiText variant="caption">{line.variant}</RudiText>
              </RudiStack>
              <RudiText variant="body-sm" style={{ fontWeight: 600 }}>
                {formatPrice(line.product.price * line.qty)}
              </RudiText>
            </RudiCluster>
          ))}
        </RudiStack>

        <RudiCluster space="0.5rem" align="flex-end">
          <RudiInput label="Promo code" placeholder="MAISON10" />
          <RudiButton variant="secondary">Apply</RudiButton>
        </RudiCluster>

        <RudiStack
          space="0.625rem"
          style={{ borderBlockStart: '1px solid var(--rudi-color-border-default)', paddingBlockStart: '1rem' }}
        >
          <RudiCluster justify="space-between">
            <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
              Subtotal
            </RudiText>
            <RudiText variant="body-sm">{formatPrice(subtotal)}</RudiText>
          </RudiCluster>
          <RudiCluster justify="space-between">
            <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
              Shipping (Express)
            </RudiText>
            <RudiText variant="body-sm">{formatPrice(shipping)}</RudiText>
          </RudiCluster>
          <RudiCluster justify="space-between">
            <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
              Estimated tax
            </RudiText>
            <RudiText variant="body-sm">{formatPrice(tax)}</RudiText>
          </RudiCluster>
        </RudiStack>

        <RudiCluster
          justify="space-between"
          align="baseline"
          style={{ borderBlockStart: '1px solid var(--rudi-color-border-default)', paddingBlockStart: '1rem' }}
        >
          <RudiHeading level={3} size={5} style={{ margin: 0 }}>
            Total
          </RudiHeading>
          <RudiHeading level={3} size={4} style={{ margin: 0 }}>
            {formatPrice(total)}
          </RudiHeading>
        </RudiCluster>

        <RudiButton variant="primary" size="lg">
          <RudiIcon icon="lucide:lock" />
          Place order
        </RudiButton>
        <RudiCluster justify="center" space="0.375rem" align="center">
          <RudiIcon icon="lucide:shield-check" size="sm" color="var(--rudi-color-text-subtle)" />
          <RudiText variant="caption">Secure 256-bit SSL checkout</RudiText>
        </RudiCluster>
      </RudiStack>
    </RudiBox>
  )
}

export const Checkout: Story = {
  name: 'Checkout',
  render: () => (
    <RudiStack space="0">
      {/* Minimal checkout header */}
      <RudiBox
        as="header"
        style={{
          borderRadius: 0,
          borderInline: 'none',
          borderBlockStart: 'none',
          borderBlockEnd: '1px solid var(--rudi-color-border-default)',
        }}
      >
        <RudiCenter>
          <RudiCluster justify="space-between" align="center">
            <StoreLogo />
            <RudiCluster space="0.375rem" align="center">
              <RudiIcon icon="lucide:lock" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption">Secure checkout</RudiText>
            </RudiCluster>
          </RudiCluster>
        </RudiCenter>
      </RudiBox>

      <RudiCenter style={{ paddingBlock: '2rem' }}>
        <RudiStack space="1.5rem">
          <RudiHeading level={1} size={2}>
            Checkout
          </RudiHeading>

          <div
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(20rem, 24rem)',
              alignItems: 'start',
            }}
          >
            {/* Forms */}
            <RudiStack space="1.5rem">
              <SectionCard step={1} title="Contact">
                <RudiInput
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  isRequired
                  description="Order confirmation and delivery updates go here."
                />
                <RudiCheckbox defaultSelected>Email me with news and offers</RudiCheckbox>
              </SectionCard>

              <SectionCard step={2} title="Shipping address">
                <RudiSwitcher threshold="20rem" space="1rem">
                  <RudiInput label="First name" placeholder="Jane" isRequired />
                  <RudiInput label="Last name" placeholder="Doe" isRequired />
                </RudiSwitcher>
                <RudiInput label="Address" placeholder="123 Main St" isRequired />
                <RudiInput label="Apartment, suite, etc. (optional)" placeholder="Apt 4B" />
                <RudiSwitcher threshold="20rem" space="1rem">
                  <RudiInput label="City" placeholder="Brooklyn" isRequired />
                  <RudiInput label="ZIP code" placeholder="11201" isRequired />
                </RudiSwitcher>
                <RudiSelect label="Country" items={countries} defaultSelectedKey="us">
                  {(item) => <RudiOption key={item.id}>{item.label}</RudiOption>}
                </RudiSelect>
              </SectionCard>

              <SectionCard step={3} title="Delivery method">
                <DeliveryOptions />
              </SectionCard>

              <SectionCard step={4} title="Payment">
                <RudiInput label="Card number" placeholder="1234 5678 9012 3456" isRequired />
                <RudiInput label="Name on card" placeholder="Jane Doe" isRequired />
                <RudiSwitcher threshold="16rem" space="1rem">
                  <RudiInput label="Expiry" placeholder="MM / YY" isRequired />
                  <RudiInput label="CVC" placeholder="123" isRequired />
                </RudiSwitcher>
                <RudiCheckbox defaultSelected>Billing address same as shipping</RudiCheckbox>
              </SectionCard>
            </RudiStack>

            {/* Summary */}
            <OrderSummary />
          </div>
        </RudiStack>
      </RudiCenter>
    </RudiStack>
  ),
}

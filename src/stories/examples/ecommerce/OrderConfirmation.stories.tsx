import type { Meta, StoryObj } from '@storybook/react'

import { RudiBox } from '../../../layouts/Box/Box'
import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiSwitcher } from '../../../layouts/Switcher/Switcher'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiStepper } from '../../../components/Stepper/Stepper'
import type { RudiStepperStep } from '../../../components/Stepper/Stepper'
import {
  ProductCard,
  StoreFooter,
  StoreImage,
  StoreLogo,
  formatPrice,
  products,
  type Product,
} from './shared'

const meta = {
  title: 'Examples/eCommerce/Order Confirmation',
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

const steps = [
  { label: 'Confirmed', icon: 'lucide:check', done: true },
  { label: 'Processing', icon: 'lucide:package', done: true },
  { label: 'Shipped', icon: 'lucide:truck', done: false },
  { label: 'Delivered', icon: 'lucide:house', done: false },
]

function DeliveryTimeline() {
  // The last completed step is the "current" one; earlier ones are complete.
  const lastDone = steps.map((s) => s.done).lastIndexOf(true)
  const stepperSteps: RudiStepperStep[] = steps.map((s, i) => ({
    label: s.label,
    icon: s.icon,
    status: !s.done ? 'upcoming' : i === lastDone ? 'current' : 'complete',
  }))
  return <RudiStepper steps={stepperSteps} />
}

function OrderConfirmationRender() {
  const subtotal = cart.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const shipping = 25
  const tax = Math.round(subtotal * 0.0825)
  const total = subtotal + shipping + tax

  return (
    <RudiStack space="0">
      {/* Minimal header */}
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
            <RudiButton variant="ghost" size="sm">
              Continue shopping
            </RudiButton>
          </RudiCluster>
        </RudiCenter>
      </RudiBox>

      <RudiCenter maxWidth="52rem" style={{ paddingBlock: '3rem' }}>
        <RudiStack space="2.5rem">
          {/* Success hero */}
          <RudiStack space="1rem" style={{ textAlign: 'center', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                inlineSize: '4rem',
                blockSize: '4rem',
                borderRadius: 'var(--rudi-radius-full)',
                backgroundColor: 'var(--rudi-color-feedback-success-surface)',
                color: 'var(--rudi-color-feedback-success-text)',
              }}
            >
              <RudiIcon icon="lucide:check" size={32} color="var(--rudi-color-feedback-success-text)" />
            </span>
            <RudiStack space="0.375rem" style={{ alignItems: 'center' }}>
              <RudiText variant="overline">Order #MA-10428</RudiText>
              <RudiHeading level={1} size={2}>
                Thank you, Jane!
              </RudiHeading>
              <RudiText style={{ color: 'var(--rudi-color-text-subtle)', maxWidth: '32rem' }}>
                Your order is confirmed. We've sent a receipt to{' '}
                <strong>jane@example.com</strong> and will email you again when it ships.
              </RudiText>
            </RudiStack>
            <RudiCluster justify="center" space="0.75rem">
              <RudiButton variant="primary">
                <RudiIcon icon="lucide:map-pin" />
                Track your order
              </RudiButton>
              <RudiButton variant="secondary">Download receipt</RudiButton>
            </RudiCluster>
          </RudiStack>

          {/* Delivery status */}
          <RudiBox bordered>
            <RudiStack space="1.5rem">
              <RudiCluster justify="space-between" align="baseline">
                <RudiHeading level={2} size={4} style={{ margin: 0 }}>
                  Delivery status
                </RudiHeading>
                <RudiText variant="caption">
                  Estimated arrival <strong>Fri, Aug 1</strong>
                </RudiText>
              </RudiCluster>
              <DeliveryTimeline />
            </RudiStack>
          </RudiBox>

          {/* Details: items + info */}
          <RudiSwitcher threshold="34rem" space="1.5rem">
            {/* Items + totals */}
            <RudiBox bordered>
              <RudiStack space="1.25rem">
                <RudiHeading level={2} size={4} style={{ margin: 0 }}>
                  Order summary
                </RudiHeading>
                <RudiStack space="1rem">
                  {cart.map((line) => (
                    <RudiCluster key={line.product.slug} space="0.875rem" align="center">
                      <div style={{ flexShrink: 0, inlineSize: '3.5rem' }}>
                        <StoreImage photo={line.product.photo} alt={line.product.name} ratio="1 / 1" width={160} />
                      </div>
                      <RudiStack space="0.125rem" style={{ flex: 1 }}>
                        <RudiText variant="body-sm" style={{ fontWeight: 600 }}>
                          {line.product.name}
                        </RudiText>
                        <RudiText variant="caption">
                          {line.variant} · Qty {line.qty}
                        </RudiText>
                      </RudiStack>
                      <RudiText variant="body-sm" style={{ fontWeight: 600 }}>
                        {formatPrice(line.product.price * line.qty)}
                      </RudiText>
                    </RudiCluster>
                  ))}
                </RudiStack>
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
                      Shipping
                    </RudiText>
                    <RudiText variant="body-sm">{formatPrice(shipping)}</RudiText>
                  </RudiCluster>
                  <RudiCluster justify="space-between">
                    <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      Tax
                    </RudiText>
                    <RudiText variant="body-sm">{formatPrice(tax)}</RudiText>
                  </RudiCluster>
                  <RudiCluster
                    justify="space-between"
                    align="baseline"
                    style={{ borderBlockStart: '1px solid var(--rudi-color-border-default)', paddingBlockStart: '0.75rem' }}
                  >
                    <RudiText style={{ fontWeight: 600 }}>Total</RudiText>
                    <RudiHeading level={3} size={4} style={{ margin: 0 }}>
                      {formatPrice(total)}
                    </RudiHeading>
                  </RudiCluster>
                </RudiStack>
              </RudiStack>
            </RudiBox>

            {/* Shipping + payment info */}
            <RudiStack space="1.5rem">
              <RudiBox bordered>
                <RudiStack space="0.75rem">
                  <RudiCluster space="0.5rem" align="center">
                    <RudiIcon icon="lucide:map-pin" size="sm" />
                    <RudiText variant="overline">Shipping to</RudiText>
                  </RudiCluster>
                  <RudiStack space="0.125rem">
                    <RudiText variant="body-sm" style={{ fontWeight: 600 }}>
                      Jane Doe
                    </RudiText>
                    <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      123 Main St, Apt 4B
                    </RudiText>
                    <RudiText variant="body-sm" style={{ color: 'var(--rudi-color-text-subtle)' }}>
                      Brooklyn, NY 11201
                    </RudiText>
                  </RudiStack>
                </RudiStack>
              </RudiBox>
              <RudiBox bordered>
                <RudiStack space="0.75rem">
                  <RudiCluster space="0.5rem" align="center">
                    <RudiIcon icon="lucide:credit-card" size="sm" />
                    <RudiText variant="overline">Payment</RudiText>
                  </RudiCluster>
                  <RudiCluster space="0.5rem" align="center">
                    <RudiIcon icon="lucide:credit-card" />
                    <RudiText variant="body-sm">Visa ending in 4242</RudiText>
                  </RudiCluster>
                  <RudiText variant="caption">Express delivery · {formatPrice(shipping)}</RudiText>
                </RudiStack>
              </RudiBox>
            </RudiStack>
          </RudiSwitcher>

          {/* Recommendations */}
          <RudiStack space="1.5rem">
            <RudiHeading level={2} size={3}>
              You might also like
            </RudiHeading>
            <RudiGrid minCellWidth="14rem" space="1.5rem">
              {products.slice(4, 8).map((p) => (
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

export const OrderConfirmation: Story = {
  name: 'Order Confirmation',
  render: () => <OrderConfirmationRender />,
}

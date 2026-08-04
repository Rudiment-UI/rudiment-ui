import type { Meta, StoryObj } from '@storybook/react'

import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiCover } from '../../../layouts/Cover/Cover'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiIcon } from '../../../components/Icon/Icon'
import { ProductCard, StoreFooter, StoreHeader, products } from './shared'

const meta = {
  title: 'Examples/eCommerce/Empty Cart',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function EmptyCartRender() {
  return (
    <RudiStack space="0">
      <StoreHeader cartCount={0} />
      <RudiCenter style={{ paddingBlock: '2rem' }}>
        <RudiStack space="4rem">
          <RudiHeading level={1} size={2}>
            Your cart
          </RudiHeading>

          <RudiCover minHeight="42vh">
            <RudiCenter intrinsic style={{ flex: 1 }}>
              <RudiStack space="1.25rem" style={{ textAlign: 'center', maxWidth: '24rem' }}>
                <RudiCenter>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      inlineSize: '4.5rem',
                      blockSize: '4.5rem',
                      borderRadius: 'var(--rudi-radius-full)',
                      backgroundColor: 'var(--rudi-color-background-surface-sunken)',
                    }}
                  >
                    <RudiIcon icon="lucide:shopping-bag" size={32} color="var(--rudi-color-text-subtle)" />
                  </span>
                </RudiCenter>
                <RudiStack space="0.5rem">
                  <RudiHeading level={2} size={3}>
                    Your cart is empty
                  </RudiHeading>
                  <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>
                    Once you add something you love, it'll show up here. Let's find a piece
                    that fits your space.
                  </RudiText>
                </RudiStack>
                <RudiCluster justify="center" space="0.75rem">
                  <RudiButton variant="primary" size="lg">
                    Continue shopping
                  </RudiButton>
                  <RudiButton variant="secondary" size="lg">
                    Browse bestsellers
                  </RudiButton>
                </RudiCluster>
              </RudiStack>
            </RudiCenter>
          </RudiCover>

          {/* Recommendations */}
          <RudiStack space="1.5rem">
            <RudiCluster justify="space-between" align="flex-end">
              <RudiHeading level={2} size={3}>
                Popular right now
              </RudiHeading>
              <RudiButton variant="ghost">
                View all
                <RudiIcon icon="lucide:arrow-right" />
              </RudiButton>
            </RudiCluster>
            <RudiGrid minCellWidth="15rem" space="1.5rem">
              {products.slice(0, 4).map((p) => (
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

export const EmptyCart: Story = {
  name: 'Empty Cart',
  render: () => <EmptyCartRender />,
}

import type { Meta, StoryObj } from '@storybook/react'
import { RudiOption } from '../../../components/Select/Option'

import { RudiBox } from '../../../layouts/Box/Box'
import { RudiCenter } from '../../../layouts/Center/Center'
import { RudiCluster } from '../../../layouts/Cluster/Cluster'
import { RudiGrid } from '../../../layouts/Grid/Grid'
import { RudiSidebar } from '../../../layouts/Sidebar/Sidebar'
import { RudiStack } from '../../../layouts/Stack/Stack'
import { RudiHeading } from '../../../typography/Heading/Heading'
import { RudiText } from '../../../typography/Text/Text'
import { RudiButton } from '../../../components/Button/Button'
import { RudiCheckbox } from '../../../components/Checkbox/Checkbox'
import { RudiIcon } from '../../../components/Icon/Icon'
import { RudiIconButton } from '../../../components/IconButton/IconButton'
import { RudiSelect } from '../../../components/Select/Select'
import { RudiTag } from '../../../components/Tag/Tag'
import { ProductCard, StoreFooter, StoreHeader, categories, products } from './shared'

const meta = {
  title: 'Examples/eCommerce/Category Page',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'newest', label: 'Newest' },
]

const materials = ['Velvet', 'Leather', 'Bouclé', 'Linen', 'Oak', 'Steel']
const priceBands = ['Under $500', '$500 – $1,000', '$1,000 – $2,000', 'Over $2,000']

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <RudiStack space="0.625rem">
      <RudiText variant="overline">{title}</RudiText>
      <RudiStack space="0.5rem">{children}</RudiStack>
    </RudiStack>
  )
}

function FilterRail() {
  return (
    <RudiBox as="aside" bordered>
      <RudiStack space="1.5rem">
        <RudiCluster justify="space-between" align="center">
          <RudiHeading level={2} size={5} style={{ margin: 0 }}>
            Filters
          </RudiHeading>
          <RudiButton variant="ghost" size="sm">
            Clear
          </RudiButton>
        </RudiCluster>

        <FilterGroup title="Category">
          {categories.map((c, i) => (
            <RudiCheckbox key={c.label} defaultSelected={c.label === 'Sofas'}>
              {c.label}
              {i === 0 ? ' (3)' : ''}
            </RudiCheckbox>
          ))}
        </FilterGroup>

        <FilterGroup title="Price">
          {priceBands.map((band) => (
            <RudiCheckbox key={band}>{band}</RudiCheckbox>
          ))}
        </FilterGroup>

        <FilterGroup title="Material">
          {materials.map((m) => (
            <RudiCheckbox key={m}>{m}</RudiCheckbox>
          ))}
        </FilterGroup>

        <FilterGroup title="Availability">
          <RudiCheckbox defaultSelected>In stock</RudiCheckbox>
          <RudiCheckbox>Ships in 1 week</RudiCheckbox>
        </FilterGroup>
      </RudiStack>
    </RudiBox>
  )
}

function CategoryRender() {
  return (
    <RudiStack space="0">
      <StoreHeader />
      <RudiCenter style={{ paddingBlock: '2rem' }}>
        <RudiStack space="1.5rem">
          {/* Breadcrumb + title */}
          <RudiStack space="0.75rem">
            <RudiCluster space="0.5rem" align="center">
              <RudiText variant="caption" as="a" href="#">
                Home
              </RudiText>
              <RudiIcon icon="lucide:chevron-right" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption" as="a" href="#">
                Living
              </RudiText>
              <RudiIcon icon="lucide:chevron-right" size="sm" color="var(--rudi-color-text-subtle)" />
              <RudiText variant="caption" style={{ color: 'var(--rudi-color-text-default)' }}>
                Sofas
              </RudiText>
            </RudiCluster>
            <RudiStack space="0.25rem">
              <RudiHeading level={1} size={2}>
                Sofas &amp; Loveseats
              </RudiHeading>
              <RudiText style={{ color: 'var(--rudi-color-text-subtle)' }}>
                Frames built to last, in fabrics you'll actually want to touch.
              </RudiText>
            </RudiStack>
          </RudiStack>

          <RudiSidebar sideWidth="15rem" space="2rem">
            <FilterRail />
            <RudiBox as="main" style={{ border: 'none', padding: 0 }}>
              <RudiStack space="1.25rem">
                {/* Toolbar */}
                <RudiCluster justify="space-between" align="center">
                  <RudiText variant="caption">
                    Showing <strong>{products.length}</strong> products
                  </RudiText>
                  <div style={{ minWidth: '14rem' }}>
                    <RudiSelect label="Sort by" items={sortOptions} defaultSelectedKey="featured">
                      {(item) => <RudiOption key={item.id}>{item.label}</RudiOption>}
                    </RudiSelect>
                  </div>
                </RudiCluster>

                {/* Active filter chips */}
                <RudiCluster space="0.5rem" align="center">
                  <RudiTag variant="info" dismissible onDismiss={() => {}}>
                    Sofas
                  </RudiTag>
                  <RudiTag variant="info" dismissible onDismiss={() => {}}>
                    In stock
                  </RudiTag>
                </RudiCluster>

                {/* Product grid */}
                <RudiGrid minCellWidth="15rem" space="1.5rem">
                  {products.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </RudiGrid>

                {/* Pagination */}
                <RudiCluster justify="center" space="0.25rem" align="center" style={{ paddingBlockStart: '1rem' }}>
                  <RudiIconButton aria-label="Previous page" variant="ghost" isDisabled>
                    <RudiIcon icon="lucide:chevron-left" />
                  </RudiIconButton>
                  <RudiButton variant="primary" size="sm">
                    1
                  </RudiButton>
                  <RudiButton variant="ghost" size="sm">
                    2
                  </RudiButton>
                  <RudiButton variant="ghost" size="sm">
                    3
                  </RudiButton>
                  <RudiText variant="caption" style={{ paddingInline: '0.5rem' }}>
                    …
                  </RudiText>
                  <RudiButton variant="ghost" size="sm">
                    8
                  </RudiButton>
                  <RudiIconButton aria-label="Next page" variant="ghost">
                    <RudiIcon icon="lucide:chevron-right" />
                  </RudiIconButton>
                </RudiCluster>
              </RudiStack>
            </RudiBox>
          </RudiSidebar>
        </RudiStack>
      </RudiCenter>
      <StoreFooter />
    </RudiStack>
  )
}

export const CategoryPage: Story = {
  name: 'Category Page',
  render: () => <CategoryRender />,
}

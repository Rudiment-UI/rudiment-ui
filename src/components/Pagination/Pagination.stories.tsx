import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RudiPagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: RudiPagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Page navigation with previous/next controls and truncated page ranges for large sets.',
      },
    },
  },
  args: {
    page: 1,
    pageCount: 10,
    siblingCount: 1,
  },
  argTypes: {
    pageCount: { control: 'number', table: { category: 'Content' } },
    siblingCount: { control: 'number', table: { category: 'Behavior' } },
  },
} satisfies Meta<typeof RudiPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page)
    return <RudiPagination {...args} page={page} onPageChange={setPage} />
  },
}

export const ManyPages: Story = {
  args: { pageCount: 20, page: 10 },
  render: (args) => {
    const [page, setPage] = useState(args.page)
    return <RudiPagination {...args} page={page} onPageChange={setPage} />
  },
}

export const FewPages: Story = {
  args: { pageCount: 4 },
  render: (args) => {
    const [page, setPage] = useState(args.page)
    return <RudiPagination {...args} page={page} onPageChange={setPage} />
  },
}

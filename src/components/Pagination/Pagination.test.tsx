import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { RudiPagination } from './Pagination'

describe('Pagination', () => {
  it('renders a labeled navigation landmark', () => {
    render(<RudiPagination page={1} pageCount={5} onPageChange={vi.fn()} />)
    expect(
      screen.getByRole('navigation', { name: 'Pagination' }),
    ).toBeInTheDocument()
  })

  it('renders nothing for a single page', () => {
    const { container } = render(
      <RudiPagination page={1} pageCount={1} onPageChange={vi.fn()} />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('marks the current page', () => {
    render(<RudiPagination page={3} pageCount={5} onPageChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Go to page 3' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('truncates long ranges with ellipses but always shows first and last', () => {
    const { container } = render(
      <RudiPagination page={10} pageCount={20} onPageChange={vi.fn()} />,
    )
    expect(screen.getByRole('button', { name: 'Go to page 1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Go to page 20' })).toBeInTheDocument()
    expect(
      container.querySelectorAll('.rudi-pagination__ellipsis').length,
    ).toBeGreaterThan(0)
  })

  it('disables previous on the first page and calls back on next', async () => {
    const onPageChange = vi.fn()
    render(<RudiPagination page={1} pageCount={5} onPageChange={onPageChange} />)
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'Go to next page' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('changes page on click', async () => {
    const onPageChange = vi.fn()
    render(<RudiPagination page={1} pageCount={5} onPageChange={onPageChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiPagination
        page={1}
        pageCount={5}
        onPageChange={vi.fn()}
        className="my-pager"
      />,
    )
    expect(container.firstChild).toHaveClass('rudi-pagination', 'my-pager')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiPagination page={3} pageCount={20} onPageChange={vi.fn()} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

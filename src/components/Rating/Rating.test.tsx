import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, it, expect, vi } from 'vitest'
import { RudiRating } from './Rating'

describe('Rating', () => {
  it('renders as an image with an accessible label by default', () => {
    render(<RudiRating value={4.5} />)
    expect(
      screen.getByRole('img', { name: 'Rated 4.5 out of 5' }),
    ).toBeInTheDocument()
  })

  it('marks full, half, and empty stars from the value', () => {
    const { container } = render(<RudiRating value={3.5} max={5} />)
    expect(container.querySelectorAll('.rudi-rating__star--full')).toHaveLength(3)
    expect(container.querySelectorAll('.rudi-rating__star--half')).toHaveLength(1)
    expect(container.querySelectorAll('.rudi-rating__star--empty')).toHaveLength(1)
  })

  it('shows the numeric value and review count', () => {
    render(<RudiRating value={4.8} showValue count={128} />)
    expect(screen.getByText(/4\.8/)).toBeInTheDocument()
    expect(screen.getByText(/\(128\)/)).toBeInTheDocument()
  })

  it('renders a radiogroup and reports changes when interactive', async () => {
    const onChange = vi.fn()
    render(<RudiRating value={0} onChange={onChange} />)
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(5)
    await userEvent.click(radios[3])
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('applies the size class', () => {
    const { container } = render(<RudiRating value={3} size="lg" />)
    expect(container.firstChild).toHaveClass('rudi-rating--lg')
  })

  it('merges a custom className', () => {
    const { container } = render(<RudiRating value={3} className="my-rating" />)
    expect(container.firstChild).toHaveClass('rudi-rating', 'my-rating')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiRating value={4.5} count={20} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { CircularProgress } from './CircularProgress'

describe('CircularProgress', () => {
  it('renders with role="progressbar"', () => {
    render(<CircularProgress label="Loading..." value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has correct aria-valuenow', () => {
    render(<CircularProgress label="Loading..." value={42} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '42',
    )
  })

  it('has correct aria-valuemin and aria-valuemax', () => {
    render(
      <CircularProgress label="Loading..." value={50} minValue={10} maxValue={200} />,
    )
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemin', '10')
    expect(progressbar).toHaveAttribute('aria-valuemax', '200')
  })

  it('label is rendered and associated', () => {
    render(<CircularProgress label="Loading..." value={50} />)
    expect(
      screen.getByRole('progressbar', { name: 'Loading...' }),
    ).toBeInTheDocument()
  })

  it('showValueLabel renders percentage text', () => {
    render(<CircularProgress label="Loading..." value={60} showValueLabel />)
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('does not render value label when showValueLabel is false', () => {
    render(<CircularProgress label="Loading..." value={60} />)
    expect(screen.queryByText('60%')).not.toBeInTheDocument()
  })

  it('children override showValueLabel', () => {
    render(
      <CircularProgress label="Loading..." value={60} showValueLabel>
        <span>Custom</span>
      </CircularProgress>,
    )
    expect(screen.getByText('Custom')).toBeInTheDocument()
    expect(screen.queryByText('60%')).not.toBeInTheDocument()
  })

  it('applies size class', () => {
    const { container } = render(
      <CircularProgress label="Loading..." value={50} size="lg" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-circular-progress--lg')
  })

  it('applies variant class to fill element', () => {
    const { container } = render(
      <CircularProgress label="Loading..." value={50} variant="success" />,
    )
    const fill = container.querySelector('.rudiment-circular-progress__fill')
    expect(fill).toHaveClass('rudiment-circular-progress__fill--success')
  })

  it('renders SVG with correct circles', () => {
    const { container } = render(
      <CircularProgress label="Loading..." value={50} />,
    )
    const circles = container.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
  })

  it('custom minValue/maxValue calculates correct percentage', () => {
    render(
      <CircularProgress
        label="Items"
        value={250}
        minValue={0}
        maxValue={500}
        showValueLabel
      />,
    )
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    const { container } = render(
      <CircularProgress label="Loading..." value={50} className="my-progress" />,
    )
    expect(container.firstChild).toHaveClass('rudiment-circular-progress')
    expect(container.firstChild).toHaveClass('my-progress')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CircularProgress label="Loading..." value={50} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

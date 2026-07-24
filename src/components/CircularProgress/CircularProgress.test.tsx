import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiCircularProgress } from './CircularProgress'

describe('CircularProgress', () => {
  it('renders with role="progressbar"', () => {
    render(<RudiCircularProgress label="Loading..." value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has correct aria-valuenow', () => {
    render(<RudiCircularProgress label="Loading..." value={42} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '42',
    )
  })

  it('has correct aria-valuemin and aria-valuemax', () => {
    render(
      <RudiCircularProgress label="Loading..." value={50} minValue={10} maxValue={200} />,
    )
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemin', '10')
    expect(progressbar).toHaveAttribute('aria-valuemax', '200')
  })

  it('label is rendered and associated', () => {
    render(<RudiCircularProgress label="Loading..." value={50} />)
    expect(
      screen.getByRole('progressbar', { name: 'Loading...' }),
    ).toBeInTheDocument()
  })

  it('showValueLabel renders percentage text', () => {
    render(<RudiCircularProgress label="Loading..." value={60} showValueLabel />)
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('does not render value label when showValueLabel is false', () => {
    render(<RudiCircularProgress label="Loading..." value={60} />)
    expect(screen.queryByText('60%')).not.toBeInTheDocument()
  })

  it('children override showValueLabel', () => {
    render(
      <RudiCircularProgress label="Loading..." value={60} showValueLabel>
        <span>Custom</span>
      </RudiCircularProgress>,
    )
    expect(screen.getByText('Custom')).toBeInTheDocument()
    expect(screen.queryByText('60%')).not.toBeInTheDocument()
  })

  it('applies size class', () => {
    const { container } = render(
      <RudiCircularProgress label="Loading..." value={50} size="lg" />,
    )
    expect(container.firstChild).toHaveClass('rudi-circular-progress--lg')
  })

  it('applies variant class to fill element', () => {
    const { container } = render(
      <RudiCircularProgress label="Loading..." value={50} variant="success" />,
    )
    const fill = container.querySelector('.rudi-circular-progress__fill')
    expect(fill).toHaveClass('rudi-circular-progress__fill--success')
  })

  it('renders SVG with correct circles', () => {
    const { container } = render(
      <RudiCircularProgress label="Loading..." value={50} />,
    )
    const circles = container.querySelectorAll('circle')
    expect(circles).toHaveLength(2)
  })

  it('custom minValue/maxValue calculates correct percentage', () => {
    render(
      <RudiCircularProgress
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
      <RudiCircularProgress label="Loading..." value={50} className="my-progress" />,
    )
    expect(container.firstChild).toHaveClass('rudi-circular-progress')
    expect(container.firstChild).toHaveClass('my-progress')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiCircularProgress label="Loading..." value={50} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

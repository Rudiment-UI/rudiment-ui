import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders with role="progressbar"', () => {
    render(<RudiProgressBar label="Loading..." value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has correct aria-valuenow', () => {
    render(<RudiProgressBar label="Loading..." value={42} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '42',
    )
  })

  it('has correct aria-valuemin and aria-valuemax', () => {
    render(
      <RudiProgressBar label="Loading..." value={50} minValue={10} maxValue={200} />,
    )
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuemin', '10')
    expect(progressbar).toHaveAttribute('aria-valuemax', '200')
  })

  it('label is rendered and associated', () => {
    render(<RudiProgressBar label="Loading..." value={50} />)
    expect(
      screen.getByRole('progressbar', { name: 'Loading...' }),
    ).toBeInTheDocument()
  })

  it('showValueLabel renders percentage text', () => {
    render(<RudiProgressBar label="Loading..." value={60} showValueLabel />)
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('does not render value label when showValueLabel is false', () => {
    render(<RudiProgressBar label="Loading..." value={60} />)
    expect(screen.queryByText('60%')).not.toBeInTheDocument()
  })

  it('applies variant class to bar element', () => {
    const { container } = render(
      <RudiProgressBar label="Loading..." value={50} variant="success" />,
    )
    const bar = container.querySelector('.rudi-progress__bar')
    expect(bar).toHaveClass('rudi-progress__bar--success')
  })

  it('applies size class to track element', () => {
    const { container } = render(
      <RudiProgressBar label="Loading..." value={50} size="sm" />,
    )
    const track = container.querySelector('.rudi-progress__track')
    expect(track).toHaveClass('rudi-progress__track--sm')
  })

  it('value 0 renders 0% width', () => {
    const { container } = render(
      <RudiProgressBar label="Loading..." value={0} />,
    )
    const bar = container.querySelector('.rudi-progress__bar')
    expect(bar).toHaveStyle({ width: '0%' })
  })

  it('value 100 renders 100% width', () => {
    const { container } = render(
      <RudiProgressBar label="Loading..." value={100} />,
    )
    const bar = container.querySelector('.rudi-progress__bar')
    expect(bar).toHaveStyle({ width: '100%' })
  })

  it('custom minValue/maxValue calculates correct percentage', () => {
    render(
      <RudiProgressBar
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
      <RudiProgressBar label="Loading..." value={50} className="my-progress" />,
    )
    expect(container.firstChild).toHaveClass('rudi-progress')
    expect(container.firstChild).toHaveClass('my-progress')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiProgressBar label="Loading..." value={50} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

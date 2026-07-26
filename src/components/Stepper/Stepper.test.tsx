import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiStepper, type RudiStepperStep } from './Stepper'

const steps: RudiStepperStep[] = [
  { label: 'Ordered', icon: 'lucide:package', status: 'complete' },
  { label: 'Shipped', icon: 'lucide:truck', status: 'current' },
  { label: 'Delivered', icon: 'lucide:home', status: 'upcoming' },
]

describe('Stepper', () => {
  it('renders an ordered list of steps', () => {
    const { container } = render(<RudiStepper steps={steps} />)
    expect(container.firstChild).toHaveClass('rudi-stepper', 'rudi-stepper--horizontal')
    expect(container.querySelectorAll('.rudi-stepper__step')).toHaveLength(3)
    expect(screen.getByText('Ordered')).toBeInTheDocument()
  })

  it('marks the current step with aria-current', () => {
    render(<RudiStepper steps={steps} />)
    const current = screen.getByText('Shipped').closest('li')
    expect(current).toHaveAttribute('aria-current', 'step')
  })

  it('fills complete and current step nodes', () => {
    const { container } = render(<RudiStepper steps={steps} />)
    expect(container.querySelectorAll('.rudi-stepper__node--filled')).toHaveLength(2)
  })

  it('supports the vertical orientation', () => {
    const { container } = render(
      <RudiStepper steps={steps} orientation="vertical" />,
    )
    expect(container.firstChild).toHaveClass('rudi-stepper--vertical')
  })

  it('numbers steps without an icon', () => {
    const plain: RudiStepperStep[] = [
      { label: 'One', status: 'current' },
      { label: 'Two', status: 'upcoming' },
    ]
    render(<RudiStepper steps={plain} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiStepper steps={steps} className="my-stepper" />,
    )
    expect(container.firstChild).toHaveClass('rudi-stepper', 'my-stepper')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiStepper steps={steps} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})

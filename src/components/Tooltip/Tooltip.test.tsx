import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiTooltip, RudiTooltipTrigger } from './Tooltip'

describe('Tooltip', () => {
  it('renders the tooltip content', () => {
    render(<RudiTooltip>Helpful hint</RudiTooltip>)
    expect(screen.getByText('Helpful hint')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<RudiTooltip>Helpful hint</RudiTooltip>)
    expect(container.firstChild).toHaveClass('rudi-tooltip')
  })

  it('has the tooltip role', () => {
    render(<RudiTooltip>Helpful hint</RudiTooltip>)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <RudiTooltip className="my-tip">Helpful hint</RudiTooltip>,
    )
    expect(container.firstChild).toHaveClass('rudi-tooltip')
    expect(container.firstChild).toHaveClass('my-tip')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<RudiTooltip>Helpful hint</RudiTooltip>)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('TooltipTrigger', () => {
  it('renders the trigger element', () => {
    render(
      <RudiTooltipTrigger>
        <button>Hover me</button>
        <RudiTooltip>Helpful hint</RudiTooltip>
      </RudiTooltipTrigger>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('applies the trigger wrapper class', () => {
    const { container } = render(
      <RudiTooltipTrigger>
        <button>Hover me</button>
        <RudiTooltip>Helpful hint</RudiTooltip>
      </RudiTooltipTrigger>,
    )
    expect(container.firstChild).toHaveClass('rudi-tooltip-trigger')
  })

  it('does not render the tooltip when not hovered', () => {
    render(
      <RudiTooltipTrigger>
        <button>Hover me</button>
        <RudiTooltip>Helpful hint</RudiTooltip>
      </RudiTooltipTrigger>,
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiTooltipTrigger>
        <button>Hover me</button>
        <RudiTooltip>Helpful hint</RudiTooltip>
      </RudiTooltipTrigger>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

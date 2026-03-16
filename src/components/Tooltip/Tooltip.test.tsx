import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Tooltip, TooltipTrigger } from './Tooltip'

describe('Tooltip', () => {
  it('renders the tooltip content', () => {
    render(<Tooltip>Helpful hint</Tooltip>)
    expect(screen.getByText('Helpful hint')).toBeInTheDocument()
  })

  it('applies the base class', () => {
    const { container } = render(<Tooltip>Helpful hint</Tooltip>)
    expect(container.firstChild).toHaveClass('rudiment-tooltip')
  })

  it('has the tooltip role', () => {
    render(<Tooltip>Helpful hint</Tooltip>)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Tooltip className="my-tip">Helpful hint</Tooltip>,
    )
    expect(container.firstChild).toHaveClass('rudiment-tooltip')
    expect(container.firstChild).toHaveClass('my-tip')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Tooltip>Helpful hint</Tooltip>)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('TooltipTrigger', () => {
  it('renders the trigger element', () => {
    render(
      <TooltipTrigger>
        <button>Hover me</button>
        <Tooltip>Helpful hint</Tooltip>
      </TooltipTrigger>,
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('applies the trigger wrapper class', () => {
    const { container } = render(
      <TooltipTrigger>
        <button>Hover me</button>
        <Tooltip>Helpful hint</Tooltip>
      </TooltipTrigger>,
    )
    expect(container.firstChild).toHaveClass('rudiment-tooltip-trigger')
  })

  it('does not render the tooltip when not hovered', () => {
    render(
      <TooltipTrigger>
        <button>Hover me</button>
        <Tooltip>Helpful hint</Tooltip>
      </TooltipTrigger>,
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TooltipTrigger>
        <button>Hover me</button>
        <Tooltip>Helpful hint</Tooltip>
      </TooltipTrigger>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

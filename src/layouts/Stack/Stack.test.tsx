import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { Stack } from './Stack'

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <p>First</p>
        <p>Second</p>
      </Stack>,
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('applies the default class', () => {
    const { container } = render(
      <Stack>
        <p>Child</p>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('rudiment-stack')
  })

  it('merges a custom className', () => {
    const { container } = render(
      <Stack className="mt-4">
        <p>Child</p>
      </Stack>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('rudiment-stack')
    expect(el).toHaveClass('mt-4')
  })

  it('sets --stack-space when the space prop is passed', () => {
    const { container } = render(
      <Stack space="2rem">
        <p>Child</p>
      </Stack>,
    )
    expect(container.firstChild).toHaveStyle('--stack-space: 2rem')
  })

  it('does not set inline --stack-space when space prop is omitted', () => {
    const { container } = render(
      <Stack>
        <p>Child</p>
      </Stack>,
    )
    const style = (container.firstChild as HTMLElement).getAttribute('style')
    expect(style).toBeNull()
  })

  it('applies the recursive class when recursive is true', () => {
    const { container } = render(
      <Stack recursive>
        <p>Child</p>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('rudiment-stack--recursive')
  })

  it('does not apply the recursive class by default', () => {
    const { container } = render(
      <Stack>
        <p>Child</p>
      </Stack>,
    )
    expect(container.firstChild).not.toHaveClass('rudiment-stack--recursive')
  })

  it('applies the split class when splitAfter is passed', () => {
    const { container } = render(
      <Stack splitAfter={2}>
        <p>A</p>
        <p>B</p>
        <p>C</p>
      </Stack>,
    )
    expect(container.firstChild).toHaveClass('rudiment-stack--split')
  })

  it('applies margin-block-end: auto to the splitAfter child', () => {
    const { container } = render(
      <Stack splitAfter={2}>
        <p>A</p>
        <p>B</p>
        <p>C</p>
      </Stack>,
    )
    const secondChild = container.firstChild?.childNodes[1] as HTMLElement
    expect(secondChild.style.marginBlockEnd).toBe('auto')
  })

  it('renders the correct element via the as prop', () => {
    const { container } = render(
      <Stack as="section">
        <p>Child</p>
      </Stack>,
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('renders a div by default', () => {
    const { container } = render(
      <Stack>
        <p>Child</p>
      </Stack>,
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('forwards additional HTML attributes', () => {
    const { container } = render(
      <Stack data-testid="my-stack" id="stack-1">
        <p>Child</p>
      </Stack>,
    )
    const el = container.firstChild as HTMLElement
    expect(el).toHaveAttribute('data-testid', 'my-stack')
    expect(el).toHaveAttribute('id', 'stack-1')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Stack>
        <p>First</p>
        <p>Second</p>
      </Stack>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

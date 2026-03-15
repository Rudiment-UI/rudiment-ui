import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies the default class', () => {
    const { container } = render(<Button>Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button')
  })

  it('applies primary variant class by default', () => {
    const { container } = render(<Button>Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button--primary')
  })

  it('applies the specified variant class', () => {
    const { container } = render(<Button variant="secondary">Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button--secondary')
  })

  it('applies the md size class by default', () => {
    const { container } = render(<Button>Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button--md')
  })

  it('applies the specified size class', () => {
    const { container } = render(<Button size="lg">Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button--lg')
  })

  it('merges a custom className', () => {
    const { container } = render(<Button className="my-class">Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button')
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('applies the loading class when isLoading is true', () => {
    const { container } = render(<Button isLoading>Label</Button>)
    expect(container.firstChild).toHaveClass('rudiment-button--loading')
  })

  it('renders a spinner when isLoading is true', () => {
    const { container } = render(<Button isLoading>Label</Button>)
    expect(container.querySelector('.rudiment-button__spinner')).toBeInTheDocument()
  })

  it('does not apply the loading class by default', () => {
    const { container } = render(<Button>Label</Button>)
    expect(container.firstChild).not.toHaveClass('rudiment-button--loading')
  })

  it('renders a button element', () => {
    render(<Button>Label</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn()
    render(<Button onPress={onPress}>Click</Button>)
    screen.getByRole('button').click()
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('marks button as disabled when isDisabled is true', () => {
    render(<Button isDisabled>Label</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })
})

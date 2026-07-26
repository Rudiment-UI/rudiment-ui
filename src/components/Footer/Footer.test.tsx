import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, it, expect } from 'vitest'
import { RudiFooter } from './Footer'

describe('Footer', () => {
  it('renders a contentinfo landmark with the base class', () => {
    render(<RudiFooter>Content</RudiFooter>)
    expect(screen.getByRole('contentinfo')).toHaveClass('rudi-footer')
  })

  it('renders the Columns grid', () => {
    const { container } = render(
      <RudiFooter>
        <RudiFooter.Columns>
          <RudiFooter.Column>A</RudiFooter.Column>
        </RudiFooter.Columns>
      </RudiFooter>,
    )
    expect(container.querySelector('.rudi-footer__columns')).toBeInTheDocument()
  })

  it('renders a Column with an optional title', () => {
    const { container } = render(
      <RudiFooter>
        <RudiFooter.Columns>
          <RudiFooter.Column title="Company">
            <a href="/about">About</a>
          </RudiFooter.Column>
        </RudiFooter.Columns>
      </RudiFooter>,
    )
    expect(
      container.querySelector('.rudi-footer__column-title'),
    ).toHaveTextContent('Company')
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('omits the title element when no title is given', () => {
    const { container } = render(
      <RudiFooter>
        <RudiFooter.Columns>
          <RudiFooter.Column>Body</RudiFooter.Column>
        </RudiFooter.Columns>
      </RudiFooter>,
    )
    expect(container.querySelector('.rudi-footer__column-title')).toBeNull()
  })

  it('renders the BottomBar', () => {
    const { container } = render(
      <RudiFooter>
        <RudiFooter.BottomBar>© 2026 Acme</RudiFooter.BottomBar>
      </RudiFooter>,
    )
    expect(container.querySelector('.rudi-footer__bottom')).toHaveTextContent(
      '© 2026 Acme',
    )
  })

  it('applies a custom minColumnWidth as a CSS variable', () => {
    const { container } = render(
      <RudiFooter>
        <RudiFooter.Columns minColumnWidth="10rem">
          <RudiFooter.Column>A</RudiFooter.Column>
        </RudiFooter.Columns>
      </RudiFooter>,
    )
    const columns = container.querySelector(
      '.rudi-footer__columns',
    ) as HTMLElement
    expect(columns.style.getPropertyValue('--footer-columns-min')).toBe('10rem')
  })

  it('merges custom class names', () => {
    const { container } = render(
      <RudiFooter className="my-footer">
        <RudiFooter.Columns className="my-cols">
          <RudiFooter.Column className="my-col">A</RudiFooter.Column>
        </RudiFooter.Columns>
        <RudiFooter.BottomBar className="my-bottom">B</RudiFooter.BottomBar>
      </RudiFooter>,
    )
    expect(container.querySelector('.rudi-footer')).toHaveClass('my-footer')
    expect(container.querySelector('.rudi-footer__columns')).toHaveClass(
      'my-cols',
    )
    expect(container.querySelector('.rudi-footer__column')).toHaveClass('my-col')
    expect(container.querySelector('.rudi-footer__bottom')).toHaveClass(
      'my-bottom',
    )
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RudiFooter>
        <RudiFooter.Columns>
          <RudiFooter.Column title="Company">
            <a href="/about">About</a>
          </RudiFooter.Column>
          <RudiFooter.Column title="Support">
            <a href="/help">Help</a>
          </RudiFooter.Column>
        </RudiFooter.Columns>
        <RudiFooter.BottomBar>© 2026 Acme Inc</RudiFooter.BottomBar>
      </RudiFooter>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

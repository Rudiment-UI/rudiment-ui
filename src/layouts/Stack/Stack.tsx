import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import { cn } from '@/utils/cn'
import './stack.css'

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /** CSS spacing value. Defaults to --token-layout-stack-space-default token. */
  space?: string
  /** Apply spacing recursively to all nested elements, not just direct children. */
  recursive?: boolean
  /** 1-based index of the child after which to insert an auto margin, splitting the stack. */
  splitAfter?: number
  /** HTML element to render. */
  as?: React.ElementType
  children?: React.ReactNode
}

export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  {
    space,
    recursive = false,
    splitAfter,
    as: Element = 'div',
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const customProperties: Record<string, string> = {}
  if (space) customProperties['--stack-space'] = space

  // Apply margin-block-end: auto to the splitAfter child via React.
  // CSS :nth-child() does not accept custom properties, so this must
  // be handled in the component rather than in the stylesheet.
  // Children.toArray filters null/false values so conditional children
  // do not shift the numeric index.
  const childArray = Children.toArray(children)
  const styledChildren = splitAfter
    ? childArray.map((child, index) => {
        if (index === splitAfter - 1 && isValidElement(child)) {
          return cloneElement(
            child as React.ReactElement<{ style?: React.CSSProperties }>,
            {
              style: {
                ...(child.props as { style?: React.CSSProperties }).style,
                marginBlockEnd: 'auto',
              },
            },
          )
        }
        return child
      })
    : children

  return (
    <Element
      ref={ref}
      className={cn(
        'rudiment-stack',
        recursive && 'rudiment-stack--recursive',
        splitAfter && 'rudiment-stack--split',
        className,
      )}
      style={{ ...customProperties, ...style } as React.CSSProperties}
      {...props}
    >
      {styledChildren}
    </Element>
  )
})

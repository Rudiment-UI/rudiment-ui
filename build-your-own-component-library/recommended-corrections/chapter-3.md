# Token System & Tailwind Integration (Chapter 3)

Core strength. The pipeline (DTCG JSON → Style Dictionary → --token-\_ CSS vars → @theme inline mapping) is bulletproof and debuggable.

## Critical issue (High severity):

Typography tokens `(--font-size-_, --font-weight-_)` and global neutral colors are never mapped into `@theme`. Yet Button, Input, and later typography components reference them directly in CSS:

```css
font-size: var(--font-size-sm);
font-weight: var(--font-weight-medium);
background-color: var(--color-neutral-900); /* Box invert */
```

## Consequence:

These values resolve to unset or fall back incorrectly. Tailwind utilities like text-sm or custom classes break unless the developer manually adds the missing `@theme` entries.

## Fix (one-time):

Extend the `@theme inline` block in `src/app.css`:

```css
@theme inline {
  /* …existing colors… */
  --font-size-xs: var(--token-font-size-xs);
  --font-size-sm: var(--token-font-size-sm);
  /* …all sizes… */
  --font-weight-medium: var(--token-font-weight-medium);
  /* …etc… */
  --color-neutral-900: var(--token-color-neutral-900);
  /* Add the rest of the neutral scale if you want bg-neutral-900 etc. */
}
```

## Minor naming smell (Medium):

Semantic colors are mapped as `--color-bg-surface-raised`, producing classes `bg-bg-surface-raised`. This works but reads oddly.

Better: `--color-surface-raised` → `bg-surface-raised` (standard in most design systems).

Same for `border-border-default`. Harmless but reduces polish.
Layout tokens correctly bypass `@theme` and use `--token-layout-_` directly—correct and intentional.

See the [token summary](./tokens.md) for a recommend fix on tokens.

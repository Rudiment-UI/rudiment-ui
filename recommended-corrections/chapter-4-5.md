# Layout Primitives (Chapters 4–5)

## Minor improvements (Low):

- Add `forwardRef` to every primitive (consumers often need ref for focus management or measurements).
- Make `splitAfter` accept a string key instead of numeric index (more robust when children are conditional).
- Box `invert` variant should reference a semantic token `(--color-bg-surface-inverted or similar)` instead of hard-coded neutral.

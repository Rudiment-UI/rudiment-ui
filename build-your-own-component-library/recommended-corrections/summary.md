# Correction summary

| Area | Issue | Severity | Recommended Fix |
|------|-------|----------|-----------------|
| Token → Tailwind mapping | Missing font-size/weight + neutral colors | High | Extend `@theme inline` (one-time) |
| Color naming | `bg-bg-surface-raised` | Medium | Rename to `--color-surface-raised` |
| Component refs | No `forwardRef` in any primitive/UI | Low | Add `React.forwardRef` + `as` polymorphism |
| Duplication | Loading logic in Button + IconButton | Low | Shared hook |
| Box invert | Hard-coded neutral-900 | Low | Use semantic token |
| Typography CSS | Assumes `--font-size-*` vars exist | High (if not fixed) | Same mapping fix |

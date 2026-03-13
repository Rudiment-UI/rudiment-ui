# Correction summary

| Area                     | Issue                                     | Severity            | Recommended Fix                            |
| ------------------------ | ----------------------------------------- | ------------------- | ------------------------------------------ |
| Token → Tailwind mapping | Missing font-size/weight + neutral colors | High                | Extend `@theme inline` (one-time)          |
| Color naming             | `bg-bg-surface-raised`                    | Medium              | Rename to `--color-surface-raised`         |
| Component refs           | No `forwardRef` in any primitive/UI       | Low                 | Add `React.forwardRef` + `as` polymorphism |
| Duplication              | Loading logic in Button + IconButton      | Low                 | Shared hook                                |
| Box invert               | Hard-coded neutral-900                    | Low                 | Use semantic token                         |
| Typography CSS           | Assumes `--font-size-*` vars exist        | High (if not fixed) | Same mapping fix                           |

# Reommendation

Publish as-is with the token-mapping fix applied and you have a genuinely best-in-class starter kit. The architecture is sound, the code is clean, accessibility is first-class, and the teaching quality is exceptional.

The only things that would actually break a consumer project are the missing @theme font/neutral entries—everything else is polish. Once those are added, this guide (and Rudiment UI) will be one of the strongest “build your own” resources in the React ecosystem in 2026.

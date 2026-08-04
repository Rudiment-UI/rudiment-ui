# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Storybook on :6006 — the primary dev environment
npm run build:tokens     # Regenerate tokens/build/*.css from the token JSON (8 separate style-dictionary runs)
npm run build            # Vite library build → dist/ (run build:tokens first if tokens changed)
npm run build-storybook  # Static Storybook
npm run test             # Both vitest projects: unit + storybook
```

Single test / focused runs:

```bash
npx vitest run --project unit src/components/Button/Button.test.tsx
npx vitest run --project unit -t "sets aria-busy"
npx vitest run --project storybook          # Renders every story in headless Chromium with a11y checks
npx tsc --noEmit                            # Type check (no lint tooling is configured in this repo)
```

The `unit` project is jsdom + Testing Library + vitest-axe. The `storybook` project uses `@storybook/addon-vitest` with a real Playwright Chromium browser and needs browsers installed (`npx playwright install chromium`); it smoke-renders every `*.stories.tsx` and runs the a11y addon against it, which is why stories carry no `play` functions.

## Architecture

### Tokens are the styling layer

Three tiers of JSON compile to `--rudi-*` CSS custom properties via Style Dictionary:

1. `tokens/tokens.json` — primitives (raw hex, rem, ms values)
2. `tokens/semantic.json` — intent aliases referencing primitives (`color.brand.primary` → `{color.neutral.900}`)
3. `tokens/components.json` — per-component tokens referencing semantics (`component.button.primary-bg` → `{color.brand.primary}`)

Components read **only** tier 3/tier 2 custom properties. No hardcoded colors, spacing, or sizes in CSS or TSX.

`tokens/build/*.css` is **generated but committed** — after editing any token JSON, run `npm run build:tokens` and commit the regenerated CSS or the change won't ship.

### Themes are token-filtered overlays

Eight themes: default (`:root`, no attribute) plus `dark`, `roomy`, `roomy-dark`, `soft`, `soft-dark`, `compressed`, `compressed-dark`, each activated by `data-theme` on any ancestor element. Each theme has its own `tokens/style-dictionary.config.<theme>.mjs` whose `filter` decides which tokens get re-emitted under that selector; everything filtered out cascades from `:root`. Example: the `compressed` config emits only spacing/radius (colors and fonts inherit), while `dark` emits semantic + component colors but excludes theme-invariant primitives. Adding a theme means adding a config, a `tokens/themes/<name>/` directory, an `@import` in both `src/styles.css` and `src/app.css`, a `build:tokens` entry in package.json, and a toolbar item in `.storybook/preview.tsx`.

Because `:root` and `[data-theme=...]` have equal specificity and theme blocks come later in the stylesheet, a consumer's `:root` override loses inside a themed subtree — overrides must be repeated per theme.

### CSS delivery: BEM, not Tailwind

Each component imports its own stylesheet (`import './button.css'`) so the CSS reaches the bundle through the component graph. `src/index.ts` imports `src/styles.css`, which imports only the token files — **deliberately not Tailwind**, so the published package ships no preflight reset and no bare-element selectors that could clobber a consumer's styles. `src/app.css` (Tailwind + tokens) is loaded by Storybook only.

Class names are BEM: `rudi-button`, `rudi-button--primary`, `rudi-button__icon`. `className` is merged, never replaced, via `cn()` (`clsx` + `tailwind-merge`) from `src/utils/cn.ts`.

Note: `CONTRIBUTING.md` still says to style with Tailwind utilities — that is stale. The actual convention is BEM classes + token custom properties.

### Library build

`vite.config.ts` externalizes every bare specifier (only relative and `@/` imports stay bundled), so consumers resolve their own React Aria copy — duplicates break React Aria's context. Output is a single ES file with a `'use client'` banner so the package drops into a Next.js App Router Server Component without a re-export barrel. `vite-plugin-dts` emits types from `src`, excluding tests, stories, and `src/stories/**`.

## Component conventions

- **Every export is `Rudi`-prefixed**: `RudiButton`, `RudiButtonProps`, `RudiStack`. The README's usage examples and prop tables drop the prefix (`Button`, `Input`) — the real exported names in `src/index.ts` all carry it.
- Interactive components wrap React Aria hooks (`useButton`, `useRadio`, …) and take `onPress`, not `onClick`. `onChange` handlers receive a **value**, not an event.
- `label` is a required prop (not children) on `Input`, `Select`, `RadioGroup`, `CheckboxGroup`, `ProgressBar`, and the charts.
- Icons are Iconify name strings (`icon="mdi:close"`), never imported components.
- `React.forwardRef` + `useObjectRef` where a DOM ref is meaningful.
- Layout primitives (`src/layouts/`) and typography (`src/typography/`) are polymorphic (`as` prop) and spread DOM props; they pass tunable values down as CSS custom properties on `style` (e.g. `--box-padding`). Regular components have closed prop interfaces and do not spread.
- Compound components use `Object.assign` (`RudiCard.Header`, `RudiCard.Footer`).

### Adding a component

`src/components/Name/` containing `Name.tsx`, `name.css`, `Name.stories.tsx`, `Name.test.tsx`; then export the component **and** its Props type from `src/index.ts`. Multi-part components (Menu, Select, Kanban, Charts) put each part in its own file with one shared stylesheet and one combined test/story file.

Stories: `title: 'Components/Name'` (or `Layouts/` / `Typography/`), `tags: ['autodocs']`, a `parameters.docs.description.component` blurb, a description on every argType, and `table.category` of `Appearance` / `Content` / `Layout` / `State` / `Events` (that order is enforced in `.storybook/preview.tsx`). A preview decorator auto-syncs controlled args (`value`, `isSelected`, `selectedKey`) with `onChange`, so controlled props in `meta.args` stay interactive.

Tests: render, `axe` accessibility assertion, keyboard/pointer interaction, and state coverage (disabled/loading/error).

## Docs and examples

- `src/docs/*.mdx` — the "Getting Started" Storybook pages (Token Architecture, Theming, Accessibility, Component Guidelines, Layout Primitives, Typography). Component-level do/don't guidance lives in `ComponentGuidelines.mdx` and should be extended when a component is added.
- `src/stories/examples/{biotech,crm,ecommerce,project-management}/` — full example apps that exist to stress-test the library. Each has a `shared.tsx` of domain data and local helpers.
- `src/stories/examples/DEPARTURES.md` — a gap analysis cataloguing every place those examples had to reach outside the components (inline styles, raw HTML, missing primitives). Read it before designing new component APIs; it is the current backlog signal.

Update `CHANGELOG.md` (Keep a Changelog format) for user-facing changes.

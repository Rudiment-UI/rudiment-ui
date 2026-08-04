# Library Departures — Where Rudiment UI Broke Down in the Examples

The example apps under `src/stories/examples/` (biotech, ecommerce, crm, project-management)
exist to stress-test the library: to find the points where a developer had to reach **outside**
the components, **extend** them, or **work around** their APIs to build a real screen.

This document catalogs every such departure found across all four example domains. It is a
gap analysis, not a bug list — each entry is a signal about what the library is missing or
where an existing component's API falls short.

> **Method.** Each domain's `*.stories.tsx` and `shared.tsx` files were audited for: raw HTML
> used where a component should exist, raw HTML for patterns the library has no primitive for,
> inline `style={{}}` overrides, `className` overrides, hardcoded colors, custom components in
> `shared.tsx`, and external dependencies pulled in to make library components work.

---

## Headline findings

1. **Inline `style` is the only escape hatch anyone uses.** Across ~476 inline `style={{}}`
   attributes there are **zero `className` overrides** on Rudi components. The typography and
   layout primitives don't expose enough props, and the only way out that developers reached
   for was inline style — the components offer no ergonomic class-merge/variant hook.
2. **The typography primitives are the single biggest pain point.** `RudiText` has no `weight`,
   `color`/`tone`, or `align` prop; `RudiHeading` has no margin control, color, or display size.
   Every domain re-declares `medium`/`semibold` style objects and sprays `style={{ margin: 0 }}`
   on nearly every heading. This one gap accounts for the largest share of all inline styling.
3. **There is no data table.** All four domains hand-build tables — from raw `<table>` (pm) or
   CSS-grid `<div>` rows (crm, biotech, ecommerce). This is the most-requested missing component.
4. **There is no application chrome.** No header/navbar, footer, app-shell, sidebar-nav, top-bar,
   page-header, or section-header. Every domain re-implements these from scratch in `shared.tsx`
   (`BioHeader`/`BioFooter`, `StoreHeader`/`StoreFooter`, `CrmShell`, `PmShell`).
5. ~~**Composed components leak their internals.** `RudiSelect` requires importing `Item` from
   `react-stately`; `RudiMenu` requires `Separator`/`Text` from `react-aria-components` and
   exposes internal BEM class names (`rudi-menu__item-icon`, `rudi-menu__separator`) as de-facto
   public API.~~ ✅ Resolved — `RudiOption` + `RudiMenuSeparator` are re-exported and `RudiMenuItem`
   takes `icon` / `label` / `description` / `shortcut` props, so consumers no longer import a
   third-party primitive or type an internal BEM class.

---

## Priority matrix

Priority is driven by how many of the four domains hit the same wall.

| Gap | Type | Domains affected | Priority |
|---|---|---|---|
| `RudiText` missing `weight` / `color`(tone) / `align` | API gap | biotech, ecommerce, crm, pm (4/4) | **Critical** |
| `RudiHeading` missing `margin`/`noMargin`, `color`, display size | API gap | 4/4 | **Critical** |
| Data table / DataGrid | Missing component | 4/4 | **Critical** |
| App chrome: header/footer + app-shell/sidebar/top-bar | Missing component | 4/4 | **Critical** |
| No `className`/variant escape hatch on components | Systemic API gap | 4/4 | **High** |
| ~~`RudiSelect` requires external `react-stately` `Item`~~ ✅ `RudiOption` re-exported | Leaky API | 4/4 | ~~High~~ Done |
| Brand / logo lockup | Missing component | 4/4 | **High** |
| Page-header & section-header composites | Missing component | 4/4 | **High** |
| `RudiBox` missing radius / surface-bg / full-bleed props | API gap | crm, pm, biotech, ecommerce (4/4) | **High** |
| ~~Divider / Separator~~ ✅ `RudiDivider` | Missing component | biotech, pm, ecommerce (3/4) | ~~High~~ Done |
| ~~Status / category dot indicator~~ ✅ `RudiDot` | Missing component | crm, pm, biotech (3/4) | ~~Medium~~ Done |
| `RudiMenu` missing separator/label parts; leaks BEM classes | Leaky API | crm, pm (2/4) | **Medium** |
| ~~Image / media (aspect-ratio, object-fit, overlay)~~ ✅ `RudiImage` | Missing component | biotech, ecommerce (2/4) | ~~Medium~~ Done |
| `RudiGrid` children missing `colSpan` | API gap | crm, pm (2/4) | **Medium** |
| ~~`RudiProgressBar` missing per-value/threshold fill color~~ ✅ `thresholds` prop | API gap | pm, crm (2/4) | ~~Medium~~ Done |
| Link component (`RudiLink`) | Missing component | ecommerce, biotech (2/4) | **Medium** |
| ~~Chart data requires `as unknown as …` cast~~ ✅ (`string \| number \| null` values); legend still can't do reference series | API gap | crm, pm (2/4) | Partial |
| ~~Textarea / multiline input~~ ✅ `RudiTextarea` | Missing component | biotech (1/4) | ~~Medium~~ Done |
| ~~Stepper / timeline (discrete labeled steps)~~ ✅ `RudiStepper` | Missing component | ecommerce, biotech (2/4) | ~~Medium~~ Done |
| Search / command-palette trigger | Missing component | crm, pm (2/4) | **Medium** |
| `RudiCard` can't do media overlay / internal dividers / edge-bleed | API gap | ecommerce, biotech (2/4) | **Medium** |
| ~~Breadcrumbs, pagination, rating~~ ✅ `RudiBreadcrumb`/`RudiPagination`/`RudiRating`; gallery, swatch, quantity stepper remain | Missing components | ecommerce (1/4) | Partial |
| Gradient text, glass surface, glow/hero band | Missing (brand) | biotech (1/4) | **Low** |

---

## Part 1 — Missing components (no primitive exists)

### Cross-domain (multiple examples hit this)

#### Data table / DataGrid — **4/4 domains**
No tabular primitive exists, so every data grid is hand-built:
- pm — raw `<table><thead><tbody>` with module-level `cellHeader`/`cell` style objects:
  [Stories.stories.tsx:210-263](project-management/Stories.stories.tsx#L210-L263)
- crm — CSS-grid `<div>` rows with a shared `gridTemplateColumns` string + manual dividers:
  [Customers.stories.tsx:177-226](crm/Customers.stories.tsx#L177-L226),
  [FinanceDashboard.stories.tsx:167-200](crm/FinanceDashboard.stories.tsx#L167-L200),
  [SalesDashboard.stories.tsx:172-233](crm/SalesDashboard.stories.tsx#L172-L233)
- biotech — grid pipeline table, `gridTemplateColumns: '1.4fr 0.9fr 1.4fr 1fr 0.9fr'`:
  [Products.stories.tsx:199-246](biotech/Products.stories.tsx#L199-L246)
- ecommerce — spec/description rows faked with `RudiCluster justify="space-between"`:
  [ProductPage.stories.tsx:248-257](ecommerce/ProductPage.stories.tsx#L248-L257)

Implies `RudiTable` / `RudiDataGrid` with columns, header cells, alignment, row selection,
zebra/hover, and built-in horizontal scroll.

#### Application chrome: header, footer, app-shell, sidebar-nav, top-bar — **4/4 domains**
The entire page frame is re-implemented per domain from raw `<aside>`/`<header>`/`<main>`:
- biotech — `BioHeader` (sticky + announcement bar) and `BioFooter`:
  [shared.tsx:582-655](biotech/shared.tsx#L582-L655), [shared.tsx:657-754](biotech/shared.tsx#L657-L754)
- ecommerce — `StoreHeader` (sticky nav, cart badge) and `StoreFooter`:
  [shared.tsx:302-370](ecommerce/shared.tsx#L302-L370), [shared.tsx:372-457](ecommerce/shared.tsx#L372-L457)
- crm — `CrmShell` + `Sidebar` + `Topbar`, backed by a raw injected `<style>{SHELL_CSS}</style>`:
  [shared.tsx:646](crm/shared.tsx#L646), [shared.tsx:373-433](crm/shared.tsx#L373-L433)
- pm — `PmShell` + raw `<aside>` sidebar + sticky `<header>` top bar:
  [shared.tsx:452-515](project-management/shared.tsx#L452-L515), [shared.tsx:616-634](project-management/shared.tsx#L616-L634)

Note: the `RudiSidebar` layout primitive **exists but was bypassed** in both crm and pm — it's a
two-column content layout, not an app-shell nav rail. Signal that the app-shell need is unmet.

Implies `RudiAppShell`, `RudiHeader`/`RudiNavbar`, `RudiFooter`, nav-rail, and top-app-bar.

#### Brand / logo lockup — **4/4 domains**
Every domain builds an icon-tile + wordmark by hand: `HelexaLogo`
([biotech/shared.tsx:547-580](biotech/shared.tsx#L547-L580)), `StoreLogo`
([ecommerce/shared.tsx:172-181](ecommerce/shared.tsx#L172-L181)), `WorkspaceMark`
([crm/shared.tsx:435-458](crm/shared.tsx#L435-L458), [pm/shared.tsx:425-447](project-management/shared.tsx#L425-L447)).

#### Page-header & section-header composites — **4/4 domains**
Title + subtitle + right-aligned actions, and overline + heading + "see all" — re-authored everywhere:
`PageHeader`/`SectionHeading` in crm ([shared.tsx:587](crm/shared.tsx#L587), [shared.tsx:614](crm/shared.tsx#L614))
and pm ([shared.tsx:589](project-management/shared.tsx#L589)), `SectionHead` in biotech
([shared.tsx:452-502](biotech/shared.tsx#L452-L502)), `SectionHeading` local to pm Dashboard
([Dashboard.stories.tsx:60](project-management/Dashboard.stories.tsx#L60)).

#### Divider / Separator — ✅ `RudiDivider` shipped — **3/4 domains**
No primitive; rules are raw `<div style={{height:'1px'}}>` or per-element `borderBlockStart`:
[biotech/Investors.stories.tsx:126](biotech/Investors.stories.tsx#L126),
[biotech/About.stories.tsx:181](biotech/About.stories.tsx#L181),
and pervasive `borderBlockStart`/`borderBlockEnd` row dividers across pm and ecommerce.

#### Status / category dot indicator — ✅ `RudiDot` shipped (helpers now delegate) — **3/4 domains**
A colored `<span>` dot, re-built as `StatusDot` (crm [shared.tsx:320-334](crm/shared.tsx#L320-L334)),
`EpicDot` (pm [shared.tsx:340-353](project-management/shared.tsx#L340-L353)), and inline in biotech.

#### Image / media component — ✅ `RudiImage` shipped (`StoreImage` delegates) — **2/4 domains**
No responsive aspect-ratio frame; raw `<img>` needs manual `aspectRatio` + `objectFit:cover` +
`borderRadius` + loading backdrop each time. `StoreImage`
([ecommerce/shared.tsx:188-219](ecommerce/shared.tsx#L188-L219)) and `Duotone`
([biotech/shared.tsx:402-449](biotech/shared.tsx#L402-L449)). biotech even bypasses `RudiAvatar`
for a raw circular `<img>` testimonial photo ([TrustedBy.stories.tsx:150-161](biotech/TrustedBy.stories.tsx#L150-L161)).

#### Link component (`RudiLink`) — ✅ shipped (storefront links migrated) — **2/4 domains**
No link primitive; links are `RudiText as="a"` with hand-added `textDecoration:'none'`
([ecommerce/shared.tsx:354-362](ecommerce/shared.tsx#L354-L362)) or raw un-styled `<a>`
([biotech/Legal.stories.tsx:164](biotech/Legal.stories.tsx#L164), [ecommerce/Landing.stories.tsx:121](ecommerce/Landing.stories.tsx#L121)).

#### Search / command-palette trigger — **2/4 domains**
The "Search… ⌘K" control is a **fake input** — a `<div>` styled as a pill with an icon + caption +
`RudiKeyboard` — because it's a button that opens a palette, not a text field:
[crm/shared.tsx:539-554](crm/shared.tsx#L539-L554), [pm/shared.tsx:541-556](project-management/shared.tsx#L541-L556).

#### Stepper / timeline (discrete labeled steps) — ✅ `RudiStepper` shipped — **2/4 domains**
`RudiProgressBar`/`RudiCircularProgress` are continuous only. Discrete stages are hand-built:
ecommerce delivery timeline ([OrderConfirmation.stories.tsx:53-102](ecommerce/OrderConfirmation.stories.tsx#L53-L102)),
biotech clinical-`PhaseBar` ([shared.tsx:508-541](biotech/shared.tsx#L508-L541)).

### Ecommerce-specific (single-domain, but real gaps)
- ✅ **Breadcrumbs** — `RudiBreadcrumb` shipped. ~~hand-built from `RudiText as="a"` + chevron icon~~
- ✅ **Pagination** — `RudiPagination` shipped (truncated ranges, prev/next). ~~prev/next `RudiIconButton` + numbered `RudiButton`s + literal `…`~~
- ✅ **Star rating** — `RudiRating` shipped; `Stars` now delegates to it. ~~5 `RudiIcon` stars with half-star logic~~
- **Image gallery / thumbnail strip** — raw `<button>` + `<img>` thumbnails:
  [ProductPage.stories.tsx:97-129](ecommerce/ProductPage.stories.tsx#L97-L129)
- **Color swatch picker** — raw `<button>` circles, hardcoded swatch hexes:
  [ProductPage.stories.tsx:172-189](ecommerce/ProductPage.stories.tsx#L172-L189)
- **Quantity stepper / number input** — two `RudiIconButton`s + `RudiText` in a bordered cluster:
  [ProductPage.stories.tsx:202-227](ecommerce/ProductPage.stories.tsx#L202-L227)
- **Radio/selectable cards** — raw `<button aria-pressed>` with hand-drawn radio dot, because
  `RudiRadioGroup` can't render rich label/detail/price rows:
  [Checkout.stories.tsx:100-161](ecommerce/Checkout.stories.tsx#L100-L161)

### Biotech-specific (brand-styling gaps)
- ✅ **Textarea / multiline input** — `RudiTextarea` shipped; the contact form now uses it.
  ~~`RudiInput` is single-line only; a raw `<textarea>` was needed~~
- **Gradient text** — `GradientText` via `WebkitBackgroundClip:text`:
  [shared.tsx:78-99](biotech/shared.tsx#L78-L99)
- **Glass / frosted surface** — reusable `glass` style object spread onto elements; no surface
  variant on `RudiCard`/`RudiBox`: [shared.tsx:69-75](biotech/shared.tsx#L69-L75)
- **Hero / branded dark section band** — `GlowSection` (dark canvas + radial glow + dot grid):
  [shared.tsx:371-399](biotech/shared.tsx#L371-L399)
- **Icon tile / chip** (icon in a padded rounded background) — the same raw `<span>` re-implemented
  ~7 times across biotech pages.

---

## Part 2 — API gaps (component exists, but had to be styled around)

Every override below went through **inline `style`** — no `className` was used anywhere.

### `RudiText` — no `weight`, `color`/`tone`, or `align` prop — **4/4 domains**
The most pervasive gap. Each domain re-declares `medium`/`semibold` font-weight objects and applies
them via `style=` dozens of times; subtle color and right-alignment likewise go inline.
- weight: [crm/Customers.stories.tsx:32-33](crm/Customers.stories.tsx#L32-L33),
  [pm/Board.stories.tsx:30](project-management/Board.stories.tsx#L30),
  [ecommerce/shared.tsx:280](ecommerce/shared.tsx#L280), biotech ~15×
- color/tone: [crm/Employees.stories.tsx:130](crm/Employees.stories.tsx#L130),
  [pm/Board.stories.tsx:141](project-management/Board.stories.tsx#L141)
- align: [crm/FinanceDashboard.stories.tsx:75](crm/FinanceDashboard.stories.tsx#L75),
  [crm/SalesDashboard.stories.tsx:188](crm/SalesDashboard.stories.tsx#L188)

### `RudiHeading` — no margin reset, color, or display size — **4/4 domains**
`style={{ margin: 0 }}` appears on nearly every heading to kill default margin
([crm/shared.tsx:599](crm/shared.tsx#L599), [pm/Dashboard.stories.tsx:63](project-management/Dashboard.stories.tsx#L63),
[ecommerce/Checkout.stories.tsx:90](ecommerce/Checkout.stories.tsx#L90)); hero headings need inline
`color:'#fff'`, `fontSize: clamp(...)`, `lineHeight`, `letterSpacing`
([biotech/Landing.stories.tsx:62-66](biotech/Landing.stories.tsx#L62-L66),
[ecommerce/Landing.stories.tsx:82](ecommerce/Landing.stories.tsx#L82)).

### `RudiBox` — no radius / surface-bg / full-bleed props — **4/4 domains**
Used as a section surface, `Panel` must add `borderRadius` + `backgroundColor: var(--rudi-color-background-surface)`
inline ([pm/shared.tsx:646-649](project-management/shared.tsx#L646-L649),
[crm/shared.tsx:630](crm/shared.tsx#L630)). Used as header/footer chrome, Box must be *neutralized*
with `borderRadius:0` + `borderInline:'none'` to undo its own defaults
([ecommerce/shared.tsx:304-315](ecommerce/shared.tsx#L304-L315), [biotech/shared.tsx:584-598](biotech/shared.tsx#L584-L598)).

### ~~`RudiSelect` — leaks external `react-stately` `Item`~~ ✅ Resolved — **4/4 domains**
~~To render options you must `import { Item } from 'react-stately'` — the library doesn't provide a
native `RudiItem`/`RudiOption`.~~ Fixed: `RudiOption` re-exports `Item`
([src/components/Select/Option.ts](../../components/Select/Option.ts)); render props now return
`<RudiOption key={item.id}>{item.label}</RudiOption>` and no story imports `react-stately`.

### ~~`RudiMenu` — no separator/label parts; leaks internal BEM classes~~ ✅ Resolved — **crm, pm**
~~Composed with `Separator` and `Text as AriaText` imported directly from `react-aria-components`, and
`RudiIcon` given the internal class `className="rudi-menu__item-icon"` plus `className="rudi-menu__separator"`
on the raw separator. Internal class names have become de-facto public API.~~ Fixed:
`RudiMenuSeparator` ([src/components/Menu/MenuSeparator.tsx](../../components/Menu/MenuSeparator.tsx))
wraps the separator, and `RudiMenuItem` gained `icon` / `label` / `description` / `shortcut` props
([src/components/Menu/MenuItem.tsx](../../components/Menu/MenuItem.tsx)) that compose the icon, label
slot, and shortcut internally. Menus now read
`<RudiMenuItem id="sign-out" icon="lucide:log-out" label="Sign out" isDestructive />`.

### `RudiGrid` — children have no `colSpan` — **crm, pm**
Spanning two columns needs `style={{ gridColumn: 'span 2' }}`:
[crm/Dashboard.stories.tsx:89](crm/Dashboard.stories.tsx#L89),
[pm/Burndown.stories.tsx:119](project-management/Burndown.stories.tsx#L119).

### ~~`RudiProgressBar` — no per-value / threshold fill color~~ ✅ Resolved — **pm, crm**
~~Bypassed for a hand-rolled two-`<div>` meter to get threshold-based fill color.~~ Fixed:
`RudiProgressBar` takes a declarative `thresholds={[{ at, variant }]}` prop — the highest `at`
the current percentage meets wins. The pm workload meter now uses it
([pm/Dashboard.stories.tsx](project-management/Dashboard.stories.tsx)).

### Charts — ~~data must be force-cast~~ ✅; legend still inadequate — **crm, pm**
~~Typed data arrays require `as unknown as Array<Record<string, string | number>>` on every chart.~~
Fixed: `RudiLineChart`/`RudiBarChart` type `data` values as `string | number | null`, so the example
`const`-typed series (including `null` gaps in the burndown) assign directly — every cast was removed
([crm/Dashboard.stories.tsx:93](crm/Dashboard.stories.tsx#L93), pm). **Still open:** the burndown
needs `showLegend={false}` + a custom dashed-line `ChartLegend` because the built-in legend can't render
a reference series ([pm/Burndown.stories.tsx:32-50](project-management/Burndown.stories.tsx#L32-L50)).

### `RudiCard` — no media overlay / internal dividers / edge-bleed — **ecommerce, biotech**
Can't express a product tile's media + absolute badge/wishlist overlay
([ecommerce/shared.tsx:255-296](ecommerce/shared.tsx#L255-L296)); to bleed an image to the card edge
you set `padding="none"` then wrap the image in a `<div>` with `overflow:hidden` +
`borderStartStartRadius:'inherit'` ([biotech/Landing.stories.tsx:140-143](biotech/Landing.stories.tsx#L140-L143)).

### Smaller API gaps
- **`RudiButton` — no `fullWidth`/block prop.** Wrapped in `<div style={{flex:1,display:'grid'}}>` to stretch:
  [ecommerce/ProductPage.stories.tsx:229](ecommerce/ProductPage.stories.tsx#L229)
- **`RudiInput` / `RudiSelect` — no width/size prop.** Wrapped in `<div style={{minWidth:…}}>`:
  [ecommerce/CategoryPage.stories.tsx:134](ecommerce/CategoryPage.stories.tsx#L134),
  [biotech/shared.tsx:719](biotech/shared.tsx#L719)
- **`RudiBadge` — stretches in flex/stack context**, needs a bare `<div>` wrapper to stay inline-sized:
  [biotech/Landing.stories.tsx:59-61](biotech/Landing.stories.tsx#L59-L61)
- **`RudiNavItem` — no `href`/anchor support**, so real navigation isn't expressible:
  [pm/shared.tsx:477-483](project-management/shared.tsx#L477-L483)
- **`RudiCluster`/`RudiStack` — props don't cover** `flexWrap`, `rowGap`, `minWidth`/`maxWidth`,
  per-side padding, `borderBlockStart`, `textAlign`, forcing inline escapes throughout.

---

## Part 3 — Inline styling hotspots (systemic)

~476 inline `style={{}}` blocks total (biotech 220, ecommerce 115, pm 83, crm 58), grouped by cause:

| Cause | What it patches | Where it concentrates |
|---|---|---|
| Font-weight shims (`medium`/`semibold`) | `RudiText` has no `weight` prop | all four domains, dozens each |
| Heading margin resets (`margin: 0`) | `RudiHeading` has no margin control | all four, near-universal |
| Text color / tone / align | `RudiText` has no color/tone/align props | all four |
| Custom borders & dividers (`borderBlockStart/End`) | no Divider component | biotech, pm, ecommerce |
| Row/panel radius & surface bg | `RudiBox` lacks radius/surface props | crm, pm |
| Raw CSS grid tables | no data table | all four |
| Absolute/overlay positioning | no overlay/media components | ecommerce, biotech |
| Hand-drawn circular medallions/dots | no icon-circle/stepper/dot | ecommerce, crm, pm |
| Grid column spanning (`gridColumn: span 2`) | `RudiGrid` lacks `colSpan` | crm, pm |
| Glass/glow/gradient surfaces | no branded surface variants | biotech |
| `minInlineSize: 0` truncation guards | layout escape hatch | crm, pm |

### Hardcoded colors (token bypass)
- **crm & pm are token-clean** — essentially zero hardcoded colors; all `var(--rudi-*)`.
- **ecommerce** — only on-image text (`#fff`, `rgba(255,255,255,…)`), gradient scrims, and product
  swatch hexes lack semantic tokens.
- **biotech** — deliberately commits to a fixed brand palette (`INK`, `TEAL`, `INDIGO`, `VIOLET`,
  `BRAND_GRADIENT` at [shared.tsx:38-45](biotech/shared.tsx#L38-L45)) plus ~53 `rgba()` values,
  *because the library offers no branded hero/section/chrome primitive to carry that palette*.

---

## Part 4 — Custom components built in `shared.tsx`

Each row is a component the library forced the examples to author themselves.

| Component | Domain | Purpose | Library gap |
|---|---|---|---|
| `BioHeader` / `BioFooter` | biotech | Sticky dark header + full footer | No header/footer/navbar |
| `StoreHeader` / `StoreFooter` | ecommerce | Sticky nav + multi-column footer | No header/footer/navbar |
| `CrmShell` / `Sidebar` / `Topbar` | crm | Responsive app shell + nav rail + top bar (+ injected `SHELL_CSS`) | No app-shell |
| `PmShell` / `Sidebar` / `Topbar` | pm | Same app shell as crm | No app-shell |
| `HelexaLogo` / `StoreLogo` / `WorkspaceMark` | all | Brand icon-tile + wordmark | No logo/brand-mark |
| `SectionHead` / `PageHeader` / `SectionHeading` | all | Page & section title composites | No page/section header |
| `GlowSection` | biotech | Dark hero band w/ radial glow + dot grid | No hero/section band |
| `GradientText` | biotech | Gradient-clipped text | No gradient text |
| `Duotone` / ~~`StoreImage`~~ | biotech, ecommerce | Framed responsive image w/ object-fit | ✅ `StoreImage` now wraps `RudiImage` |
| ~~`Stars`~~ | ecommerce | Star rating w/ half-stars | ✅ delegates to `RudiRating` |
| `ProductCard` | ecommerce | Media + overlay + price + CTA tile | `RudiCard` can't do media overlay |
| ~~`DeliveryTimeline`~~ | ecommerce | Discrete step timeline | ✅ delegates to `RudiStepper` |
| `PhaseBar` | biotech | Segmented clinical-phase indicator | No segmented progress |
| ~~`StatusDot` / `EpicDot`~~ | crm, pm, biotech | Colored status dot | ✅ delegate to `RudiDot` |
| `Points` | pm | Fixed-width numeric counter pill | No counter/pill |
| `IssueKey` | pm | Monospace key chip | No code/key chip |
| `HealthBadge` / `PriorityBadge` / `TypeIcon` | crm, pm | Domain → Badge/Icon mappers | Convenience wrappers (minor) |
| `AvatarFor` / `AssigneeAvatar` | crm, pm | id → `RudiAvatar` lookup | Data-binding convenience |
| `Panel` | crm, pm | Outlined surface over `RudiBox` | `RudiBox` lacks radius/surface; `RudiCard` didn't fit |
| `ChartLegend` | pm | Solid/dashed line-swatch legend | Chart legend can't do reference series |
| `SettingRow` / `DetailRow` / `InfoLine` / `BacklogRow` | pm | List/detail/settings rows | No list-row / description-list |
| `FilterGroup` / `FilterRail` / `OrderSummary` | ecommerce | Filter panel + order summary | No filter/summary primitives |

---

## Part 5 — External dependencies leaked into example code — ✅ Resolved

The library depended on `react-aria-components` / `react-stately` but didn't re-export the parts
consumers needed, so example code imported them directly:

- ~~**`react-stately` `Item`** — required to populate every `RudiSelect` (all four domains).~~
  ✅ `RudiOption` re-exports `Item`; every `RudiSelect` render prop now returns `<RudiOption>`.
- ~~**`react-aria-components` `Separator` + `Text`** — required to compose `RudiMenu` items and
  separators (crm, pm).~~ ✅ `RudiMenuSeparator` wraps `Separator`, and `RudiMenuItem` now takes
  `icon` / `label` / `description` / `shortcut` props (composing the `Text` label/description slots
  internally).

No `src/stories` file imports a third-party primitive or hand-applies a `rudi-menu__*` class to
use a Rudi component anymore.

---

## Recommended remediation order

1. ~~**Add typography props** — `weight`, `color`/`tone`, `align`, `noMargin` on `RudiText`/`RudiHeading`.
   Cheapest fix, removes the largest share of inline styling immediately.~~ ✅ Done — `weight`,
   `tone`, `align`, `noMargin` added to both components (semantic-token-backed BEM modifier classes).
2. **Ship `RudiTable`** — every domain needs it.
3. ~~**Ship app-chrome primitives** — `RudiAppShell`, header/nav/top-bar, footer, page/section header.~~ ✅ Done — `RudiAppShell` (`.Sidebar`/`.Content`/`.Main`/`.MenuButton` with a responsive drawer), `RudiTopBar` (start/center/end + announcement), `RudiFooter` (`.Columns`/`.Column`/`.BottomBar`), `RudiPageHeader`, and `RudiSectionHeader` added (semantic-token-backed BEM). All four example domains migrated onto them — crm's injected `SHELL_CSS` and the per-domain `CrmShell`/`PmShell`/`BioHeader`/`StoreHeader`/`BioFooter`/`StoreFooter` chrome are gone.
4. ~~**Close the leaky composed APIs** — re-export `RudiOption` and `RudiMenuSeparator`/label slot;
   stop requiring `react-stately`/`react-aria-components` imports; stop exposing internal BEM classes.~~ ✅ Done — `RudiOption` (re-exported `Item`) and `RudiMenuSeparator` added, and `RudiMenuItem` gained first-class `icon` / `label` / `description` / `shortcut` props. Every example domain, the Select story, and the canonical Menu story were migrated: no `src/stories` file imports `react-stately`/`react-aria-components` or hand-applies a `rudi-menu__*` class anymore.
5. **Add surface/radius props to `RudiBox`** (or a `RudiSurface`/`RudiPanel`) and `colSpan` to `RudiGrid`.
6. ~~**Fill the mid-tier gaps** — Divider, Image, Link, status Dot, Rating, Stepper/Timeline, Textarea,
   Breadcrumb, Pagination, threshold color on `RudiProgressBar`, and remove the chart data cast.~~
   ✅ Done — nine new components shipped (`RudiDivider`, `RudiImage`, `RudiLink`, `RudiDot`,
   `RudiRating`, `RudiStepper` with a vertical timeline mode, `RudiTextarea`, `RudiBreadcrumb`,
   `RudiPagination`), each with semantic-token-backed BEM, tests, axe checks, and stories.
   `RudiProgressBar` gained a declarative `thresholds` prop (percentage-driven fill color), and
   `RudiLineChart`/`RudiBarChart` now type `data` values as `string | number | null`, so strongly-typed
   series (including `null` gaps) pass with **no cast**. Examples migrated: `StatusDot`/`EpicDot` →
   `RudiDot`, `Stars` → `RudiRating`, `StoreImage` → `RudiImage`, `DeliveryTimeline` → `RudiStepper`,
   the biotech contact `TextArea` → `RudiTextarea`, storefront nav/footer anchors → `RudiLink`, the pm
   workload meter → `RudiProgressBar thresholds`, and every `as unknown as …` chart cast removed.

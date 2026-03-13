# Editorial Review: Pass 2

**Scope:** chapter-7.md, chapter-8.md, chapter-9.md, chapter-10.md, chapter-11.md, chapter-12.md
**Reviewer:** Claude (automated editorial pass)
**Date:** 2026-03-12
**Baseline:** Pass 1 review of intro.md, chapter-1.md through chapter-6.md

---

## Inconsistencies

### 1. Component count changes between chapter-8 and chapter-12

**chapter-8.md** ("What you have now" section):
> You've now built all 14 UI components. Combined with the 8 layout primitives and 3 typography components from chapters 4, 5, and 5b, the library has 25 components total.

**chapter-12.md** (opening paragraph):
> You have a working component library: 25 components (14 UI, 8 layout, 3 typography), a token system, Storybook documentation, and tests.

The component totals are numerically consistent (14 + 8 + 3 = 25), but the category label used for interactive UI components shifts. Chapter 8 calls them "14 UI components" at the close. Chapter 12 confirms that same figure. However, the series table in intro.md describes chapter-8 as covering "Dialog, Tooltip, Alert, Badge" — four components — and chapter-8.md itself names six: "Dialog, Tooltip, Alert, Badge, Card, and Tabs." The 14 UI total includes Button, IconButton, Input (chapter 6), and Select, Checkbox, CheckboxGroup, RadioGroup, Switch (chapter 7), bringing the chapter-6 and chapter-7 contribution to 8. Adding the 6 components named in chapter-8 gives 14. But the intro.md series table's chapter-8 description ("Dialog, Tooltip, Alert, Badge") names only four, not six. Card and Tabs are present in the chapter-8.md text but absent from the intro.md series overview entry for that chapter. The table and the actual chapter content are in direct conflict on what chapter 8 covers.

---

### 2. Dark theme token names contradict the `@theme` mapping established in chapter-3

**chapter-3.md** (`@theme inline` block, "Wire tokens into Tailwind" section):
```css
--color-surface: var(--token-color-background-surface);
--color-surface-raised: var(--token-color-background-surface-raised);
```

Chapter 3 explicitly names these variables `--color-surface` and `--color-surface-raised`, and explains the rationale:
> "The background tokens use `surface` rather than `bg-surface` as the suffix. Tailwind generates the `bg-` utility prefix from the `--color-*` variable name itself, so `--color-bg-surface` would produce the class `bg-bg-surface`. Dropping the redundant prefix gives you `bg-surface`, `bg-surface-raised`, and `bg-overlay`."

**chapter-12.md** (Dark theme section):
```css
.dark {
  --color-text-default: var(--color-neutral-50);
  --color-text-subtle: var(--color-neutral-400);
  --color-background-surface: var(--color-neutral-900);
  --color-background-surface-raised: var(--color-neutral-800);
  --color-border-default: var(--color-neutral-700);
  --color-brand-primary: var(--color-blue-400);
}
```

The dark theme overrides use `--color-background-surface` and `--color-background-surface-raised`, not `--color-surface` and `--color-surface-raised`. Because the Tailwind `@theme` mapping established in chapter-3 maps `--color-surface` (not `--color-background-surface`), the dark mode overrides target variables that do not exist in the theme as defined. A reader applying this CSS block as written would get no dark mode theming for background colors. This is a functional error that directly contradicts the naming scheme chapter-3 specifically designed to avoid redundancy.

This finding also tracks the existing Pass 1 finding (finding 3: CSS variable naming inconsistency in Button CSS), which flagged the same `--color-background-surface` vs. `--color-surface` discrepancy in chapter-6. The problem recurs here in chapter-12 and is not acknowledged.

---

### 3. `OverlayContainer` used in chapter-8 but `usePopover` used for it in chapter-7

**chapter-7.md** (Select section):
> Select combines multiple React Aria hooks: `useSelect` for the trigger button, `useListBox` for the options list, `useOption` for each individual option, and `usePopover` for the floating panel that contains the list.

The code comment in the same section notes:
> `// Note: this example references Popover, ListBox, ChevronIcon, and DismissButton as helper components internal to the Select implementation.`

**chapter-8.md** (Dialog section) imports `OverlayContainer` from `react-aria` and uses it for portal rendering:
> "`OverlayContainer` from React Aria renders the dialog into a portal (appended to the document body), which prevents z-index stacking context issues."

Chapter-7's Select also uses a Popover that would require portal rendering for correct z-index behavior (the same reason Dialog uses `OverlayContainer`), but chapter-7 makes no mention of `OverlayContainer` or portal rendering for the popover. The code comment defers to the companion repository for the full Popover implementation, which conceals whether this inconsistency is addressed there. A reader implementing Select from the chapter-7 code would not know to use `OverlayContainer` or understand why the Dialog does and the Select's popover apparently does not.

---

### 4. Storybook version — chapter-9 installation command does not confirm version 10

**chapter-1.md** (Decisions summary table):
> Documentation: Storybook 10

**chapter-9.md** (Installation section):
```bash
npm create storybook@latest
```

The `@latest` tag installs whatever is currently latest, which may or may not be version 10 depending on when the reader follows the guide. Chapter-9 does not pin the version, reference "Storybook 10" by name, or acknowledge the version specified in chapter-1. Chapter-1's claim ("Storybook 10") is unverified and unsupported by the installation command. The Pass 1 review flagged this as unverifiable from chapter-1 alone (finding 6); the installation in chapter-9 does not resolve it.

---

### 5. `build:storybook` script name conflicts between chapter-9 and chapter-11

**chapter-9.md** (Deploying Storybook section):
```bash
npx storybook build -o storybook-static
```
> "Point the build command to `npx storybook build -o storybook-static`..."

No `package.json` script is defined for this in chapter-9.

**chapter-11.md** (`package.json` exports section):
```json
{
  "scripts": {
    "build:storybook": "storybook build -o storybook-static"
  }
}
```

Chapter-11 names the script `build:storybook` and uses `storybook build` (without `npx`). Chapter-9 uses `npx storybook build` and does not define a named script. These are not contradictory in a breaking sense — the `npx` prefix and the `storybook` binary are both valid — but the inconsistency in command form (with vs. without `npx`) between chapters that the reader will encounter in sequence is confusing. More importantly, the `build:storybook` script only appears in the chapter-11 `package.json`, meaning a reader following the guide chronologically would have no named script for building Storybook when chapter-9 instructs them to deploy it.

---

### 6. Testing install in chapter-10 conflicts with implied prior use in chapter-4

**chapter-4.md** (Writing the tests section):
> Create `src/layouts/Stack/Stack.test.tsx`

The chapter provides a full test file importing from `@testing-library/react` and `vitest`. These packages are not installed in chapter-4.

**chapter-10.md** (Install dependencies section):
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom vitest-axe
```

This is the first install command for testing dependencies in the guide. Chapter-4's tests are written against packages that, per the guide's own sequencing, are not installed until chapter-10. This was flagged in Pass 1 (finding 10), and chapter-10 does not acknowledge the prior usage in chapter-4 or explain that the test files from earlier chapters can now be executed. A note bridging the two ("The Stack tests you wrote in Chapter 4 can now run — execute `npm test` to confirm they pass") would resolve the continuity gap.

---

### 7. `vitest-axe` introduced in chapter-10 but not referenced in any prior chapter's test examples

**chapter-10.md** (Install dependencies section) installs `vitest-axe` and the setup file adds:
```typescript
import 'vitest-axe/extend-expect'
```

The chapter then uses `axe` from `vitest-axe` throughout the test examples:
```typescript
import { axe } from 'vitest-axe';
```

The chapter-4 test file (Stack tests) makes no use of axe-core assertions, which is appropriate because layout primitives are not interactive. However, chapter-10's coverage targets table says:
> "axe-core: Every component passes with zero violations"

No test file in chapter-4 or the companion code for chapters 5-8 (as shown inline) includes axe-core assertions. The coverage target for 100% axe-core coverage is stated in chapter-10 as a goal, but the guide's own component tests from earlier chapters don't model it. The Input and Button loading tests shown in chapter-10 do include axe assertions, but the chapter-4 Stack tests do not. This is a coverage inconsistency within the guide's own examples.

---

### 8. `CheckboxGroup` prop — `description` prop referenced in `descriptionProps` but not defined in the interface

**chapter-7.md** (CheckboxGroup code block):
```tsx
const { groupProps, labelProps, descriptionProps, errorMessageProps } =
  useCheckboxGroup(props, state)
```

The `useCheckboxGroup` hook returns `descriptionProps`, and the destructuring assigns it. However, the `CheckboxGroupProps` interface defined immediately above does not include a `description` prop:
```tsx
export interface CheckboxGroupProps {
  label: string
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  isDisabled?: boolean
  errorMessage?: string
  children: React.ReactNode
  className?: string
}
```

`descriptionProps` is destructured from the hook's return value but never spread onto any element in the rendered JSX (the JSX renders `groupProps`, `labelProps`, children, and `errorMessageProps` only). This means `descriptionProps` is assigned but discarded. The hook supports a `description` prop (consistent with the pattern established for Input in chapter-6), and the interface's omission is likely an oversight. The inconsistency is between the hook usage (which implies description support) and the interface (which doesn't expose it). A reader looking to add description text to a CheckboxGroup would find the pattern incomplete.

---

### 9. `RadioGroup` destructures `descriptionProps` and `errorMessageProps` but only uses `errorMessageProps`

**chapter-7.md** (RadioGroup code block):
```tsx
const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
  useRadioGroup(props, state)
```

Like CheckboxGroup, `descriptionProps` is destructured but not used in the JSX. The `RadioGroupProps` interface also lacks a `description` prop. The pattern is identical to finding 8 above. The guide establishes in chapter-6 (Input) that `descriptionProps` is spread onto a description element; its consistent omission in both chapter-7 group components suggests either an intentional simplification (unacknowledged) or a systematic oversight.

---

## Missing introductions

### 1. `useSelectState` — imported without introduction or install context

**chapter-7.md** (Select code block):
```tsx
import { useSelectState } from 'react-stately'
```

`react-stately` was installed in chapter-6 with this explanation:
> "`react-stately` provides the state management hooks that React Aria depends on (for example, tracking whether a select is open or which tab is selected)."

The example given for `react-stately` in chapter-6 ("tracking whether a select is open") maps directly to what chapter-7 uses it for. However, chapter-7 introduces `useSelectState`, `useToggleState`, `useCheckboxGroupState`, and `useRadioGroupState` without naming or explaining them individually. Each of these is a new hook from `react-stately`, and none has been used in chapter-6. The chapter provides no bridging text explaining what `useSelectState` does before the reader encounters it in code. Chapter-6 introduced the concept of `react-stately` state hooks generally; chapter-7 should briefly identify each new hook when it first appears.

---

### 2. `HiddenSelect` — imported and used without explanation of what it renders

**chapter-7.md** (Select code block):
```tsx
import {
  useSelect,
  useListBox,
  useOption,
  usePopover,
  HiddenSelect,
} from 'react-aria'
```

The prose following the code block explains:
> "The `HiddenSelect` component from React Aria renders a hidden native `<select>` element for form submission compatibility."

This explanation arrives after the code block where `HiddenSelect` is already used. That ordering (code then explanation) is consistent with the guide's established style. However, `HiddenSelect` is a React component (not a hook) imported from `react-aria`, which is the first time a React component from `react-aria` is imported directly rather than using the hook pattern. This distinction — component import vs. hook import — is not acknowledged. A reader used to the hook-only pattern from chapters 6 and 7 may not understand why `HiddenSelect` appears as a component in the JSX rather than as props spread from a hook return.

---

### 3. `useTooltipTriggerState` — new `react-stately` hook with no bridging explanation

**chapter-8.md** (Tooltip code block):
```tsx
import { useTooltipTriggerState } from 'react-stately'
```

As with the chapter-7 state hooks, this is a new `react-stately` hook that appears without any introduction. It is used immediately in the component without explanation of what state it manages. Chapter-8 provides no sentence explaining that tooltip open/close state requires a `react-stately` hook, which would parallel the explanation given for `useSelectState` (which itself wasn't introduced — see finding 1 above). The pattern compounds.

---

### 4. `useOverlayTriggerState` — imported but used only to construct an inline object

**chapter-8.md** (Dialog code block):
```tsx
import { useOverlayTriggerState } from 'react-stately'
import type { OverlayTriggerState } from 'react-stately'
```

The import brings in `useOverlayTriggerState`, but the Dialog component does not call `useOverlayTriggerState()`. Instead, it manually constructs an object that matches the `OverlayTriggerState` type:
```tsx
const state: OverlayTriggerState = {
  isOpen,
  close: onClose,
  open: () => {},
  toggle: () => {},
  setOpen: () => {},
}
```

The `useOverlayTriggerState` import is unused. This appears to be a leftover from an earlier version of the implementation that was subsequently changed to a manually constructed state object. The unused import will generate a TypeScript or linter warning and is potentially confusing to readers who may wonder why it was imported but not called.

---

### 5. `mergeProps` — used in Tooltip without introduction

**chapter-8.md** (Tooltip code block):
```tsx
import {
  useTooltipTrigger,
  useTooltip as useTooltipAria,
  mergeProps,
} from 'react-aria'
```

`mergeProps` is a React Aria utility that merges multiple props objects, combining event handlers rather than overwriting them. It is used here to merge `triggerProps` with the `ref` object when cloning the trigger element. This is the first use of `mergeProps` in the guide, and no explanation is provided for what it does or why it is necessary. The surrounding prose explains what the trigger and tooltip components do but does not mention `mergeProps` at all. A reader implementing a similar pattern for another component would not know `mergeProps` exists or when to use it.

---

### 6. `React.cloneElement` — used without introduction

**chapter-8.md** (TooltipTrigger code block):
```tsx
{React.cloneElement(
  trigger,
  mergeProps(triggerProps, { ref: triggerRef }),
)}
{state.isOpen && React.cloneElement(tooltip, triggerTooltipProps)}
```

`React.cloneElement` is a React API that clones an element and merges new props into it. It has not appeared in any previous chapter and is not explained here. The chapter's prose describes the outcome ("the trigger element gets the trigger props merged in") without naming the mechanism. A reader unfamiliar with `cloneElement` would not know what is happening in these JSX expressions. The guide's intro states that "React — You understand components, props, hooks, and the component lifecycle" is a prerequisite, but `cloneElement` is an advanced API that falls outside what most React developers use daily.

---

### 7. `usePress` — mentioned but not shown

**chapter-8.md** (Badge, Card, and Tabs section):
> "Card is a `<div>` (or `<article>` via `as`) with optional interactive behavior via `usePress`."

`usePress` is named as the hook used for Card's interactive behavior. It has not appeared in any previous chapter, and no code is shown for it in chapter-8. A reader building Card from this description would need to locate `usePress` independently. This is somewhat mitigated by the chapter's explicit deferral to the companion repository, but naming `usePress` without any explanation of what it does or how it differs from `useButton` leaves the reader with an unresolved reference. At minimum, a sentence explaining that `usePress` handles press events for non-button elements (as distinct from `useButton`, which requires an actual button element) would be useful.

---

### 8. `vite-plugin-dts` — installed without prior mention

**chapter-11.md** (Configure Vite library mode section):
```bash
npm install -D vite-plugin-dts
```

This is a new package not mentioned anywhere in the guide before this point. The install command appears without context for what `vite-plugin-dts` is before the command. The following sentence clarifies:
> "Vite's library mode produces a clean build output with ECMAScript module (ESM) exports and TypeScript declarations. Install the declaration generation plugin:"

The explanation comes before the code block in the running prose (the sentence beginning "Vite's library mode..."), but it describes what library mode produces rather than what `vite-plugin-dts` specifically does. The plugin's role — generating `.d.ts` declaration files during the Vite library build — is implied but not stated. The chapter mentions in the following section that `dist/index.d.ts` is one of the generated outputs, which indirectly confirms the plugin's purpose. A single sentence directly introducing the plugin before the install command would close this gap.

---

### 9. "Product 1" and "Product 2" — introduced without prior context

**chapter-11.md** (Publish your library section):
> "For the self-serve kit (Product 1), you're distributing the source code as a template repo, not publishing to npm."
> "If you do publish to npm (for Product 2 clients or your own use)..."

"Product 1" and "Product 2" are referenced as established terms, but neither has been defined anywhere in the guide. The intro.md, series overview, and all previous chapters make no mention of multiple products, a "self-serve kit," or a distinction between product types. A reader following the guide as a technical manual has no frame of reference for these terms. The guide is written as if the reader has previously been told about a product strategy (possibly in a business/marketing companion document), but no such prior context is provided within the guide itself. This is the only passage in chapters 7–12 that breaks the guide's technical-instruction register and introduces a business framing without setup.

---

### 10. Tokens Studio for Figma — named without introduction

**chapter-12.md** (Figma alignment section):
> "Tokens Studio for Figma can read your `tokens.json` file directly and sync it into Figma, eliminating manual duplication."

Tokens Studio for Figma is a Figma plugin that has not been mentioned anywhere in the guide. It is introduced here by name with a capability description but without a link, install guidance, or acknowledgment that it is a third-party plugin rather than a native Figma feature. For a chapter whose tone is explicitly forward-looking ("the next steps for scaling the system"), a brief identifier — what it is, where to find it — would serve the reader.

---

### 11. `useAccordion` — referenced as an existing React Aria hook

**chapter-12.md** (Expanding the component set section):
> "**Accordion:** Collapsible content sections. Uses `useAccordion`."

React Aria does not have a `useAccordion` hook as of the guide's stated date. React Aria's disclosure/accordion pattern is handled via `useDisclosure` or the `Disclosure` and `DisclosureGroup` components in the React Aria Components package. Referencing `useAccordion` as if it is an established React Aria hook is factually incorrect and would mislead a reader attempting to implement an Accordion using the guide's recommended approach.

---

### 12. `usePopoverTrigger` — referenced but the correct React Aria API is `useOverlayTrigger`

**chapter-12.md** (Expanding the component set section):
> "**Popover:** A floating panel triggered by a button. Uses `usePopoverTrigger`."

React Aria's hook for triggering an overlay is `useOverlayTrigger`, not `usePopoverTrigger`. The `usePopover` hook (used for the popover panel itself) was already referenced in chapter-7's Select implementation. `usePopoverTrigger` does not exist in React Aria. This is a second factually incorrect hook name in chapter-12's expansion recommendations.

---

## Style and voice consistency

### 1. "We" appears once in chapter-12

**chapter-12.md** (Expanding the component set section):
> "Buyer feedback and customer engagements show which components to add next."

This sentence uses the implied perspective of "we/the team" rather than second-person "you." The surrounding sentences maintain second-person:
> "The initial 14 UI components cover the essentials."
> "Add components based on demand, not speculation."

The sentence in question is not technically a "we" statement, but the framing shifts from addressing the reader ("you") to describing an abstracted third-party process ("buyer feedback and customer engagements show..."). Rephrasing to "Your buyer feedback and customer engagements will show..." or "As buyers use the library, their feedback shows..." would maintain the direct second-person address established throughout.

---

### 2. Passive voice enters chapter-12 in a pattern absent from earlier chapters

**chapter-12.md** (When a library becomes a design system section):
> "The transition is an organizational change, not a technical one. The code foundation you've built here supports it, but the code alone doesn't make it happen."

**chapter-12.md** (same section):
> "A component library is code. A design system is code plus governance..."

These sentences are direct and consistent with the guide's style. However, the following sentence from the same section introduces passive construction:
> "That transition is an organizational change, not a technical one."

This is not strictly passive, but the section shifts register more broadly. Compare the closing paragraph of chapter-9:
> "You now have a fully configured Storybook instance with accessibility audits, a dark mode toggle, organized sidebar navigation, and a kitchen sink demo page."

And chapter-11's closing:
> "Your library works in Storybook. Your tests pass. Now you need to package it so other projects can install and use it."

Chapter-12 does not follow the "What you have now" closing section pattern established in all previous chapters. It ends with a link and a promotional note:
> "If building this from scratch isn't the right investment for your team, [Rudiment UI](https://joshuabriley.com/services/starter/) is a pre-built version of this exact architecture, ready to customize and extend."

No previous chapter ends with a product link. Chapter-12 is the final chapter and an argument can be made for promotional closure, but the departure from the "What you have now" + forward bridge pattern is a structural inconsistency that will read as a tonal shift to anyone who has read the guide sequentially.

---

### 3. Chapter-8's "What you have now" section counts typography components as "from chapters 4, 5, and 5b"

**chapter-8.md** ("What you have now" section):
> "Combined with the 8 layout primitives and 3 typography components from chapters 4, 5, and 5b, the library has 25 components total."

This phrasing treats chapter 5b as a confirmed, completed chapter. However, chapter-5b has not appeared in this review and the Pass 1 review flagged the "5b anomaly" — chapter-5.md ends by calling it "the next section," suggesting ambiguity about whether 5b is a distinct chapter or an embedded section. Chapter-8's citation of "chapters 4, 5, and 5b" by name implies it exists as a separate chapter, which is a more definitive claim than anything in chapters 4 or 5 themselves made.

---

### 4. Chapter-9 introduces a table — the first since chapter-1

**chapter-9.md** (Story organization section):
| Section    | Title prefix                                     | Contents                                     |
| ---------- | ------------------------------------------------ | -------------------------------------------- |
| Layouts    | `Layouts/Stack`, `Layouts/Sidebar`, etc.         | One entry per layout primitive               |
| Components | `Components/Button`, `Components/Input`, etc.    | One entry per UI component                   |
| Examples   | `Examples/Dashboard`, `Examples/LoginPage`, etc. | Composed pages demonstrating the full system |

Pass 1's structural patterns note observed: "Tables: Only intro.md and chapter-1.md used tables." Chapter-9 resumes table use. This is not problematic on its own — tables are appropriate for presenting structured reference information — but it breaks the pattern of chapters 2–8 using only prose, bullet lists, and code blocks. Chapter-10 also reintroduces a table:

**chapter-10.md** (Coverage targets section):
| Category          | Target                                                      |
| ----------------- | ----------------------------------------------------------- |
| Layout primitives | 100% of props, class application, custom property injection |
| UI components     | Every keyboard path, every ARIA attribute, every state      |
| axe-core          | Every component passes with zero violations                 |
| Visual regression | Deferred to a future release                                |

Two tables appear in a span of two chapters after a six-chapter absence. The reintroduction is not disruptive, but it represents an unacknowledged structural shift.

---

### 5. Chapter-10 uses numbered lists — a form absent since chapter-3

**chapter-10.md** (Layout primitive tests section):
> Layout primitive tests confirm:
> 1. The component renders its children.
> 2. The component applies the correct CSS class.
> 3. The component merges a custom `className`.
> 4. Props set inline custom properties.
> 5. Omitted props don't set inline styles...
> 6. The `as` prop changes the rendered element.
> 7. Boolean props apply modifier classes.

Pass 1's structural patterns note: "Numbered lists used only in chapter-3.md ('Verify the pipeline' steps)." Chapter-10 resumes numbered lists for a checklist of test assertions. As with the tables, the reuse is contextually appropriate (checklists benefit from numbering) but represents a pattern departure from chapters 4–9.

---

### 6. Chapter-11's closing section omits the "What you have now" pattern

**chapter-11.md** ends with the semantic versioning section. The final sentence of the chapter is:
> "Write a `CHANGELOG.md` that describes each release in human-readable terms. Consuming teams use the changelog to decide whether to upgrade and what to test after upgrading."

There is no "What you have now" summary and no forward bridge to chapter-12. Every preceding chapter (chapters 2 through 10) ends with a "What you have now" summary followed by a sentence pointing to the next chapter. Chapter-11 breaks this pattern without replacement. The chapter's ending is abrupt: the reader finishes the versioning section and the chapter simply stops.

---

### 7. Chapter-7's opening structure is a close variant of chapter-6's, without the contrast-statement differentiation

**chapter-6.md** opens with a contrast statement:
> "Layout primitives handle spatial arrangement. UI components handle interaction."

**chapter-7.md** opens with a structural summary:
> "This chapter builds Select, Checkbox, CheckboxGroup, RadioGroup, and Switch. Each one follows the React Aria hook pattern from the previous chapter."

Pass 1 noted the variety of chapter openings as an acceptable feature of the guide. However, chapter-7's opening is the closest to a content-summary formula and reads more mechanically than the chapter-6 contrast opener or the chapter-4 claim opener. It also closely mirrors the chapter-8 opening:
> "This chapter builds Dialog, Tooltip, Alert, Badge, Card, and Tabs."

Chapters 7 and 8 share an identical opening formula: "This chapter builds [list of components]." While this formula is not wrong, two consecutive chapters using the same opening pattern is a structural echo that diminishes the variety noted in Pass 1.

---

## Cross-chapter continuity

### 1. The token naming inconsistency (Pass 1, finding 3) worsens in chapter-12

Pass 1 flagged that chapter-6's Button CSS uses `--color-background-surface` where chapter-3's `@theme` block defines `--color-surface`. Chapter-12's dark theme code block uses the same incorrect names (`--color-background-surface`, `--color-background-surface-raised`). The error has now appeared in three chapters (6, 12) and is embedded in both component CSS and theming code. If uncorrected, a reader who follows the guide from chapter-3 through chapter-12 will have seen the correct naming (chapter-3), then encountered the incorrect naming twice in implementation code, and then seen the incorrect naming in the theming code that is explicitly meant to override the correct names. The inconsistency is now load-bearing: the dark theme as written will not work with the `@theme` mapping as written.

---

### 2. `forwardRef` usage in chapter-8 introduces a new `useObjectRef` pattern not shown in chapter-7

**chapter-6.md** and **chapter-7.md** both use `useObjectRef` to normalize forwarded refs. Chapter-7's Checkbox and Switch follow the same pattern as chapter-6's Button and Input:
```tsx
const ref = useObjectRef(forwardedRef)
```

**chapter-8.md** (Dialog section) uses `useObjectRef` differently:
```tsx
const dialogRef = useObjectRef(ref)
```

The `ref` parameter here is the forwarded ref passed as the second argument to `forwardRef`. The resulting `dialogRef` is then passed to `useDialog`, while the `overlayRef` is a separate ref created with `useRef`. This is a more complex usage pattern than seen before — two refs in one component, with `useObjectRef` normalizing only one of them. The chapter explains the rationale:
> "`useDialog`'s ref point to the same element."

But it does not explicitly note that this is a deviation from the single-ref pattern used in chapters 6 and 7. A reader building on the established pattern could miss the significance of the two-ref approach.

---

### 3. Chapter-8's component count summary invokes chapter-5b without acknowledging the prior ambiguity

Pass 1 flagged the "5b anomaly" — chapter-5b is listed in the intro.md series table but chapter-5.md refers to it as "the next section" rather than "the next chapter." Chapter-8.md's closing summary cites "chapters 4, 5, and 5b" as peer chapters, implying 5b is a full chapter. This is a continuity violation: the guide's internal terminology for 5b has shifted from "section" (chapter-5.md) to "chapter" (chapter-8.md) without resolution.

---

### 4. Chapter-10 tests use `onClick` handler in Button test, contradicting the `onPress` teaching from chapter-6

**chapter-10.md** (Button loading state tests):
```typescript
it('does not call onClick while loading', async () => {
  const onClick = vi.fn();
  render(<Button isLoading onClick={onClick}>Save</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
})
```

Chapter-6 introduces `onPress` vs. `onClick` as a key distinction:
> "`useButton` normalizes press events. The hook provides `onPress` instead of `onClick`. The difference matters."

The chapter-6 Button interface extends `AriaButtonProps`, which provides `onPress` as the primary press handler. The test in chapter-10 passes `onClick` as a prop — a prop that `ButtonProps` inherits from `AriaButtonProps`, where it is technically available because `AriaButtonProps` accepts all HTML button attributes via an intersection type. But using `onClick` in the test directly contradicts the chapter-6 teaching that `onPress` is the correct handler to use. A test that demonstrates correct library usage should use `onPress`, not `onClick`. As written, the test implicitly validates `onClick` as a working prop when chapter-6 explicitly discourages it.

---

### 5. Chapter-9's decorator uses `bg-bg-surface` — the same redundant naming flagged in Pass 1

**chapter-9.md** (Configuration section, `preview.ts`):
```tsx
<div className="bg-bg-surface text-text-default p-8 min-h-screen">
```

Pass 1 (finding 8) flagged `bg-bg-surface-raised` in chapter-4's Placeholder component as using the redundant naming pattern that chapter-3 explicitly warns against. The Storybook decorator in chapter-9 uses `bg-bg-surface`, which has the same redundancy (`bg-` from Tailwind + `bg-` from the token name prefix). Chapter-3 states that the correct utility class is `bg-surface`, not `bg-bg-surface`. The error from chapter-4 recurs in chapter-9 without correction. A reader implementing dark mode support via the Storybook decorator would apply the wrong class name and the theme toggle would not function as described.

---

### 6. Chapter-9 references the dark mode toggle as functional before chapter-12 defines the dark theme

**chapter-9.md** (Configuration section):
> "The decorator reads the current theme selection and applies the `.dark` class to the wrapper. When you add dark theme token overrides (see Chapter 12), the toggle switches between them."

This forward reference to chapter-12 is correctly hedged ("when you add"). However, the Storybook deployment section in chapter-9 says:
> "Deploy Storybook publicly, and the kitchen sink page is what buyers see when they click 'View demo.'"

The kitchen sink is built and deployed after chapter-9, but the dark theme toggle will not function in the deployed Storybook until chapter-12 is implemented. A buyer viewing the deployed Storybook demo after chapter-9 but before chapter-12 would see a non-functional dark mode toggle. This is not a contradiction per se, but it represents an incomplete state that the chapter does not acknowledge — the deployment recommendation precedes the completion of a feature the deployment is meant to showcase.

---

*End of review pass 2.*

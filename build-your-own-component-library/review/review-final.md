# Editorial Review: Final

**Source passes:** review-pass-1.md (intro.md, chapters 1–6), review-pass-2.md (chapters 7–12)
**Reviewer:** Claude (automated editorial pass)
**Date:** 2026-03-12

> **Cross-half issues** — findings that only become visible by comparing the first half (intro–chapter 6) against the second half (chapters 7–12) — are marked **[cross-half]**.

---

## Inconsistencies

### 1. CSS variable naming: `--color-surface` vs `--color-background-surface` **[cross-half]**

**Severity: functional — the dark theme as written will not apply.**

**chapter-3.md** ("Wire tokens into Tailwind"):
> "The background tokens use `surface` rather than `bg-surface` as the suffix. Tailwind generates the `bg-` utility prefix from the `--color-*` variable name itself, so `--color-bg-surface` would produce the class `bg-bg-surface`. Dropping the redundant prefix gives you `bg-surface`, `bg-surface-raised`, and `bg-overlay`."

The `@theme inline` block in chapter-3 therefore defines:
```css
--color-surface: var(--token-color-background-surface);
--color-surface-raised: var(--token-color-background-surface-raised);
```

**chapter-6.md** (Button CSS):
```css
.rudiment-button--secondary {
  background-color: var(--color-background-surface);
}
.rudiment-button--secondary:hover:not([aria-disabled='true']) {
  background-color: var(--color-background-surface-raised);
}
```

**chapter-12.md** (Dark theme):
```css
.dark {
  --color-background-surface: var(--color-neutral-900);
  --color-background-surface-raised: var(--color-neutral-800);
}
```

The correct name established in chapter-3 is `--color-surface`. `--color-background-surface` does not exist in the `@theme` mapping as defined. A reader following the guide will encounter the correct naming in chapter-3, then the incorrect naming in chapter-6's implementation code, then the incorrect naming in chapter-12's theming block — which is the one that is explicitly meant to make dark mode work. The dark theme overrides target variables that are never defined, so dark mode background switching will silently fail.

---

### 2. `useAccordion` — hook does not exist in React Aria

**Severity: factually incorrect — a reader implementing an Accordion from this guidance will not find the hook.**

**chapter-12.md** (Expanding the component set):
> "**Accordion:** Collapsible content sections. Uses `useAccordion`."

React Aria does not expose a `useAccordion` hook. The correct pattern uses `useDisclosure` or the `Disclosure` and `DisclosureGroup` components from the React Aria Components package.

---

### 3. `usePopoverTrigger` — hook does not exist in React Aria

**Severity: factually incorrect — a reader following this guidance will not find the hook.**

**chapter-12.md** (Expanding the component set):
> "**Popover:** A floating panel triggered by a button. Uses `usePopoverTrigger`."

React Aria's hook for triggering an overlay is `useOverlayTrigger`, not `usePopoverTrigger`. `usePopover` (for the panel itself) was already used in chapter-7's Select implementation; the trigger hook name here is incorrect.

---

### 4. Box CSS references undefined color tokens

**Severity: functional — the invert variant will silently fall back to raw palette values.**

**chapter-5.md** (Box CSS):
```css
.rudiment-box--invert {
  background-color: var(--color-bg-surface-inverted, var(--color-neutral-900));
  color: var(--color-text-on-inverted, var(--color-neutral-0));
}
```

`--color-bg-surface-inverted` and `--color-text-on-inverted` do not appear in the `@theme` block defined in chapter-3 and are absent from `tokens/semantic.json`. The CSS falls back to `--color-neutral-900` and `--color-neutral-0`, but the primary token references are orphaned. No note tells the reader to add these tokens or that the fallback is intentional.

---

### 5. Chapter-8's component list conflicts with the intro.md series table

**Severity: structural — the guide's own navigation is internally contradictory.**

**intro.md** (Series overview table):
> "Chapter 8: Dialog, Tooltip, Alert, Badge"

**chapter-8.md** (chapter body and "What you have now" section):
> "This chapter builds Dialog, Tooltip, Alert, Badge, Card, and Tabs."
> "You've now built all 14 UI components."

Card and Tabs are built in chapter-8 but not listed in the intro.md series overview entry for that chapter. The 14-component total relies on Card and Tabs being present, but a reader consulting the series table to plan their reading would not know they appear here.

---

### 6. Chapter 5b: "section" in chapter-5, "chapter" in chapter-8 **[cross-half]**

**Severity: structural — the guide's internal terminology for the same content unit is inconsistent.**

**chapter-5.md** (final paragraph):
> "Before moving to interactive components, the next section adds the typography layer: Heading, Text, and Prose components that handle your UI's text content."

**chapter-8.md** ("What you have now"):
> "Combined with the 8 layout primitives and 3 typography components from chapters 4, 5, and 5b, the library has 25 components total."

Chapter-5.md calls 5b "the next section." Chapter-8.md cites "chapters 4, 5, and 5b" as peer chapters. The unit has shifted from section to chapter between the two halves without acknowledgment. The intro.md series table lists it as "Chapter 5b," but chapter-5.md's own forward reference contradicts that listing.

---

### 7. `useOverlayTriggerState` — imported but unused in chapter-8

**Severity: functional — will generate a TypeScript or linter warning.**

**chapter-8.md** (Dialog section):
```tsx
import { useOverlayTriggerState } from 'react-stately'
import type { OverlayTriggerState } from 'react-stately'
```

The Dialog component does not call `useOverlayTriggerState()`. Instead, it manually constructs an object matching the `OverlayTriggerState` type:
```tsx
const state: OverlayTriggerState = {
  isOpen,
  close: onClose,
  open: () => {},
  toggle: () => {},
  setOpen: () => {},
}
```

The `useOverlayTriggerState` import is unused and appears to be a leftover from an earlier implementation. A reader may wonder why it was imported and not called.

---

### 8. `descriptionProps` destructured but not exposed in CheckboxGroup and RadioGroup

**Severity: functional — a reader following the established Input pattern will not be able to add description text.**

**chapter-7.md** (CheckboxGroup):
```tsx
const { groupProps, labelProps, descriptionProps, errorMessageProps } =
  useCheckboxGroup(props, state)
```

`descriptionProps` is destructured from `useCheckboxGroup`'s return value but is never spread onto any element in the JSX, and the `CheckboxGroupProps` interface does not include a `description` prop:
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

**chapter-7.md** (RadioGroup) repeats the identical pattern: `descriptionProps` is destructured from `useRadioGroup` but discarded, and the `RadioGroupProps` interface omits `description`. Chapter-6's Input establishes that `descriptionProps` should be spread onto a visible description element. The consistent omission across two components in chapter-7 suggests either an intentional simplification (unacknowledged) or a systematic oversight.

---

### 9. Testing packages used in chapter-4 but not installed until chapter-10 **[cross-half]**

**Severity: functional — the chapter-4 tests will not run at the point they are introduced.**

**chapter-4.md** (Writing the tests section):
> "Create `src/layouts/Stack/Stack.test.tsx`"

The test file imports from `@testing-library/react` and `vitest`.

**chapter-10.md** (Install dependencies):
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom vitest-axe
```

This is the first install command for testing dependencies in the guide. Chapter-4's tests are non-executable until chapter-10. Chapter-10 does not acknowledge the prior usage in chapter-4 or offer a note bridging the two — for example, that the Stack tests written in chapter-4 can now be run.

---

### 10. Chapter-10 test uses `onClick`, contradicting the `onPress` teaching from chapter-6 **[cross-half]**

**Severity: instructional — the test implicitly validates the handler the guide explicitly discourages.**

**chapter-6.md** (Building Button):
> "`useButton` normalizes press events. The hook provides `onPress` instead of `onClick`. The difference matters."

**chapter-10.md** (Button loading state tests):
```typescript
it('does not call onClick while loading', async () => {
  const onClick = vi.fn();
  render(<Button isLoading onClick={onClick}>Save</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(onClick).not.toHaveBeenCalled();
})
```

The test passes `onClick` as a prop. While `AriaButtonProps` technically accepts it via the HTML button attribute intersection, using `onClick` in a test that is meant to demonstrate correct library usage directly contradicts the chapter-6 teaching. The prop to use in tests should be `onPress`.

---

### 11. Storybook version claim is unverifiable and unsupported by the install command **[cross-half]**

**Severity: structural — the install command cannot guarantee the version the guide specifies.**

**chapter-1.md** (Decisions summary table):
> "Documentation: Storybook 10"

**chapter-9.md** (Installation):
```bash
npm create storybook@latest
```

`@latest` installs whatever is current at the time the reader follows the guide. Chapter-9 does not pin the version, reference "Storybook 10" by name, or acknowledge the version specified in chapter-1. If Storybook's current latest is not version 10, the installation instructions conflict with the decision stated six chapters earlier.

---

### 12. `build:storybook` script only defined in chapter-11, but chapter-9 tells the reader to deploy Storybook **[cross-half]**

**Severity: functional — a reader following the guide sequentially has no named script when chapter-9 instructs deployment.**

**chapter-9.md** (Deploying Storybook):
```bash
npx storybook build -o storybook-static
```

No `package.json` script is defined for this command in chapter-9.

**chapter-11.md** (`package.json` exports):
```json
{
  "scripts": {
    "build:storybook": "storybook build -o storybook-static"
  }
}
```

The named `build:storybook` script appears two chapters after the chapter that instructs the reader to deploy. Additionally, chapter-9 uses `npx storybook build` while chapter-11 uses `storybook build` without `npx`, an inconsistency in command form that will appear in sequence.

---

### 13. `vitest-axe` coverage goal stated without axe assertions in earlier chapter test examples **[cross-half]**

**Severity: instructional — the guide's coverage target is not modeled by the guide's own test examples.**

**chapter-10.md** (Coverage targets):
> "axe-core: Every component passes with zero violations"

**chapter-4.md** (Stack tests) uses no axe-core assertions, which is expected for a layout primitive. However, the tests shown inline for chapters 5–8 also do not include axe assertions. The chapter-10 coverage goal applies retroactively to all components, but the guide's own code examples do not model this target for any component other than Button and Input (which are shown directly in chapter-10). The goal and the demonstrated practice are inconsistent.

---

### 14. Dark mode toggle deployed in chapter-9 before the dark theme is defined in chapter-12 **[cross-half]**

**Severity: structural — a publicly deployed Storybook after chapter-9 will have a non-functional dark mode toggle.**

**chapter-9.md** (Deploying Storybook):
> "Deploy Storybook publicly, and the kitchen sink page is what buyers see when they click 'View demo.'"

**chapter-9.md** (Configuration):
> "The decorator reads the current theme selection and applies the `.dark` class to the wrapper. When you add dark theme token overrides (see Chapter 12), the toggle switches between them."

The dark theme toggle exists in the deployed Storybook after chapter-9 but produces no visual change until chapter-12's `.dark` overrides are added. The deployment recommendation in chapter-9 precedes the completion of the feature the deployment is meant to showcase.

---

### 15. `@theme` vs `@theme inline` discrepancy

**Severity: functional — the `inline` modifier prevents a self-referencing variable loop that chapter-3 specifically warns about.**

**chapter-3.md** ("Wire tokens into Tailwind"):
> "The `@theme inline` directive tells Tailwind that these variables reference other CSS custom properties rather than defining literal values"

The CSS block shown in chapter-3 uses `@theme inline { ... }`.

**chapter-4.md** (app.css import block):
```css
@theme {
  /* ... your existing @theme block ... */
}
```

The placeholder in chapter-4 uses `@theme` without the `inline` modifier. The semantic difference is explained in chapter-3; its absence in the chapter-4 placeholder contradicts the established pattern.

---

### 16. Stack JSDoc comment omits the `--token-` prefix

**Severity: functional — a reader debugging a token value would search dev tools for the wrong variable name.**

**chapter-3.md** (Style Dictionary configuration):
> "The `--token-` prefix is added by Style Dictionary's `prefix: 'token'` configuration."

The generated property is therefore `--token-layout-stack-space-default`.

**chapter-4.md** (Stack component, `space` prop JSDoc):
> "CSS spacing value. Defaults to --layout-stack-space-default token."

The comment omits the `--token-` prefix. The CSS itself correctly references `var(--token-layout-stack-space-default, 1.5rem)`, but the documentation comment contradicts it.

---

### 17. Sidebar uses Stack's spacing token with no semantic token of its own

**Severity: minor — internally consistent but likely to confuse readers who expect parity with other primitives.**

**chapter-5.md** (Sidebar CSS):
```css
.rudiment-sidebar {
  --sidebar-space: var(--token-layout-stack-space-default, 1.5rem);
```

Every other layout primitive has its own semantic token. Sidebar borrows Stack's default. The `tokens/semantic.json` in chapter-3 defines no `layout.sidebar.space` token, so the CSS is consistent with what was defined — but this is not stated. A reader may expect Sidebar to have `--token-layout-sidebar-space` by analogy.

---

### 18. Style Dictionary version conflict

**Severity: minor — not contradictory, but the version rationale is missing.**

**chapter-1.md** (Decisions summary table):
> "Token format: DTCG JSON + Style Dictionary"

No version is specified in this table.

**chapter-3.md** (Install Style Dictionary):
> "This guide uses Style Dictionary v4. Version 5 exists and uses a compatible configuration format, but the examples here use v4."

**chapter-1.md** (Three-tier token architecture):
> "Style Dictionary v4 ships with first-class DTCG support."

Chapter-1 names v4 in passing; chapter-3 opens with a soft disclaimer that "Version 5 exists." Neither place explains why v4 was chosen or whether the guide will be updated. If the decisions table is the reader's reference for technology choices, it should include the version.

---

## Missing introductions

### 1. `@react-aria/utils` missing from the install command in chapter-6

**Severity: functional — a reader following the guide step-by-step will encounter an unresolved module error.**

**chapter-6.md** (Installing React Aria):
```bash
npm install react-aria react-stately
```

**chapter-6.md** (Button component):
```tsx
import { useObjectRef } from '@react-aria/utils'
```

`@react-aria/utils` is a sub-package of `react-aria`. It does not appear in the install command. A reader who runs only the listed install command and then copies the Button code will see a module resolution error. Additionally, no explanation of what `useObjectRef` does appears before the code block — the explanation arrives in a prose note after the code.

---

### 2. Storybook not installed but used in chapter-4

**Severity: functional — the chapter-4 story files are non-executable at the point they are introduced.**

**chapter-2.md** (Setup):
```bash
mkdir -p src/components src/layouts src/hooks src/utils src/styles
mkdir -p tokens/build
mkdir -p .storybook
mkdir docs
```

The `.storybook` directory is created but no Storybook package is installed.

**chapter-4.md** (Writing the stories):
> "Create `src/layouts/Stack/Stack.stories.tsx`"

The story file imports from `@storybook/react`, which has not been installed. The series table places Storybook setup in Chapter 9. No note in chapter-4 indicates that the story code is forward-looking and non-executable until that chapter.

---

### 3. Companion repository referenced without introduction **[cross-half]**

**Severity: functional — readers have no way to locate the resource being pointed to.**

**chapter-4.md**:
> "the pattern is documented in the companion repository."

**chapter-5.md**:
> "but the companion repository's documentation and stories clarify the expectation."

The companion repository is referenced twice in the first half and deferred to in the second half without ever being introduced. The intro.md contains no mention of it and provides no URL. Readers who encounter these references cannot follow them.

---

### 4. `React.cloneElement` — advanced API used without explanation

**Severity: instructional — `cloneElement` is outside the React APIs most developers use daily, yet no explanation is given.**

**chapter-8.md** (TooltipTrigger):
```tsx
{React.cloneElement(
  trigger,
  mergeProps(triggerProps, { ref: triggerRef }),
)}
{state.isOpen && React.cloneElement(tooltip, triggerTooltipProps)}
```

`React.cloneElement` has not appeared in any previous chapter. The chapter's prose describes the outcome ("the trigger element gets the trigger props merged in") without naming or explaining the mechanism. The guide's intro lists "React — You understand components, props, hooks, and the component lifecycle" as a prerequisite; `cloneElement` is an advanced API that falls outside typical React fluency.

---

### 5. "Product 1" and "Product 2" — undefined business terms

**Severity: structural — the passage assumes context that is never provided anywhere in the guide.**

**chapter-11.md** (Publish your library):
> "For the self-serve kit (Product 1), you're distributing the source code as a template repo, not publishing to npm."
> "If you do publish to npm (for Product 2 clients or your own use)..."

Neither "Product 1" nor "Product 2" has been defined anywhere in the guide. The intro.md, series overview, and all previous chapters make no mention of multiple product types or a "self-serve kit." This is the only passage that introduces a business framing without prior setup, and it does so as if the reader already knows what these terms refer to.

---

### 6. `useLoadingButton` hook shown before its motivation is explained

**Severity: instructional — the reader encounters unexplained `AriaButtonProps` and `useButton` references before the reason for the hook is stated.**

**chapter-6.md** (Building Button): The chapter opens with Button but immediately shows the `useLoadingButton` hook implementation before the Button component itself. The explanation for the hook's existence follows the code:
> "Button and IconButton both have a loading state, and they share identical logic for it."

A reader encounters the hook, sees its `AriaButtonProps` and `useButton` references — APIs that haven't been introduced yet in this chapter — and then reads the explanation. The brief motivation statement should appear before the hook's code block, not after.

---

### 7. `react-stately` hooks in chapter-7 — new hooks appear without per-hook introductions

**Severity: instructional — the chapter introduces four new `react-stately` hooks without naming or explaining any of them individually.**

**chapter-6.md** (Installing React Aria):
> "`react-stately` provides the state management hooks that React Aria depends on (for example, tracking whether a select is open or which tab is selected)."

**chapter-7.md** introduces `useSelectState`, `useToggleState`, `useCheckboxGroupState`, and `useRadioGroupState` without bridging text identifying what state each hook manages. The chapter-6 example ("tracking whether a select is open") maps directly to `useSelectState`, but the connection is left for the reader to infer. Each new hook should be identified at first use by at least one sentence stating what state it manages.

---

### 8. `mergeProps` — first use with no explanation

**Severity: instructional — a reader would not know this utility exists or when to use it in their own components.**

**chapter-8.md** (Tooltip):
```tsx
import {
  useTooltipTrigger,
  useTooltip as useTooltipAria,
  mergeProps,
} from 'react-aria'
```

`mergeProps` merges multiple props objects, combining event handlers rather than overwriting them. It is used here to merge `triggerProps` with a ref when cloning the trigger element. No explanation is provided for what it does or why it is necessary. The surrounding prose explains the trigger and tooltip components but does not mention `mergeProps` at all.

---

### 9. `usePress` — named but not shown

**Severity: instructional — the reader has an unresolved reference and no explanation of how `usePress` differs from `useButton`.**

**chapter-8.md** (Badge, Card, and Tabs):
> "Card is a `<div>` (or `<article>` via `as`) with optional interactive behavior via `usePress`."

`usePress` has not appeared in any previous chapter. No code is shown for it. The chapter defers to the companion repository but does not explain what `usePress` does or why it is used for Card rather than `useButton`. At minimum, a sentence noting that `usePress` handles press events for non-button elements — where `useButton` requires an actual `<button>` element — would close the gap.

---

### 10. `react-stately` installed in chapter-6 but not used visibly until chapter-7

**Severity: minor — the reader has an installed package that does nothing in its installation chapter.**

**chapter-6.md** (Installing React Aria):
```bash
npm install react-aria react-stately
```
> "`react-stately` provides the state management hooks that React Aria depends on (for example, tracking whether a select is open or which tab is selected)."

None of the three components built in chapter-6 (Button, IconButton, Input) use `react-stately` directly. No note explains that `react-stately` will be used in the next chapter.

---

### 11. `AriaButtonProps` — no reference to where the full API surface is documented

**Severity: minor — a reader building additional components cannot easily discover what props are available.**

**chapter-6.md** (Button interface):
```tsx
export interface ButtonProps extends AriaButtonProps {
```

The guide explains `onPress` vs `onClick` and `aria-disabled` vs `aria-busy`, but it does not indicate where to find the complete list of props that `AriaButtonProps` includes. A link to the React Aria documentation or an acknowledgment that the interface is documented externally would help readers extending the component.

---

### 12. `vite-plugin-dts` — purpose implied but not stated before the install command

**Severity: minor — the plugin's specific role is deducible but never directly stated.**

**chapter-11.md** (Configure Vite library mode):
> "Vite's library mode produces a clean build output with ECMAScript module (ESM) exports and TypeScript declarations. Install the declaration generation plugin:"
```bash
npm install -D vite-plugin-dts
```

The sentence before the install command describes what library mode produces, not what `vite-plugin-dts` specifically does. The plugin generates `.d.ts` declaration files during the Vite library build — a role the chapter implies via the `dist/index.d.ts` output listed later but never explicitly states for the plugin itself.

---

### 13. `HiddenSelect` — component import pattern not distinguished from hook imports

**Severity: minor — a reader accustomed to the hook-only pattern may not understand why a React component appears in the import statement.**

**chapter-7.md** (Select):
```tsx
import {
  useSelect,
  useListBox,
  useOption,
  usePopover,
  HiddenSelect,
} from 'react-aria'
```

> "The `HiddenSelect` component from React Aria renders a hidden native `<select>` element for form submission compatibility."

`HiddenSelect` is a React component, not a hook — the first time a React component is imported directly from `react-aria` rather than following the hook pattern. The distinction is not acknowledged.

---

### 14. Tokens Studio for Figma — named without a link or identifier

**Severity: minor — a reader cannot act on the recommendation without knowing what kind of tool this is or where to find it.**

**chapter-12.md** (Figma alignment):
> "Tokens Studio for Figma can read your `tokens.json` file directly and sync it into Figma, eliminating manual duplication."

Tokens Studio for Figma has not been mentioned anywhere in the guide. No link, install guidance, or note that it is a third-party plugin rather than a native Figma feature is provided.

---

### 15. Every Layout attribution appears twice in nearly identical wording

**Severity: minor — chapter-5.md reads as if it is the first mention.**

**chapter-1.md** (Layout as a first-class concern):
> "You'll build eight layout primitives [...] that follow the intrinsic design principles described by Heydon Pickering and Andy Bell in [Every Layout](https://every-layout.dev/)."

**chapter-5.md** (Attribution):
> "The layout primitives in this guide are inspired by the intrinsic layout patterns described in [Every Layout](https://every-layout.dev/) by Heydon Pickering and Andy Bell."

Chapter-5.md re-introduces the authors as if for the first time. It could instead reference the prior mention: "As noted in Chapter 1, the layout patterns here are drawn from Every Layout..."

---

### 16. "Intrinsic design" — used without definition

**Severity: minor — the term is used throughout without being explained.**

**chapter-1.md** (Decisions table):
> "Intrinsic primitives (Every Layout-inspired)"

**chapter-5.md** (Sidebar):
> "The Sidebar is an intrinsic layout..."

"Intrinsic design" is used in the decisions table and throughout chapter-5 without a one-sentence definition. The guide directs the reader to Every Layout, but never defines what intrinsic layout means in contrast to responsive or breakpoint-driven layout.

---

## Style and voice consistency

### 1. Chapter-12 ends with a product link instead of the "What you have now" pattern

**Severity: notable structural departure — a reader who has absorbed eleven chapters of consistent closing structure will encounter an unexplained tonal shift.**

Every chapter from chapter-2 through chapter-10 ends with a "What you have now" summary followed by a forward bridge. Chapter-11 breaks this pattern (see finding 2 below). Chapter-12 replaces both with a promotional close:

**chapter-12.md** (final paragraph):
> "If building this from scratch isn't the right investment for your team, [Rudiment UI](https://joshuabriley.com/services/starter/) is a pre-built version of this exact architecture, ready to customize and extend."

No previous chapter ends with a product link. The promotional register is absent from the rest of the guide. An argument can be made for a promotional close on the final chapter, but the departure from the "What you have now" + forward bridge structure is unacknowledged and will read as a tonal break for anyone who has reached this point sequentially.

---

### 2. Chapter-11 ends abruptly with no "What you have now" section

**Severity: notable structural departure — the reader receives no summary or forward bridge.**

Every chapter from chapter-2 through chapter-10 ends with a "What you have now" summary. Chapter-11 ends at the semantic versioning section:

**chapter-11.md** (final sentence):
> "Write a `CHANGELOG.md` that describes each release in human-readable terms. Consuming teams use the changelog to decide whether to upgrade and what to test after upgrading."

The chapter stops there. No summary of what has been completed and no pointer to chapter-12.

---

### 3. Voice shift in chapter-12: second-person address gives way to abstracted framing

**Severity: minor — one sentence breaks the guide's established second-person register.**

The guide uses second-person address ("you") consistently throughout all chapters.

**chapter-12.md** (Expanding the component set):
> "Buyer feedback and customer engagements show which components to add next."

The sentence describes an abstracted process rather than addressing the reader. Surrounding sentences maintain second-person:
> "The initial 14 UI components cover the essentials."
> "Add components based on demand, not speculation."

Rephrasing to "Your buyer feedback and customer engagements will show..." would restore consistency.

---

### 4. `bg-bg-surface-raised` / `bg-bg-surface` — redundant naming in two chapters **[cross-half]**

**Severity: instructional — the code examples directly contradict the naming rationale established in chapter-3.**

**chapter-3.md** explicitly warns against:
> "`--color-bg-surface` would produce the class `bg-bg-surface`. Dropping the redundant prefix gives you `bg-surface`, `bg-surface-raised`, and `bg-overlay`."

**chapter-4.md** (Placeholder component in stories):
```tsx
<div className="border border-border-default rounded-md p-4 bg-bg-surface-raised">
```

`bg-bg-surface-raised` uses the redundant pattern chapter-3 says to avoid. The correct class is `bg-surface-raised`.

**chapter-9.md** (Storybook decorator):
```tsx
<div className="bg-bg-surface text-text-default p-8 min-h-screen">
```

The same redundancy appears in `bg-bg-surface`. A reader applying the decorator's dark mode toggle would use the wrong class name. The error from chapter-4 recurs in chapter-9 without correction.

---

### 5. Sentence complexity shifts upward in chapter-6

**Severity: minor — a mild increase in reading difficulty relative to prior chapters.**

Chapters 1–5 maintain consistent sentence length and complexity: direct declarative sentences, short paragraphs, minimal subordinate clauses.

**chapter-6.md** (forwardRef explanation):
> "Wrapping the component in `React.forwardRef` lets consumers pass a ref and call imperative methods like `.focus()` or `.blur()`. `useObjectRef` from `@react-aria/utils` converts the forwarded ref (which may be a callback ref or null) into the stable `RefObject` that React Aria hooks require."

The parenthetical "(which may be a callback ref or null)" is the kind of detail earlier chapters would have separated into a standalone sentence. Chapter-6 packs more technical information per sentence than preceding chapters. This may reflect inherent complexity, but it represents a mild shift in reading difficulty.

---

### 6. Chapters 7 and 8 share an identical opening formula

**Severity: minor — two consecutive chapters open the same way, diminishing the variety the guide otherwise maintains.**

**chapter-7.md** (opening):
> "This chapter builds Select, Checkbox, CheckboxGroup, RadioGroup, and Switch. Each one follows the React Aria hook pattern from the previous chapter."

**chapter-8.md** (opening):
> "This chapter builds Dialog, Tooltip, Alert, Badge, Card, and Tabs."

Both open with "This chapter builds [list of components]." No other two consecutive chapters share the same opening formula. Chapter-6's contrast opener ("Layout primitives handle spatial arrangement. UI components handle interaction.") provides a model for differentiating chapter-7's opening.

---

### 7. "What you have now" closing sections mix lists and prose inconsistently

**Severity: minor — a pattern variation visible across sequential reading.**

**chapter-2.md**: prose sentence followed by a bullet list.
**chapter-3.md**: bulleted list under "What you have now."
**chapter-4.md**: flowing prose sentences under "What you have now."
**chapter-5.md**: single prose sentence under "What you have now."
**chapter-6.md**: prose sentences under "What you have now."

The bullet format in chapter-3 is the most scannable. Chapters 4 and 6 use prose. Chapter-5 uses a single sentence. No consistent format is established. Standardizing to either bullets or prose across all closings would improve the guide's internal consistency.

---

### 8. Code comment depth drops after chapter-4

**Severity: minor — readers relying on in-code explanation will find less of it in later chapters.**

**chapter-4.md** Stack component uses explanatory multi-line comments:
```tsx
// Apply margin-block-end: auto to the splitAfter child via React.
// CSS :nth-child() does not accept custom properties, so this must
// be handled in the component rather than in the stylesheet.
// Children.toArray filters null/false values so conditional children
// do not shift the numeric index.
```

**chapter-5.md** and **chapter-6.md** use only file-path comments at the top of each block:
```tsx
// src/layouts/Box/Box.tsx
```

Chapter-5.md notes "This chapter focuses on the CSS techniques that make each primitive work," which may be intentional. But readers who found the chapter-4 comments instructional will notice their absence.

---

### 9. "Attribution" heading in chapter-5 is a structural outlier

**Severity: minor — the only heading in the guide that names a document convention rather than a learning action.**

Every other section heading in the guide describes what the reader is about to do or learn. **chapter-5.md**'s "Attribution" heading reads like an academic footnote. The heading could instead read "Every Layout and intrinsic design" or simply be integrated into the introductory prose, removing the need for a standalone heading.

---

### 10. Tables reintroduced in chapters 9–10 after a six-chapter absence

**Severity: minor — unacknowledged structural shift.**

Pass 1 documented that tables appeared only in intro.md and chapter-1. Chapters 2–8 use only prose, bullet lists, and code blocks.

**chapter-9.md** (Story organization) and **chapter-10.md** (Coverage targets) both reintroduce tables without any stylistic signal that the format is returning. The reuse is contextually appropriate, but it represents a departure from the established mid-guide conventions.

---

*End of review — final.*

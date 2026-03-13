# Editorial Review: Pass 1

**Scope:** intro.md, chapter-1.md, chapter-2.md, chapter-3.md, chapter-4.md, chapter-5.md, chapter-6.md
**Reviewer:** Claude (automated editorial pass)
**Date:** 2026-03-12

---

## Inconsistencies

### 1. Style Dictionary version conflict

**chapter-1.md** (Decisions summary table):
> Token format: DTCG JSON + Style Dictionary

No version is specified in this table.

**chapter-3.md** (Install Style Dictionary section):
> This guide uses Style Dictionary v4. Version 5 exists and uses a compatible configuration format, but the examples here use v4.

**chapter-1.md** (The three-tier token architecture section):
> Style Dictionary v4 ships with first-class DTCG support.

These three references are not contradictory, but they are inconsistent in what they communicate. Chapter 1 names v4 in a subordinate clause without alerting the reader to the version choice. Chapter 3 opens with a soft disclaimer that "Version 5 exists." Neither place explains why v4 was chosen over v5, or whether the guide will be updated. The introductory chapter's decisions table should specify the version if the chapter text already singles it out.

---

### 2. Chapter numbering and the "5b" anomaly

**intro.md** (Series overview table):
> Chapter 5b: Typography: Heading, Text, and Prose

**chapter-5.md** (final paragraph, "What you have now"):
> Before moving to interactive components, the next section adds the typography layer: Heading, Text, and Prose components that handle your UI's text content.

**intro.md** also lists:
> Chapter 5: The rest of the layout system
> Chapter 6: Accessible components with React Aria

Chapter 5b exists in the series table but chapter-5.md ends by calling it "the next section," not "the next chapter." This creates an ambiguity: is 5b a chapter or a section within Chapter 5? The existing chapter-6.md file follows directly after chapter-5.md in this review, and chapter-6.md makes no reference to typography components, treating layout and interactive components as adjacent. If 5b is missing or deferred, the guide's own navigation is incomplete and the cross-chapter reference in chapter-5.md misleads the reader.

---

### 3. CSS variable naming inconsistency in Button CSS

**chapter-3.md** (Wire tokens into Tailwind section) defines the `@theme` mapping for background colors using the pattern `--color-surface` and `--color-surface-raised`:
> The background tokens use `surface` rather than `bg-surface` as the suffix. [...] Dropping the redundant prefix gives you `bg-surface`, `bg-surface-raised`, and `bg-overlay`.

**chapter-6.md** (Button CSS section) uses `--color-background-surface` and `--color-background-surface-raised`:
```css
.rudiment-button--secondary {
  background-color: var(--color-background-surface);
  ...
}
.rudiment-button--secondary:hover:not([aria-disabled='true']) {
  background-color: var(--color-background-surface-raised);
}
.rudiment-button--ghost:hover:not([aria-disabled='true']) {
  background-color: var(--color-background-surface-raised);
}
```

Chapter 3 explicitly establishes that the `@theme` variables are named `--color-surface` and `--color-surface-raised` (not `--color-background-surface`). Chapter 6's Button CSS contradicts this by using the longer form with `background` in the name. As written, those `var()` references would resolve to nothing, because the variables they reference do not exist in the `@theme` block defined in chapter-3.md. This is a functional bug in the code as documented.

---

### 4. `@theme` vs `@theme inline` inconsistency

**chapter-3.md** (Wire tokens into Tailwind section):
> Update `src/app.css` to import the generated tokens and map them into Tailwind's @theme. The `@theme inline` directive tells Tailwind that these variables reference other CSS custom properties rather than defining literal values

The CSS block shown uses `@theme inline { ... }`.

**chapter-4.md** (The CSS section, showing the app.css import block):
```css
@theme {
  /* ... your existing @theme block ... */
}
```

The placeholder comment in chapter-4.md uses `@theme` without the `inline` modifier. This may be an unintentional omission, but it introduces a discrepancy. The `inline` modifier is semantically important (chapter-3.md explains it prevents self-referencing variable errors), so omitting it in a later code block is confusing.

---

### 5. Token name in Stack CSS vs token defined in chapter 3

**chapter-3.md** (semantic.json):
```json
"layout": {
  "stack": {
    "space": {
      "default": { "$value": "{spacing.6}" },
```

The generated CSS custom property from Style Dictionary (with `prefix: 'token'` and `transformGroup: 'css'`) would be `--token-layout-stack-space-default`.

**chapter-4.md** (Stack CSS):
```css
.rudiment-stack {
  --stack-space: var(--token-layout-stack-space-default, 1.5rem);
```

This matches. However, chapter-4.md's JSDoc comment on the `space` prop reads:
> CSS spacing value. Defaults to --layout-stack-space-default token.

The comment says `--layout-stack-space-default`, omitting the `--token-` prefix that the Style Dictionary configuration explicitly adds. A reader following the prop comment to debug a token value would search for the wrong variable name in the browser's dev tools.

---

### 6. Storybook version inconsistency

**chapter-1.md** (Decisions summary table):
> Documentation: Storybook 10

Storybook 10 is mentioned only here. No other chapter references it. There is no install command, no version confirmation, and no chapter that sets up Storybook (Chapter 9, per the series table, is not included in this review). The version claim is unverifiable from the current chapters and sits without any surrounding acknowledgment that the reader won't encounter it until much later.

---

### 7. Box CSS references undefined color tokens

**chapter-5.md** (Box CSS):
```css
.rudiment-box--invert {
  background-color: var(--color-bg-surface-inverted, var(--color-neutral-900));
  color: var(--color-text-on-inverted, var(--color-neutral-0));
}
```

The variables `--color-bg-surface-inverted` and `--color-text-on-inverted` appear nowhere in the `@theme` block defined in chapter-3.md, and they are not present in `tokens/semantic.json`. The CSS falls back to `--color-neutral-900` and `--color-neutral-0`, which do exist, but the primary references are orphaned. This is either a forward reference to tokens the reader is expected to add themselves (without being told), or an oversight.

---

### 8. Cluster token name mismatch

**chapter-3.md** (semantic.json layout tokens):
```json
"cluster": {
  "space": { "$value": "{spacing.4}" }
}
```
This generates `--token-layout-cluster-space`.

**chapter-5.md** (Cluster CSS):
```css
.rudiment-cluster {
  --cluster-space: var(--token-layout-cluster-space, 1rem);
```

The token reference here is correct. However, the Sidebar CSS in the same chapter uses a different variable for its spacing:
```css
.rudiment-sidebar {
  --sidebar-space: var(--token-layout-stack-space-default, 1.5rem);
```

Sidebar borrows the Stack's default spacing token rather than using its own dedicated token. The semantic token file in chapter-3.md does not define a `layout.sidebar.space` token, so this is internally consistent — but it is not made explicit. A reader may expect Sidebar to have its own spacing token since every other primitive does.

---

## Missing introductions

### 1. `forwardRef` — used without prior explanation

**First usage:** chapter-4.md, Stack component.

The Stack component wraps itself in `forwardRef` and the chapter provides a detailed explanation for _why_ (ref forwarding for measurement, focus, etc.). This is handled well within chapter-4.md itself. However, `React.forwardRef` appears without any mention in chapter-2.md (project setup) or chapter-1.md. A reader unfamiliar with the pattern reads a multi-sentence justification in chapter-4.md without knowing the pattern exists in React. This is an acceptable amount of inline introduction for a guide that assumes React fluency, but the explanation in chapter-4.md is deeper than equivalent explanations for other React APIs, suggesting the author is aware this may be new to some readers.

**Recommendation:** Either note in the intro's prerequisites that `forwardRef` is expected knowledge, or acknowledge the pattern once at the start of chapter-4.md before diving into the component code.

---

### 2. `cn()` utility — introduced in chapter-2.md but never bridged to later usage

**Introduced:** chapter-2.md (Create the utility function section).

**Used throughout:** chapter-4.md, chapter-5.md, chapter-6.md.

The utility is defined clearly in chapter-2.md. Chapter-4.md uses it without recap or reference. This is appropriate for later chapters in a sequential guide. No gap here.

---

### 3. `useObjectRef` — appears in chapter-6.md without introduction

**First usage:** chapter-6.md, Button component:
```tsx
import { useObjectRef } from '@react-aria/utils'
```

**What's missing:** `@react-aria/utils` is a sub-package of `react-aria`. Chapter-6.md installs `react-aria` and `react-stately` at the top of the chapter, but `@react-aria/utils` is not listed in the install command:
```bash
npm install react-aria react-stately
```

The import appears later in the Button code without a corresponding install step. A reader following the guide step-by-step would encounter an unresolved module error. The chapter also does not explain what `useObjectRef` does before using it — the explanation appears only in a prose note after the code block. That ordering (code first, explanation after) is consistent with the guide's style, but the missing install step is a functional gap.

---

### 4. `useLoadingButton` hook — introduced before its motivation is clear

**chapter-6.md** (Building Button section):

The chapter opens with Button but immediately pivots to showing `useLoadingButton` in `src/hooks/useLoadingButton.ts` before the Button component itself. The hook's purpose — sharing loading logic between Button and IconButton — is explained in prose after the hook's code block:
> "Button and IconButton both have a loading state, and they share identical logic for it."

A reader encounters the hook, sees its `AriaButtonProps` and `useButton` references (which haven't been explained yet in this chapter), then reads the explanation. The ordering reverses comprehension: readers need to understand why the hook exists before seeing its implementation. The existing brief explanation ("Button and IconButton both have a loading state...") should appear before the hook's code, not after.

---

### 5. `react-stately` — installed but never explained

**chapter-6.md** (Installing React Aria section):
```bash
npm install react-aria react-stately
```
> `react-stately` provides the state management hooks that React Aria depends on (for example, tracking whether a select is open or which tab is selected).

`react-stately` is installed and briefly defined, but none of the three components built in chapter-6.md (Button, IconButton, Input) use `react-stately` directly. The explanation prepares the reader for future chapters (Dialog, Tabs, Select in chapters 7 and 8), but the reader is left with an installed package that does nothing visible in this chapter. No note explains that `react-stately` will be used later.

---

### 6. `AriaButtonProps` — used without explaining what it extends

**chapter-6.md**, Button interface:
```tsx
export interface ButtonProps extends AriaButtonProps {
```

`AriaButtonProps` is imported from `react-aria` and extended by `ButtonProps`. The guide explains `onPress` vs `onClick` and `aria-disabled` vs `aria-busy`, but it does not tell the reader what props `AriaButtonProps` actually includes, or where to find that list. A reader building their own components needs to know where the React Aria API surface is documented so they can add additional props (for example, `onFocusChange`, `autoFocus`). A link to the React Aria docs or at least an acknowledgment that the interface is documented externally is missing.

---

### 7. The Every Layout attribution — Heydon Pickering and Andy Bell introduced twice

**chapter-1.md** (Layout as a first-class concern):
> You'll build eight layout primitives [...] that follow the intrinsic design principles described by Heydon Pickering and Andy Bell in [Every Layout](https://every-layout.dev/).

**chapter-5.md** (Attribution section):
> The layout primitives in this guide are inspired by the intrinsic layout patterns described in [Every Layout](https://every-layout.dev/) by Heydon Pickering and Andy Bell.

The attribution appears twice in nearly identical wording without acknowledging that it was already stated. Chapter-5.md's attribution section reads as if this is the first mention. Since chapter-1.md already introduced the source, chapter-5.md could reference it differently — for example, "As noted in Chapter 1, the layout patterns here are drawn from Every Layout..." — rather than re-introducing the authors as if for the first time.

---

### 8. "Intrinsic design" and "container-responsive" — concepts used before definition

**chapter-1.md** (Layout as a first-class concern):
> These primitives respond to their container's available space rather than the viewport width, which means they work in any context without media query breakpoints.

The term "intrinsic design" is used in the decisions table ("Intrinsic primitives (Every Layout-inspired)") and implied throughout, but it is not defined. Chapter-5.md describes the Sidebar as "an intrinsic layout" without defining the term, and the Switcher section explains the mechanism without naming the concept. A one-sentence definition of intrinsic layout — or a note pointing to the Every Layout resource for definition — would anchor the concept for readers encountering it for the first time.

---

### 9. Storybook — referenced in chapter-4.md without setup

**chapter-4.md** (Writing the stories section):
> Create `src/layouts/Stack/Stack.stories.tsx`

Storybook stories appear as full, working examples in chapter-4.md. The Storybook package is listed in the decisions table in chapter-1.md, but it is never installed or configured in chapters 1 through 4. Chapter-2.md's setup creates a `.storybook` directory but installs nothing related to Storybook:
```bash
mkdir -p src/components src/layouts src/hooks src/utils src/styles
mkdir -p tokens/build
mkdir -p .storybook
mkdir docs
```

The stories in chapter-4.md import from `@storybook/react`, a package the reader has not been told to install. The series table places Storybook setup in Chapter 9. Either the stories section in chapter-4.md needs a note that the code is forward-looking and non-executable until Chapter 9, or Storybook needs to be installed earlier in the guide.

---

### 10. Vitest and Testing Library — referenced in chapter-4.md without setup

**chapter-4.md** (Writing the tests section):
> Create `src/layouts/Stack/Stack.test.tsx`

The test file imports from `@testing-library/react` and `vitest`, neither of which has been installed. Like Storybook, these are in the decisions table in chapter-1.md and assigned to Chapter 10 in the series table. The chapter-4.md test file will fail to run without setup that hasn't been provided. No note indicates this limitation.

---

### 11. `@theme inline` vs CSS custom properties — the distinction is important but underexplained

**chapter-3.md** explains:
> The `@theme inline` directive tells Tailwind that these variables reference other CSS custom properties rather than defining literal values

This is the mechanism that prevents self-referencing variable loops. However, a reader unfamiliar with Tailwind CSS 4's `@theme` would not understand _why_ this distinction matters. The guide promises in the intro that "the guide introduces each of these as they come up," but the introduction here is compressed. A one-sentence explanation of what would go wrong with `@theme` (without `inline`) in this specific context would strengthen the chapter.

---

## Style and voice consistency

### 1. Second-person "you" is consistent and well-maintained

The guide establishes a consistent second-person voice in intro.md:
> "This guide walks you through..."
> "By the end, you'll have a working system..."

This carries through all chapters without drift. Chapter-3.md: "By the end, you'll have a `tokens.json` source file..." Chapter-4.md: "The Stack is the most frequently used layout primitive you'll build." Chapter-5.md: "You have the pattern down from the Stack chapter..." Chapter-6.md: "This chapter introduces React Aria and uses it to build three interactive components..."

The voice is stable. No shifts to "we" were found.

---

### 2. Present tense is consistent

All chapters use present tense for instruction and description. No tense drift was found across files.

---

### 3. Sentence complexity shifts in chapter-6.md

Chapters 1 through 5 maintain a consistent sentence length and complexity: direct declarative sentences, short paragraphs, minimal subordinate clauses. Chapter-6.md introduces noticeably denser paragraphs in the explanation sections. For example:

**chapter-6.md** (Loading state explanation):
> "`aria-disabled` means permanently unavailable; `aria-busy` means processing."

This is appropriately concise. But compare:

**chapter-6.md** (forwardRef explanation):
> "Wrapping the component in `React.forwardRef` lets consumers pass a ref and call imperative methods like `.focus()` or `.blur()`. `useObjectRef` from `@react-aria/utils` converts the forwarded ref (which may be a callback ref or null) into the stable `RefObject` that React Aria hooks require."

This is fine on its own, but the parenthetical "(which may be a callback ref or null)" is the kind of detail that earlier chapters would have separated into a standalone sentence or a brief aside. Chapter-6.md packs more technical information per sentence than earlier chapters, which may reflect the inherent complexity of the subject matter, but it represents a mild shift in reading difficulty.

---

### 4. Chapter opening structure is inconsistent

**chapter-1.md** opens with a direct command and a warning:
> "Don't open your terminal yet. The most expensive mistakes in a component library are architectural, and they compound."

**chapter-2.md** opens with a description of what the chapter does:
> "This chapter gets you from an empty directory to a working development environment..."

**chapter-3.md** mirrors chapter-2.md's opening pattern:
> "This chapter builds the token system that every component and layout primitive will reference."

**chapter-4.md** opens with a claim about the component:
> "The Stack is the most frequently used layout primitive you'll build."

**chapter-5.md** opens with a callback to the previous chapter:
> "You have the pattern down from the Stack chapter: a React component that renders a semantic element..."

**chapter-6.md** opens with a contrast statement:
> "Layout primitives handle spatial arrangement. UI components handle interaction."

Chapters 2 and 3 share the same opening formula ("This chapter [verb] the [noun]..."). Chapters 4, 5, and 6 each open differently. This is not a serious problem — variety in chapter openings is acceptable — but the abrupt shift in chapter-1.md's imperative opening vs. the declarative openings of later chapters is notable. Readers who skip chapter-1.md (despite being told not to) will encounter a different tone on return.

---

### 5. "What you have now" closing sections are inconsistent

**chapter-2.md** ends with a bulleted list under an implied heading (the checklist paragraph):
> "You have: [bulleted list]"

**chapter-3.md** ends with a "What you have now" section using a bulleted list.

**chapter-4.md** ends with a "What you have now" section using prose sentences.

**chapter-5.md** ends with a "What you have now" section using a single prose sentence, then transitions to the next chapter.

**chapter-6.md** ends with a "What you have now" section using prose sentences.

The list-vs-prose variation across these closing sections is minor but visible. Chapter-3.md's bullet-point summary is the most readable format. Chapter-4.md and chapter-6.md use flowing sentences instead. Chapter-2.md uses a hybrid (prose with a colon followed by bullet points). Standardizing this pattern across chapters would improve the guide's internal consistency.

---

### 6. Section heading style is consistent but has one anomaly

All chapters use `###` for section headings and `####` does not appear anywhere. The `##` level is reserved for chapter titles. This is consistent.

However, the heading "Attribution" in chapter-5.md is a unique heading type that appears nowhere else. It reads like an academic footnote, while every other heading in the guide describes what the reader is about to do or learn ("Choosing your primitives layer," "Building the component," "The recursive prop"). "Attribution" is a structural outlier in heading style and function.

---

### 7. Code comment style is inconsistent

**chapter-4.md** Stack component code uses inline comment headers:
```tsx
// Apply margin-block-end: auto to the splitAfter child via React.
// CSS :nth-child() does not accept custom properties, so this must
// be handled in the component rather than in the stylesheet.
// Children.toArray filters null/false values so conditional children
// do not shift the numeric index.
```

**chapter-5.md** code blocks use a single short comment at the top of each file:
```tsx
// src/layouts/Box/Box.tsx
```

**chapter-6.md** uses the same short file-path comment style as chapter-5.md.

Chapter-4.md's explanatory comments are more thorough and instructional. The shift to file-path-only comments in chapter-5.md and chapter-6.md reduces the in-code explanation. This is presumably intentional — chapter-5.md states "This chapter focuses on the CSS techniques that make each primitive work" — but readers relying on code comments for understanding will find a qualitative drop after chapter-4.md.

---

### 8. Placeholder component in chapter-4.md stories uses Tailwind classes inconsistent with defined tokens

**chapter-4.md** (Writing the stories section):
```tsx
function Placeholder({ label }: { label: string }) {
  return (
    <div className="border border-border-default rounded-md p-4 bg-bg-surface-raised">
      {label}
    </div>
  )
}
```

`bg-bg-surface-raised` follows the pattern that chapter-3.md explicitly says to avoid:
> "Dropping the redundant prefix gives you `bg-surface`, `bg-surface-raised`, and `bg-overlay`."

The class should be `bg-surface-raised`, not `bg-bg-surface-raised`. This is a code-level inconsistency that directly contradicts the naming rationale explained one chapter earlier. Similarly, `border-border-default` has a `border-border` redundancy — the correct class would be `border-default` if the token follows the same naming logic. However, the border token is named `--color-border-default` in the `@theme` block, which would produce the Tailwind class `border-border-default`. This case is technically consistent with what was defined in chapter-3.md (because the token name includes `border`), but it stands in contrast to the `surface` naming cleanup that chapter-3.md highlights. The discrepancy signals that the naming convention was not applied uniformly across all token types.

---

### 9. Formality shift in chapter-5.md sidebar note

**chapter-5.md** (Sidebar section):
> "The Sidebar expects exactly two children. The first child is the sidebar panel (when `side="left"`), and the second is the content panel. When `side="right"`, the roles reverse. The component doesn't enforce this at runtime, but the companion repository's documentation and stories clarify the expectation."

The phrase "The component doesn't enforce this at runtime" is more casual than surrounding prose and contains an implicit apology for a limitation. The broader guide does not typically acknowledge limitations with this phrasing. Other limitation notes (for example, the polymorphic ref discussion in chapter-4.md) are more thorough and technical. The Sidebar note feels compressed.

---

### 10. "Companion repository" referenced without introduction

**chapter-4.md**:
> "the pattern is documented in the companion repository."

**chapter-5.md**:
> "but the companion repository's documentation and stories clarify the expectation."

The companion repository is mentioned twice without being introduced. The intro.md contains no reference to a companion repository, no URL, no indication that one exists. Readers who encounter these references have no way to find what's being pointed to.

---

## Tracking forward

### Key terms and concepts introduced, with first definition location

| Term / Concept | First defined | Location |
|---|---|---|
| Component library | Implied throughout | intro.md, title |
| Design tokens | "token system" implied | intro.md (series table, Chapter 3 description) |
| Accessibility primitives | Named and explained | chapter-1.md, "Choosing your primitives layer" |
| WAI-ARIA | Named but not defined | chapter-1.md, "Choosing your primitives layer" |
| Radix primitives | Introduced as alternative | chapter-1.md, "Choosing your primitives layer" |
| React Aria | Introduced and chosen | chapter-1.md, "Choosing your primitives layer" |
| Tailwind CSS 4 | Introduced and chosen | chapter-1.md, "Choosing your styling approach" |
| `@theme` directive | Named | chapter-1.md, "Choosing your styling approach" |
| Three-tier token architecture | Defined in full | chapter-1.md, "The three-tier token architecture" |
| Global tokens (Tier 1) | Defined | chapter-1.md, "The three-tier token architecture" |
| Semantic tokens (Tier 2) | Defined | chapter-1.md, "The three-tier token architecture" |
| Component tokens (Tier 3) | Defined | chapter-1.md, "The three-tier token architecture" |
| DTCG format | Named and linked | chapter-1.md, "The three-tier token architecture" |
| Style Dictionary | Named | chapter-1.md, "The three-tier token architecture" |
| Intrinsic design / layout primitives | Named (not defined) | chapter-1.md, "Layout as a first-class concern" |
| Every Layout (book/resource) | Named and linked | chapter-1.md, "Layout as a first-class concern" |
| Heydon Pickering and Andy Bell | Named | chapter-1.md, "Layout as a first-class concern" |
| Stack, Box, Center, Cluster, Sidebar, Switcher, Grid, Cover | Named | chapter-1.md, "Layout as a first-class concern" |
| HeroUI (formerly NextUI) | Named | chapter-1.md, "Choosing your primitives layer" |
| Untitled UI React | Named | chapter-1.md, "Choosing your primitives layer" |
| Vite | Named | chapter-1.md, decisions table |
| Storybook 10 | Named (version) | chapter-1.md, decisions table |
| Vitest + Testing Library | Named | chapter-1.md, decisions table |
| `cn()` utility | Defined with code | chapter-2.md, "Create the utility function" |
| `clsx` | Named and explained | chapter-2.md, "Create the utility function" |
| `tailwind-merge` | Named and explained | chapter-2.md, "Create the utility function" |
| `tsconfig.json` / TypeScript configuration | Defined with code | chapter-2.md, "Configure TypeScript" |
| `vite.config.ts` | Defined with code | chapter-2.md, "Configure Vite" |
| Directory structure (`src/`, `tokens/`, etc.) | Established | chapter-2.md, "Set up the directory structure" |
| `src/app.css` | Created | chapter-2.md, "Set up the directory structure" |
| `tokens/tokens.json` | Created | chapter-3.md, "Create the token source file" |
| DTCG `$value` / `$type` fields | Explained | chapter-3.md, "Create the token source file" |
| Token aliasing with `{path.to.token}` | Explained | chapter-3.md, "Create the token source file" |
| Global token palette (blue, neutral, red, green, amber, spacing, radius, font) | Defined | chapter-3.md, "Create the token source file" |
| `tokens/semantic.json` | Created | chapter-3.md, "Add semantic tokens" |
| Semantic color tokens (brand, text, background, border, feedback) | Defined | chapter-3.md, "Add semantic tokens" |
| Layout tokens | Defined | chapter-3.md, "Add semantic tokens" |
| Style Dictionary configuration | Defined with code | chapter-3.md, "Configure Style Dictionary" |
| `--token-` prefix | Defined and explained | chapter-3.md, "Configure Style Dictionary" |
| `outputReferences: true` | Explained | chapter-3.md, "Configure Style Dictionary" |
| `build:tokens` script | Defined | chapter-3.md, "Configure Style Dictionary" |
| `@theme inline` directive | Explained (mechanism) | chapter-3.md, "Wire tokens into Tailwind" |
| Owl selector (`* + *`) | Named and explained | chapter-4.md, "The solution" |
| `margin-block-start` | Used in context | chapter-4.md, "The solution" |
| `forwardRef` pattern | Used and explained | chapter-4.md, "Building the component" |
| `as` prop pattern | Introduced | chapter-4.md, "Building the component" |
| Polymorphic ref | Named (not resolved here) | chapter-4.md, "Building the component" |
| `splitAfter` prop | Introduced | chapter-4.md, "The splitAfter prop" |
| Barrel export | Named and demonstrated | chapter-4.md, "The barrel export" |
| Storybook stories (`*.stories.tsx`) | Used without setup | chapter-4.md, "Writing the stories" |
| `Meta`, `StoryObj` (Storybook types) | Used without setup | chapter-4.md, "Writing the stories" |
| Vitest tests (`*.test.tsx`) | Used without setup | chapter-4.md, "Writing the tests" |
| `flex-grow: 999` technique | Explained | chapter-5.md, "Sidebar" |
| `calc()` threshold technique | Explained | chapter-5.md, "Switcher" |
| `auto-fill` + `minmax()` grid technique | Explained | chapter-5.md, "Grid" |
| `margin-block: auto` centering | Explained | chapter-5.md, "Cover" |
| `rudiment-cover__centered` class | Introduced | chapter-5.md, "Cover" |
| React Aria hooks (general pattern) | Explained | chapter-6.md, "How React Aria hooks work" |
| `useButton` hook | Introduced | chapter-6.md, "How React Aria hooks work" |
| `onPress` vs `onClick` | Explained | chapter-6.md, "Building Button" |
| `aria-busy` vs `aria-disabled` | Explained | chapter-6.md, "Building Button" |
| `useLoadingButton` hook | Defined (custom) | chapter-6.md, "Building Button" |
| `useObjectRef` | Used without install step | chapter-6.md, "Building Button" |
| `@react-aria/utils` | Used without install step | chapter-6.md, "Building Button" |
| `AriaButtonProps` | Used without external reference | chapter-6.md, "Building Button" |
| `useTextField` hook | Introduced | chapter-6.md, "Building Input" |
| `aria-describedby` | Used (via hook) | chapter-6.md, "Building Input" |
| `IconButton` | Introduced | chapter-6.md, "IconButton" |
| Required `aria-label` enforcement | Explained | chapter-6.md, "IconButton" |
| `:focus-visible` | Explained | chapter-6.md, "Building Button" (key points) |

---

### Dominant voice, tense, and point of view

- **Point of view:** Second person ("you") throughout. Consistent across all seven files. No first-person plural ("we") appears.
- **Tense:** Present tense for instruction and explanation ("The Stack is...", "This creates...", "You have..."). Future tense used only for outcomes ("By the end, you'll have..."). Past tense does not appear except in historical context ("Radix was originally built by Modulz...").
- **Tone:** Direct, practical, opinionated. The author states choices without hedging and explains reasoning without being defensive. Formality is professional-technical, not academic.
- **Address:** The reader is treated as a competent developer who may be unfamiliar with the specific tools but not with the underlying concepts. The guide explains _what_ decisions are made and _why_, more than _how_ in isolation.

---

### Structural patterns

**Chapter openings:**
- Chapters 2 and 3 open with "This chapter [verb] the [noun]..." — a consistent formula.
- Chapter 1 opens with a directive ("Don't open your terminal yet."), creating emphasis.
- Chapters 4, 5, and 6 each open differently: a claim, a callback, a contrast.

**Internal section organization:**
- Chapters 2 and 3: linear walkthrough of setup steps, each section named after the action (Configure, Create, Verify).
- Chapter 4: concept-first organization (problem → solution → implementation → CSS → variants → testing).
- Chapter 5: component-by-component organization, each with CSS then TypeScript.
- Chapter 6: install → concept → component-by-component.

**Closing pattern:**
- All chapters end with a "What you have now" summary (or equivalent) followed by a forward bridge ("The next chapter builds...").
- Chapter 2's closing is slightly different: it uses a bulleted checklist.

**Code block conventions:**
- Language identifiers on all fenced code blocks (`bash`, `json`, `typescript`, `tsx`, `css`).
- File paths indicated via comment at top of TypeScript/TSX blocks (starting in chapter 5; chapter 4 uses prose to introduce file paths).
- No line numbers in code blocks.

**Heading conventions:**
- `#` — not used in chapter files (reserved for the book title in intro.md).
- `##` — chapter title (e.g., `## Chapter 4: Your first layout primitive: Stack`).
- `###` — major sections within a chapter.
- `####` — not used.
- Heading case: sentence case throughout (e.g., "The three-tier token architecture"), not title case.

**Lists:**
- Bullet lists used for: prerequisites (intro.md), summarizing what has been built (chapter-3.md closing), decisions tables (chapter-1.md).
- Numbered lists used only in chapter-3.md ("Verify the pipeline" steps).
- Definition-style bold-term-then-explanation lists used in chapter-1.md (accessibility options) and chapter-6.md (key points after code blocks).

**Tables:**
- Used in intro.md (series overview) and chapter-1.md (decisions summary).
- Not used in chapters 2 through 6.

**Inline code formatting:**
- Consistent: file paths, token names, CSS properties, prop names, package names, and command-line arguments all use backtick inline code.
- Exception: chapter-6.md occasionally italicizes terms that other chapters would code-format (e.g., "`onPress` fires consistently" — this is correct; no violation found).

---

*End of review pass 1.*

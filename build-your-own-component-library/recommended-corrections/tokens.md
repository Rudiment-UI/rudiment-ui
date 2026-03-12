```css
@import 'tailwindcss';
@import '../tokens/build/tokens.css';
@import './styles/layouts.css';

@theme inline {
  /* Brand & Semantic Colors (cleaned naming) */
  --color-brand-primary: var(--token-color-brand-primary);
  --color-brand-primary-hover: var(--token-color-brand-primary-hover);
  --color-brand-primary-active: var(--token-color-brand-primary-active);

  --color-text-default: var(--token-color-text-default);
  --color-text-subtle: var(--token-color-text-subtle);
  --color-text-disabled: var(--token-color-text-disabled);
  --color-text-on-brand: var(--token-color-text-on-brand);

  --color-surface: var(--token-color-background-surface);
  --color-surface-raised: var(--token-color-background-surface-raised);
  --color-overlay: var(--token-color-background-overlay);

  --color-border-default: var(--token-color-border-default);
  --color-border-focus: var(--token-color-border-focus);
  --color-border-error: var(--token-color-border-error);

  --color-feedback-error: var(--token-color-feedback-error);
  --color-feedback-success: var(--token-color-feedback-success);
  --color-feedback-warning: var(--token-color-feedback-warning);

  /* Full neutral palette (enables bg-neutral-900, text-neutral-500, etc.) */
  --color-neutral-0: var(--token-color-neutral-0);
  --color-neutral-50: var(--token-color-neutral-50);
  --color-neutral-100: var(--token-color-neutral-100);
  --color-neutral-200: var(--token-color-neutral-200);
  --color-neutral-300: var(--token-color-neutral-300);
  --color-neutral-400: var(--token-color-neutral-400);
  --color-neutral-500: var(--token-color-neutral-500);
  --color-neutral-600: var(--token-color-neutral-600);
  --color-neutral-700: var(--token-color-neutral-700);
  --color-neutral-800: var(--token-color-neutral-800);
  --color-neutral-900: var(--token-color-neutral-900);

  /* Typography – all values from your tokens */
  --font-sans: var(--token-font-family-sans);
  --font-mono: var(--token-font-family-mono);

  --font-size-xs: var(--token-font-size-xs);
  --font-size-sm: var(--token-font-size-sm);
  --font-size-base: var(--token-font-size-base);
  --font-size-lg: var(--token-font-size-lg);
  --font-size-xl: var(--token-font-size-xl);
  --font-size-2xl: var(--token-font-size-2xl);
  --font-size-3xl: var(--token-font-size-3xl);
  --font-size-4xl: var(--token-font-size-4xl);

  --font-weight-regular: var(--token-font-weight-regular);
  --font-weight-medium: var(--token-font-weight-medium);
  --font-weight-semibold: var(--token-font-weight-semibold);
  --font-weight-bold: var(--token-font-weight-bold);

  --line-height-tight: var(--token-font-lineheight-tight);
  --line-height-normal: var(--token-font-lineheight-normal);
  --line-height-relaxed: var(--token-font-lineheight-relaxed);

  /* Radius (already correct) */
  --radius-sm: var(--token-radius-sm);
  --radius-md: var(--token-radius-md);
  --radius-lg: var(--token-radius-lg);
  --radius-full: var(--token-radius-full);
}
```

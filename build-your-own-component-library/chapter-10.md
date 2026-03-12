## Chapter 10: Testing accessible components

Tests give you confidence to change things. In a component library, that confidence matters more than usual, because a regression in one component affects every consumer of the library. This chapter sets up the testing tools and establishes what to test for each component type.

### Setup

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom vitest-axe
```

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

Create `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'
```

This extends Vitest's `expect` with DOM matchers (`toBeInTheDocument`, `toHaveClass`, `toHaveAttribute`) and axe-core matchers (`toHaveNoViolations`).

### The two categories of tests

Layout primitive tests verify that the React component correctly sets up the CSS classes and custom properties that the CSS depends on. They don't test the visual layout itself (that's the browser's job).

UI component tests verify behavior: keyboard interaction, ARIA attributes, focus management, and the absence of axe-core violations. They test that the component is usable by keyboard and screen reader users, not just mouse users.

### Testing layout primitives

Layout primitive tests are straightforward. They confirm:

1. The component renders its children.
2. The correct CSS class is applied.
3. Custom `className` is merged.
4. Props set inline custom properties.
5. Omitted props don't set inline styles (the CSS token fallback is used).
6. The `as` prop changes the rendered element.
7. Modifier classes are applied for boolean props.

The Stack tests from Chapter 4 demonstrate this pattern. Every layout primitive uses the same test structure with primitive-specific additions (Sidebar checks for exactly two children, Switcher checks `limit`).

### Testing UI components

UI component tests have more to verify. Here's the standard checklist, followed by an example:

**Rendering:** The component is findable by role and accessible name.

**Keyboard activation:** The component responds to the correct keys (Enter, Space, Arrow keys, Escape).

**Disabled state:** The component has `aria-disabled="true"` and does not respond to interaction.

**Error state:** The component has `aria-invalid="true"` and the error message is linked via `aria-describedby`.

**Focus behavior:** Focus moves to the expected element on interaction (for example, into the dialog on open, back to the trigger on close).

**axe-core audit:** No automated accessibility violations.

```typescript
// src/components/Input/Input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { describe, it, expect } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with its label as the accessible name', () => {
    render(<Input label="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('accepts text input', async () => {
    const onChange = vi.fn();
    render(<Input label="Email" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenLastCalledWith('hello');
  });

  it('shows the description and links it via aria-describedby', () => {
    render(<Input label="Email" description="Your work email" />);
    const input = screen.getByRole('textbox');
    const description = screen.getByText('Your work email');
    expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(description.id));
  });

  it('shows the error message and sets aria-invalid', () => {
    render(<Input label="Email" errorMessage="Required field" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('hides the description when an error message is present', () => {
    render(<Input label="Email" description="Your work email" errorMessage="Required" />);
    expect(screen.queryByText('Your work email')).not.toBeInTheDocument();
  });

  it('marks the input as required', () => {
    render(<Input label="Email" isRequired />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('disables the input', () => {
    render(<Input label="Email" isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Input label="Email" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations in error state', async () => {
    const { container } = render(<Input label="Email" errorMessage="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
```

Notice the testing approach: every assertion uses accessible queries (`getByRole`, `getByText`) or ARIA attributes (`aria-invalid`, `aria-describedby`, `aria-required`). No test queries by CSS class name or internal DOM structure. This is deliberate. If you refactor the component's markup, the tests still pass as long as the behavior and accessibility contract are preserved. Testing implementation details couples your tests to your markup and makes refactoring painful.

### Running tests

Add scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

```bash
npm test                    # Run all tests once
npm run test:watch          # Re-run on file changes
npx vitest Input            # Run tests for a specific component
npm run test:coverage       # Generate a coverage report
```

### Coverage targets

| Category          | Target                                                      |
| ----------------- | ----------------------------------------------------------- |
| Layout primitives | 100% of props, class application, custom property injection |
| UI components     | Every keyboard path, every ARIA attribute, every state      |
| axe-core          | Every component passes with zero violations                 |
| Visual regression | Deferred to a future release                                |

Full coverage of accessible behavior is more valuable than full line coverage. A test suite that verifies every keyboard path and ARIA attribute catches the regressions that matter most to component library consumers.

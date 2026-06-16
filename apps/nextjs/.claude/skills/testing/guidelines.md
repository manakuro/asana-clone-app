# Testing guidelines — apps/nextjs

## Project structure

```
// vitest.config.ts (monorepo root)
//
// | Project     | Pattern                    | Environment | Purpose                                                      |
// |-------------|----------------------------|-------------|--------------------------------------------------------------|
// | unit        | *.unit.test.ts(x)          | happy-dom   | Pure logic: utility functions, custom hooks, data transforms |
// | integration | *.integration.test.tsx     | happy-dom   | User flows across components with MSW (async, routing, auth) |
// | storybook   | *.stories.tsx              | browser     | Visual states, a11y, and interaction tests per component     |
//
// Guideline:
// - unit        → no UI involved; test fails? tell the engineer.
// - integration → MSW-mocked API + multi-component flow; test fails? tell the engineer.
// - storybook   → each visual state (loading/error/empty/success) + a11y; test fails? tell the designer.
//
// Do NOT duplicate across projects:
// - Visual states (loading, error, empty)  → storybook only
// - Validation logic / data transforms     → unit only
// - Full async flow (submit → redirect)    → integration only
```

---

## Decision rules

### Use unit test when
- No UI is involved (pure functions, custom hooks, data transforms)
- The logic would be the same regardless of how it renders

```ts
// src/lib/formatPrice.unit.test.ts
import { formatPrice } from './formatPrice'

test('formats JPY without decimal', () => {
  expect(formatPrice(1980, 'JPY')).toBe('¥1,980')
})
```

```ts
// src/hooks/useDebounce.unit.test.ts
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

test('returns debounced value after delay', async () => {
  const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
    initialProps: { value: 'a' },
  })
  rerender({ value: 'ab' })
  expect(result.current).toBe('a')
  await act(async () => { await new Promise(r => setTimeout(r, 300)) })
  expect(result.current).toBe('ab')
})
```

### Use storybook when
- The component has 2+ distinct visual states
- You need to verify a11y (axe-core runs automatically)
- You want to document what a state looks like for designers

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from './Button'

const meta = { component: Button } satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { label: '送信' } }
export const Disabled: Story = { args: { label: '送信', disabled: true } }
export const Loading: Story = {
  args: { label: '送信中...', loading: true },
  play: async ({ canvasElement }) => {
    const { within } = await import('@storybook/test')
    const btn = within(canvasElement).getByRole('button')
    await expect(btn).toBeDisabled()
  },
}
```

### Use integration test when
- The test involves async API calls (mock with MSW)
- Multiple components work together to complete a flow
- You're testing routing, redirects, or auth behavior

```tsx
// src/features/search/Search.integration.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'
import { SearchPage } from './SearchPage'

test('入力して検索すると結果が表示される', async () => {
  server.use(
    http.get('/api/search', () =>
      HttpResponse.json({ items: [{ id: 1, name: '結果A' }] })
    )
  )
  render(<SearchPage />)

  await userEvent.type(screen.getByRole('searchbox'), 'キーワード')
  await userEvent.click(screen.getByRole('button', { name: '検索' }))

  expect(await screen.findByText('結果A')).toBeInTheDocument()
})
```

---

## Use both storybook + integration when

A feature has all of the following:
1. 3+ visual states (loading / empty / error / success)
2. Async API calls that drive state transitions
3. Multiple components working together

**Pattern**: split the responsibility clearly.

```
SearchPage feature
├── storybook → ResultList: Loading, Empty, Error, HasResults states
└── integration → SearchPage: type → submit → API → results appear
```

Do NOT write the same assertion in both. The storybook verifies the
visual shape of each state. The integration test verifies the transition
between states driven by real async behavior.

---

## What NOT to duplicate

| Concern                        | Owner            | Never also write in  |
|-------------------------------|------------------|----------------------|
| Visual states (loading/error)  | storybook        | integration          |
| Validation logic               | unit             | storybook play fn    |
| Data transform / mapping       | unit             | integration          |
| Full async flow (submit→result)| integration      | storybook            |
| a11y checks                    | storybook (axe)  | integration          |

---

## Layer boundaries

```
unit + integration  = component logic layer  (fast, no real browser)
storybook           = visual / interaction layer (real browser via Playwright)
E2E (Playwright)    = app-wide flows with real server

Storybook ≠ E2E:
  - Storybook tests single/few components with mocked data
  - E2E tests the full app including real API and database
  - Keep E2E to critical paths only (login flow, checkout, etc.)
```

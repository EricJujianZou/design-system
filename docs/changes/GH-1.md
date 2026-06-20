# GH-1: Input primitive

## What shipped

Added an `Input` text-field primitive to the design system, mirroring the existing `Button` primitive's shape (`forwardRef` + `cn(...)` className merge) and styled entirely from `tailwind-preset.cjs` tokens per `DESIGN.md`. Unlike `Button`, `Input` has no variant axes, so it uses a single base class string rather than a `cva` variant map.

## Surface changes

### Components / pages

- **`Input`** (`src/components/input.tsx`) — a `React.forwardRef<HTMLInputElement, InputProps>` over the native `<input>`. `InputProps = React.InputHTMLAttributes<HTMLInputElement>`. Defaults `type="text"` (overridable), spreads `...props`, and merges a caller `className` via `cn(inputBaseClasses, className)`.
  - Base styling (tokens only): `bg-canvas`, `text-default`, `border border-hairline`, `rounded-control`, `px-3.5 py-3` (≈14px/12px padding), `placeholder:text-secondary`, `focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent`, `disabled:cursor-not-allowed disabled:opacity-50`.

## How it was verified

- "`forwardRef<HTMLInputElement>` over native `<input>`, spreads `...props`, merges `className` via `cn`, follows Button shape" → `input.tsx:9-18` matches Button's structure; confirmed by typecheck and the `merges a caller className` test (`toHaveClass("w-full")`).
- "Default styling uses only preset tokens, ~12×14 padding, honors `disabled`" → `inputBaseClasses` string reviewed against `tailwind-preset.cjs`; `honors disabled` test asserts `toBeDisabled()` and that typed input stays empty.
- "`Input`/`InputProps` re-exported from `src/index.ts`" → `src/index.ts:3-4` adds both exports alongside Button's.
- "vitest+RTL test covers render, typed value, disabled, className merge" → `src/components/input.test.tsx`, 4 tests, all passing (`npm test`: 10/10 across 2 files).
- "lint/typecheck/test/build all green" → all four commands exited 0 in the test stage; build emitted CJS/ESM/DTS successfully.

## Review notes

- A plain base-class string was used instead of an empty `cva` variant map, since `Input` has no variant axes — avoids an indirection with nothing to select. Documented as a deliberate rejection of the cva-everywhere pattern in the plan stage.
- Input's focus ring uses full-opacity `ring-accent`, while Button uses `ring-accent/40`. This matches the acceptance criterion as written (no `/40` specified); flagged in review as a non-blocking token-consistency note for future visual alignment, not a defect.
- No Playwright available this run, so visual verification relied on markup/style review rather than a rendered screenshot.

## File map

- `src/components/input.tsx` — new `Input` primitive.
- `src/components/input.test.tsx` — new vitest/RTL test suite for `Input`.
- `src/index.ts` — re-exports `Input` and `InputProps`.

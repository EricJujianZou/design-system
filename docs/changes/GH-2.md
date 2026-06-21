# GH-2: Card primitive

## What shipped

A `Card` surface primitive plus `CardHeader`/`CardContent`/`CardFooter`
sub-parts, following the `Button` reference primitive's shape
(`forwardRef<HTMLDivElement>` + `cn(...)` className merge). Styling pulls
exclusively from `tailwind-preset.cjs` tokens per the DESIGN.md Card spec.

## Surface changes

### Components / pages

- **`Card`** (`src/components/card.tsx:9-13`) — `forwardRef<HTMLDivElement, CardProps>` over a `<div>`. Default classes: `bg-canvas text-default border border-hairline rounded-card shadow-sm p-6 font-sans` (white surface, 1px hairline border, 12px radius, shadow-sm, 24px padding).
- **`CardHeader`** (`card.tsx:17-21`) — same shape, adds `flex flex-col gap-1`.
- **`CardContent`** (`card.tsx:25-29`) — same shape, no base classes (content area takes no surface styling of its own).
- **`CardFooter`** (`card.tsx:33-37`) — same shape, adds `flex items-center gap-3`.

All four spread `...props`, merge a caller `className` via `cn(...)` (caller classes win), and set `displayName`.

## How it was verified

| Acceptance criterion | Evidence |
|---|---|
| Card/sub-parts are `forwardRef<HTMLDivElement>` over `div`, spread `...props`, merge `className` via `cn`, mirroring Button | `card.tsx:9-39` — all four components match this shape exactly |
| Default styling uses only preset tokens (`bg-canvas`, `border-hairline`, `rounded-card`, `shadow-sm`, `p-6`) | `card.tsx:5`; asserted by `card.test.tsx` test `"applies default surface styling"` (checks `bg-canvas`, `border-hairline`, `rounded-card`, `shadow-sm` classes) |
| All parts + prop types exported from `src/index.ts` | `index.ts:5-6` — `Card, CardHeader, CardContent, CardFooter` and `CardProps` type exported |
| vitest test renders children, composes header/content/footer, merges className | `card.test.tsx` — 4 tests: `"renders children"`, `"composes header, content, and footer"`, `"applies default surface styling"`, `"merges a caller className"` — all passing |
| `lint`, `typecheck`, `test`, `build` all green | test-stage run: lint clean, typecheck clean, 14/14 tests passed across 3 files, build succeeded (ESM/CJS/DTS) |

## Review notes

- `CardContent` intentionally has no base classes since the content area needs no surface styling of its own (flagged and accepted in review, not a defect).
- No demo app/route exists for this library primitive, so visual verification was done by inspecting the rendered token classes against the DESIGN.md Card spec rather than a browser screenshot.

## File map

- `src/components/card.tsx` — new `Card`, `CardHeader`, `CardContent`, `CardFooter` primitives.
- `src/components/card.test.tsx` — new vitest + Testing Library suite for the Card family.
- `src/index.ts` — re-exports `Card`/sub-parts and `CardProps`.
- `prd.json` — ticket bookkeeping (acceptance criteria populated, status open → in_progress).

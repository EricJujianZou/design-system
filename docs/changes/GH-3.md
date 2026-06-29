# GH-3: Typography primitive

## What shipped

A `Text` typography primitive that renders the DESIGN.md type scale
(Display/H1/H2/H3/Body/Small/Caption) via a `cva` variant map, following
the `Button` reference primitive's shape (`forwardRef` + `cn(...)`
className merge). It is polymorphic via an `as` prop so headings can
render the correct element while keeping the variant's styling.

## Surface changes

### Components / pages

- **`Text`** (`src/components/text.tsx:40-51`) — `forwardRef<HTMLElement, TextProps>` over a dynamic `Comp` element. `textVariants` (`text.tsx:5-20`) encodes all seven scale entries as Tailwind arbitrary-value classes: `display` 40px/1.15, `h1` 30px/1.2, `h2` 24px/1.3 (all `font-semibold` + `tracking-[-0.01em]`), `h3` 20px/1.35 `font-semibold` (no tracking — tracking applies only ≥24px per DESIGN.md), `body` 16px/1.55 `font-normal`, `small` 14px/1.5 `font-medium`, `caption` 12px/1.4 `font-normal`.
- A `defaultElement` record (`text.tsx:22-33`) maps each variant to a sensible default tag (`display`/`h1`→`h1`, `h2`→`h2`, `h3`→`h3`, `body`/`small`→`p`, `caption`→`span`). The `as` prop overrides this default; the resolved `Comp` receives `cn(textVariants({ variant }), className)` so a caller `className` merges in (caller wins via `twMerge`).

## How it was verified

| Acceptance criterion | Evidence |
|---|---|
| `cva` map encodes the DESIGN.md scale with weights 400/500/600 and heading tracking `-0.01em` | `text.tsx:5-20` matches DESIGN.md exactly; `text.test.tsx` per-variant class assertions including a negative case confirming `h3` (20px) has no `tracking-[-0.01em]` |
| Polymorphic `as` prop selects the element, sensible default per variant, className merged via `cn` | `text.tsx:22-46`; `text.test.tsx` tests "renders the default element per variant", "overrides the default tag via the as prop", "merges a caller className" |
| Component and prop types exported from `src/index.ts` | `index.ts:7-8` — `export { Text, textVariants }` and `export type { TextProps }` |
| vitest + Testing Library test covers variant classes, `as` override, className merge | `text.test.tsx` — 10/10 tests passing (24/24 total across the suite) |
| `lint`, `typecheck`, `test`, `build` all green | test-stage run: lint clean, typecheck clean, 24/24 tests passed across 4 files, build succeeded (CJS+ESM+DTS) |

## Review notes

- `TextProps` extends `React.HTMLAttributes<HTMLElement>` rather than a
  fully generic polymorphic type, so element-specific props (e.g. `href`
  when `as="a"`) are not typed. This was an explicit, accepted tradeoff
  (see plan stage) to keep the component in the Button shape rather than
  reaching for generic `as`-with-ref machinery.
- No demo app/route exists for this library primitive, so visual
  verification was done by inspecting rendered class strings against the
  DESIGN.md scale rather than a browser screenshot.

## File map

- `src/components/text.tsx` — new `Text` primitive and `textVariants` cva map.
- `src/components/text.test.tsx` — new vitest + Testing Library suite for `Text`.
- `src/index.ts` — re-exports `Text`, `textVariants`, and `TextProps`.

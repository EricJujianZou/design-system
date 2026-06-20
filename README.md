# @ericjujianzou/design-system

A blue & white, minimalist React design system — shared primitives, design
tokens, and taste so frontend look-and-feel is reused across projects instead of
re-derived each time.

- **Stack:** React + TypeScript + Tailwind.
- **Taste:** [`DESIGN.md`](./DESIGN.md) (human-readable) ↔ `tailwind-preset.js`
  (machine-readable). Keep them in sync.
- **License:** MIT. Components are adapted from MIT sources only (see
  [`references.md`](./references.md)).

## Install

Until this is published to npm, install straight from GitHub:

```bash
npm install github:EricJujianZou/design-system react react-dom
```

`react` and `react-dom` (>=18) are peer dependencies.

## Usage

Wire the Tailwind preset and include the package in your `content` so its class
names are not purged:

```js
// tailwind.config.js
module.exports = {
  presets: [require("@ericjujianzou/design-system/tailwind-preset")],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@ericjujianzou/design-system/dist/**/*.{js,cjs}",
  ],
};
```

```tsx
import { Button } from "@ericjujianzou/design-system";

export function Example() {
  return (
    <div className="flex gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost" size="sm">Ghost</Button>
    </div>
  );
}
```

## Develop

```bash
npm install
npm test         # vitest + Testing Library
npm run typecheck
npm run lint
npm run build    # tsup → dist/ (esm + cjs + d.ts)
```

## Components

| Component | Status |
|---|---|
| `Button` | ✅ reference primitive |
| `Input`  | planned |
| `Card`   | planned |
| `Typography` | planned |

New primitives copy the `Button` pattern: `cva` variants + `forwardRef` +
`cn(..., className)`, a vitest test, and tokens from `DESIGN.md`.

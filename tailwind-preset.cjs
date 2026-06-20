/**
 * Tailwind preset — the machine-readable half of DESIGN.md. Keep token values
 * in sync with DESIGN.md (the human-readable source of taste).
 *
 * CommonJS (.cjs) so it can be `require()`d from a tailwind.config in either a
 * CJS or ESM project. Consumers wire it in:
 *   presets: [require("@ericjujianzou/design-system/tailwind-preset")]
 * and add the package to `content` so its class names are not purged:
 *   content: ["./node_modules/@ericjujianzou/design-system/dist/**\/*.{js,cjs}"]
 *
 * @type {import("tailwindcss").Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        subtle: "#f6f8fb",
        default: "#0f172a",
        secondary: "#5b6675",
        hairline: "#e6eaf0",
        accent: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
          tint: "#eef3ff",
        },
        success: "#15a34a",
        warning: "#c2700a",
        danger: "#dc2626",
      },
      borderRadius: {
        control: "8px",
        card: "12px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(15,23,42,0.06)",
        md: "0 4px 12px rgba(15,23,42,0.08)",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
};

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Button — the reference primitive. Adapted from shadcn/ui (MIT), restyled to
 * the DESIGN.md tokens. Every subsequent primitive should copy this shape:
 * cva variants + forwardRef + `cn(..., className)` so callers can extend.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center font-sans font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-canvas hover:bg-accent-hover",
        secondary:
          "bg-canvas text-default border border-hairline hover:bg-subtle",
        ghost: "bg-transparent text-secondary hover:bg-subtle",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-control",
        md: "h-10 px-4 text-base rounded-control",
        lg: "h-12 px-6 text-base rounded-control",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = "Button";

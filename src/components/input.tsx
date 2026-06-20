import * as React from "react";
import { cn } from "../lib/utils";

const inputBaseClasses =
  "flex w-full bg-canvas text-default border border-hairline rounded-control px-3.5 py-3 text-base font-sans placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(inputBaseClasses, className)}
      {...props}
    />
  ),
);

Input.displayName = "Input";

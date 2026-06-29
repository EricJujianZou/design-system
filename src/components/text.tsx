import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const textVariants = cva("font-sans text-default", {
  variants: {
    variant: {
      display: "text-[40px] leading-[1.15] font-semibold tracking-[-0.01em]",
      h1: "text-[30px] leading-[1.2] font-semibold tracking-[-0.01em]",
      h2: "text-[24px] leading-[1.3] font-semibold tracking-[-0.01em]",
      h3: "text-[20px] leading-[1.35] font-semibold",
      body: "text-[16px] leading-[1.55] font-normal",
      small: "text-[14px] leading-[1.5] font-medium",
      caption: "text-[12px] leading-[1.4] font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

const defaultElement: Record<
  NonNullable<VariantProps<typeof textVariants>["variant"]>,
  React.ElementType
> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "p",
  caption: "span",
};

export type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: React.ElementType;
  };

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as, variant, className, ...props }, ref) => {
    const Comp = (as ?? defaultElement[variant ?? "body"]) as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Text.displayName = "Text";

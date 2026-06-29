import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Text } from "./text";

describe("Text", () => {
  it("renders the display variant classes", () => {
    render(<Text variant="display">Display</Text>);
    expect(screen.getByText("Display")).toHaveClass(
      "text-[40px]",
      "leading-[1.15]",
      "font-semibold",
      "tracking-[-0.01em]",
    );
  });

  it("renders the h1 variant classes", () => {
    render(<Text variant="h1">Heading 1</Text>);
    expect(screen.getByText("Heading 1")).toHaveClass(
      "text-[30px]",
      "leading-[1.2]",
      "font-semibold",
      "tracking-[-0.01em]",
    );
  });

  it("renders the h2 variant classes", () => {
    render(<Text variant="h2">Heading 2</Text>);
    expect(screen.getByText("Heading 2")).toHaveClass(
      "text-[24px]",
      "leading-[1.3]",
      "font-semibold",
      "tracking-[-0.01em]",
    );
  });

  it("renders the h3 variant classes without heading tracking", () => {
    render(<Text variant="h3">Heading 3</Text>);
    const el = screen.getByText("Heading 3");
    expect(el).toHaveClass("text-[20px]", "leading-[1.35]", "font-semibold");
    expect(el).not.toHaveClass("tracking-[-0.01em]");
  });

  it("renders the body variant classes", () => {
    render(<Text variant="body">Body</Text>);
    expect(screen.getByText("Body")).toHaveClass(
      "text-[16px]",
      "leading-[1.55]",
      "font-normal",
    );
  });

  it("renders the small variant classes", () => {
    render(<Text variant="small">Small</Text>);
    expect(screen.getByText("Small")).toHaveClass(
      "text-[14px]",
      "leading-[1.5]",
      "font-medium",
    );
  });

  it("renders the caption variant classes", () => {
    render(<Text variant="caption">Caption</Text>);
    expect(screen.getByText("Caption")).toHaveClass(
      "text-[12px]",
      "leading-[1.4]",
      "font-normal",
    );
  });

  it("renders the default element per variant", () => {
    render(<Text variant="h2">Heading</Text>);
    expect(screen.getByText("Heading").tagName).toBe("H2");

    render(<Text>Paragraph</Text>);
    expect(screen.getByText("Paragraph").tagName).toBe("P");

    render(<Text variant="caption">Footnote</Text>);
    expect(screen.getByText("Footnote").tagName).toBe("SPAN");
  });

  it("overrides the default tag via the as prop", () => {
    render(
      <Text variant="h1" as="span">
        Span Heading
      </Text>,
    );
    expect(screen.getByText("Span Heading").tagName).toBe("SPAN");
  });

  it("merges a caller className", () => {
    render(<Text className="mt-4">Hello</Text>);
    expect(screen.getByText("Hello")).toHaveClass("mt-4");
  });
});

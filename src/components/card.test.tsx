import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardContent, CardFooter } from "./card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("composes header, content, and footer", () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies default surface styling", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toHaveClass(
      "bg-canvas",
      "border-hairline",
      "rounded-card",
      "shadow-sm",
    );
  });

  it("merges a caller className", () => {
    render(<Card className="mt-4">Hello</Card>);
    expect(screen.getByText("Hello")).toHaveClass("mt-4");
  });
});

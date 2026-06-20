import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input", () => {
  it("renders", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts a typed value", async () => {
    render(<Input placeholder="Email" />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("honors disabled", async () => {
    render(<Input placeholder="Email" disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("");
  });

  it("merges a caller className", () => {
    render(<Input className="w-full" />);
    expect(screen.getByRole("textbox")).toHaveClass("w-full");
  });
});

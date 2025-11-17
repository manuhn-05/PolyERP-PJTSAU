import React from "react";
import { render, screen } from "@testing-library/react";
import {
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card"; // adjust import path if needed

describe("Card Components", () => {
  describe("CardDescription", () => {
    it("renders correctly with default classes", () => {
      render(<CardDescription>Test Description</CardDescription>);
      const element = screen.getByText("Test Description");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-slot", "card-description");
      expect(element).toHaveClass("text-muted-foreground", "text-sm");
    });

    it("merges additional className properly", () => {
      render(
        <CardDescription className="extra-class">Custom</CardDescription>
      );
      const element = screen.getByText("Custom");
      expect(element).toHaveClass("extra-class");
    });
  });

  describe("CardAction", () => {
    it("renders correctly with default classes", () => {
      render(<CardAction>Action</CardAction>);
      const element = screen.getByText("Action");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-slot", "card-action");
      expect(element).toHaveClass(
        "col-start-2",
        "row-span-2",
        "row-start-1",
        "self-start",
        "justify-self-end"
      );
    });

    it("accepts custom className", () => {
      render(<CardAction className="custom-action">Action Btn</CardAction>);
      expect(screen.getByText("Action Btn")).toHaveClass("custom-action");
    });
  });

  describe("CardFooter", () => {
    it("renders with correct structure", () => {
      render(<CardFooter>Footer Content</CardFooter>);
      const element = screen.getByText("Footer Content");
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute("data-slot", "card-footer");
      expect(element).toHaveClass("flex", "items-center", "px-6");
    });

    it("merges custom className and props", () => {
      render(
        <CardFooter className="bg-red-500" data-testid="footer">
          Custom Footer
        </CardFooter>
      );
      const element = screen.getByTestId("footer");
      expect(element).toHaveClass("bg-red-500");
      expect(element).toHaveTextContent("Custom Footer");
    });
  });
});

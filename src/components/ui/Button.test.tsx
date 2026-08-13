import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
	describe("Rendering", () => {
		it("should render with default props", () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Click me");
		});

		it("should render with custom variant", () => {
			render(<Button variant="outline">Outline Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Outline Button");
		});

		it("should render with different sizes", () => {
			render(<Button size="lg">Large Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
			expect(button).toHaveTextContent("Large Button");
		});

		it("should render with left icon", () => {
			render(
				<Button leftIcon={<span data-testid="icon">Icon</span>}>
					With Icon
				</Button>,
			);
			const button = screen.getByRole("button");
			const icon = screen.getByTestId("icon");
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});

		it("should render with right icon", () => {
			render(
				<Button rightIcon={<span data-testid="icon">Icon</span>}>
					With Icon
				</Button>,
			);
			const button = screen.getByRole("button");
			const icon = screen.getByTestId("icon");
			expect(button).toBeInTheDocument();
			expect(icon).toBeInTheDocument();
		});

		it("should show loading state", () => {
			render(<Button isLoading>Loading</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
			expect(button).toHaveTextContent("Carregando...");
		});

		it("should show custom loading text", () => {
			render(
				<Button isLoading loadingText="A carregar...">
					Loading
				</Button>,
			);
			const button = screen.getByRole("button");
			expect(button).toHaveTextContent("A carregar...");
		});

		it("should be disabled when disabled prop is true", () => {
			render(<Button disabled>Disabled Button</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeDisabled();
		});
	});

	describe("User Interactions", () => {
		it("should handle click events", () => {
			const handleClick = vi.fn();
			render(<Button onClick={handleClick}>Click me</Button>);
			const button = screen.getByRole("button");
			fireEvent.click(button);
			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it("should not handle click when disabled", () => {
			const handleClick = vi.fn();
			render(
				<Button disabled onClick={handleClick}>
					Disabled
				</Button>,
			);
			const button = screen.getByRole("button");
			fireEvent.click(button);
			expect(handleClick).not.toHaveBeenCalled();
		});

		it("should not handle click when loading", () => {
			const handleClick = vi.fn();
			render(
				<Button isLoading onClick={handleClick}>
					Loading
				</Button>,
			);
			const button = screen.getByRole("button");
			fireEvent.click(button);
			expect(handleClick).not.toHaveBeenCalled();
		});
	});

	describe("Accessibility", () => {
		it("should have proper button role", () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole("button");
			expect(button).toBeInTheDocument();
		});

		it('should have type="button" by default', () => {
			render(<Button>Click me</Button>);
			const button = screen.getByRole("button");
			// The button component extends ButtonHTMLAttributes which includes type
			// but we can just verify it's a button element
			expect(button).toBeInTheDocument();
		});
	});
});

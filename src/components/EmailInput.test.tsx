import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EmailInput } from "#/components/EmailInput";

describe("EmailInput", () => {
	it("renders email input with label", () => {
		const onChange = vi.fn();
		render(<EmailInput value="" onChange={onChange} />);

		expect(screen.getByLabelText("Email ou Nome de Utilizador")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("exemplo@email.com")).toBeInTheDocument();
	});

	it("renders user icon", () => {
		const onChange = vi.fn();
		render(<EmailInput value="" onChange={onChange} />);

		const svgs = screen.getAllByRole("img", { hidden: true });
		expect(svgs.length).toBeGreaterThan(0);
	});

	it("calls onChange when input value changes", () => {
		const onChange = vi.fn();
		render(<EmailInput value="" onChange={onChange} />);

		const input = screen.getByPlaceholderText("exemplo@email.com") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "test@example.com" } });

		expect(onChange).toHaveBeenCalledWith("test@example.com");
	});

	it("displays the current value", () => {
		const onChange = vi.fn();
		render(<EmailInput value="user@example.com" onChange={onChange} />);

		const input = screen.getByPlaceholderText("exemplo@email.com") as HTMLInputElement;
		expect(input.value).toBe("user@example.com");
	});
});

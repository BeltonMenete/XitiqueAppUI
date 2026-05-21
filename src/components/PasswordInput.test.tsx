import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordInput } from "#/components/PasswordInput";

describe("PasswordInput", () => {
	it("renders password input with label", () => {
		const onChange = vi.fn();
		const onToggleShow = vi.fn();
		render(
			<PasswordInput
				value=""
				onChange={onChange}
				showPassword={false}
				onToggleShow={onToggleShow}
			/>
		);

		expect(screen.getByLabelText("Palavra-passe")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
	});

	it("toggles password visibility", () => {
		const onChange = vi.fn();
		const onToggleShow = vi.fn();
		render(
			<PasswordInput
				value="password"
				onChange={onChange}
				showPassword={false}
				onToggleShow={onToggleShow}
			/>
		);

		const input = screen.getByPlaceholderText("••••••••") as HTMLInputElement;
		expect(input.type).toBe("password");

		const buttons = screen.getAllByRole("button");
		fireEvent.click(buttons[0]);

		expect(onToggleShow).toHaveBeenCalled();
	});

	it("calls onChange when input value changes", () => {
		const onChange = vi.fn();
		const onToggleShow = vi.fn();
		render(
			<PasswordInput
				value=""
				onChange={onChange}
				showPassword={false}
				onToggleShow={onToggleShow}
			/>
		);

		const input = screen.getByPlaceholderText("••••••••") as HTMLInputElement;
		fireEvent.change(input, { target: { value: "newpassword" } });

		expect(onChange).toHaveBeenCalledWith("newpassword");
	});

	it("displays password as text when showPassword is true", () => {
		const onChange = vi.fn();
		const onToggleShow = vi.fn();
		const { rerender } = render(
			<PasswordInput
				value="password123"
				onChange={onChange}
				showPassword={false}
				onToggleShow={onToggleShow}
			/>
		);

		let input = screen.getByPlaceholderText("••••••••") as HTMLInputElement;
		expect(input.type).toBe("password");

		rerender(
			<PasswordInput
				value="password123"
				onChange={onChange}
				showPassword={true}
				onToggleShow={onToggleShow}
			/>
		);

		input = screen.getByPlaceholderText("••••••••") as HTMLInputElement;
		expect(input.type).toBe("text");
		expect(input.value).toBe("password123");
	});
});

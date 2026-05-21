import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginHeader } from "#/components/LoginHeader";

describe("LoginHeader", () => {
	it("renders app name", () => {
		render(<LoginHeader />);
		expect(screen.getByText("Xitique")).toBeInTheDocument();
	});

	it("renders logo image", () => {
		render(<LoginHeader />);
		const logo = screen.getByAltText("Xitique");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("src", "/xitique-logo.svg");
	});

	it("renders create account link", () => {
		render(<LoginHeader />);
		const link = screen.getByText("Criar conta");
		expect(link).toBeInTheDocument();
	});
});

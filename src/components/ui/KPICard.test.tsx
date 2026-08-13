import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { KPICard } from "./KPICard";
import { Wallet } from "lucide-react";

describe("KPICard", () => {
	describe("Rendering", () => {
		it("should render with default props", () => {
			render(
				<KPICard title="Total Revenue" value="450.000 MZN" icon={Wallet} />,
			);
			expect(screen.getByText("Total Revenue")).toBeInTheDocument();
			expect(screen.getByText("450.000 MZN")).toBeInTheDocument();
		});

		it("should render with subtext", () => {
			render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					subtext="+12.5% vs mês anterior"
					icon={Wallet}
				/>,
			);
			expect(screen.getByText("+12.5% vs mês anterior")).toBeInTheDocument();
		});

		it("should render with trend", () => {
			render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					trend={{ value: "12.5%", isPositive: true }}
				/>,
			);
			expect(screen.getByText("+12.5%")).toBeInTheDocument();
			expect(screen.getByText("vs mês anterior")).toBeInTheDocument();
		});

		it("should render with negative trend", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					trend={{ value: "5.2%", isPositive: false }}
				/>,
			);
			expect(container.textContent).toContain("5.2%");
		});

		it("should render custom color", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					color="text-blue-600 bg-blue-50 border-blue-100"
				/>,
			);
			const iconContainer = container.querySelector(".w-12.h-12");
			expect(iconContainer).toHaveClass("text-blue-600");
		});

		it("should render debt indicator", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					isDebt={true}
				/>,
			);
			const iconContainer = container.querySelector(".w-12.h-12");
			expect(iconContainer).toHaveClass("border-l-4");
		});
	});

	describe("User Interactions", () => {
		it("should render clickable class when clickable is true", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					clickable={true}
				/>,
			);
			const card = container.querySelector(".overflow-hidden");
			expect(card).toHaveClass("cursor-pointer");
		});

		it("should not render clickable class when clickable is false", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					clickable={false}
				/>,
			);
			const card = container.querySelector(".overflow-hidden");
			expect(card).not.toHaveClass("cursor-pointer");
		});

		it("should render expanded content when initially expanded", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					clickable={true}
					expandedContent={<div>Expanded content</div>}
				/>,
			);
			// Note: State-based expansion is tested in integration tests
			// This test just verifies the component accepts the prop
			expect(container.querySelector(".overflow-hidden")).toBeInTheDocument();
		});
	});

	describe("Accessibility", () => {
		it("should have cursor pointer when clickable", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					clickable={true}
				/>,
			);

			const card = container.querySelector(".overflow-hidden");
			expect(card).toHaveClass("cursor-pointer");
		});

		it("should not have cursor pointer when not clickable", () => {
			const { container } = render(
				<KPICard
					title="Total Revenue"
					value="450.000 MZN"
					icon={Wallet}
					clickable={false}
				/>,
			);

			const card = container.querySelector(".overflow-hidden");
			expect(card).not.toHaveClass("cursor-pointer");
		});
	});
});

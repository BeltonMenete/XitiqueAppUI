import { ChevronRight, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "#/lib/design-system";

interface BreadcrumbItem {
	label: string;
	href?: string;
	icon?: React.ReactNode;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	separator?: React.ReactNode;
	className?: string;
}

export function Breadcrumbs({
	items,
	separator = <ChevronRight size={14} />,
	className = "",
}: BreadcrumbsProps) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cn("flex items-center gap-2 text-sm", className)}
		>
			<Link
				to="/"
				className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors"
			>
				<Home size={14} />
			</Link>
			{separator}
			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-2">
					{item.href ? (
						<Link
							to={item.href}
							className={cn(
								"flex items-center gap-1 transition-colors",
								index === items.length - 1
									? "text-slate-900 font-medium"
									: "text-slate-500 hover:text-slate-700",
							)}
						>
							{item.icon}
							{item.label}
						</Link>
					) : (
						<span
							className={cn(
								"flex items-center gap-1",
								index === items.length - 1
									? "text-slate-900 font-medium"
									: "text-slate-500",
							)}
						>
							{item.icon}
							{item.label}
						</span>
					)}
					{index < items.length - 1 && separator}
				</div>
			))}
		</nav>
	);
}

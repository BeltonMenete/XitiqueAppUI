import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { memo, useState } from "react";
import { cn } from "#/lib/design-system";
import { Card, CardContent } from "./Card";

interface KPICardProps {
	title: string;
	value: string;
	subtext?: string;
	icon: LucideIcon;
	color?: string;
	isDebt?: boolean;
	trend?: {
		value: string;
		isPositive: boolean;
	};
	className?: string;
	clickable?: boolean;
	expandedContent?: React.ReactNode;
	variant?: "default" | "compact" | "expanded";
}

export const KPICard = memo(function KPICard({
	title,
	value,
	subtext,
	icon: Icon,
	color = "text-emerald-500 bg-emerald-50 border-emerald-100",
	isDebt = false,
	trend,
	className = "",
	clickable = false,
	expandedContent,
	variant = "default",
}: KPICardProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleClick = () => {
		if (clickable) {
			setIsExpanded(!isExpanded);
		}
	};

	const variantStyles = {
		default: { padding: "p-5", valueSize: "text-2xl", iconSize: "w-12 h-12" },
		compact: { padding: "p-4", valueSize: "text-xl", iconSize: "w-10 h-10" },
		expanded: { padding: "p-6", valueSize: "text-3xl", iconSize: "w-14 h-14" },
	};

	const styles = variantStyles[variant];

	return (
		<Card
			className={cn(
				"overflow-hidden",
				clickable &&
					"hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5",
				className,
			)}
			onClick={handleClick}
		>
			<CardContent className={styles.padding}>
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
								{title}
							</p>
							{clickable && (
								<span className="text-slate-400 transition-transform duration-200">
									{isExpanded ? (
										<ChevronUp size={14} />
									) : (
										<ChevronDown size={14} />
									)}
								</span>
							)}
						</div>
						<h3
							className={cn("font-bold text-slate-900 mb-1", styles.valueSize)}
						>
							{value}
						</h3>
						{subtext && <p className="text-xs text-slate-400">{subtext}</p>}
						{trend && (
							<div className="flex items-center gap-1 mt-2">
								<span
									className={cn(
										"text-xs font-semibold",
										trend.isPositive ? "text-emerald-500" : "text-red-600",
									)}
								>
									{trend.isPositive ? "+" : ""}
									{trend.value}
								</span>
								<span className="text-xs text-slate-400">vs mês anterior</span>
							</div>
						)}
					</div>
					<div
						className={cn(
							"rounded-lg flex items-center justify-center border transition-all duration-200 hover:scale-105",
							styles.iconSize,
							color,
							isDebt && "border-l-4 border-l-red-500",
						)}
					>
						<Icon className="w-6 h-6" />
					</div>
				</div>
				{isExpanded && expandedContent && (
					<div className="mt-4 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
						{expandedContent}
					</div>
				)}
			</CardContent>
		</Card>
	);
});

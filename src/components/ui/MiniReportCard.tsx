import {
	ChevronDown,
	ChevronUp,
	Download,
	Share2,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";
import { Button } from "./Button";
import { Card, CardContent, CardHeader } from "./Card";

interface MiniReportCardProps {
	title: string;
	value: string;
	trend?: {
		value: string;
		isPositive: boolean;
	};
	sparklineData?: number[];
	color?: string;
	isExpanded?: boolean;
	onExpand?: () => void;
	className?: string;
	children?: React.ReactNode;
}

export function MiniReportCard({
	title,
	value,
	trend,
	sparklineData = [],
	color = "text-emerald-600 bg-emerald-50 border-emerald-100",
	isExpanded = false,
	onExpand,
	className = "",
	children,
}: MiniReportCardProps) {
	const [expanded, setExpanded] = useState(isExpanded);

	const handleExpand = () => {
		setExpanded(!expanded);
		onExpand?.();
	};

	const maxSparklineValue = Math.max(...sparklineData, 1);
	const minSparklineValue = Math.min(...sparklineData, 0);

	return (
		<Card
			className={cn(
				"hover:shadow-md transition-shadow cursor-pointer",
				className,
			)}
		>
			<button
				type="button"
				onClick={handleExpand}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleExpand();
					}
				}}
				className="w-full text-left"
			>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold text-slate-700">
							{title}
						</span>
						{expanded ? (
							<ChevronUp size={16} className="text-slate-400" />
						) : (
							<ChevronDown size={16} className="text-slate-400" />
						)}
					</div>
					<div className="flex items-center gap-1">
						<Button
							size="sm"
							variant="ghost"
							leftIcon={<Download size={14} />}
							className="p-1 h-8 w-8"
							onClick={(e) => e.stopPropagation()}
						>
							<span className="sr-only">Download</span>
						</Button>
						<Button
							size="sm"
							variant="ghost"
							leftIcon={<Share2 size={14} />}
							className="p-1 h-8 w-8"
							onClick={(e) => e.stopPropagation()}
						>
							<span className="sr-only">Share</span>
						</Button>
					</div>
				</CardHeader>
			</button>
			<CardContent>
				<div className="flex items-end justify-between">
					<div>
						<div className="text-2xl font-bold text-slate-900">{value}</div>
						{trend && (
							<div
								className={cn(
									"flex items-center gap-1 text-xs mt-1",
									trend.isPositive ? "text-emerald-600" : "text-red-600",
								)}
							>
								{trend.isPositive ? (
									<TrendingUp size={12} />
								) : (
									<TrendingDown size={12} />
								)}
								<span className="font-medium">{trend.value}</span>
							</div>
						)}
					</div>
					{sparklineData.length > 0 && (
						<div className="flex items-end gap-0.5 h-8">
							{sparklineData.map((value) => {
								const height =
									((value - minSparklineValue) /
										(maxSparklineValue - minSparklineValue)) *
									100;
								return (
									<div
										key={`sparkline-point-${value}`}
										className={cn(
											"w-1 rounded-full transition-all hover:opacity-80",
											color.split(" ")[0],
										)}
										style={{ height: `${Math.max(height, 10)}%` }}
										title={`Value: ${value}`}
									/>
								);
							})}
						</div>
					)}
				</div>
				{expanded && children && (
					<div className="mt-4 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
						{children}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

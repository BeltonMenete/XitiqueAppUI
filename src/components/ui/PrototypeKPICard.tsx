import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";

interface PrototypeKPICardProps {
	title: string;
	value: string;
	subtext?: string;
	icon?: React.ReactNode;
	borderColor: "primary" | "success" | "error" | "warning" | "info";
	expanded?: boolean;
	expandedContent?: React.ReactNode;
	clickable?: boolean;
	onClick?: () => void;
}

const borderColorMap = {
	primary: "border-l-4 border-slate-900",
	success: "border-l-4 border-emerald-500",
	error: "border-l-4 border-red-500",
	warning: "border-l-4 border-amber-500",
	info: "border-l-4 border-blue-500",
};

const textColorMap = {
	primary: "text-slate-900",
	success: "text-emerald-600",
	error: "text-red-600",
	warning: "text-amber-600",
	info: "text-blue-600",
};

export function PrototypeKPICard({
	title,
	value,
	subtext,
	icon,
	borderColor,
	expanded = false,
	expandedContent,
	clickable = false,
	onClick,
}: PrototypeKPICardProps) {
	const [isExpanded, setIsExpanded] = useState(expanded);

	const handleClick = () => {
		if (clickable && expandedContent) {
			setIsExpanded(!isExpanded);
		}
		if (onClick) {
			onClick();
		}
	};

	return (
		<>
			{clickable ? (
				<button
					type="button"
					className={cn(
						"bg-slate-50 p-4 rounded-xl shadow-sm w-full text-left",
						borderColorMap[borderColor],
						"cursor-pointer hover:shadow-md transition-shadow",
					)}
					onClick={handleClick}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleClick();
						}
					}}
				>
					<span className="text-xs text-slate-500 block mb-2 uppercase tracking-wider font-semibold">
						{title}
					</span>
					<div className="flex items-baseline gap-2">
						<span className={cn("text-2xl font-bold", textColorMap[borderColor])}>
							{value}
						</span>
						{subtext && <span className="text-xs text-slate-500">{subtext}</span>}
					</div>
					{icon && <div className="mt-2">{icon}</div>}
					{expandedContent && clickable && (
						<button
							type="button"
							className="mt-2 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
							onClick={(e) => {
								e.stopPropagation();
								setIsExpanded(!isExpanded);
							}}
						>
							{isExpanded ? (
								<>
									<ChevronUp size={14} />
									<span>Mostrar menos</span>
								</>
							) : (
								<>
									<ChevronDown size={14} />
									<span>Mostrar mais</span>
								</>
							)}
						</button>
					)}
					{isExpanded && expandedContent && (
						<div className="mt-4 pt-4 border-t border-slate-200">
							{expandedContent}
						</div>
					)}
				</button>
			) : (
				<div
					className={cn(
						"bg-slate-50 p-4 rounded-xl shadow-sm",
						borderColorMap[borderColor],
					)}
				>
					<span className="text-xs text-slate-500 block mb-2 uppercase tracking-wider font-semibold">
						{title}
					</span>
					<div className="flex items-baseline gap-2">
						<span className={cn("text-2xl font-bold", textColorMap[borderColor])}>
							{value}
						</span>
						{subtext && <span className="text-xs text-slate-500">{subtext}</span>}
					</div>
					{icon && <div className="mt-2">{icon}</div>}
				</div>
			)}
		</>
	);
}

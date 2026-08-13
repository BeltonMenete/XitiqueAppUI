import { cn } from "#/lib/design-system";

interface BadgeProps {
	variant?: "dot" | "number";
	content?: number;
	color?: "emerald" | "amber" | "red" | "slate";
	position?: "top-right" | "top-left";
	show?: boolean;
	className?: string;
}

const colorStyles = {
	emerald: "bg-emerald-500",
	amber: "bg-amber-500",
	red: "bg-red-500",
	slate: "bg-slate-500",
};

const positionStyles = {
	"top-right": "-top-1 -right-1",
	"top-left": "-top-1 -left-1",
};

export function Badge({
	variant = "dot",
	content = 0,
	color = "emerald",
	position = "top-right",
	show = true,
	className = "",
}: BadgeProps) {
	if (!show || (variant === "number" && content === 0)) {
		return null;
	}

	return (
		<span
			className={cn(
				"absolute flex items-center justify-center",
				positionStyles[position],
				variant === "dot" && "w-2.5 h-2.5 rounded-full",
				variant === "number" &&
					"min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white",
				colorStyles[color],
				show && "animate-pulse",
				className,
			)}
		>
			{variant === "number" && content > 0 && content}
		</span>
	);
}

import { cn } from "#/lib/design-system";

interface ProgressCircleProps {
	value: number; // 0-100
	size?: "sm" | "md" | "lg";
	variant?: "filled" | "outline";
	label?: string;
	className?: string;
}

export function ProgressCircle({
	value,
	size = "md",
	variant = "filled",
	label,
	className = "",
}: ProgressCircleProps) {
	const sizeStyles = {
		sm: { width: 40, height: 40, strokeWidth: 3 },
		md: { width: 60, height: 60, strokeWidth: 4 },
		lg: { width: 80, height: 80, strokeWidth: 5 },
	};

	const { width, height, strokeWidth } = sizeStyles[size];
	const radius = (width - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (value / 100) * circumference;

	const color = variant === "filled" ? "#10b981" : "#e2e8f0";

	return (
		<div
			className={cn(
				"relative inline-flex items-center justify-center",
				className,
			)}
		>
			<svg width={width} height={height} className="transform -rotate-90">
				<circle
					cx={width / 2}
					cy={height / 2}
					r={radius}
					stroke={variant === "filled" ? "#e2e8f0" : "transparent"}
					strokeWidth={strokeWidth}
					fill="transparent"
				/>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={radius}
					stroke={color}
					strokeWidth={strokeWidth}
					fill="transparent"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className="transition-all duration-500 ease-out"
				/>
			</svg>
			{label && (
				<span className="absolute text-xs font-semibold text-slate-700">
					{label}
				</span>
			)}
		</div>
	);
}

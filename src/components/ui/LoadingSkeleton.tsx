import { cn } from "#/lib/design-system";

interface LoadingSkeletonProps {
	className?: string;
	variant?: "card" | "text" | "avatar" | "table" | "rect";
}

export function LoadingSkeleton({
	className = "",
	variant = "rect",
}: LoadingSkeletonProps) {
	if (variant === "card") {
		return (
			<div className={cn("animate-pulse bg-slate-200 rounded-lg", className)} />
		);
	}

	if (variant === "text") {
		return (
			<div
				className={cn(
					"animate-pulse bg-slate-200 rounded h-4 w-full",
					className,
				)}
			/>
		);
	}

	if (variant === "avatar") {
		return (
			<div
				className={cn("animate-pulse bg-slate-200 rounded-full", className)}
			/>
		);
	}

	if (variant === "table") {
		return (
			<div className={cn("space-y-2", className)}>
				<div className="animate-pulse bg-slate-200 h-10 rounded" />
				<div className="animate-pulse bg-slate-200 h-10 rounded" />
				<div className="animate-pulse bg-slate-200 h-10 rounded" />
			</div>
		);
	}

	// Default rect
	return (
		<div className={cn("animate-pulse bg-slate-200 rounded", className)} />
	);
}

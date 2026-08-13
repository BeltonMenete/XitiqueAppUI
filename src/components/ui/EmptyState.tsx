import type { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { cn } from "#/lib/design-system";

interface EmptyStateProps {
	icon?: LucideIcon;
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	variant?: "no-data" | "no-results" | "error" | "loading";
	className?: string;
}

const variantStyles = {
	"no-data": {
		container: "bg-slate-50 border-slate-200",
		icon: "text-slate-400",
	},
	"no-results": {
		container: "bg-slate-50 border-slate-200",
		icon: "text-slate-400",
	},
	error: {
		container: "bg-red-50 border-red-200",
		icon: "text-red-400",
	},
	loading: {
		container: "bg-slate-50 border-slate-200",
		icon: "text-slate-400",
	},
};

export function EmptyState({
	icon: Icon,
	title,
	description,
	actionLabel,
	onAction,
	variant = "no-data",
	className = "",
}: EmptyStateProps) {
	const styles = variantStyles[variant];

	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center p-8 rounded-lg border",
				styles.container,
				className,
			)}
		>
			{Icon && (
				<div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
					<Icon size={32} className={styles.icon} />
				</div>
			)}
			<h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
			{description && (
				<p className="text-xs text-slate-500 text-center max-w-sm mb-4">
					{description}
				</p>
			)}
			{actionLabel && onAction && (
				<Button size="sm" onClick={onAction}>
					{actionLabel}
				</Button>
			)}
		</div>
	);
}

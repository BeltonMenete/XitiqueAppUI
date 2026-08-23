import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";

interface FilterChipProps {
	label: string;
	selected?: boolean;
	onToggle?: () => void;
	onRemove?: () => void;
	variant?: "outlined" | "filled";
	size?: "sm" | "md";
	className?: string;
}

export function FilterChip({
	label,
	selected = false,
	onToggle,
	onRemove,
	variant = "outlined",
	size = "sm",
	className = "",
}: FilterChipProps) {
	const baseStyles = {
		sm: "px-3 py-1 text-xs",
		md: "px-4 py-2 text-sm",
	};

	const variantStyles = {
		outlined: selected
			? "bg-emerald-500 text-white border-emerald-500"
			: "bg-white text-slate-600 border-slate-300 hover:border-slate-400",
		filled: selected
			? "bg-emerald-500 text-white"
			: "bg-slate-100 text-slate-600",
	};

	return (
		<button
			type="button"
			onClick={onToggle}
			className={cn(
				"inline-flex items-center gap-2 rounded-full border transition-all duration-200 font-medium",
				baseStyles[size],
				variantStyles[variant],
				onToggle ? "cursor-pointer" : "cursor-default",
				className,
			)}
		>
			<span>{label}</span>
			{selected && onRemove && (
				<X
					size={12}
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
				/>
			)}
		</button>
	);
}

interface FilterChipsProps {
	filters: Array<{ id: string; label: string }>;
	selected: string[];
	onToggle: (id: string) => void;
	onRemove?: (id: string) => void;
	variant?: "outlined" | "filled";
	size?: "sm" | "md";
	className?: string;
}

export function FilterChips({
	filters,
	selected,
	onToggle,
	onRemove,
	variant = "outlined",
	size = "sm",
	className = "",
}: FilterChipsProps) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{filters.map((filter) => (
				<FilterChip
					key={filter.id}
					label={filter.label}
					selected={selected.includes(filter.id)}
					onToggle={() => onToggle(filter.id)}
					onRemove={
						selected.includes(filter.id) ? () => onRemove(filter.id) : undefined
					}
					variant={variant}
					size={size}
				/>
			))}
		</div>
	);
}

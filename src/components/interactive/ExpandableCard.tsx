import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";

interface ExpandableCardProps {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
	defaultExpanded?: boolean;
	className?: string;
	onToggle?: (expanded: boolean) => void;
	variant?: "default" | "bordered" | "elevated";
}

export function ExpandableCard({
	title,
	subtitle,
	children,
	defaultExpanded = false,
	className,
	onToggle,
	variant = "default",
}: ExpandableCardProps) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	const handleToggle = () => {
		const newState = !isExpanded;
		setIsExpanded(newState);
		onToggle?.(newState);
	};

	const variantClasses = {
		default: "bg-white",
		bordered: "bg-white border border-border",
		elevated: "bg-white shadow-lg",
	};

	return (
		<div
			className={cn(
				"rounded-lg overflow-hidden transition-all duration-300",
				variantClasses[variant],
				className,
			)}
		>
			{/* Header */}
			<button
				onClick={handleToggle}
				className="w-full flex items-center justify-between px-4 py-3 hover:bg-background-secondary transition-colors text-left"
			>
				<div className="flex-1">
					<h3 className="font-semibold text-text-primary text-sm">{title}</h3>
					{subtitle && (
						<p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
					)}
				</div>
				<div className="flex items-center gap-2">
					<span className="text-xs text-text-tertiary font-medium">
						{isExpanded ? "Ocultar" : "Mostrar"}
					</span>
					{isExpanded ? (
						<ChevronDown
							size={18}
							className="text-text-secondary transition-transform"
						/>
					) : (
						<ChevronRight
							size={18}
							className="text-text-secondary transition-transform"
						/>
					)}
				</div>
			</button>

			{/* Content */}
			<div
				className={cn(
					"overflow-hidden transition-all duration-300",
					isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div className="px-4 py-3 border-t border-border">{children}</div>
			</div>
		</div>
	);
}

interface ExpandableSectionProps {
	title: string;
	children: React.ReactNode;
	defaultExpanded?: boolean;
	className?: string;
	headerClassName?: string;
	contentClassName?: string;
}

export function ExpandableSection({
	title,
	children,
	defaultExpanded = false,
	className,
	headerClassName,
	contentClassName,
}: ExpandableSectionProps) {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	return (
		<div className={cn("border-b border-border", className)}>
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className={cn(
					"w-full flex items-center justify-between py-3 px-4 hover:bg-background-secondary transition-colors",
					headerClassName,
				)}
			>
				<span className="font-medium text-text-primary text-sm">{title}</span>
				{isExpanded ? (
					<ChevronDown size={18} className="text-text-secondary" />
				) : (
					<ChevronRight size={18} className="text-text-secondary" />
				)}
			</button>
			<div
				className={cn(
					"overflow-hidden transition-all duration-300",
					isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<div className={cn("px-4 pb-4", contentClassName)}>{children}</div>
			</div>
		</div>
	);
}

import { ChevronLeft, PanelLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "#/lib/design-system";

interface SplitViewProps {
	masterContent: React.ReactNode;
	detailContent: React.ReactNode;
	masterWidth?: string;
	collapsible?: boolean;
	defaultCollapsed?: boolean;
	className?: string;
}

export function SplitView({
	masterContent,
	detailContent,
	masterWidth = "400px",
	collapsible = true,
	defaultCollapsed = false,
	className,
}: SplitViewProps) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

	return (
		<div className={cn("flex h-full overflow-hidden", className)}>
			{/* Master Panel */}
			<div
				className={cn(
					"flex-shrink-0 border-r border-slate-200 bg-slate-50 transition-all duration-300 overflow-hidden",
					isCollapsed ? "w-0" : masterWidth,
				)}
			>
				<div className="h-full overflow-y-auto">{masterContent}</div>
			</div>

			{/* Detail Panel */}
			<div className="flex-1 overflow-hidden bg-white">
				<div className="h-full overflow-y-auto">{detailContent}</div>
			</div>

			{/* Collapse Toggle */}
			{collapsible && (
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={cn(
						"absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-slate-200 rounded-r-lg shadow-lg transition-all duration-300",
						isCollapsed ? "translate-x-0" : "-translate-x-full",
					)}
				>
					{isCollapsed ? (
						<PanelLeft size={18} className="text-slate-600" />
					) : (
						<ChevronLeft size={18} className="text-slate-600" />
					)}
				</button>
			)}
		</div>
	);
}

interface MasterItemProps {
	id: string;
	title: string;
	subtitle?: string;
	icon?: React.ReactNode;
	isActive?: boolean;
	onClick: () => void;
	children?: React.ReactNode;
}

export function MasterItem({
	title,
	subtitle,
	icon,
	isActive,
	onClick,
	children,
}: MasterItemProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"p-4 border-b border-slate-200 cursor-pointer transition-colors hover:bg-slate-100",
				isActive && "bg-slate-100 border-l-4 border-l-secondary",
			)}
		>
			<div className="flex items-start gap-3">
				{icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
				<div className="flex-1 min-w-0">
					<h4 className="font-medium text-slate-900 text-sm truncate">
						{title}
					</h4>
					{subtitle && (
						<p className="text-xs text-slate-600 mt-0.5 truncate">{subtitle}</p>
					)}
				</div>
			</div>
			{children && <div className="mt-3">{children}</div>}
		</div>
	);
}

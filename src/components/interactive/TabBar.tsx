import { cn } from "#/lib/design-system";

interface Tab {
	id: string;
	label: string;
	icon?: React.ReactNode;
	badge?: number | string;
	disabled?: boolean;
}

interface TabBarProps {
	tabs: Tab[];
	activeTab: string;
	onTabChange: (tabId: string) => void;
	variant?: "default" | "pills" | "underline";
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function TabBar({
	tabs,
	activeTab,
	onTabChange,
	variant = "default",
	size = "md",
	className,
}: TabBarProps) {
	const sizeClasses = {
		sm: "px-3 py-1.5 text-xs",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	const variantClasses = {
		default: {
			active: "bg-white text-emerald-600 border-secondary shadow-sm",
			inactive:
				"text-text-emerald-600 hover:text-slate-900 hover:bg-slate-100 border-transparent",
			container:
				"bg-slate-100 border border-slate-200 p-1 rounded-lg inline-flex gap-1",
		},
		pills: {
			active: "bg-secondary text-white",
			inactive: "text-text-emerald-600 hover:text-slate-900 hover:bg-slate-100",
			container: "inline-flex gap-2",
		},
		underline: {
			active: "text-emerald-600 border-b-2 border-secondary",
			inactive:
				"text-text-emerald-600 hover:text-slate-900 border-b-2 border-transparent",
			container: "border-b border-slate-200 flex gap-6",
		},
	};

	return (
		<div className={cn(variantClasses[variant].container, className)}>
			{tabs.map((tab) => (
				<button
					type="button"
					key={tab.id}
					onClick={() => !tab.disabled && onTabChange(tab.id)}
					disabled={tab.disabled}
					className={cn(
						"relative flex items-center gap-2 font-medium transition-all duration-200",
						sizeClasses[size],
						variant === "default" && "rounded-md",
						tab.disabled && "opacity-50 cursor-not-allowed",
						activeTab === tab.id
							? variantClasses[variant].active
							: variantClasses[variant].inactive,
					)}
				>
					{tab.icon}
					<span>{tab.label}</span>
					{tab.badge && (
						<span
							className={cn(
								"px-1.5 py-0.5 rounded-full text-xs font-bold",
								activeTab === tab.id
									? "bg-white/20 text-white"
									: "bg-red-500 text-white",
							)}
						>
							{tab.badge}
						</span>
					)}
				</button>
			))}
		</div>
	);
}

interface TabContentProps {
	children: React.ReactNode;
	className?: string;
}

export function TabContent({ children, className }: TabContentProps) {
	return (
		<div
			className={cn(
				"animate-in fade-in slide-in-from-top-2 duration-300",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface TabPanelProps {
	id: string;
	activeTab: string;
	children: React.ReactNode;
}

export function TabPanel({ id, activeTab, children }: TabPanelProps) {
	if (id !== activeTab) return null;

	return (
		<div className="animate-in fade-in slide-in-from-top-2 duration-300">
			{children}
		</div>
	);
}

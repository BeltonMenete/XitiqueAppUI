import { Bell, Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Breadcrumbs } from "#/components/ui";
import { cn } from "#/lib/design-system";

interface HeaderProps {
	title: string;
	description?: string;
	rightContent?: ReactNode;
	className?: string;
	showSearch?: boolean;
	searchValue?: string;
	onSearchChange?: (value: string) => void;
	searchPlaceholder?: string;
	breadcrumbs?: Array<{ label: string; href?: string; icon?: React.ReactNode }>;
	actions?: ReactNode;
}

export function Header({
	title,
	description,
	rightContent,
	className = "",
	showSearch = true,
	searchValue = "",
	onSearchChange,
	searchPlaceholder = "Pesquisar...",
	breadcrumbs,
	actions,
}: HeaderProps) {
	const [showMobileSearch, setShowMobileSearch] = useState(false);

	return (
		<header
			className={cn(
				"h-14 border-b border-slate-200/80 bg-white px-4 sm:px-6 flex items-center justify-between select-none shrink-0",
				className,
			)}
		>
			<div className="flex items-center gap-3">
				<img src="/xitique-logo.svg" alt="Xitique Logo" className="w-8 h-8" />
				<div className="flex-1 min-w-0">
					{breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-1" />}
					<h1 className="text-sm font-bold text-slate-950 tracking-tight truncate">
						{title}
					</h1>
					{description && (
						<p className="text-[11px] text-slate-400 hidden sm:block truncate">
							{description}
						</p>
					)}
				</div>
			</div>

			<div className="flex items-center gap-2 sm:gap-4">
				{actions}

				{showSearch && (
					<>
						{/* Desktop Search */}
						<div className="relative w-48 sm:w-64 group hidden md:block">
							<Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
							<input
								type="text"
								placeholder={searchPlaceholder}
								value={searchValue}
								onChange={(e) => onSearchChange?.(e.target.value)}
								className="w-full pl-8 pr-3 py-2 bg-slate-50 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all duration-200"
							/>
						</div>

						{/* Mobile Search Button */}
						<button
							type="button"
							onClick={() => setShowMobileSearch(!showMobileSearch)}
							className="md:hidden p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-lg border border-slate-100 transition-all hover:shadow-sm"
							aria-label="Pesquisar"
						>
							<Search size={16} />
						</button>

						{/* Mobile Search Input */}
						{showMobileSearch && (
							<div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 p-4 z-50">
								<div className="relative">
									<Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
									<input
										type="text"
										placeholder={searchPlaceholder}
										value={searchValue}
										onChange={(e) => onSearchChange?.(e.target.value)}
										autoFocus
										className="w-full pl-8 pr-10 py-2 bg-slate-50 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 focus:bg-white transition-all duration-200"
									/>
									<button
										type="button"
										onClick={() => setShowMobileSearch(false)}
										className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
									>
										<X size={16} />
									</button>
								</div>
							</div>
						)}
					</>
				)}

				<button
					type="button"
					className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-lg border border-slate-100 relative transition-all hover:shadow-sm"
					aria-label="Notificações"
				>
					<Bell size={16} />
					<span className="absolute top-1.5 right-1.5 h-2 w-2 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>
				</button>

				{rightContent}
			</div>
		</header>
	);
}

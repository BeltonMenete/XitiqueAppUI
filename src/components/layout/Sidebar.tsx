import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { APP_NAME } from "#/lib/constants";
import { cn } from "#/lib/design-system";

interface NavItem {
	label: string;
	icon: LucideIcon;
	href: string;
	isActive?: boolean;
}

interface SidebarProps {
	items: NavItem[];
	className?: string;
}

export function Sidebar({ items, className = "" }: SidebarProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
				aria-label="Abrir menu"
			>
				<Menu size={20} className="text-slate-700" />
			</button>

			{/* Mobile Overlay */}
			{isOpen && (
				<button
					type="button"
					className="md:hidden fixed inset-0 bg-black/50 z-40 border-0 p-0 cursor-pointer"
					onClick={() => setIsOpen(false)}
					aria-label="Fechar menu"
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed md:static inset-y-0 left-0 z-50 md:z-auto flex flex-col bg-white border-r border-slate-200/80 justify-between select-none shrink-0 transform transition-all duration-300 md:transform-none",
					isCollapsed ? "w-20" : "w-48",
					isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
					className,
				)}
			>
				<div className={cn("space-y-4", isCollapsed ? "p-4" : "p-5")}>
					{/* Logo Section with Close Button on Mobile */}
					<div className="flex items-center justify-between">
						{!isCollapsed && (
							<div className="flex items-center gap-2.5">
								<img
									loading="lazy"
									src="/xitique-logo.svg"
									alt={APP_NAME}
									width={32}
									height={32}
									className="w-8 h-8"
								/>
								<div className="flex flex-col">
									<span className="text-sm font-extrabold tracking-tight text-slate-950">
										{APP_NAME}
									</span>
									<span className="text-[10px] text-slate-400 font-medium tracking-wide">
										Gestor de Poupança
									</span>
								</div>
							</div>
						)}
						<div className="flex items-center gap-1">
							<button
								type="button"
								onClick={() => setIsCollapsed(!isCollapsed)}
								className="hidden md:block p-2 hover:bg-slate-100 rounded-lg"
								aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
							>
								{isCollapsed ? (
									<ChevronRight size={24} className="text-slate-700" />
								) : (
									<ChevronLeft size={18} className="text-slate-700" />
								)}
							</button>
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
								aria-label="Fechar menu"
							>
								<X size={20} className="text-slate-700" />
							</button>
						</div>
					</div>

					{/* Navigation */}
					<nav className="space-y-1">
						{items.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className={cn(
									"flex items-center rounded-xl text-xs font-medium transition-all",
									isCollapsed ? "justify-center p-4" : "gap-3 px-3 py-2.5",
									item.isActive
										? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/10"
										: "text-slate-600 hover:bg-slate-50 hover:text-slate-900 group",
								)}
								title={isCollapsed ? item.label : undefined}
							>
								<item.icon
									size={isCollapsed ? 24 : 18}
									className={cn(
										item.isActive
											? "text-white"
											: "text-slate-400 group-hover:text-slate-600",
									)}
								/>
								{!isCollapsed && <span>{item.label}</span>}
							</a>
						))}
					</nav>
				</div>

				{/* Footer */}
				{!isCollapsed && (
					<div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider px-5">
						<span>Licença</span>
						<span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[9px]">
							MZ-2026
						</span>
					</div>
				)}
			</aside>
		</>
	);
}

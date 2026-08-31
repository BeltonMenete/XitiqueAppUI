import type { LucideIcon } from "lucide-react";
import { Menu, X } from "lucide-react";
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
					"fixed md:static inset-y-0 left-0 z-50 md:z-auto flex flex-col w-52 bg-white border-r border-slate-200/80 justify-between p-5 select-none shrink-0 transform transition-transform duration-300 md:transform-none",
					isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
					className,
				)}
			>
				<div className="space-y-7">
					{/* Logo Section with Close Button on Mobile */}
					<div className="flex items-center justify-between px-2">
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
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
							aria-label="Fechar menu"
						>
							<X size={20} className="text-slate-700" />
						</button>
					</div>

					{/* Navigation */}
					<nav className="space-y-1">
						{items.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className={cn(
									"flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
									item.isActive
										? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/10"
										: "text-slate-600 hover:bg-slate-50 hover:text-slate-900 group",
								)}
							>
								<item.icon
									size={16}
									className={cn(
										item.isActive
											? "text-white"
											: "text-slate-400 group-hover:text-slate-600",
									)}
								/>
								<span>{item.label}</span>
							</a>
						))}
					</nav>
				</div>

				{/* Footer */}
				<div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
					<span>Licença Oficial</span>
					<span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md text-[9px]">
						MZ-2026
					</span>
				</div>
			</aside>
		</>
	);
}

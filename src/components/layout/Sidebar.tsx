import type { LucideIcon } from "lucide-react";
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
	return (
		<aside
			className={cn(
				"hidden md:flex flex-col w-64 bg-white border-r border-slate-200/80 justify-between p-6 select-none shrink-0",
				className,
			)}
		>
			<div className="space-y-7">
				{/* Logo Section */}
				<div className="flex items-center gap-2.5 px-2">
					<div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
						X
					</div>
					<div className="flex flex-col">
						<span className="text-sm font-extrabold tracking-tight text-slate-950">
							Xitique
						</span>
						<span className="text-[10px] text-slate-400 font-medium tracking-wide">
							Gestor de Poupança
						</span>
					</div>
				</div>

				{/* Navigation */}
				<nav className="space-y-1">
					{items.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all",
								item.isActive
									? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/10"
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
	);
}

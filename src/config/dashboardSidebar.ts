import type { LucideIcon } from "lucide-react";
import { FileText, Settings, TrendingUp, Users, Wallet, Users2 } from "lucide-react";

export interface SidebarItem {
	label: string;
	icon: LucideIcon;
	href: string;
	isActive?: boolean;
}

export interface DashboardSidebarConfig {
	items: SidebarItem[];
}

// Standard sidebar configuration for all dashboard pages
export const getDashboardSidebar = (currentPath: string): SidebarItem[] => {
	const items: SidebarItem[] = [
		{
			label: "Painel",
			icon: TrendingUp,
			href: "/dashboard/overview",
			isActive: currentPath === "/dashboard/overview",
		},
		{
			label: "Gestão",
			icon: Users,
			href: "/dashboard/savers",
			isActive: currentPath.startsWith("/dashboard/savers") || currentPath === "/dashboard/saver-details",
		},
		{
			label: "Cobradores",
			icon: Users2,
			href: "/dashboard/collectors",
			isActive: currentPath.startsWith("/dashboard/collectors"),
		},
		{
			label: "Finanças",
			icon: Wallet,
			href: "/dashboard/financial",
			isActive: currentPath.startsWith("/dashboard/financial"),
		},
		{
			label: "Relatórios",
			icon: FileText,
			href: "/dashboard/reports",
			isActive: currentPath.startsWith("/dashboard/reports"),
		},
		{
			label: "Configurações",
			icon: Settings,
			href: "/dashboard/settings",
			isActive: currentPath.startsWith("/dashboard/settings"),
		},
	];

	return items;
};

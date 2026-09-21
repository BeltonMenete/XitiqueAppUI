import type { LucideIcon } from "lucide-react";
import {
	FileText,
	Settings,
	TrendingUp,
	User,
	Users,
	Users2,
	Wallet,
	Wallet2,
} from "lucide-react";
import type { UserRole } from "#/contexts/AuthContext";

export interface SidebarItem {
	label: string;
	icon: LucideIcon;
	href: string;
	isActive?: boolean;
}

export interface DashboardSidebarConfig {
	items: SidebarItem[];
}

// Admin sidebar - Full access
export const getAdminSidebar = (currentPath: string): SidebarItem[] => {
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
			isActive:
				currentPath.startsWith("/dashboard/savers") ||
				currentPath === "/dashboard/saver-details",
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

// Collector sidebar - Limited access
export const getCollectorSidebar = (currentPath: string): SidebarItem[] => {
	const items: SidebarItem[] = [
		{
			label: "Painel",
			icon: TrendingUp,
			href: "/dashboard/overview",
			isActive: currentPath === "/dashboard/overview",
		},
		{
			label: "Meus Ticantes",
			icon: Users,
			href: "/dashboard/savers",
			isActive:
				currentPath.startsWith("/dashboard/savers") ||
				currentPath === "/dashboard/saver-details",
		},
		{
			label: "Minhas Coleções",
			icon: Wallet2,
			href: "/dashboard/financial",
			isActive: currentPath.startsWith("/dashboard/financial"),
		},
		{
			label: "Perfil",
			icon: User,
			href: "/dashboard/settings",
			isActive: currentPath.startsWith("/dashboard/settings"),
		},
	];

	return items;
};

// Saver sidebar - Personal access (for client portal)
export const getSaverSidebar = (currentPath: string): SidebarItem[] => {
	const items: SidebarItem[] = [
		{
			label: "Meu Painel",
			icon: TrendingUp,
			href: "/client/dashboard",
			isActive: currentPath === "/client/dashboard",
		},
		{
			label: "Meus Depósitos",
			icon: Wallet,
			href: "/client/deposits",
			isActive: currentPath === "/client/deposits",
		},
		{
			label: "Meus Empréstimos",
			icon: Wallet2,
			href: "/client/loans",
			isActive: currentPath === "/client/loans",
		},
		{
			label: "Perfil",
			icon: User,
			href: "/client/profile",
			isActive: currentPath === "/client/profile",
		},
	];

	return items;
};

// Main function to get sidebar based on role
export const getDashboardSidebar = (
	currentPath: string,
	role?: UserRole,
): SidebarItem[] => {
	switch (role) {
		case "admin":
			return getAdminSidebar(currentPath);
		case "collector":
			return getCollectorSidebar(currentPath);
		case "saver":
			return getSaverSidebar(currentPath);
		default:
			// Fallback to admin sidebar for now
			return getAdminSidebar(currentPath);
	}
};

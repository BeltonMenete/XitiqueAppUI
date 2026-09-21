import { Link, useLocation } from "@tanstack/react-router";
import { DollarSign, History, Home, LogOut, User } from "lucide-react";
import { useAuth } from "#/hooks/useAuth";

interface ClientLayoutProps {
	children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
	const location = useLocation();
	const { user, logout } = useAuth();

	const navItems = [
		{ to: "/client/dashboard", label: "Dashboard", icon: Home },
		{ to: "/client/deposits", label: "Depósitos", icon: DollarSign },
		{ to: "/client/loans", label: "Empréstimos", icon: History },
		{ to: "/client/profile", label: "Perfil", icon: User },
	];

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="min-h-screen bg-slate-50">
			<header className="bg-white border-b border-slate-200 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center gap-8">
							<h1 className="text-xl font-bold text-emerald-600">Xitique</h1>
							<nav className="hidden md:flex gap-6">
								{navItems.map((item) => {
									const Icon = item.icon;
									const isActive = location.pathname === item.to;
									return (
										<Link
											key={item.to}
											to={item.to}
											className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
												isActive
													? "bg-emerald-50 text-emerald-700"
													: "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
											}`}
										>
											<Icon className="h-4 w-4" />
											{item.label}
										</Link>
									);
								})}
							</nav>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium text-slate-900">
									{user?.name || "Cliente"}
								</span>
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
									Cliente
								</span>
							</div>
							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
							>
								<LogOut className="h-4 w-4" />
								Sair
							</button>
						</div>
					</div>
				</div>
			</header>
			<main>{children}</main>
		</div>
	);
}

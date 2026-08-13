import { createFileRoute } from "@tanstack/react-router";
import {
	AlertCircle,
	Bell,
	LayoutDashboard,
	MoreVertical,
	Plus,
	Search,
	Settings,
	TrendingUp,
	UserCheck,
	Users,
	Wallet,
} from "lucide-react";
import { useState, useEffect } from "react";
import { RegisterSaverModal } from "#/components/business/RegisterSaverModal";
import { TabBar, TabPanel } from "#/components/interactive";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { KPICard } from "#/components/ui/KPICard";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/")({
	component: SuperDashboard,
});

function SuperDashboard() {
	const [activeTab, setActiveTab] = useState(() => {
		const saved = localStorage.getItem("dashboard-active-tab");
		return saved || "overview";
	});
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem("dashboard-active-tab", activeTab);
	}, [activeTab]);

	const tabs = [
		{
			id: "overview",
			label: "Visão Geral",
			icon: <LayoutDashboard size={18} />,
		},
		{
			id: "savers",
			label: "Ticantes",
			icon: <Users size={18} />,
			badge: "154",
		},
		{
			id: "collectors",
			label: "Cobradores",
			icon: <UserCheck size={18} />,
			badge: "12",
		},
		{
			id: "loans",
			label: "Empréstimos",
			icon: <Wallet size={18} />,
			badge: "8",
		},
		{ id: "finance", label: "Finanças", icon: <TrendingUp size={18} /> },
		{ id: "reports", label: "Relatórios", icon: <TrendingUp size={18} /> },
	];

	const sidebarItems = [
		{
			label: "Dashboard",
			icon: LayoutDashboard,
			href: "/dashboard/",
			isActive: true,
		},
		{ label: "Configurações", icon: Settings, href: "/dashboard/settings" },
	];

	// Overview KPIs
	const overviewKPIs = [
		{
			title: "Arrecadado (Mês)",
			value: "450.000 MZN",
			subtext: "+12.5% vs mês anterior",
			icon: Wallet,
			color: "text-emerald-600 bg-emerald-600/10 border-emerald-600/20",
			isDebt: false,
		},
		{
			title: "Ticantes Activos",
			value: "154",
			subtext: "+2 este mês",
			icon: Users,
			color: "text-slate-900 bg-slate-100 border-slate-200",
			isDebt: false,
		},
		{
			title: "Empréstimos Activos",
			value: "8",
			subtext: "85.000 MZN total",
			icon: Wallet,
			color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
			isDebt: true,
		},
		{
			title: "Diferença Caixa",
			value: "-2.300 MZN",
			subtext: "Requer reconciliação",
			icon: TrendingUp,
			color: "text-red-500 bg-red-500/10 border-red-500/20",
			isDebt: true,
		},
	];

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Xitique Dashboard"
					description="Visão geral completa do sistema"
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Super Dashboard" },
					]}
					rightContent={
						<div className="flex items-center gap-3">
							<div className="relative hidden md:block">
								<Search
									className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
									size={18}
								/>
								<input
									type="text"
									placeholder="Pesquisar global..."
									className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 w-64"
								/>
							</div>
							<Button
								size="sm"
								variant="ghost"
								className="relative"
								leftIcon={<Bell size={18} />}
								aria-label="Notificações"
							>
								<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
							</Button>
							<Button size="sm" leftIcon={<Plus size={18} />}>
								Nova Ação
							</Button>
						</div>
					}
				/>

				<main className="flex-1 overflow-hidden flex flex-col">
					{/* Tab Bar */}
					<div className="border-b border-slate-200 bg-white px-6 py-3">
						<TabBar
							tabs={tabs}
							activeTab={activeTab}
							onTabChange={setActiveTab}
							variant="underline"
							size="md"
						/>
					</div>

					{/* Tab Content */}
					<div className="flex-1 overflow-y-auto p-6">
						<TabPanel id="overview" activeTab={activeTab}>
							<OverviewTab kpis={overviewKPIs} />
						</TabPanel>

						<TabPanel id="savers" activeTab={activeTab}>
							<SaversTab
								onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
							/>
						</TabPanel>

						<TabPanel id="collectors" activeTab={activeTab}>
							<CollectorsTab />
						</TabPanel>

						<TabPanel id="loans" activeTab={activeTab}>
							<LoansTab />
						</TabPanel>

						<TabPanel id="finance" activeTab={activeTab}>
							<FinanceTab />
						</TabPanel>

						<TabPanel id="reports" activeTab={activeTab}>
							<ReportsTab />
						</TabPanel>
					</div>
				</main>
			</div>

			<RegisterSaverModal
				isOpen={isRegisterModalOpen}
				onClose={() => setIsRegisterModalOpen(false)}
				onSubmit={(data) => console.log("Register saver:", data)}
			/>
		</DashboardLayout>
	);
}

// Overview Tab
function OverviewTab({ kpis }: { kpis: typeof overviewKPIs }) {
	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
			{/* KPI Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{kpis.map((kpi) => (
					<KPICard key={kpi.title} {...kpi} />
				))}
			</div>

			{/* Charts and Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Collection Evolution */}
				<Card>
					<CardContent className="p-6">
						<h3 className="font-semibold text-slate-900 mb-4">
							Evolução da Arrecadação
						</h3>
						<div className="h-64 flex items-center justify-center bg-slate-100 rounded-lg">
							<p className="text-slate-400 text-sm">
								Gráfico de evolução (a implementar)
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card>
					<CardContent className="p-6">
						<h3 className="font-semibold text-slate-900 mb-4">
							Actividade Recente
						</h3>
						<div className="space-y-3">
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg"
								>
									<div className="w-8 h-8 bg-emerald-600/10 rounded-full flex items-center justify-center">
										<Users size={16} className="text-emerald-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium text-slate-900">
											Novo ticante registado
										</p>
										<p className="text-xs text-text-emerald-600">Há 2 horas</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// Savers Tab
function SaversTab({
	onOpenRegisterModal,
}: {
	onOpenRegisterModal: () => void;
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("Maio 2024");
	const [_selectedSaver, _setSelectedSaver] = useState<any>(null);

	const mockSavers = [
		{
			id: "1",
			cardNumber: 1001,
			name: "Carlos Mondlane",
			dailyAmount: 500,
			totalSaved: 7500,
			currentDebt: 2300,
			daysInCycle: 15,
			status: "in_debt",
		},
		{
			id: "2",
			cardNumber: 1002,
			name: "Ana Vilanculos",
			dailyAmount: 250,
			totalSaved: 2500,
			currentDebt: 1500,
			daysInCycle: 5,
			status: "in_debt",
		},
		{
			id: "3",
			cardNumber: 1003,
			name: "Bento Sitoe",
			dailyAmount: 300,
			totalSaved: 6600,
			currentDebt: 0,
			daysInCycle: 22,
			status: "active",
		},
	];

	const kpiData = [
		{
			title: "Total Ticantes",
			value: String(mockSavers.length),
			subtext: "Total registado",
			icon: Users,
			color: "text-slate-900 bg-slate-100 border-slate-200",
			isDebt: false,
		},
		{
			title: "Total Sob Gestão",
			value: "450.000 MZN",
			subtext: "+12.5% vs mês anterior",
			icon: Wallet,
			color: "text-emerald-600 bg-emerald-600/10 border-emerald-600/20",
			isDebt: false,
		},
		{
			title: "Empréstimos Activos",
			value: "8.000 MZN",
			subtext: "3 empréstimos activos",
			icon: Wallet,
			color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
			isDebt: false,
		},
		{
			title: "Em Incumprimento",
			value: String(mockSavers.filter((s) => s.status === "in_debt").length),
			subtext: "Ticantes em dívida",
			icon: AlertCircle,
			color: "text-red-500 bg-red-500/10 border-red-500/20",
			isDebt: true,
		},
	];

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
			{/* Action Banner */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
				<div>
					<h2 className="text-sm font-bold text-slate-900 tracking-tight">
						Gestão de Ticantes
					</h2>
					<p className="text-[11px] text-text-emerald-600">
						Visão expandida e financeira dos membros
					</p>
				</div>
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-2">
						{["Março 2024", "Abril 2024", "Maio 2024"].map((month) => (
							<button
								key={month}
								type="button"
								className={cn(
									"px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
									selectedMonth === month
										? "bg-slate-200 text-slate-900"
										: "bg-slate-100 text-text-emerald-600 hover:bg-slate-200",
								)}
								onClick={() => setSelectedMonth(month)}
							>
								{month}
							</button>
						))}
					</div>
					<Button
						size="sm"
						variant="outline"
						leftIcon={<Plus size={16} />}
						onClick={onOpenRegisterModal}
					>
						Novo Ticante
					</Button>
				</div>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{kpiData.map((kpi) => (
					<KPICard key={kpi.title} {...kpi} />
				))}
			</div>

			{/* Savers Table */}
			<Card>
				<CardContent className="p-0">
					<div className="p-4 border-b border-slate-200 flex items-center gap-4">
						<div className="relative flex-1">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								size={18}
							/>
							<input
								type="text"
								placeholder="Pesquisar por nome ou número de cartão..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 w-full"
							/>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead className="bg-slate-100">
								<tr>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Ticante
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Valor Diário
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Total Poupado
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Dívida
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Dias
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Estado
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{mockSavers.map((saver) => (
									<tr
										key={saver.id}
										className="hover:bg-slate-100 transition-colors cursor-pointer"
									>
										<td className="px-4 py-3">
											<div className="flex flex-col">
												<div className="flex items-center gap-1">
													<span className="font-mono text-[11px] text-slate-400">
														{saver.cardNumber}
													</span>
													<span
														className={cn(
															"w-1.5 h-1.5 rounded-full",
															saver.status === "active"
																? "bg-emerald-500"
																: "bg-red-500",
														)}
													/>
												</div>
												<span className="font-bold text-sm text-slate-900">
													{saver.name}
												</span>
											</div>
										</td>
										<td className="px-4 py-3 text-sm">
											{saver.dailyAmount.toLocaleString()} MZN
										</td>
										<td className="px-4 py-3 text-sm">
											{saver.totalSaved.toLocaleString()} MZN
										</td>
										<td
											className={cn(
												"px-4 py-3 text-sm",
												saver.currentDebt > 0
													? "text-red-500"
													: "text-text-emerald-600",
											)}
										>
											{saver.currentDebt.toLocaleString()} MZN
										</td>
										<td className="px-4 py-3 text-sm">
											{saver.daysInCycle} Dias
										</td>
										<td className="px-4 py-3">
											<span
												className={cn(
													"inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
													saver.status === "active"
														? "bg-emerald-500/10 text-emerald-500"
														: "bg-red-500/10 text-red-500",
												)}
											>
												{saver.status === "active" ? "Ativo" : "Em Dívida"}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>

			{/* Financial Summary */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card>
					<CardContent className="p-5">
						<h3 className="text-sm font-semibold text-slate-900 mb-4">
							Resumo Financeiro
						</h3>
						<div className="space-y-4">
							<div className="p-4 bg-emerald-600/10 rounded-lg">
								<p className="text-xs text-text-emerald-600 mb-1">
									Colectado Este Mês
								</p>
								<p className="text-xl font-bold text-emerald-600">75.000 MZN</p>
								<p className="text-[10px] text-emerald-600 mt-1">
									+15% vs mês anterior
								</p>
							</div>
							<div className="p-4 bg-red-500/10 rounded-lg">
								<p className="text-xs text-text-emerald-600 mb-1">Em Dívida</p>
								<p className="text-xl font-bold text-red-500">2.300 MZN</p>
								<p className="text-[10px] text-red-500 mt-1">
									4 ticantes afectados
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-5">
						<h3 className="text-sm font-semibold text-slate-900 mb-4">
							Actividade Recente
						</h3>
						<div className="space-y-3">
							{[
								{
									id: "1",
									action: "Novo depósito",
									user: "Carlos Mondlane",
									amount: "500 MZN",
									time: "Há 5 min",
								},
								{
									id: "2",
									action: "Empréstimo aprovado",
									user: "Ana Vilanculos",
									amount: "1.000 MZN",
									time: "Há 15 min",
								},
								{
									id: "3",
									action: "Pagamento recebido",
									user: "Bento Sitoe",
									amount: "300 MZN",
									time: "Há 30 min",
								},
							].map((activity) => (
								<div
									key={activity.id}
									className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg"
								>
									<div className="w-8 h-8 rounded-full bg-emerald-600/10 flex items-center justify-center">
										<Users size={16} className="text-emerald-600" />
									</div>
									<div className="flex-1">
										<p className="text-xs font-medium text-slate-900">
											{activity.action}
										</p>
										<p className="text-[10px] text-slate-400">
											{activity.user}
										</p>
									</div>
									<div className="text-right">
										<p className="text-xs font-semibold text-slate-900">
											{activity.amount}
										</p>
										<p className="text-[10px] text-slate-400">
											{activity.time}
										</p>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-5">
						<h3 className="text-sm font-semibold text-slate-900 mb-4">
							Distribuição por Estado
						</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-emerald-500" />
									<span className="text-sm text-text-emerald-600">Ativos</span>
								</div>
								<span className="text-sm font-medium text-slate-900">1</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-red-500" />
									<span className="text-sm text-text-emerald-600">
										Em Dívida
									</span>
								</div>
								<span className="text-sm font-medium text-slate-900">2</span>
							</div>
							<div className="mt-4 p-4 bg-slate-100 rounded-lg">
								<p className="text-xs text-text-emerald-600 mb-2">
									Taxa de Assiduidade
								</p>
								<p className="text-xl font-bold text-slate-900">94.2%</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// Collectors Tab
function CollectorsTab() {
	const mockCollectors = [
		{
			id: "1",
			name: "Arsénio Matusse",
			phone: "+258 84 123 4567",
			clients: 47,
			monthlyVolume: 125400,
			difference: 1200,
			status: "active",
		},
		{
			id: "2",
			name: "Célia Mondlane",
			phone: "+258 82 987 6543",
			clients: 32,
			monthlyVolume: 84200,
			difference: -4500,
			status: "suspended",
		},
		{
			id: "3",
			name: "Filipe Nyusi Jr.",
			phone: "+258 87 555 0192",
			clients: 58,
			monthlyVolume: 156000,
			difference: 0,
			status: "active",
		},
	];

	const kpiData = [
		{
			title: "Total Cobradores",
			value: String(mockCollectors.length),
			subtext: "+2 este mês",
			icon: UserCheck,
			color: "text-slate-900 bg-slate-100 border-slate-200",
			isDebt: false,
		},
		{
			title: "Cobradores Ativos",
			value: String(mockCollectors.filter((c) => c.status === "active").length),
			subtext: `de ${mockCollectors.length} total`,
			icon: UserCheck,
			color: "text-emerald-600 bg-emerald-600/10 border-emerald-600/20",
			isDebt: false,
		},
		{
			title: "Arrecadado (Mês)",
			value: "450.000 MZN",
			subtext: "Total colectado",
			icon: Wallet,
			color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
			isDebt: false,
		},
		{
			title: "Meta de Colecta",
			value: "82%",
			subtext: "Progresso mensal",
			icon: TrendingUp,
			color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
			isDebt: false,
		},
	];

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-slate-900">
					Gestão de Cobradores
				</h2>
				<Button size="sm" leftIcon={<Plus size={18} />}>
					Novo Cobrador
				</Button>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{kpiData.map((kpi) => (
					<KPICard key={kpi.title} {...kpi} />
				))}
			</div>

			{/* Collectors Table */}
			<Card>
				<CardContent className="p-0">
					<div className="p-4 border-b border-slate-200 flex items-center gap-4">
						<div className="relative flex-1">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								size={18}
							/>
							<input
								type="text"
								placeholder="Buscar por nome ou telefone..."
								className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 w-full"
							/>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead className="bg-slate-100">
								<tr>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Cobrador
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Clientes
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider text-right">
										Volume Mensal
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider text-right">
										Diferença
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider">
										Estado
									</th>
									<th className="px-4 py-3 text-xs font-semibold text-text-emerald-600 uppercase tracking-wider text-center">
										Acções
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{mockCollectors.map((collector) => (
									<tr
										key={collector.id}
										className="hover:bg-slate-100 transition-colors"
									>
										<td className="px-4 py-3">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-text-emerald-600 font-semibold">
													{String(collector.name).charAt(0)}
												</div>
												<div>
													<p className="font-bold text-sm text-slate-900">
														{collector.name}
													</p>
													<p className="text-xs text-slate-400 font-mono">
														{collector.phone}
													</p>
												</div>
											</div>
										</td>
										<td className="px-4 py-3">
											<div className="flex items-center gap-1">
												<span className="font-bold text-sm text-slate-900">
													{collector.clients}
												</span>
												<span className="text-xs text-slate-400">Ticantes</span>
											</div>
										</td>
										<td className="px-4 py-3 text-right">
											<span className="font-mono text-sm font-bold text-slate-900">
												{collector.monthlyVolume.toLocaleString()} MZN
											</span>
										</td>
										<td className="px-4 py-3 text-right">
											<span
												className={cn(
													"font-mono text-sm",
													collector.difference > 0
														? "text-emerald-500"
														: collector.difference < 0
															? "text-red-500"
															: "text-text-emerald-600",
												)}
											>
												{collector.difference > 0 ? "+" : ""}
												{collector.difference.toLocaleString()} MZN
											</span>
										</td>
										<td className="px-4 py-3">
											<span
												className={cn(
													"inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
													collector.status === "active"
														? "bg-emerald-500/10 text-emerald-500"
														: "bg-red-500/10 text-red-500",
												)}
											>
												{collector.status === "active" ? "Ativo" : "Suspenso"}
											</span>
										</td>
										<td className="px-4 py-3 text-center">
											<div className="flex justify-center gap-2">
												<button className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
													<MoreVertical size={16} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

// Loans Tab
function LoansTab() {
	const mockLoans = [
		{
			id: "1",
			client: "João Almeida",
			cardNumber: "XTQ-1042",
			amount: 15000,
			daysSaved: 8,
			totalDays: 30,
			status: "pending",
			progress: 26,
		},
		{
			id: "2",
			client: "Maria Chissano",
			cardNumber: "XTQ-0988",
			amount: 10000,
			daysSaved: 15,
			totalDays: 30,
			status: "approved",
			progress: 50,
		},
		{
			id: "3",
			client: "Carlos Mendes",
			cardNumber: "XTQ-1055",
			amount: 20000,
			daysSaved: 22,
			totalDays: 30,
			status: "active",
			progress: 73,
		},
	];

	const kpiData = [
		{
			title: "Total Solicitado",
			value: "145.000 MZN",
			subtext: "12 solicitações pendentes",
			icon: Wallet,
			color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
			isDebt: false,
		},
		{
			title: "Total em Dívida",
			value: "850.500 MZN",
			subtext: "45 empréstimos activos",
			icon: AlertCircle,
			color: "text-red-500 bg-red-500/10 border-red-500/20",
			isDebt: true,
		},
		{
			title: "Juros a Receber",
			value: "85.050 MZN",
			subtext: "Baseado em 10% de juros",
			icon: TrendingUp,
			color: "text-emerald-600 bg-emerald-600/10 border-emerald-600/20",
			isDebt: false,
		},
	];

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-semibold text-slate-900">
					Gestão de Empréstimos
				</h2>
				<Button size="sm" leftIcon={<Plus size={18} />}>
					Novo Empréstimo
				</Button>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{kpiData.map((kpi) => (
					<KPICard key={kpi.title} {...kpi} />
				))}
			</div>

			{/* Kanban-style Board */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Pending */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold text-slate-900 text-sm">
								Lista de Espera
							</h3>
							<span className="bg-amber-500/10 text-amber-500 px-2 py-1 rounded-full text-xs font-semibold">
								{mockLoans.filter((l) => l.status === "pending").length}
							</span>
						</div>
						<div className="space-y-3">
							{mockLoans
								.filter((l) => l.status === "pending")
								.map((loan) => (
									<div
										key={loan.id}
										className="p-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-status-warning transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-text-emerald-600 font-bold text-xs">
												{String(loan.client).charAt(0)}
											</div>
											<div>
												<p className="font-medium text-sm text-slate-900">
													{loan.client}
												</p>
												<p className="text-[10px] text-slate-400">
													{loan.cardNumber}
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<span className="font-mono text-sm font-bold text-slate-900">
												{loan.amount.toLocaleString()} MZN
											</span>
											<span className="text-xs text-slate-400">
												{loan.daysSaved}/{loan.totalDays} dias
											</span>
										</div>
										<div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
											<div
												className="h-full bg-amber-500"
												style={{ width: `${loan.progress}%` }}
											/>
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>

				{/* Approved */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold text-slate-900 text-sm">
								Aprovados
							</h3>
							<span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full text-xs font-semibold">
								{mockLoans.filter((l) => l.status === "approved").length}
							</span>
						</div>
						<div className="space-y-3">
							{mockLoans
								.filter((l) => l.status === "approved")
								.map((loan) => (
									<div
										key={loan.id}
										className="p-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-status-success transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-text-emerald-600 font-bold text-xs">
												{String(loan.client).charAt(0)}
											</div>
											<div>
												<p className="font-medium text-sm text-slate-900">
													{loan.client}
												</p>
												<p className="text-[10px] text-slate-400">
													{loan.cardNumber}
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<span className="font-mono text-sm font-bold text-slate-900">
												{loan.amount.toLocaleString()} MZN
											</span>
											<span className="text-xs text-slate-400">
												{loan.daysSaved}/{loan.totalDays} dias
											</span>
										</div>
										<div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
											<div
												className="h-full bg-emerald-500"
												style={{ width: `${loan.progress}%` }}
											/>
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>

				{/* Active */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="font-semibold text-slate-900 text-sm">Activos</h3>
							<span className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full text-xs font-semibold">
								{mockLoans.filter((l) => l.status === "active").length}
							</span>
						</div>
						<div className="space-y-3">
							{mockLoans
								.filter((l) => l.status === "active")
								.map((loan) => (
									<div
										key={loan.id}
										className="p-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-status-info transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-text-emerald-600 font-bold text-xs">
												{String(loan.client).charAt(0)}
											</div>
											<div>
												<p className="font-medium text-sm text-slate-900">
													{loan.client}
												</p>
												<p className="text-[10px] text-slate-400">
													{loan.cardNumber}
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<span className="font-mono text-sm font-bold text-slate-900">
												{loan.amount.toLocaleString()} MZN
											</span>
											<span className="text-xs text-slate-400">
												{loan.daysSaved}/{loan.totalDays} dias
											</span>
										</div>
										<div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
											<div
												className="h-full bg-blue-500"
												style={{ width: `${loan.progress}%` }}
											/>
										</div>
									</div>
								))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// Finance Tab (placeholder)
function FinanceTab() {
	return (
		<div className="animate-in fade-in slide-in-from-top-2 duration-300">
			<h2 className="text-lg font-semibold text-slate-900 mb-6">
				Visão Financeira
			</h2>
			<Card>
				<CardContent className="p-6">
					<p className="text-slate-400 text-sm">
						Métricas financeiras (a implementar)
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

// Reports Tab (placeholder)
function ReportsTab() {
	return (
		<div className="animate-in fade-in slide-in-from-top-2 duration-300">
			<h2 className="text-lg font-semibold text-slate-900 mb-6">Relatórios</h2>
			<Card>
				<CardContent className="p-6">
					<p className="text-slate-400 text-sm">
						Relatórios disponíveis (a implementar)
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

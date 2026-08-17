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
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/Card";
import { KPICard } from "#/components/ui/KPICard";
import { Input } from "#/components/ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "#/components/ui/Tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "#/components/ui/Table";
import { Badge } from "#/components/ui";
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
								<Input
									type="text"
									placeholder="Pesquisar global..."
									className="pl-10 w-64"
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
						<Tabs value={activeTab} onValueChange={setActiveTab}>
							<TabsList>
								{tabs.map((tab) => (
									<TabsTrigger key={tab.id} value={tab.id}>
										{tab.icon}
										<span className="ml-2">{tab.label}</span>
										{tab.badge && (
											<Badge variant="destructive" className="ml-2">
												{tab.badge}
											</Badge>
										)}
									</TabsTrigger>
								))}
							</TabsList>
							<div className="flex-1 overflow-y-auto p-6">
								<TabsContent value="overview">
									<OverviewTab kpis={overviewKPIs} />
								</TabsContent>

								<TabsContent value="savers">
									<SaversTab
										onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
									/>
								</TabsContent>

								<TabsContent value="collectors">
									<CollectorsTab />
								</TabsContent>

								<TabsContent value="loans">
									<LoansTab />
								</TabsContent>

								<TabsContent value="finance">
									<FinanceTab />
								</TabsContent>

								<TabsContent value="reports">
									<ReportsTab />
								</TabsContent>
							</div>
						</Tabs>
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
function OverviewTab({ kpis }: { kpis: any }) {
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
					<CardHeader>
						<CardTitle>Evolução da Arrecadação</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-64 flex items-center justify-center bg-slate-100 rounded-lg">
							<p className="text-slate-400 text-sm">
								Gráfico de evolução (a implementar)
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card>
					<CardHeader>
						<CardTitle>Actividade Recente</CardTitle>
					</CardHeader>
					<CardContent>
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
										<p className="text-xs text-emerald-600">Há 2 horas</p>
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
										: "bg-slate-100 text-emerald-600 hover:bg-slate-200",
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
				<CardHeader>
					<div className="flex items-center gap-4">
						<div className="relative flex-1">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								size={18}
							/>
							<Input
								type="text"
								placeholder="Pesquisar por nome ou número de cartão..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Ticante</TableHead>
								<TableHead>Valor Diário</TableHead>
								<TableHead>Total Poupado</TableHead>
								<TableHead>Dívida</TableHead>
								<TableHead>Dias</TableHead>
								<TableHead>Estado</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockSavers.map((saver) => (
								<TableRow
									key={saver.id}
									className="cursor-pointer"
								>
									<TableCell>
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
									</TableCell>
									<TableCell>
										{saver.dailyAmount.toLocaleString()} MZN
									</TableCell>
									<TableCell>
										{saver.totalSaved.toLocaleString()} MZN
									</TableCell>
									<TableCell
										className={cn(
											saver.currentDebt > 0
												? "text-red-500"
												: "text-emerald-600",
										)}
									>
										{saver.currentDebt.toLocaleString()} MZN
									</TableCell>
									<TableCell>
										{saver.daysInCycle} Dias
									</TableCell>
									<TableCell>
										<Badge
											variant={saver.status === "active" ? "success" : "destructive"}
										>
											{saver.status === "active" ? "Ativo" : "Em Dívida"}
										</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Financial Summary */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Resumo Financeiro</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="p-4 bg-emerald-600/10 rounded-lg">
								<p className="text-xs text-emerald-600 mb-1">
									Colectado Este Mês
								</p>
								<p className="text-xl font-bold text-emerald-600">75.000 MZN</p>
								<p className="text-[10px] text-emerald-600 mt-1">
									+15% vs mês anterior
								</p>
							</div>
							<div className="p-4 bg-red-500/10 rounded-lg">
								<p className="text-xs text-emerald-600 mb-1">Em Dívida</p>
								<p className="text-xl font-bold text-red-500">2.300 MZN</p>
								<p className="text-[10px] text-red-500 mt-1">
									4 ticantes afectados
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm">Actividade Recente</CardTitle>
					</CardHeader>
					<CardContent>
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
					<CardHeader>
						<CardTitle className="text-sm">Distribuição por Estado</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-emerald-500" />
									<span className="text-sm text-emerald-600">Ativos</span>
								</div>
								<span className="text-sm font-medium text-slate-900">1</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="w-3 h-3 rounded-full bg-red-500" />
									<span className="text-sm text-emerald-600">
										Em Dívida
									</span>
								</div>
								<span className="text-sm font-medium text-slate-900">2</span>
							</div>
							<div className="mt-4 p-4 bg-slate-100 rounded-lg">
								<p className="text-xs text-emerald-600 mb-2">
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
				<CardHeader>
					<div className="flex items-center gap-4">
						<div className="relative flex-1">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								size={18}
							/>
							<Input
								type="text"
								placeholder="Buscar por nome ou telefone..."
								className="pl-10"
							/>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Cobrador</TableHead>
								<TableHead>Clientes</TableHead>
								<TableHead className="text-right">Volume Mensal</TableHead>
								<TableHead className="text-right">Diferença</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead className="text-center">Acções</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockCollectors.map((collector) => (
								<TableRow key={collector.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
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
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<span className="font-bold text-sm text-slate-900">
												{collector.clients}
											</span>
											<span className="text-xs text-slate-400">Ticantes</span>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<span className="font-mono text-sm font-bold text-slate-900">
											{collector.monthlyVolume.toLocaleString()} MZN
										</span>
									</TableCell>
									<TableCell className="text-right">
										<span
											className={cn(
												"font-mono text-sm",
												collector.difference > 0
													? "text-emerald-500"
													: collector.difference < 0
														? "text-red-500"
														: "text-slate-600",
											)}
										>
											{collector.difference > 0 ? "+" : ""}
											{collector.difference.toLocaleString()} MZN
										</span>
									</TableCell>
									<TableCell>
										<Badge
											variant={collector.status === "active" ? "success" : "destructive"}
										>
											{collector.status === "active" ? "Ativo" : "Suspenso"}
										</Badge>
									</TableCell>
									<TableCell className="text-center">
										<div className="flex justify-center gap-2">
											<button type="button" className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
												<MoreVertical size={16} />
											</button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
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
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm">Lista de Espera</CardTitle>
							<Badge variant="warning">
								{mockLoans.filter((l) => l.status === "pending").length}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockLoans
								.filter((l) => l.status === "pending")
								.map((loan) => (
									<div
										key={loan.id}
										className="p-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-amber-500 transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
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
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm">Aprovados</CardTitle>
							<Badge variant="success">
								{mockLoans.filter((l) => l.status === "approved").length}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockLoans
								.filter((l) => l.status === "approved")
								.map((loan) => (
									<div
										key={loan.id}
										className="p-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
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
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm">Activos</CardTitle>
							<Badge variant="default">
								{mockLoans.filter((l) => l.status === "active").length}
							</Badge>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{mockLoans
								.filter((l) => l.status === "active")
								.map((loan) => (
									<div
										key={loan.id}
										className="p-3 bg-slate-100 rounded-lg border border-slate-200 hover:border-blue-500 transition-colors cursor-pointer"
									>
										<div className="flex items-center gap-2 mb-2">
											<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
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

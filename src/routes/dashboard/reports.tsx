import { createFileRoute, useLocation } from "@tanstack/react-router";
import {
	BarChart3,
	Calendar,
	Download,
	Filter,
	LineChart,
	PieChart,
	Settings,
	Share2,
	TrendingUp,
	Users,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import { PrototypeTable } from "#/components/ui/PrototypeTable";
import { SupportSection } from "#/components/ui/SupportSection";
import { TimeRangeSelector } from "#/components/ui/TimeRangeSelector";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { useAuth } from "#/hooks/useAuth";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/reports")({
	component: ReportsDashboard,
});

function ReportsDashboard() {
	const location = useLocation();
	const { user } = useAuth();
	const [timeRange, setTimeRange] = useState("month");
	const [activeTab, setActiveTab] = useState("overview");

	const sidebarItems = getDashboardSidebar(location.pathname, user?.role);

	const tabs = [
		{ id: "overview", label: "Visão Geral", icon: BarChart3 },
		{ id: "financial", label: "Finanças", icon: Wallet },
		{ id: "performance", label: "Desempenho", icon: TrendingUp },
		{ id: "members", label: "Membros", icon: Users },
		{ id: "custom", label: "Personalizado", icon: Settings },
	];

	const reportCards = [
		{
			title: "Total Colectado",
			value: "545.000 MZN",
			subtext: "+21.1% vs mês anterior",
			borderColor: "success" as const,
		},
		{
			title: "Total Guardado",
			value: "420.000 MZN",
			subtext: "+10.5% vs mês anterior",
			borderColor: "info" as const,
		},
		{
			title: "Caderno Total",
			value: "545.000 MZN",
			subtext: "+21.1% vs mês anterior",
			borderColor: "success" as const,
		},
		{
			title: "Crescimento de Membros",
			value: "+5",
			subtext: "50 membros totais",
			borderColor: "info" as const,
		},
		{
			title: "Taxa de Retenção",
			value: "94%",
			subtext: "+1.8% vs mês anterior",
			borderColor: "primary" as const,
		},
		{
			title: "Valor Médio por Membro",
			value: "10.900 MZN",
			subtext: "+8.3% vs mês anterior",
			borderColor: "warning" as const,
		},
	];

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Relatórios"
					description="Análise detalhada de desempenho e métricas"
					rightContent={
						<div className="flex items-center gap-2">
							<TimeRangeSelector value={timeRange} onChange={setTimeRange} />
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Filter size={16} />}
							>
								Filtros
							</Button>
						</div>
					}
				/>

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-7xl w-full mx-auto">
					{/* Tab Navigation */}
					<nav className="flex items-center border-b border-slate-200 gap-1 overflow-x-auto">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
									activeTab === tab.id
										? "border-slate-900 text-slate-900"
										: "border-transparent text-slate-500 hover:text-slate-700",
								)}
							>
								<tab.icon size={16} />
								{tab.label}
							</button>
						))}
					</nav>

					{/* Quick Actions */}
					<div className="flex flex-wrap gap-3">
						<Button size="sm" leftIcon={<Download size={16} />}>
							Exportar PDF
						</Button>
						<Button size="sm" variant="outline" leftIcon={<Share2 size={16} />}>
							Partilhar
						</Button>
						<Button
							size="sm"
							variant="outline"
							leftIcon={<Calendar size={16} />}
						>
							Agendar Relatório
						</Button>
					</div>

					{/* Report Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{reportCards.map((card) => (
							<PrototypeKPICard key={card.title} {...card} />
						))}
					</div>

					{/* Main Chart Area */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader className="flex justify-between items-center pb-4">
								<h4 className="font-semibold text-slate-900">
									Evolução de Caderno
								</h4>
								<div className="flex gap-2">
									<Button
										size="sm"
										variant="ghost"
										leftIcon={<LineChart size={16} />}
									>
										Linha
									</Button>
									<Button
										size="sm"
										variant="ghost"
										leftIcon={<BarChart3 size={16} />}
									>
										Barras
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-4">
									<div className="w-full space-y-4">
										{[
											{ label: "Set", value: 420 },
											{ label: "Out", value: 450 },
											{ label: "Nov", value: 480 },
											{ label: "Dez", value: 510 },
											{ label: "Jan", value: 545 },
										].map((item) => (
											<div key={item.label} className="flex items-center gap-3">
												<span className="text-xs text-slate-600 w-8 font-medium">
													{item.label}
												</span>
												<div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
													<div
														className="h-full bg-emerald-500 rounded-full transition-all duration-300 hover:bg-emerald-400"
														style={{ width: `${(item.value / 600) * 100}%` }}
													/>
												</div>
												<span className="text-xs font-semibold text-slate-900 w-12">
													{item.value}k
												</span>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex justify-between items-center pb-4">
								<h4 className="font-semibold text-slate-900">
									Distribuição por Categoria
								</h4>
								<Button
									size="sm"
									variant="ghost"
									leftIcon={<PieChart size={16} />}
								>
									Circular
								</Button>
							</CardHeader>
							<CardContent>
								<div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-4">
									<div className="w-full space-y-4">
										{[
											{ label: "Colectas", value: 60, color: "bg-emerald-500" },
											{
												label: "Empréstimos",
												value: 25,
												color: "bg-amber-500",
											},
											{ label: "Outros", value: 15, color: "bg-slate-300" },
										].map((item) => (
											<div key={item.label} className="flex items-center gap-3">
												<span className="text-xs text-slate-600 w-20 font-medium">
													{item.label}
												</span>
												<div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
													<div
														className={`h-full ${item.color} rounded-full transition-all duration-300`}
														style={{ width: `${item.value}%` }}
													/>
												</div>
												<span className="text-xs font-semibold text-slate-900 w-8">
													{item.value}%
												</span>
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Detailed Table */}
					<Card>
						<CardHeader className="flex justify-between items-center pb-4">
							<h4 className="font-semibold text-slate-900">
								Detalhamento por Período
							</h4>
							<Button size="sm" variant="outline">
								Ver Tabela Completa
							</Button>
						</CardHeader>
						<CardContent>
							<PrototypeTable
								data={[
									{
										id: "1",
										period: "Set 2024",
										revenue: "420.000 MZN",
										expenses: "125.000 MZN",
										profit: "295.000 MZN",
										growth: "+7.1%",
									},
									{
										id: "2",
										period: "Out 2024",
										revenue: "450.000 MZN",
										expenses: "130.000 MZN",
										profit: "320.000 MZN",
										growth: "+7.1%",
									},
									{
										id: "3",
										period: "Nov 2024",
										revenue: "480.000 MZN",
										expenses: "135.000 MZN",
										profit: "345.000 MZN",
										growth: "+6.7%",
									},
									{
										id: "4",
										period: "Dez 2024",
										revenue: "510.000 MZN",
										expenses: "140.000 MZN",
										profit: "370.000 MZN",
										growth: "+6.3%",
									},
									{
										id: "5",
										period: "Jan 2025",
										revenue: "545.000 MZN",
										expenses: "125.000 MZN",
										profit: "420.000 MZN",
										growth: "+6.8%",
									},
								]}
								columns={[
									{ key: "period", header: "Período" },
									{ key: "revenue", header: "Caderno" },
									{ key: "expenses", header: "Despesas" },
									{
										key: "profit",
										header: "Lucro",
										render: (value) => (
											<span className="text-sm font-medium text-emerald-500">
												{value as string}
											</span>
										),
									},
									{
										key: "growth",
										header: "Crescimento",
										render: (value) => (
											<span className="text-sm text-emerald-500">
												{value as string}
											</span>
										),
									},
								]}
							/>
						</CardContent>
					</Card>

					{/* Support Section */}
					<SupportSection />
				</main>
			</div>
		</DashboardLayout>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import {
	BarChart3,
	Calendar,
	Download,
	FileText,
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
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { cn } from "#/lib/design-system";
import { getDashboardSidebar } from "#/config/dashboardSidebar";

export const Route = createFileRoute("/dashboard/reports")({
	component: ReportsDashboard,
});

function ReportsDashboard() {
	const [timeRange, setTimeRange] = useState("month");
	const [activeTab, setActiveTab] = useState("overview");

	const sidebarItems = getDashboardSidebar("/dashboard/reports");

	const tabs = [
		{ id: "overview", label: "Visão Geral", icon: BarChart3 },
		{ id: "financial", label: "Financeiro", icon: Wallet },
		{ id: "performance", label: "Desempenho", icon: TrendingUp },
		{ id: "members", label: "Membros", icon: Users },
		{ id: "custom", label: "Personalizado", icon: Settings },
	];

	const reportCards = [
		{
			title: "Receita Total",
			value: "450.000 MZN",
			subtext: "+12.5% vs mês anterior",
			borderColor: "success" as const,
		},
		{
			title: "Crescimento de Membros",
			value: "+34",
			subtext: "+8.2% vs mês anterior",
			borderColor: "info" as const,
		},
		{
			title: "Taxa de Retenção",
			value: "94.2%",
			subtext: "+2.1% vs mês anterior",
			borderColor: "primary" as const,
		},
		{
			title: "Valor Médio por Membro",
			value: "1.315 MZN",
			subtext: "-3.4% vs mês anterior",
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{reportCards.map((card) => (
							<PrototypeKPICard key={card.title} {...card} />
						))}
					</div>

					{/* Main Chart Area */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader className="flex justify-between items-center pb-4">
								<h4 className="font-semibold text-slate-900">
									Evolução de Receitas
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
											{ label: "Jan", value: 320 },
											{ label: "Fev", value: 380 },
											{ label: "Mar", value: 350 },
											{ label: "Abr", value: 420 },
											{ label: "Mai", value: 450 },
											{ label: "Jun", value: 480 },
										].map((item) => (
											<div key={item.label} className="flex items-center gap-3">
												<span className="text-xs text-slate-600 w-8 font-medium">
													{item.label}
												</span>
												<div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
													<div
														className="h-full bg-emerald-500 rounded-full transition-all duration-300 hover:bg-emerald-400"
														style={{ width: `${(item.value / 500) * 100}%` }}
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
										period: "Jan 2024",
										revenue: "380.000 MZN",
										expenses: "120.000 MZN",
										profit: "260.000 MZN",
										growth: "+8.5%",
									},
									{
										id: "2",
										period: "Fev 2024",
										revenue: "410.000 MZN",
										expenses: "130.000 MZN",
										profit: "280.000 MZN",
										growth: "+7.9%",
									},
									{
										id: "3",
										period: "Mar 2024",
										revenue: "450.000 MZN",
										expenses: "140.000 MZN",
										profit: "310.000 MZN",
										growth: "+10.7%",
									},
								]}
								columns={[
									{ key: "period", header: "Período" },
									{ key: "revenue", header: "Receita" },
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

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
import { MiniReportCard } from "#/components/ui/MiniReportCard";
import { TimeRangeSelector } from "#/components/ui/TimeRangeSelector";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/reports")({
	component: ReportsDashboard,
});

function ReportsDashboard() {
	const [timeRange, setTimeRange] = useState("month");
	const [activeTab, setActiveTab] = useState("overview");

	const sidebarItems = [
		{ label: "Painel", icon: TrendingUp, href: "/dashboard/overview" },
		{ label: "Gestão", icon: Users, href: "/dashboard/savers" },
		{ label: "Financeiro", icon: Wallet, href: "/dashboard/financial" },
		{
			label: "Relatórios",
			icon: FileText,
			href: "/dashboard/reports",
			isActive: true,
		},
		{ label: "Configurações", icon: Settings, href: "/dashboard/settings" },
	];

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
			trend: { value: "12.5%", isPositive: true },
			sparklineData: [
				120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400,
			],
			color: "text-emerald-600 bg-emerald-50 border-emerald-100",
		},
		{
			title: "Crescimento de Membros",
			value: "+34",
			trend: { value: "8.2%", isPositive: true },
			sparklineData: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 33, 34],
			color: "text-blue-600 bg-blue-50 border-blue-100",
		},
		{
			title: "Taxa de Retenção",
			value: "94.2%",
			trend: { value: "2.1%", isPositive: true },
			sparklineData: [85, 87, 88, 89, 90, 91, 92, 93, 93, 94, 94, 94],
			color: "text-purple-600 bg-purple-50 border-purple-100",
		},
		{
			title: "Valor Médio por Membro",
			value: "1.315 MZN",
			trend: { value: "3.4%", isPositive: false },
			sparklineData: [
				1500, 1450, 1400, 1380, 1350, 1320, 1300, 1280, 1260, 1240, 1220, 1200,
			],
			color: "text-amber-600 bg-amber-50 border-amber-100",
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

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
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
										? "border-emerald-600 text-emerald-600"
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
							<MiniReportCard key={card.title} {...card} />
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
								<div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
									<div className="text-center">
										<LineChart
											size={48}
											className="text-slate-300 mx-auto mb-2"
										/>
										<p className="text-sm text-slate-400">
											Gráfico interativo de evolução
										</p>
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
								<div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
									<div className="text-center">
										<PieChart
											size={48}
											className="text-slate-300 mx-auto mb-2"
										/>
										<p className="text-sm text-slate-400">
											Gráfico de distribuição
										</p>
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
							<div className="overflow-x-auto">
								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-slate-200">
											<th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
												Período
											</th>
											<th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
												Receita
											</th>
											<th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
												Despesas
											</th>
											<th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
												Lucro
											</th>
											<th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
												Crescimento
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-100">
										{[
											{
												period: "Jan 2024",
												revenue: "380.000 MZN",
												expenses: "120.000 MZN",
												profit: "260.000 MZN",
												growth: "+8.5%",
											},
											{
												period: "Fev 2024",
												revenue: "410.000 MZN",
												expenses: "130.000 MZN",
												profit: "280.000 MZN",
												growth: "+7.9%",
											},
											{
												period: "Mar 2024",
												revenue: "450.000 MZN",
												expenses: "140.000 MZN",
												profit: "310.000 MZN",
												growth: "+10.7%",
											},
										].map((row) => (
											<tr key={row.period} className="hover:bg-slate-50">
												<td className="px-4 py-3 text-sm text-slate-900">
													{row.period}
												</td>
												<td className="px-4 py-3 text-sm text-slate-600">
													{row.revenue}
												</td>
												<td className="px-4 py-3 text-sm text-slate-600">
													{row.expenses}
												</td>
												<td className="px-4 py-3 text-sm font-medium text-emerald-600">
													{row.profit}
												</td>
												<td className="px-4 py-3 text-sm text-emerald-600">
													{row.growth}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</main>
			</div>
		</DashboardLayout>
	);
}

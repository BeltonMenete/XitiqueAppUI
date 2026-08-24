import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Plus, Users, Wallet } from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import { SupportSection } from "#/components/ui/SupportSection";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/overview")({
	component: OrganizationDashboard,
});

function OrganizationDashboard() {
	const [searchTerm, setSearchTerm] = useState("");
	const sidebarItems = getDashboardSidebar("/dashboard/overview");

	const kpiData = [
		{
			title: "Arrecadado Mês",
			value: "450.000 MZN",
			subtext: "+12.5% vs mês anterior",
			borderColor: "success" as const,
			clickable: true,
			expandedContent: (
				<div className="space-y-4">
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Meta Mensal</span>
						<span className="font-semibold text-slate-900">500.000 MZN</span>
					</div>
					<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
						<div
							className="h-full bg-emerald-500 rounded-full transition-all duration-500"
							style={{ width: "90%" }}
						/>
					</div>
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Progresso</span>
						<span className="font-semibold text-emerald-500">90%</span>
					</div>
					<Button size="sm" variant="outline" className="w-full mt-2">
						Ver Relatório Detalhado
					</Button>
				</div>
			),
		},
		{
			title: "Comissão Mês",
			value: "45.000 MZN",
			subtext: "No caminho da meta",
			borderColor: "warning" as const,
			clickable: true,
			expandedContent: (
				<div className="space-y-4">
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Meta de Comissão</span>
						<span className="font-semibold text-slate-900">50.000 MZN</span>
					</div>
					<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
						<div
							className="h-full bg-amber-500 rounded-full transition-all duration-500"
							style={{ width: "90%" }}
						/>
					</div>
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Progresso</span>
						<span className="font-semibold text-amber-600">90%</span>
					</div>
					<Button size="sm" variant="outline" className="w-full mt-2">
						Ver Detalhes de Comissão
					</Button>
				</div>
			),
		},
		{
			title: "Emprestado",
			value: "60.000 MZN",
			subtext: "8 Empréstimos Activos",
			borderColor: "primary" as const,
			clickable: true,
			expandedContent: (
				<div className="space-y-4">
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Total Solicitado</span>
						<span className="font-semibold text-slate-900">85.000 MZN</span>
					</div>
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Em Atraso</span>
						<span className="font-semibold text-red-600">2 empréstimos</span>
					</div>
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Taxa de Aprovação</span>
						<span className="font-semibold text-emerald-500">94%</span>
					</div>
					<Button size="sm" variant="outline" className="w-full mt-2">
						Gerir Empréstimos
					</Button>
				</div>
			),
		},
		{
			title: "Diferença Caixa",
			value: "-2.300 MZN",
			subtext: "Requer Reconciliação",
			borderColor: "error" as const,
			clickable: true,
			expandedContent: (
				<div className="space-y-4">
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Última Reconciliação</span>
						<span className="font-semibold text-slate-900">Há 3 dias</span>
					</div>
					<div className="flex justify-between text-xs">
						<span className="text-slate-500">Itens Pendentes</span>
						<span className="font-semibold text-amber-600">5 transações</span>
					</div>
					<div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
						<p className="text-xs text-amber-800">Reconciliação recomendada</p>
					</div>
					<Button size="sm" variant="outline" className="w-full mt-2">
						Iniciar Reconciliação
					</Button>
				</div>
			),
		},
	];

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Olá, Ana - Xitique Central"
					description="Monitoria de fluxos rotativos e validação de carteiras"
					searchValue={searchTerm}
					onSearchChange={setSearchTerm}
					searchPlaceholder="Pesquisar Ticantes..."
				/>

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* Action Banner */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
						<div>
							<h2 className="text-sm font-bold text-slate-950 tracking-tight">
								Painel de Organização
							</h2>
							<p className="text-[11px] text-slate-400">
								Visão geral das actividades da sua organização
							</p>
						</div>
						<Button size="sm" leftIcon={<Plus size={16} />}>
							Nova Colecta
						</Button>
					</div>

					{/* KPI Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{kpiData.map((kpi) => (
							<PrototypeKPICard key={kpi.title} {...kpi} />
						))}
					</div>

					{/* Dashboard Content Grid */}
					<div className="grid grid-cols-12 gap-6">
						{/* Collection Evolution Chart */}
						<div className="col-span-12 lg:col-span-8">
							<Card>
								<CardContent className="p-5">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-sm font-semibold text-slate-900">
											Evolução de Colectas
										</h3>
										<select className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
											<option>Últimos 6 meses</option>
											<option>Último ano</option>
										</select>
									</div>
									{/* Chart placeholder - CSS-only simple bar chart */}
									<div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 p-4">
										<div className="w-full space-y-4">
											{[
												{ label: "Jan", value: 75 },
												{ label: "Fev", value: 82 },
												{ label: "Mar", value: 68 },
												{ label: "Abr", value: 90 },
												{ label: "Mai", value: 85 },
												{ label: "Jun", value: 92 },
											].map((item) => (
												<div
													key={item.label}
													className="flex items-center gap-3"
												>
													<span className="text-xs text-slate-600 w-8 font-medium">
														{item.label}
													</span>
													<div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
														<div
															className="h-full bg-emerald-500 rounded-full transition-all duration-300 hover:bg-emerald-400"
															style={{ width: `${item.value}%` }}
														/>
													</div>
													<span className="text-xs font-semibold text-slate-900 w-10">
														{item.value}%
													</span>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Recent Activity */}
						<div className="col-span-12 lg:col-span-4">
							<Card>
								<CardContent className="p-5">
									<h3 className="text-sm font-semibold text-slate-900 mb-4">
										Actividade Recente
									</h3>
									<div className="space-y-4">
										{[
											{
												id: "1",
												action: "Nova colecta",
												user: "Maria Silva",
												time: "Há 5 min",
											},
											{
												id: "2",
												action: "Empréstimo aprovado",
												user: "João Machava",
												time: "Há 15 min",
											},
											{
												id: "3",
												action: "Pagamento recebido",
												user: "Alberto Chongo",
												time: "Há 30 min",
											},
											{
												id: "4",
												action: "Membro registado",
												user: "Sofia Macamo",
												time: "Há 1 hora",
											},
										].map((activity, index) => {
											const icons = [Users, Wallet, DollarSign, Users];
											const Icon = icons[index % icons.length];
											return (
												<div
													key={activity.id}
													className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
												>
													<div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
														<Icon size={16} className="text-slate-600" />
													</div>
													<div className="flex-1">
														<p className="text-xs font-medium text-slate-900">
															{activity.action}
														</p>
														<p className="text-[10px] text-slate-400">
															{activity.user}
														</p>
													</div>
													<span className="text-[10px] text-slate-400">
														{activity.time}
													</span>
												</div>
											);
										})}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Member Statistics */}
						<div className="col-span-12 lg:col-span-6">
							<Card>
								<CardContent className="p-5">
									<h3 className="text-sm font-semibold text-slate-900 mb-4">
										Estatísticas de Membros
									</h3>
									<div className="grid grid-cols-2 gap-4">
										<div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
											<p className="text-2xl font-bold text-slate-900">342</p>
											<p className="text-xs text-slate-400">Total de Membros</p>
										</div>
										<div className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
											<p className="text-2xl font-bold text-slate-900">318</p>
											<p className="text-xs text-slate-400">Membros Activos</p>
										</div>
										<div className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer border border-transparent hover:border-amber-200">
											<p className="text-2xl font-bold text-amber-600">18</p>
											<p className="text-xs text-slate-400">Novos este mês</p>
										</div>
										<div className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer border border-transparent hover:border-red-200">
											<p className="text-2xl font-bold text-red-600">6</p>
											<p className="text-xs text-slate-400">Em Incumprimento</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Loan Overview */}
						<div className="col-span-12 lg:col-span-6">
							<Card>
								<CardContent className="p-5">
									<h3 className="text-sm font-semibold text-slate-900 mb-4">
										Visão Geral de Empréstimos
									</h3>
									<div className="space-y-4">
										{[
											{
												id: "1",
												name: "João Machava",
												amount: "15.000 MZN",
												status: "approved",
											},
											{
												id: "2",
												name: "Maria Santos",
												amount: "10.000 MZN",
												status: "pending",
											},
											{
												id: "3",
												name: "Alberto Chongo",
												amount: "20.000 MZN",
												status: "approved",
											},
											{
												id: "4",
												name: "Sofia Macamo",
												amount: "8.000 MZN",
												status: "rejected",
											},
										].map((loan) => (
											<div
												key={loan.id}
												className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
											>
												<div>
													<p className="text-xs font-medium text-slate-900">
														{loan.name}
													</p>
													<p className="text-[10px] text-slate-400">
														{loan.amount}
													</p>
												</div>
												<span
													className={cn(
														"text-[10px] px-2 py-1 rounded-full font-semibold",
														loan.status === "approved"
															? "bg-emerald-100 text-emerald-700"
															: loan.status === "pending"
																? "bg-amber-100 text-amber-700"
																: "bg-red-100 text-red-700",
													)}
												>
													{loan.status === "approved"
														? "Aprovado"
														: loan.status === "pending"
															? "Pendente"
															: "Rejeitado"}
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Support Section */}
					<SupportSection
						performanceTitle="Desempenho da Organização"
						performanceText="Este mês, a organização atingiu 94% de eficiência nas coletas. Mantenha o bom trabalho!"
						performanceAction="Ver Relatório Detalhado"
					/>
				</main>
			</div>
		</DashboardLayout>
	);
}

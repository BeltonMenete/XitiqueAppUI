import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowDownLeft,
	ArrowUpRight,
	Download,
	Filter,
	Plus,
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
import { EmptyState } from "#/components/ui/EmptyState";
import { FilterChips } from "#/components/ui/FilterChips";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import { PrototypeTable } from "#/components/ui/PrototypeTable";
import { SupportSection } from "#/components/ui/SupportSection";
import { cn } from "#/lib/design-system";
import {
	useCashFlow,
	useFinancialSummary,
	useTransactions,
} from "#/features/financial";

export const Route = createFileRoute("/dashboard/financial")({
	component: FinancialDashboard,
});

function FinancialDashboard() {
	const [selectedType, setSelectedType] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

	const { data: summary, isLoading: summaryLoading } = useFinancialSummary();
	const { data: transactions, isLoading: transactionsLoading } =
		useTransactions({
			type: selectedType.length > 0 ? (selectedType[0] as any) : undefined,
		});
	const { data: cashFlow, isLoading: cashFlowLoading } = useCashFlow();

	const sidebarItems = [
		{ label: "Painel", icon: TrendingUp, href: "/dashboard/overview" },
		{ label: "Gestão", icon: Users, href: "/dashboard/savers" },
		{
			label: "Financeiro",
			icon: Wallet,
			href: "/dashboard/financial",
			isActive: true,
		},
		{ label: "Relatórios", icon: TrendingUp, href: "/dashboard/reports" },
		{ label: "Configurações", icon: Wallet, href: "/dashboard/settings" },
	];

	const typeFilters = [
		{ id: "income", label: "Receitas" },
		{ id: "expense", label: "Despesas" },
		{ id: "loan", label: "Empréstimos" },
		{ id: "deposit", label: "Depósitos" },
	];

	const categoryFilters = [
		{ id: "Colecta", label: "Colecta" },
		{ id: "Empréstimo", label: "Empréstimo" },
		{ id: "Taxa", label: "Taxa" },
	];

	const kpiData = summary
		? [
			{
				title: "Saldo Total",
				value: `${summary.balance.toLocaleString()} MZN`,
				subtext: "Disponível",
				borderColor: "success" as const,
			},
			{
				title: "Receitas (Mês)",
				value: `${summary.totalIncome.toLocaleString()} MZN`,
				subtext: "+12.5% vs mês anterior",
				borderColor: "success" as const,
			},
			{
				title: "Despesas (Mês)",
				value: `${summary.totalExpense.toLocaleString()} MZN`,
				subtext: "+5.2% vs mês anterior",
				borderColor: "error" as const,
			},
			{
				title: "Empréstimos Ativos",
				value: `${summary.totalLoans.toLocaleString()} MZN`,
				subtext: "Valor total",
				borderColor: "warning" as const,
			},
		]
		: [];

	const columns = [
		{
			key: "date",
			header: "DATA",
			render: (value: unknown) => (
				<span className="text-sm text-slate-900">{String(value)}</span>
			),
		},
		{
			key: "description",
			header: "DESCRIÇÃO",
			render: (value: unknown) => (
				<span className="text-sm font-medium text-slate-900">
					{String(value)}
				</span>
			),
		},
		{
			key: "category",
			header: "CATEGORIA",
			render: (value: unknown) => (
				<span className="text-sm text-slate-600">{String(value)}</span>
			),
		},
		{
			key: "amount",
			header: "VALOR",
			render: (value: unknown, row: any) => (
				<span
					className={cn(
						"font-mono text-sm font-bold",
						row.type === "income" || row.type === "deposit"
							? "text-emerald-600"
							: "text-red-600",
					)}
				>
					{row.type === "income" || row.type === "deposit" ? "+" : ""}
					{Number(value).toLocaleString()} MZN
				</span>
			),
		},
		{
			key: "status",
			header: "ESTADO",
			render: (value: unknown) => (
				<span
					className={cn(
						"text-xs font-semibold px-2 py-1 rounded-full",
						value === "completed"
							? "bg-emerald-100 text-emerald-700"
							: value === "pending"
								? "bg-amber-100 text-amber-700"
								: "bg-red-100 text-red-700",
					)}
				>
					{String(value) === "completed"
						? "Concluído"
						: String(value) === "pending"
							? "Pendente"
							: "Falhou"}
				</span>
			),
		},
	];

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Gestão Financeira"
					description="Visão completa das transações e fluxo de caixa"
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Financeiro" },
					]}
					rightContent={
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Filter size={16} />}
							>
								Filtros
							</Button>
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Download size={16} />}
							>
								Exportar
							</Button>
							<Button size="sm" leftIcon={<Plus size={16} />}>
								Nova Transação
							</Button>
						</div>
					}
				/>

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
					{/* KPI Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{kpiData.map((kpi) => (
							<PrototypeKPICard key={kpi.title} {...kpi} />
						))}
					</div>

					{/* Filters */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
						<div>
							<h2 className="text-sm font-bold text-slate-950 tracking-tight">
								Filtros
							</h2>
							<p className="text-[11px] text-slate-400">
								Filtrar transações por tipo e categoria
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<FilterChips
								filters={typeFilters}
								selected={selectedType}
								onToggle={(id) => {
									setSelectedType((prev) =>
										prev.includes(id) ? prev.filter((s) => s !== id) : [id],
									);
								}}
								onRemove={(id) => {
									setSelectedType((prev) => prev.filter((s) => s !== id));
								}}
							/>
							<FilterChips
								filters={categoryFilters}
								selected={selectedCategory}
								onToggle={(id) => {
									setSelectedCategory((prev) =>
										prev.includes(id) ? prev.filter((s) => s !== id) : [id],
									);
								}}
								onRemove={(id) => {
									setSelectedCategory((prev) => prev.filter((s) => s !== id));
								}}
							/>
						</div>
					</div>

					{/* Cash Flow Chart */}
					<Card>
						<CardHeader className="flex justify-between items-center pb-4">
							<h4 className="font-semibold text-slate-900">
								Fluxo de Caixa (6 Meses)
							</h4>
						</CardHeader>
						<CardContent>
							{cashFlowLoading ? (
								<div className="h-64 bg-slate-50 rounded-lg animate-pulse" />
							) : (
								<div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 p-4">
									<div className="w-full space-y-3">
										{cashFlow?.map((item) => (
											<div key={item.month} className="flex items-center gap-3">
												<span className="text-xs text-slate-500 w-8">
													{item.month}
												</span>
												<div className="flex-1 h-4 bg-slate-200 rounded-full overflow-hidden">
													<div
														className="h-full bg-slate-900 rounded-full transition-all duration-300 hover:bg-slate-800"
														style={{
															width: `${(item.balance / 500000) * 100}%`,
														}}
													/>
												</div>
												<span className="text-xs font-semibold text-slate-700 w-20">
													{item.balance.toLocaleString()}k
												</span>
											</div>
										))}
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Transactions Table */}
					{transactionsLoading ? (
						<div className="p-8">
							<div className="h-64 bg-slate-50 rounded-lg animate-pulse" />
						</div>
					) : transactions && transactions.data.length > 0 ? (
						<PrototypeTable
							data={transactions.data}
							columns={columns}
							showStatusBadges={true}
							onRowClick={(row) => console.log("View transaction:", row)}
							pagination={{
								currentPage: 1,
								totalPages: Math.ceil(transactions.data.length / 10),
								totalItems: transactions.data.length,
								onPageChange: (page) => console.log("Page change:", page),
							}}
						/>
					) : (
						<div className="p-8">
							<EmptyState
								icon={Wallet}
								title="Nenhuma transação encontrada"
								description="Ajuste os filtros ou registre uma nova transação"
								actionLabel="Limpar Filtros"
								onAction={() => {
									setSelectedType([]);
									setSelectedCategory([]);
								}}
							/>
						</div>
					)}

					{/* Support Section */}
					<SupportSection
						performanceTitle="Desempenho Financeiro"
						performanceText="Este mês, a organização atingiu 82% da meta de arrecadação. Continue monitorando os fluxos."
						performanceAction="Ver Relatório Financeiro"
					/>
				</main>
			</div>
		</DashboardLayout>
	);
}

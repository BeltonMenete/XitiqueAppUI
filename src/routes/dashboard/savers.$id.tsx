import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowLeft,
	Calendar,
	CheckCircle2,
	History,
	MapPin,
	Phone,
	Printer,
	Receipt,
	Share2,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Breadcrumbs } from "#/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";
import { DebtBadge } from "#/components/ui/StatusBadge";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { ProgressCircle } from "#/components/ui/ProgressCircle";
import { cn } from "#/lib/design-system";
import {
	useSaver,
	useSaverDeposits,
	useSaverLoans,
	useSaverHistory,
} from "#/features/savers";

export const Route = createFileRoute("/dashboard/savers/$id")({
	component: SaverDetails,
});

function SaverDetails() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<
		"card" | "statement" | "loans" | "history"
	>("card");

	const { data: saver, isLoading: saverLoading } = useSaver(id);
	const { data: deposits, isLoading: depositsLoading } = useSaverDeposits(id);
	const { data: loans, isLoading: loansLoading } = useSaverLoans(id);
	const { data: history, isLoading: historyLoading } = useSaverHistory(id);

	const sidebarItems = [
		{ label: "Painel", icon: TrendingUp, href: "/dashboard/overview" },
		{
			label: "Gestão",
			icon: TrendingUp,
			href: "/dashboard/savers",
			isActive: true,
		},
		{ label: "Financeiro", icon: Wallet, href: "/dashboard/financial" },
		{ label: "Relatórios", icon: History, href: "/dashboard/reports" },
		{ label: "Configurações", icon: Calendar, href: "/dashboard/settings" },
	];

	const mockSaver = {
		id: "MZ-09442",
		name: "Maria Silva",
		location: "Mercado Central, Maputo",
		phone: "+258 84 123 4567",
		dailyRate: "500 MZN",
		totalSaved: "9.000 MZN",
		debt: "2.200 MZN",
		status: "active",
		registrationDate: "2024-01-15",
		organization: "Xitique Central",
	};

	const displaySaver = saver || mockSaver;

	const generateDays = () => {
		const days = [];
		for (let i = 1; i <= 30; i++) {
			const status =
				Math.random() > 0.7
					? "paid"
					: Math.random() > 0.5
						? "partial"
						: "unpaid";
			days.push({ day: i, status });
		}
		return days;
	};

	const days = generateDays();

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Detalhes do Ticante"
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Gestão", href: "/dashboard/savers" },
						{ label: "Ticantes", href: "/dashboard/savers" },
						{ label: displaySaver.name },
					]}
					rightContent={
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								variant="secondary"
								leftIcon={<Printer size={16} />}
							>
								Imprimir Cartão
							</Button>
							<Button size="sm" leftIcon={<Share2 size={16} />}>
								WhatsApp
							</Button>
						</div>
					}
				/>

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* Saver Profile Card */}
					{saverLoading ? (
						<Card>
							<CardContent className="p-6">
								<LoadingSkeleton variant="card" />
							</CardContent>
						</Card>
					) : (
						<Card className="border-l-4 border-l-emerald-500">
							<CardContent className="p-6">
								<div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
									<div className="relative">
										<div className="w-24 h-24 rounded-2xl bg-slate-200 flex items-center justify-center border-4 border-slate-100">
											<span className="text-3xl font-bold text-slate-400">
												MS
											</span>
										</div>
										<span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-2 border-white">
											Ativo
										</span>
									</div>

									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h1 className="text-2xl font-bold text-slate-900">
												{mockSaver.name}
											</h1>
											<span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-mono font-semibold">
												ID: {mockSaver.id}
											</span>
										</div>
										<div className="flex flex-wrap gap-4 text-sm text-slate-500">
											<div className="flex items-center gap-2">
												<MapPin size={16} />
												<span>{mockSaver.location}</span>
											</div>
											<div className="flex items-center gap-2">
												<Phone size={16} />
												<span>{mockSaver.phone}</span>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-4 w-full md:w-auto">
										<div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center min-w-[100px]">
											<p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
												Taxa/Dia
											</p>
											<p className="font-mono text-slate-900 font-bold">
												{mockSaver.dailyRate}
											</p>
										</div>
										<div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center min-w-[100px]">
											<p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider mb-1">
												Poupado
											</p>
											<p className="font-mono text-emerald-500 font-bold">
												{mockSaver.totalSaved}
											</p>
										</div>
										<div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center min-w-[100px]">
											<p className="text-[10px] uppercase font-bold text-red-600 tracking-wider mb-1">
												Dívida
											</p>
											<p className="font-mono text-red-600 font-bold">
												{mockSaver.debt}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Tab Navigation */}
					<div className="flex border-b border-slate-200 overflow-x-auto whitespace-nowrap">
						{[
							{ id: "card", label: "Cartão Digital", icon: Calendar },
							{ id: "statement", label: "Extrato", icon: Receipt },
							{ id: "loans", label: "Empréstimos", icon: Wallet },
							{ id: "history", label: "Histórico", icon: History },
						].map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() =>
									setActiveTab(
										tab.id as "card" | "statement" | "loans" | "history",
									)
								}
								className={cn(
									"px-6 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2",
									activeTab === tab.id
										? "text-emerald-500 border-emerald-500"
										: "text-slate-500 border-transparent hover:text-slate-700",
								)}
							>
								<tab.icon size={20} />
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === "card" && (
						<Card>
							<CardHeader>
								<h3 className="text-sm font-semibold text-slate-900">
									Cartão Digital - Maio 2024
								</h3>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-6 gap-2 mb-6">
									{days.map((day) => (
										<div
											key={day.day}
											className={cn(
												"aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-105",
												day.status === "paid" && "bg-emerald-500 text-white",
												day.status === "partial" && "bg-amber-500 text-white",
												day.status === "unpaid" &&
												"bg-slate-100 text-slate-400 border-2 border-slate-200",
											)}
										>
											{day.status === "paid"
												? "✓"
												: day.status === "partial"
													? "½"
													: day.day}
										</div>
									))}
								</div>

								<div className="flex items-center justify-between text-xs text-slate-500">
									<div className="flex items-center gap-4">
										<div className="flex items-center gap-1">
											<div className="w-3 h-3 rounded-full bg-emerald-500" />
											<span>
												Pago: {days.filter((d) => d.status === "paid").length}{" "}
												dias
											</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-3 h-3 rounded-full bg-amber-500" />
											<span>
												Parcial:{" "}
												{days.filter((d) => d.status === "partial").length} dias
											</span>
										</div>
										<div className="flex items-center gap-1">
											<div className="w-3 h-3 rounded-full bg-slate-300" />
											<span>
												Pendente:{" "}
												{days.filter((d) => d.status === "unpaid").length} dias
											</span>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<span className="font-mono">Total: {days.length} dias</span>
										<ProgressCircle
											value={
												(days.filter((d) => d.status === "paid").length /
													days.length) *
												100
											}
											size="sm"
											label={`${Math.round((days.filter((d) => d.status === "paid").length / days.length) * 100)}%`}
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					)}

					{activeTab === "statement" && (
						<Card>
							<CardHeader>
								<h3 className="text-sm font-semibold text-slate-900">
									Extrato de Depósitos
								</h3>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[
										{
											id: "1",
											date: "01/05/2024",
											amount: "500 MZN",
											status: "paid",
										},
										{
											id: "2",
											date: "02/05/2024",
											amount: "500 MZN",
											status: "paid",
										},
										{
											id: "3",
											date: "03/05/2024",
											amount: "500 MZN",
											status: "partial",
										},
										{
											id: "4",
											date: "04/05/2024",
											amount: "500 MZN",
											status: "paid",
										},
										{
											id: "5",
											date: "05/05/2024",
											amount: "500 MZN",
											status: "unpaid",
										},
									].map((transaction) => (
										<div
											key={transaction.id}
											className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
										>
											<div className="flex items-center gap-3">
												<div
													className={cn(
														"w-8 h-8 rounded-full flex items-center justify-center",
														transaction.status === "paid"
															? "bg-emerald-100"
															: transaction.status === "partial"
																? "bg-amber-100"
																: "bg-slate-200",
													)}
												>
													{transaction.status === "paid" ? (
														<CheckCircle2
															size={16}
															className="text-emerald-500"
														/>
													) : transaction.status === "partial" ? (
														<AlertCircle size={16} className="text-amber-600" />
													) : (
														<span className="text-slate-400">!</span>
													)}
												</div>
												<div>
													<p className="text-xs font-medium text-slate-900">
														{transaction.date}
													</p>
													<p className="text-[10px] text-slate-400">
														Depósito diário
													</p>
												</div>
											</div>
											<span className="font-mono text-sm font-semibold text-slate-900">
												{transaction.amount}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{activeTab === "loans" && (
						<Card>
							<CardHeader>
								<h3 className="text-sm font-semibold text-slate-900">
									Empréstimos Activos
								</h3>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[
										{
											id: "L-001",
											amount: "2.000 MZN",
											interest: "200 MZN",
											daysInDebt: 8,
											totalDays: 15,
											status: "active",
										},
										{
											id: "L-002",
											amount: "1.000 MZN",
											interest: "100 MZN",
											daysInDebt: 3,
											totalDays: 5,
											status: "active",
										},
									].map((loan) => (
										<div
											key={loan.id}
											className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
										>
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-1">
													<span className="font-mono text-xs text-slate-400">
														{loan.id}
													</span>
													<DebtBadge />
												</div>
												<p className="text-sm font-medium text-slate-900">
													{loan.amount}
												</p>
												<p className="text-[10px] text-slate-400">
													Juros: {loan.interest}
												</p>
											</div>
											<div className="text-right">
												<p className="text-xs text-slate-500">
													{loan.daysInDebt}/{loan.totalDays} dias
												</p>
												<p className="text-xs font-semibold text-red-600">
													Em dívida
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{activeTab === "history" && (
						<Card>
							<CardHeader>
								<h3 className="text-sm font-semibold text-slate-900">
									Histórico de Actividade
								</h3>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{[
										{
											id: "1",
											action: "Registo inicial",
											date: "15/01/2024",
											details: "Taxa diária: 500 MZN",
										},
										{
											id: "2",
											action: "Empréstimo solicitado",
											date: "20/02/2024",
											details: "Valor: 2.000 MZN",
										},
										{
											id: "3",
											action: "Pagamento de juros",
											date: "25/02/2024",
											details: "Valor: 200 MZN",
										},
										{
											id: "4",
											action: "Alteração de taxa",
											date: "01/03/2024",
											details: "Nova taxa: 500 MZN",
										},
									].map((history) => (
										<div
											key={history.id}
											className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
										>
											<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
												<History size={16} className="text-emerald-500" />
											</div>
											<div className="flex-1">
												<p className="text-xs font-medium text-slate-900">
													{history.action}
												</p>
												<p className="text-[10px] text-slate-400">
													{history.date}
												</p>
											</div>
											<span className="text-xs text-slate-500">
												{history.details}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</main>
			</div>
		</DashboardLayout>
	);
}

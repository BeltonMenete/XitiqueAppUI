import { createFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	CheckCircle2,
	ChevronRight,
	History,
	MapPin,
	Phone,
	Printer,
	Receipt,
	Share2,
	TrendingUp,
	Verified,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { DebtBadge } from "#/components/ui/StatusBadge";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import {
	useSaver,
	useSaverDeposits,
	useSaverHistory,
	useSaverLoans,
} from "#/features/savers";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/savers/$id")({
	component: SaverDetails,
});

function SaverDetails() {
	const [activeTab, setActiveTab] = useState<
		"card" | "statement" | "loans" | "history"
	>("card");
	const [_selectedMonth, _setSelectedMonth] = useState("Outubro 2023");
	const [_searchTerm, _setSearchTerm] = useState("");
	const { id } = Route.useParams();

	// Fetch saver data using the ID from route params
	const { data: saver, isLoading: saverLoading, error: _error } = useSaver(id);
	const { data: deposits, isLoading: depositsLoading } = useSaverDeposits(id);
	const { data: loans, isLoading: loansLoading } = useSaverLoans(id);
	const { data: history, isLoading: historyLoading } = useSaverHistory(id);

	const sidebarItems = getDashboardSidebar("/dashboard/savers/$id");

	const displaySaver = saver;

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Detalhes do Ticante"
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Gestão", href: "/dashboard/savers" },
						{ label: "Clientes", href: "/dashboard/savers" },
						{ label: displaySaver?.name || "..." },
					]}
					rightContent={
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Printer size={16} />}
								className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
							>
								Imprimir Cartão
							</Button>
							<Button
								size="sm"
								leftIcon={<Share2 size={16} />}
								className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
							>
								WhatsApp
							</Button>
						</div>
					}
				/>

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* Breadcrumbs & Actions */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center gap-2 text-slate-500">
							<span className="text-xs font-semibold tracking-wider">
								Gestão / Clientes / {displaySaver?.name || "..."}
							</span>
						</div>
						<div className="flex gap-2">
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Printer size={16} />}
								className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
							>
								Imprimir Cartão
							</Button>
							<Button
								size="sm"
								leftIcon={<Share2 size={16} />}
								className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
							>
								WhatsApp
							</Button>
						</div>
					</div>

					{/* Saver Profile Card */}
					{saverLoading ? (
						<Card>
							<CardContent className="p-6">
								<LoadingSkeleton variant="card" />
							</CardContent>
						</Card>
					) : displaySaver ? (
						<Card className="border-l-4 border-l-emerald-500 bg-white shadow-sm">
							<CardContent className="p-6">
								<div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
									<div className="relative">
										<div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center border-4 border-white shadow-sm">
											<span className="text-3xl font-bold text-emerald-700">
												{displaySaver.name
													.split(" ")
													.map((n) => n[0])
													.join("")
													.slice(0, 2)
													.toUpperCase()}
											</span>
										</div>
										<span
											className={cn(
												"absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-2 border-white shadow-sm",
												displaySaver.status === "active"
													? "bg-emerald-500 text-white"
													: "bg-slate-400 text-white",
											)}
										>
											{displaySaver.status === "active" ? "Ativo" : "Inativo"}
										</span>
									</div>

									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h1 className="text-2xl font-bold text-slate-900">
												Detalhes do Ticante - {displaySaver.name}
											</h1>
											<span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-mono font-semibold border border-slate-200">
												ID:{" "}
												{displaySaver.alphanumericId ||
													String(displaySaver.cardNumber)}
											</span>
											{displaySaver.currentDebt > 0 && <DebtBadge />}
										</div>
										<div className="flex flex-wrap gap-4 text-sm text-slate-500">
											<div className="flex items-center gap-2">
												<MapPin size={16} className="text-slate-400" />
												<span>
													{displaySaver.organization?.name ||
														"Mercado Central, Maputo"}
												</span>
											</div>
											{displaySaver.contact && (
												<div className="flex items-center gap-2">
													<Phone size={16} className="text-slate-400" />
													<span>{displaySaver.contact}</span>
												</div>
											)}
										</div>
									</div>

									<div className="grid grid-cols-3 gap-4 w-full md:w-auto">
										<div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center min-w-[100px]">
											<p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
												Taxa/Dia
											</p>
											<p className="font-mono text-slate-900 font-bold">
												{displaySaver.dailyAmount.toLocaleString()} MZN
											</p>
										</div>
										<div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center min-w-[100px]">
											<p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">
												Poupado
											</p>
											<p className="font-mono text-emerald-600 font-bold">
												{displaySaver.totalSaved.toLocaleString()} MZN
											</p>
										</div>
										<div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center min-w-[100px]">
											<p className="text-[10px] uppercase font-bold text-red-600 tracking-wider mb-1">
												Dívida
											</p>
											<p className="font-mono text-red-600 font-bold">
												{displaySaver.currentDebt.toLocaleString()} MZN
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					) : (
						<Card>
							<CardContent className="p-6">
								<p className="text-slate-500">Ticante não encontrado</p>
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
										? "text-slate-900 border-slate-900"
										: "text-slate-500 border-transparent hover:text-slate-900",
								)}
							>
								<tab.icon size={20} />
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === "card" && displaySaver && (
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
							{/* Main Grid Section */}
							<div className="lg:col-span-8">
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-6">
										<div className="flex justify-between items-center mb-6">
											<h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
												Ciclo Atual: Outubro 2023
												<span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">
													DIA {displaySaver.daysInCycle || 18}/30
												</span>
											</h3>
											<div className="flex items-center gap-4 text-xs">
												<div className="flex items-center gap-1">
													<span className="w-3 h-3 rounded-full bg-blue-500"></span>{" "}
													Pago
												</div>
												<div className="flex items-center gap-1">
													<span className="w-3 h-3 rounded-full bg-slate-300"></span>{" "}
													Aberto
												</div>
												<div className="flex items-center gap-1">
													<span className="w-3 h-3 rounded-full bg-orange-500"></span>{" "}
													Comissão
												</div>
												<div className="flex items-center gap-1">
													<span className="w-3 h-3 rounded-full bg-emerald-500"></span>{" "}
													Confirmado
												</div>
											</div>
										</div>
										<div className="grid grid-cols-6 gap-2 mb-6">
											{Array.from({ length: 30 }, (_, i) => {
												const day = i + 1;
												const paymentDay = displaySaver.paymentDays?.find(
													(d) => d.day === day,
												);
												let stateClass =
													"bg-slate-100 border-slate-300 text-slate-400";
												let icon: string | number = day;

												if (paymentDay?.paid && paymentDay.isDebtPayment) {
													stateClass =
														"bg-orange-100 border-orange-500 text-orange-600";
													icon = "C";
												} else if (
													paymentDay?.paid &&
													!paymentDay.isDebtPayment
												) {
													stateClass =
														"bg-blue-100 border-blue-500 text-blue-600";
													icon = "X";
												} else if (paymentDay?.isInDebt) {
													stateClass = "bg-red-100 border-red-300 text-red-400";
												}

												return (
													<div
														key={day}
														className={cn(
															"aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-105",
															stateClass,
														)}
													>
														<span className="text-[10px] font-bold mb-1">
															{day}
														</span>
														<span className="text-sm font-bold">{icon}</span>
													</div>
												);
											})}
										</div>
										<div className="mt-6 p-4 bg-slate-50 rounded-lg flex items-center justify-between">
											<div className="flex items-center gap-4">
												<div className="flex -space-x-2">
													<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">
														X
													</div>
													<div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs border-2 border-white">
														P
													</div>
													<div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs border-2 border-white">
														C
													</div>
												</div>
												<p className="text-sm text-slate-500 italic">
													Legenda: Pago, Confirmado, Comissão do Coletor.
												</p>
											</div>
											<span className="font-mono text-sm text-slate-900 font-bold">
												Total Ciclo:{" "}
												{(displaySaver.dailyAmount * 30).toLocaleString()} MZN
											</span>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Sidebar Actions */}
							<div className="lg:col-span-4 space-y-4">
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-6">
										<h4 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">
											Ações Rápidas
										</h4>
										<div className="space-y-2">
											<button
												type="button"
												className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group"
											>
												<div className="flex items-center gap-3">
													<CheckCircle2
														size={20}
														className="text-slate-900 group-hover:rotate-12 transition-transform"
													/>
													<span className="text-xs font-semibold">
														Fechar Ciclo
													</span>
												</div>
												<ChevronRight size={20} className="text-slate-400" />
											</button>
											<button
												type="button"
												className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group"
											>
												<div className="flex items-center gap-3">
													<TrendingUp
														size={20}
														className="text-slate-900 group-hover:translate-x-1 transition-transform"
													/>
													<span className="text-xs font-semibold">
														Transportar Dias
													</span>
												</div>
												<ChevronRight size={20} className="text-slate-400" />
											</button>
											<button
												type="button"
												className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group"
											>
												<div className="flex items-center gap-3">
													<Wallet
														size={20}
														className="text-slate-900 group-hover:scale-110 transition-transform"
													/>
													<span className="text-xs font-semibold text-slate-900">
														Novo Empréstimo
													</span>
												</div>
												<ChevronRight size={20} className="text-slate-400" />
											</button>
										</div>
									</CardContent>
								</Card>

								{/* Statistics / Trends */}
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-6">
										<h4 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">
											Desempenho
										</h4>
										<div className="space-y-4">
											<div>
												<div className="flex justify-between text-xs mb-1">
													<span className="text-slate-500">Meta do Mês</span>
													<span className="font-bold text-slate-900">60%</span>
												</div>
												<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
													<div className="bg-emerald-500 h-full w-[60%] rounded-full"></div>
												</div>
											</div>
											<div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
												<AlertTriangle size={16} className="text-amber-600" />
												<p className="text-xs text-slate-600 font-medium">
													{displaySaver.name} tem 4 dias em atraso. Enviar
													lembrete via SMS?
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Monthly Stamp */}
								<div className="relative overflow-hidden bg-slate-900 p-6 rounded-xl text-white shadow-lg">
									<div className="absolute -right-4 -top-4 opacity-20">
										<Verified size={120} />
									</div>
									<p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2 opacity-80">
										Sync Status
									</p>
									<h5 className="text-lg font-bold mb-2">
										Dados Sincronizados
									</h5>
									<p className="text-xs opacity-70 mb-4">
										Última atualização: Hoje, 14:32
									</p>
									<div className="flex items-center gap-2">
										<span className="bg-white/20 px-3 py-1 rounded text-[10px] font-bold">
											OFFLINE READY
										</span>
										<span className="bg-emerald-500 px-3 py-1 rounded text-[10px] font-bold">
											SECURE
										</span>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "statement" && (
						<Card>
							<CardHeader>
								<h3 className="text-sm font-semibold text-slate-900">
									Extrato de Depósitos
								</h3>
							</CardHeader>
							<CardContent>
								{depositsLoading ? (
									<LoadingSkeleton variant="table" />
								) : deposits && deposits.length > 0 ? (
									<div className="space-y-3">
										{deposits.map((transaction) => (
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
															<AlertCircle
																size={16}
																className="text-amber-600"
															/>
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
													{transaction.amount.toLocaleString()} MZN
												</span>
											</div>
										))}
									</div>
								) : (
									<p className="text-slate-500">Sem dados de depósitos</p>
								)}
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
								{loansLoading ? (
									<LoadingSkeleton variant="table" />
								) : loans && loans.length > 0 ? (
									<div className="space-y-3">
										{loans.map((loan) => (
											<div
												key={loan.id}
												className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
											>
												<div className="flex-1">
													<div className="flex items-center gap-2 mb-1">
														<span className="font-mono text-xs text-slate-400">
															{loan.id}
														</span>
														{loan.status === "active" && <DebtBadge />}
													</div>
													<p className="text-sm font-medium text-slate-900">
														{loan.amount.toLocaleString()} MZN
													</p>
													<p className="text-[10px] text-slate-400">
														Juros: {loan.interest.toLocaleString()} MZN
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
								) : (
									<p className="text-slate-500">Sem empréstimos activos</p>
								)}
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
								{historyLoading ? (
									<LoadingSkeleton variant="table" />
								) : history && history.length > 0 ? (
									<div className="space-y-3">
										{history.map((history) => (
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
														{history.timestamp}
													</p>
												</div>
												<span className="text-xs text-slate-500">
													{history.details}
												</span>
											</div>
										))}
									</div>
								) : (
									<p className="text-slate-500">Sem histórico de actividade</p>
								)}
							</CardContent>
						</Card>
					)}
				</main>
			</div>
		</DashboardLayout>
	);
}

import { createFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	CheckCircle2,
	ChevronRight,
	DollarSign,
	History,
	Phone,
	Printer,
	Receipt,
	TrendingUp,
	Wallet,
	AlertCircle,
	MapPin,
	X,
	Verified,
	MoreVertical,
	Clock,
	User,
	Share2,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { cn } from "#/lib/design-system";
import { useSaver, useSaverDayDeposit } from "#/features/savers/hooks";

export const Route = createFileRoute("/dashboard/saver-details")({
	component: SaverDetailsPage,
	validateSearch: (search: Record<string, unknown>) => ({
		id: search.id as string | undefined,
	}),
});

function SaverDetailsPage() {
	const [activeTab, setActiveTab] = useState<"card" | "statement" | "loans" | "history">("card");
	const [selectedMonth, setSelectedMonth] = useState("Outubro 2023");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDay, setSelectedDay] = useState<{ day: number; status: string; amount?: number; collector?: string } | null>(null);
	const searchParams = Route.useSearch();
	const saverId = searchParams.id as string;

	// Parse month and year from selectedMonth (e.g., "Outubro 2023" -> month: 10, year: 2023)
	const monthMap: Record<string, number> = {
		"Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4, "Maio": 5, "Junho": 6,
		"Julho": 7, "Agosto": 8, "Setembro": 9, "Outubro": 10, "Novembro": 11, "Dezembro": 12
	};
	const [monthName, yearStr] = selectedMonth.split(" ");
	const month = monthMap[monthName] || 10;
	const year = parseInt(yearStr) || 2023;

	// Fetch saver data using the ID from search params
	const { data: saver, isLoading, error } = useSaver(saverId);

	// Fetch deposit data for the selected day
	const { data: dayDeposit, isLoading: isLoadingDeposit } = useSaverDayDeposit(
		saverId,
		selectedDay?.day || 0,
		month,
		year
	);

	const sidebarItems = getDashboardSidebar("/dashboard/saver-details");

	if (isLoading) {
		return (
			<DashboardLayout>
				<Sidebar items={sidebarItems} />
				<div className="flex-1 flex flex-col h-full overflow-hidden">
					<Header
						title="Detalhes do Ticante"
						description="Informação detalhada do ticante e histórico de transações"
						searchValue={searchTerm}
						onSearchChange={setSearchTerm}
						searchPlaceholder="Pesquisar..."
					/>
					<main className="flex-1 overflow-y-auto p-6 bg-slate-50">
						<div className="flex items-center justify-center h-64">
							<p className="text-slate-500">Carregando...</p>
						</div>
					</main>
				</div>
			</DashboardLayout>
		);
	}

	if (error || !saver) {
		return (
			<DashboardLayout>
				<Sidebar items={sidebarItems} />
				<div className="flex-1 flex flex-col h-full overflow-hidden">
					<Header
						title="Detalhes do Ticante"
						description="Informação detalhada do ticante e histórico de transações"
						searchValue={searchTerm}
						onSearchChange={setSearchTerm}
						searchPlaceholder="Pesquisar..."
					/>
					<main className="flex-1 overflow-y-auto p-6 bg-slate-50">
						<div className="flex items-center justify-center h-64">
							<p className="text-red-500">
								{error ? 'Erro ao carregar dados do ticante' : 'Ticante não encontrado'}
							</p>
						</div>
					</main>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />
			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title={`Detalhes do Ticante - ${saver.name}`}
					description="Informação detalhada do ticante e histórico de transações"
					searchValue={searchTerm}
					onSearchChange={setSearchTerm}
					searchPlaceholder="Pesquisar..."
					rightContent={
						<div className="flex items-center gap-2">
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Printer size={16} />}
								className="border-emerald-900 text-emerald-900 hover:bg-emerald-50"
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
				<main className="flex-1 overflow-y-auto p-6 bg-slate-50">
					{/* Client Header Card */}
					<Card className="border-l-4 border-l-emerald-500 mb-6">
						<CardContent className="p-6">
							<div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
								<div className="relative">
									<div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center border-4 border-white shadow-sm">
										<span className="text-3xl font-bold text-emerald-700">
											{saver.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
										</span>
									</div>
									<span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border-2 border-white shadow-sm">
										Ativo
									</span>
								</div>

								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										<h1 className="text-2xl font-bold text-emerald-900">
											Detalhes do Ticante - {saver.name}
										</h1>
										<span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-mono font-semibold border border-slate-200">
											ID: {saver.alphanumericId}
										</span>
									</div>
									<div className="flex flex-wrap gap-4 text-sm text-slate-500">
										<div className="flex items-center gap-2">
											<MapPin size={16} className="text-slate-400" />
											<span>{typeof saver.organization === 'string' ? saver.organization : saver.organization?.name}</span>
										</div>
										<div className="flex items-center gap-2">
											<Phone size={16} className="text-slate-400" />
											<span>{saver.contact}</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4 w-full md:w-auto">
									<div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center min-w-[100px]">
										<p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
											Taxa/Dia
										</p>
										<p className="font-mono text-slate-900 font-bold">
											{saver.dailyAmount.toLocaleString()} MZN
										</p>
									</div>
									<div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center min-w-[100px]">
										<p className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">
											Poupado
										</p>
										<p className="font-mono text-emerald-600 font-bold">
											{saver.totalSaved.toLocaleString()} MZN
										</p>
									</div>
									<div className="bg-red-50 p-3 rounded-lg border border-red-200 text-center min-w-[100px]">
										<p className="text-[10px] uppercase font-bold text-red-600 tracking-wider mb-1">
											Dívida
										</p>
										<p className="font-mono text-red-600 font-bold">
											{saver.currentDebt.toLocaleString()} MZN
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Tab Navigation */}
					<div className="flex border-b border-slate-200 overflow-x-auto whitespace-nowrap mb-6">
						{[
							{ id: "card", label: "Cartão Digital", icon: Calendar },
							{ id: "statement", label: "Extrato", icon: Receipt },
							{ id: "loans", label: "Empréstimos", icon: Wallet },
							{ id: "history", label: "Histórico", icon: History },
						].map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id as any)}
								className={cn(
									"px-6 py-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2",
									activeTab === tab.id
										? "text-emerald-900 border-emerald-900"
										: "text-slate-500 border-transparent hover:text-emerald-900",
								)}
							>
								<tab.icon size={20} />
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === "card" && (
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
							{/* Main Grid Section */}
							<div className="lg:col-span-8">
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-6">
										<div className="flex justify-between items-center mb-4">
											<h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
												Ciclo Atual: {selectedMonth}
												<span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold">
													DIA {saver.daysInCycle}/30
												</span>
											</h3>
											<div className="flex items-center gap-4 text-xs">
												<div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Pago</div>
												<div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-300"></span> Aberto</div>
												<div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Comissão</div>
												<div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Confirmado</div>
											</div>
										</div>
										<div className="grid grid-cols-10 gap-1.5 mb-6">
											{Array.from({ length: 30 }, (_, i) => {
												const day = i + 1;
												let stateClass = "bg-slate-100 border-slate-300 text-slate-400";
												let icon: string | number = day;
												let status = "open";
												let amount = saver.dailyAmount;
												let collector = "N/A";

												if (day <= 14) {
													stateClass = "bg-blue-100 border-blue-500 text-blue-600";
													icon = "X";
													status = "paid";
													collector = "Coletor A";
												} else if (day === 15) {
													stateClass = "bg-orange-100 border-orange-500 text-orange-600";
													icon = "C";
													status = "commission";
													amount = saver.dailyAmount * 0.1;
												} else if (day === 16 || day === 17) {
													stateClass = "bg-emerald-100 border-emerald-500 text-emerald-600";
													icon = "P";
													status = "confirmed";
												} else if (day === 18) {
													stateClass = "bg-white border-2 border-emerald-900 ring-2 ring-emerald-900/20 text-emerald-900 animate-pulse";
													status = "current";
												}

												return (
													<div
														key={day}
														onClick={() => setSelectedDay({ day, status, amount, collector })}
														className={cn(
															"aspect-square rounded-md border flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-110 hover:shadow-md",
															stateClass
														)}
													>
														<span className="text-[8px] font-bold mb-0.5">{day}</span>
														{typeof icon === "string" ? (
															<X size={12} className="font-bold" />
														) : (
															<span className="text-[10px] font-bold">{icon}</span>
														)}
													</div>
												);
											})}
										</div>
										<div className="mt-6 p-4 bg-slate-50 rounded-lg flex items-center justify-between">
											<div className="flex items-center gap-4">
												<div className="flex -space-x-2">
													<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border-2 border-white">X</div>
													<div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs border-2 border-white">P</div>
													<div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs border-2 border-white">C</div>
												</div>
												<p className="text-sm text-slate-500 italic">Legenda: Pago, Confirmado, Comissão do Coletor.</p>
											</div>
											<span className="font-mono text-sm text-slate-900 font-bold">
												Total Ciclo: {(saver.dailyAmount * 30).toLocaleString()} MZN
											</span>
										</div>

										{/* Day Detail Popup */}
										{selectedDay && (
											<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedDay(null)}>
												<div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 animate-in scale-in duration-200" onClick={(e) => e.stopPropagation()}>
													<div className="flex justify-between items-start mb-4">
														<div>
															<h4 className="text-lg font-bold text-slate-900">Dia {selectedDay.day}</h4>
															<p className="text-sm text-slate-500">{selectedMonth}</p>
														</div>
														<button onClick={() => setSelectedDay(null)} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
															<X size={20} className="text-slate-500" />
														</button>
													</div>
													{isLoadingDeposit ? (
														<div className="flex items-center justify-center py-8">
															<p className="text-sm text-slate-500">Carregando detalhes...</p>
														</div>
													) : dayDeposit ? (
														<div className="space-y-3">
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600">Estado</span>
																<span className={`text-sm font-bold px-2 py-1 rounded ${dayDeposit.status === 'paid' ? 'bg-blue-100 text-blue-600' :
																		dayDeposit.status === 'partial' ? 'bg-orange-100 text-orange-600' :
																			dayDeposit.status === 'deleted' ? 'bg-red-100 text-red-600' :
																				'bg-slate-200 text-slate-600'
																	}`}>
																	{dayDeposit.status === 'paid' ? 'Pago' :
																		dayDeposit.status === 'partial' ? 'Parcial' :
																			dayDeposit.status === 'deleted' ? 'Eliminado' :
																				'Não Pago'}
																</span>
															</div>
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600">Valor</span>
																<span className="text-sm font-bold text-slate-900">{dayDeposit.amount.toLocaleString()} MZN</span>
															</div>
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600 flex items-center gap-2">
																	<Clock size={14} />
																	Data de Depósito
																</span>
																<span className="text-sm font-bold text-slate-900">
																	{new Date(dayDeposit.date).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })}
																</span>
															</div>
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600 flex items-center gap-2">
																	<Clock size={14} />
																	Hora de Registo
																</span>
																<span className="text-sm font-bold text-slate-900">
																	{new Date(dayDeposit.createdAt).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
																</span>
															</div>
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600 flex items-center gap-2">
																	<User size={14} />
																	Coletor
																</span>
																<span className="text-sm font-bold text-slate-900">{dayDeposit.collectorAgent || 'N/A'}</span>
															</div>
															{dayDeposit.deletionMotive && (
																<div className="p-3 bg-red-50 rounded-lg border border-red-200">
																	<span className="text-sm text-red-600 font-medium">Motivo de Eliminação: {dayDeposit.deletionMotive}</span>
																</div>
															)}
															<div className="pt-2 border-t border-slate-200">
																<p className="text-[10px] text-slate-400">ID da Transação: {dayDeposit.id}</p>
															</div>
														</div>
													) : (
														<div className="space-y-3">
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600">Estado</span>
																<span className={`text-sm font-bold px-2 py-1 rounded ${selectedDay.status === 'paid' ? 'bg-blue-100 text-blue-600' :
																	selectedDay.status === 'commission' ? 'bg-orange-100 text-orange-600' :
																		selectedDay.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' :
																			selectedDay.status === 'current' ? 'bg-emerald-900 text-white' :
																				'bg-slate-200 text-slate-600'
																	}`}>
																	{selectedDay.status === 'paid' ? 'Pago' :
																		selectedDay.status === 'commission' ? 'Comissão' :
																			selectedDay.status === 'confirmed' ? 'Confirmado' :
																				selectedDay.status === 'current' ? 'Atual' :
																					'Aberto'}
																</span>
															</div>
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600">Valor Esperado</span>
																<span className="text-sm font-bold text-slate-900">{selectedDay.amount?.toLocaleString()} MZN</span>
															</div>
															<div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
																<span className="text-sm text-slate-600 flex items-center gap-2">
																	<User size={14} />
																	Coletor
																</span>
																<span className="text-sm font-bold text-slate-900">{selectedDay.collector}</span>
															</div>
															<div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
																<p className="text-xs text-amber-700">Sem transação registada para este dia</p>
															</div>
														</div>
													)}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Sidebar Actions */}
							<div className="lg:col-span-4 space-y-4">
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-6">
										<h4 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Ações Rápidas</h4>
										<div className="space-y-2">
											<button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group">
												<div className="flex items-center gap-3">
													<CheckCircle2 size={20} className="text-slate-900 group-hover:rotate-12 transition-transform" />
													<span className="text-xs font-semibold">Fechar Ciclo</span>
												</div>
												<ChevronRight size={20} className="text-slate-400" />
											</button>
											<button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group">
												<div className="flex items-center gap-3">
													<TrendingUp size={20} className="text-slate-900 group-hover:translate-x-1 transition-transform" />
													<span className="text-xs font-semibold">Transportar Dias</span>
												</div>
												<ChevronRight size={20} className="text-slate-400" />
											</button>
											<button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all group">
												<div className="flex items-center gap-3">
													<Wallet size={20} className="text-slate-900 group-hover:scale-110 transition-transform" />
													<span className="text-xs font-semibold text-slate-900">Novo Empréstimo</span>
												</div>
												<ChevronRight size={20} className="text-slate-400" />
											</button>
										</div>
									</CardContent>
								</Card>

								{/* Statistics / Trends */}
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-6">
										<h4 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-widest">Desempenho</h4>
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
												<span className="text-amber-600">⚠</span>
												<p className="text-xs text-slate-600 font-medium leading-relaxed">{saver.name} tem 4 dias em atraso. Enviar lembrete via SMS?</p>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Monthly Stamp */}
								<div className="relative overflow-hidden bg-emerald-900 p-6 rounded-xl text-white shadow-lg">
									<div className="absolute -right-4 -top-4 opacity-20">
										<Verified size={120} />
									</div>
									<p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2 opacity-80 leading-relaxed">Sync Status</p>
									<h5 className="text-lg font-bold mb-2 leading-tight">Dados Sincronizados</h5>
									<p className="text-xs opacity-70 mb-4 leading-relaxed">Última atualização: Hoje, 14:32</p>
									<div className="flex items-center gap-2">
										<span className="bg-emerald-500/30 px-3 py-1 rounded text-[10px] font-bold border border-emerald-400/30">OFFLINE READY</span>
										<span className="bg-emerald-500 px-3 py-1 rounded text-[10px] font-bold">SECURE</span>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "statement" && (
						<Card>
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-slate-900 mb-4">Extrato de Depósitos</h3>
								<p className="text-slate-500">Dados de extrato serão carregados aqui...</p>
							</CardContent>
						</Card>
					)}

					{activeTab === "loans" && (
						<Card>
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-slate-900 mb-4">Empréstimos Activos</h3>
								<p className="text-slate-500">Dados de empréstimos serão carregados aqui...</p>
							</CardContent>
						</Card>
					)}

					{activeTab === "history" && (
						<Card>
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-slate-900 mb-4">Histórico de Actividade</h3>
								<p className="text-slate-500">Histórico será carregado aqui...</p>
							</CardContent>
						</Card>
					)}
				</main>
			</div>
		</DashboardLayout>
	);
}

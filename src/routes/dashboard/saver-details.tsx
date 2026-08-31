import { createFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	Check,
	CheckCircle2,
	ChevronRight,
	Clock,
	DollarSign,
	History,
	MapPin,
	Phone,
	Printer,
	Receipt,
	Share2,
	TrendingUp,
	User,
	Verified,
	Wallet,
	X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { useSaver, useSaverDayDeposit } from "#/features/savers/hooks";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/saver-details")({
	component: SaverDetailsPage,
	validateSearch: (search: Record<string, unknown>) => ({
		id: search.id as string | undefined,
	}),
});

function SaverDetailsPage() {
	const [activeTab, setActiveTab] = useState<
		"card" | "statement" | "loans" | "history"
	>("card");
	const [selectedMonth, _setSelectedMonth] = useState("Outubro 2023");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedDay, setSelectedDay] = useState<{
		day: number;
		status: string;
		amount?: number;
		collector?: string;
	} | null>(null);
	const [showDepositForm, setShowDepositForm] = useState(false);
	const [depositAmount, setDepositAmount] = useState("");
	const searchParams = Route.useSearch();
	const saverId = searchParams.id as string;

	// Parse month and year from selectedMonth (e.g., "Outubro 2023" -> month: 10, year: 2023)
	const monthMap: Record<string, number> = {
		Janeiro: 1,
		Fevereiro: 2,
		Março: 3,
		Abril: 4,
		Maio: 5,
		Junho: 6,
		Julho: 7,
		Agosto: 8,
		Setembro: 9,
		Outubro: 10,
		Novembro: 11,
		Dezembro: 12,
	};
	const [monthName, yearStr] = selectedMonth.split(" ");
	const month = monthMap[monthName] || 10;
	const year = parseInt(yearStr, 10) || 2023;

	// Fetch saver data using the ID from search params
	const { data: saver, isLoading, error } = useSaver(saverId);

	// Fetch deposit data for the selected day
	const { data: dayDeposit, isLoading: isLoadingDeposit } = useSaverDayDeposit(
		saverId,
		selectedDay?.day || 0,
		month,
		year,
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
								{error
									? "Erro ao carregar dados do ticante"
									: "Ticante não encontrado"}
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
				<main className="flex-1 overflow-y-auto p-4 bg-slate-50">
					{/* Client Header Card */}
					<Card className="border-l-4 border-l-emerald-500 mb-4">
						<CardContent className="p-4">
							<div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
								<div className="relative">
									<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center border-2 border-white shadow-sm">
										<span className="text-xl font-bold text-emerald-700">
											{saver.name
												.split(" ")
												.map((n) => n[0])
												.join("")
												.slice(0, 2)
												.toUpperCase()}
										</span>
									</div>
									<span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white px-1.5 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider border-2 border-white shadow-sm">
										Ativo
									</span>
								</div>

								<div className="flex-1">
									<div className="flex items-center gap-2 mb-1">
										<h1 className="text-lg font-bold text-emerald-900">
											Detalhes do Ticante - {saver.name}
										</h1>
										<span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border border-slate-200">
											ID: {saver.alphanumericId}
										</span>
									</div>
									<div className="flex flex-wrap gap-3 text-xs text-slate-500">
										<div className="flex items-center gap-1">
											<MapPin size={12} className="text-slate-400" />
											<span>
												{typeof saver.organization === "string"
													? saver.organization
													: saver.organization?.name}
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Phone size={12} className="text-slate-400" />
											<span>{saver.contact}</span>
										</div>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-2 w-full md:w-auto">
									<div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center min-w-[80px]">
										<p className="text-[8px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">
											Taxa/Dia
										</p>
										<p className="font-mono text-slate-900 font-bold text-xs">
											{saver.dailyAmount.toLocaleString()} MZN
										</p>
									</div>
									<div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-center min-w-[80px]">
										<p className="text-[8px] uppercase font-bold text-emerald-600 tracking-wider mb-0.5">
											Poupado
										</p>
										<p className="font-mono text-emerald-600 font-bold text-xs">
											{saver.totalSaved.toLocaleString()} MZN
										</p>
									</div>
									<div className="bg-red-50 p-2 rounded-lg border border-red-200 text-center min-w-[80px]">
										<p className="text-[8px] uppercase font-bold text-red-600 tracking-wider mb-0.5">
											Dívida
										</p>
										<p className="font-mono text-red-600 font-bold text-xs">
											{saver.currentDebt.toLocaleString()} MZN
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Tab Navigation */}
					<div className="flex border-b border-slate-200 overflow-x-auto whitespace-nowrap mb-4">
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
									"px-4 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5",
									activeTab === tab.id
										? "text-emerald-900 border-emerald-900"
										: "text-slate-500 border-transparent hover:text-emerald-900",
								)}
							>
								<tab.icon size={16} />
								{tab.label}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === "card" && (
						<div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
							{/* Main Grid Section */}
							<div className="lg:col-span-8">
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-4">
										<div className="flex justify-between items-center mb-3">
											<h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
												Ciclo Atual: {selectedMonth}
												<span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
													DIA {saver.daysInCycle}/30
												</span>
											</h3>
											<div className="flex items-center gap-3 text-[10px]">
												<div className="flex items-center gap-1">
													<Check size={8} className="text-emerald-500" />{" "}
													Depósito Normal
												</div>
												<div className="flex items-center gap-1">
													<X size={8} className="text-amber-500" />{" "}
													Pagamento de Dívida
												</div>
												<div className="flex items-center gap-1">
													<span className="text-[9px] font-bold text-red-500">D</span>{" "}
													Em Dívida
												</div>
												<div className="flex items-center gap-1">
													<span className="w-2 h-2 rounded-full bg-slate-200"></span>{" "}
													Não Depositado
												</div>
											</div>
										</div>
										<div className="grid grid-cols-10 gap-0.5 mb-2">
											{Array.from({ length: 30 }, (_, i) => {
												const day = i + 1;
												let stateClass =
													"bg-slate-100 border-slate-300 text-slate-400";
												let icon: "check" | "x" | "d" | number = day;
												let status = "open";
												let amount = saver.dailyAmount;
												let collector = "N/A";

												// Get actual payment day data if available
												const paymentDay = saver.paymentDays?.find(
													(pd) => pd.day === day,
												);

												if (paymentDay) {
													if (paymentDay.paid && paymentDay.isDebtPayment) {
														// Pagamento de Dívida
														stateClass =
															"bg-amber-100 border-amber-500 text-amber-600";
														icon = "x";
														status = "debt_payment";
														amount = paymentDay.amount || saver.dailyAmount;
														collector = paymentDay.collector || "N/A";
													} else if (
														paymentDay.paid &&
														!paymentDay.isDebtPayment
													) {
														// Depósito Normal
														stateClass =
															"bg-emerald-100 border-emerald-500 text-emerald-600";
														icon = "check";
														status = "normal_deposit";
														amount = paymentDay.amount || saver.dailyAmount;
														collector = paymentDay.collector || "N/A";
													} else if (!paymentDay.paid && paymentDay.isInDebt) {
														// Em Dívida
														stateClass =
															"bg-red-100 border-red-300 text-red-600";
														icon = "d";
														status = "in_debt";
														amount = 0;
														collector = "N/A";
													} else {
														// Não Depositado
														stateClass =
															"bg-slate-100 border-slate-300 text-slate-400";
														icon = day;
														status = "not_deposited";
														amount = 0;
														collector = "N/A";
													}
												} else if (day === saver.daysInCycle) {
													// Current day
													stateClass =
														"bg-white border-2 border-emerald-900 ring-2 ring-emerald-900/20 text-emerald-900 animate-pulse";
													status = "current";
												}

												return (
													<button
														type="button"
														key={day}
														onClick={() =>
															setSelectedDay({ day, status, amount, collector })
														}
														className={cn(
															"aspect-square rounded-sm border flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-110 hover:shadow-md",
															stateClass,
														)}
													>
														<span className="text-[7px] font-bold mb-0.5">
															{day}
														</span>
														{icon === "check" ? (
															<Check size={10} className="font-bold" />
														) : icon === "x" ? (
															<X size={10} className="font-bold" />
														) : icon === "d" ? (
															<span className="text-[9px] font-bold">D</span>
														) : (
															<span className="text-[9px] font-bold">
																{icon}
															</span>
														)}
													</button>
												);
											})}
										</div>

										{/* Day Detail Popup */}
										{selectedDay && (
											<div
												className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
												onClick={() => setSelectedDay(null)}
												onKeyDown={(e) => {
													if (e.key === "Escape") {
														setSelectedDay(null);
													}
												}}
												role="dialog"
												aria-modal="true"
											>
												<div
													className="bg-white rounded-xl shadow-xl p-4 max-w-xs w-full mx-4 animate-in scale-in duration-200"
													onClick={(e) => e.stopPropagation()}
													onKeyDown={(e) => {
														e.stopPropagation();
													}}
													role="document"
												>
													<div className="flex justify-between items-start mb-3">
														<div>
															<h4 className="text-sm font-bold text-slate-900">
																Dia {selectedDay.day}
															</h4>
															<p className="text-xs text-slate-500">
																{selectedMonth}
															</p>
														</div>
														<button
															type="button"
															onClick={() => setSelectedDay(null)}
															className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
														>
															<X size={16} className="text-slate-500" />
														</button>
													</div>
													{isLoadingDeposit ? (
														<div className="flex items-center justify-center py-4">
															<p className="text-xs text-slate-500">
																Carregando detalhes...
															</p>
														</div>
													) : dayDeposit ? (
														<div className="space-y-2">
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600">
																	Estado
																</span>
																<span
																	className={`text-xs font-bold px-2 py-0.5 rounded ${dayDeposit.status === "paid"
																		? "bg-emerald-100 text-emerald-600"
																		: dayDeposit.status === "partial"
																			? "bg-amber-100 text-amber-600"
																			: dayDeposit.status === "deleted"
																				? "bg-red-100 text-red-600"
																				: "bg-slate-200 text-slate-600"
																		}`}
																>
																	{dayDeposit.status === "paid"
																		? "Depósito Normal"
																		: dayDeposit.status === "partial"
																			? "Pagamento Parcial"
																			: dayDeposit.status === "deleted"
																				? "Eliminado"
																				: "Não Depositado"}
																</span>
															</div>
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600">
																	Valor
																</span>
																<span className="text-xs font-bold text-slate-900">
																	{dayDeposit.amount.toLocaleString()} MZN
																</span>
															</div>
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600 flex items-center gap-1">
																	<Clock size={12} />
																	Data
																</span>
																<span className="text-xs font-bold text-slate-900">
																	{new Date(dayDeposit.date).toLocaleDateString(
																		"pt-PT",
																		{
																			day: "2-digit",
																			month: "2-digit",
																			year: "numeric",
																		},
																	)}
																</span>
															</div>
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600 flex items-center gap-1">
																	<User size={12} />
																	Coletor
																</span>
																<span className="text-xs font-bold text-slate-900">
																	{dayDeposit.collectorAgent || "N/A"}
																</span>
															</div>
															<div className="pt-2 border-t border-slate-200">
																<p className="text-[9px] text-slate-400">
																	ID: {dayDeposit.id}
																</p>
															</div>
															<div className="flex gap-2 pt-2">
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => {
																		toast.info(
																			"Funcionalidade de editar depósito em desenvolvimento",
																		);
																	}}
																	className="flex-1 text-xs"
																>
																	Editar
																</Button>
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => {
																		toast.success(
																			"Depósito eliminado com sucesso",
																		);
																		setSelectedDay(null);
																	}}
																	className="flex-1 border-red-300 text-red-600 hover:bg-red-50 text-xs"
																>
																	Eliminar
																</Button>
															</div>
														</div>
													) : showDepositForm ? (
														<div className="space-y-3">
															<div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
																<div className="flex items-center gap-2 mb-1">
																	<DollarSign
																		size={14}
																		className="text-emerald-600"
																	/>
																	<h5 className="text-xs font-semibold text-emerald-900">
																		Registrar Depósito
																	</h5>
																</div>
																<p className="text-[10px] text-emerald-700">
																	Dia {selectedDay.day} - {selectedMonth}
																</p>
															</div>
															<div className="space-y-2">
																<div>
																	<label
																		htmlFor="deposit-amount"
																		className="block text-xs font-medium text-slate-700 mb-1"
																	>
																		Valor (MZN)
																	</label>
																	<input
																		id="deposit-amount"
																		type="number"
																		value={depositAmount}
																		onChange={(e) =>
																			setDepositAmount(e.target.value)
																		}
																		placeholder={saver.dailyAmount.toString()}
																		className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs"
																	/>
																</div>
																<div>
																	<label
																		htmlFor="deposit-type"
																		className="block text-xs font-medium text-slate-700 mb-1"
																	>
																		Tipo
																	</label>
																	<select
																		id="deposit-type"
																		className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs"
																		defaultValue="normal"
																	>
																		<option value="normal">Normal</option>
																		<option value="debt_payment">Dívida</option>
																	</select>
																</div>
															</div>
															<div className="flex gap-2 pt-2">
																<Button
																	size="sm"
																	variant="outline"
																	onClick={() => {
																		setShowDepositForm(false);
																		setDepositAmount("");
																	}}
																	className="flex-1 text-xs"
																>
																	Cancelar
																</Button>
																<Button
																	size="sm"
																	onClick={() => {
																		const amount =
																			parseFloat(depositAmount) ||
																			saver.dailyAmount;
																		toast.success(
																			`Depósito de ${amount.toLocaleString()} MZN registrado com sucesso para ${saver.name}`,
																		);
																		setShowDepositForm(false);
																		setDepositAmount("");
																		setSelectedDay(null);
																	}}
																	className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
																>
																	Confirmar
																</Button>
															</div>
														</div>
													) : (
														<div className="space-y-2">
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600">
																	Estado
																</span>
																<span
																	className={`text-xs font-bold px-2 py-0.5 rounded ${selectedDay.status === "normal_deposit"
																		? "bg-emerald-100 text-emerald-600"
																		: selectedDay.status === "debt_payment"
																			? "bg-amber-100 text-amber-600"
																			: selectedDay.status === "in_debt"
																				? "bg-red-100 text-red-600"
																				: selectedDay.status === "current"
																					? "bg-emerald-900 text-white"
																					: "bg-slate-200 text-slate-600"
																		}`}
																>
																	{selectedDay.status === "normal_deposit"
																		? "Depósito Normal"
																		: selectedDay.status === "debt_payment"
																			? "Pagamento de Dívida"
																			: selectedDay.status === "in_debt"
																				? "Em Dívida"
																				: selectedDay.status === "current"
																					? "Atual"
																					: "Não Depositado"}
																</span>
															</div>
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600">
																	Valor
																</span>
																<span className="text-xs font-bold text-slate-900">
																	{selectedDay.amount?.toLocaleString()} MZN
																</span>
															</div>
															<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
																<span className="text-xs text-slate-600 flex items-center gap-1">
																	<User size={12} />
																	Coletor
																</span>
																<span className="text-xs font-bold text-slate-900">
																	{selectedDay.collector}
																</span>
															</div>
															{selectedDay.status === "not_deposited" ||
																selectedDay.status === "in_debt" ? (
																<Button
																	size="sm"
																	onClick={() => setShowDepositForm(true)}
																	className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
																	leftIcon={<DollarSign size={14} />}
																>
																	Registrar Depósito
																</Button>
															) : (
																<div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
																	<p className="text-[10px] text-amber-700">
																		Já possui registo
																	</p>
																</div>
															)}
														</div>
													)}
												</div>
											</div>
										)}
									</CardContent>
								</Card>
							</div>

							{/* Sidebar Actions */}
							<div className="lg:col-span-4 space-y-2">
								<Card className="bg-white shadow-sm border border-slate-200">
									<CardContent className="p-3">
										<h4 className="text-[10px] font-semibold text-slate-900 mb-3 uppercase tracking-widest">
											Ações Rápidas
										</h4>
										<div className="space-y-2">
											<button
												type="button"
												className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all group"
											>
												<div className="flex items-center gap-2">
													<CheckCircle2
														size={16}
														className="text-slate-900 group-hover:rotate-12 transition-transform"
													/>
													<span className="text-[10px] font-semibold">
														Fechar Ciclo
													</span>
												</div>
												<ChevronRight size={16} className="text-slate-400" />
											</button>
											<button
												type="button"
												className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all group"
											>
												<div className="flex items-center gap-2">
													<TrendingUp
														size={16}
														className="text-slate-900 group-hover:translate-x-1 transition-transform"
													/>
													<span className="text-[10px] font-semibold">
														Transportar Dias
													</span>
												</div>
												<ChevronRight size={16} className="text-slate-400" />
											</button>
											<button
												type="button"
												className="w-full flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all group"
											>
												<div className="flex items-center gap-2">
													<Wallet
														size={16}
														className="text-slate-900 group-hover:scale-110 transition-transform"
													/>
													<span className="text-[10px] font-semibold text-slate-900">
														Novo Empréstimo
													</span>
												</div>
												<ChevronRight size={16} className="text-slate-400" />
											</button>
										</div>
									</CardContent>
								</Card>

								{/* Monthly Stamp */}
								<div className="relative overflow-hidden bg-emerald-900 p-4 rounded-xl text-white shadow-lg">
									<div className="absolute -right-4 -top-4 opacity-20">
										<Verified size={80} />
									</div>
									<p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-1 opacity-80 leading-relaxed">
										Sync Status
									</p>
									<h5 className="text-sm font-bold mb-1 leading-tight">
										Dados Sincronizados
									</h5>
									<p className="text-[10px] opacity-70 mb-3 leading-relaxed">
										Última atualização: Hoje, 14:32
									</p>
									<div className="flex items-center gap-2">
										<span className="bg-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-bold border border-emerald-400/30">
											OFFLINE READY
										</span>
										<span className="bg-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold">
											SECURE
										</span>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "statement" && (
						<Card>
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-slate-900 mb-4">
									Extrato de Depósitos
								</h3>
								<p className="text-slate-500">
									Dados de extrato serão carregados aqui...
								</p>
							</CardContent>
						</Card>
					)}

					{activeTab === "loans" && (
						<Card>
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-slate-900 mb-4">
									Empréstimos Activos
								</h3>
								<p className="text-slate-500">
									Dados de empréstimos serão carregados aqui...
								</p>
							</CardContent>
						</Card>
					)}

					{activeTab === "history" && (
						<Card>
							<CardContent className="p-6">
								<h3 className="text-sm font-semibold text-slate-900 mb-4">
									Histórico de Actividade
								</h3>
								<p className="text-slate-500">
									Histórico será carregado aqui...
								</p>
							</CardContent>
						</Card>
					)}
				</main>
			</div>
		</DashboardLayout>
	);
}

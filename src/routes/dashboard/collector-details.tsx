import { createFileRoute, useLocation } from "@tanstack/react-router";
import {
	AlertCircle,
	Banknote,
	CheckCircle,
	Delete,
	Edit,
	Headphones,
	Mail,
	MapPin,
	MoreVertical,
	PauseCircle,
	Phone,
	RefreshCw,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { useCollector, useCollectionRecords } from "#/features/collectors";

export const Route = createFileRoute("/dashboard/collector-details")({
	component: CollectorDetailsPage,
	validateSearch: (search: Record<string, unknown>) => ({
		id: search.id as string | undefined,
	}),
});

function CollectorDetailsPage() {
	const location = useLocation();
	const searchParams = Route.useSearch();
	const collectorId = searchParams.id as string;

	const { data: collector, isLoading: collectorLoading } = useCollector(collectorId);
	const { data: collectionRecords, isLoading: recordsLoading } = useCollectionRecords(collectorId);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showAllTransactions, setShowAllTransactions] = useState(false);

	const sidebarItems = getDashboardSidebar(location.pathname);

	// Calculate today's transactions from collection records
	const today = new Date().toISOString().split('T')[0];
	const todayRecords = collectionRecords?.filter(record => record.date === today) || [];
	const totalToday = todayRecords.reduce((sum, record) => sum + record.amount, 0);

	return (
		<DashboardLayout>
			<div className="flex h-full">
				<Sidebar items={sidebarItems} />
				<div className="flex-1 flex flex-col overflow-hidden">
					<Header title="Detalhes do Cobrador" />
					<div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
						{/* Header Section */}
						{collectorLoading ? (
							<Card>
								<CardContent className="p-6">
									<LoadingSkeleton variant="card" />
								</CardContent>
							</Card>
						) : (
							<div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
								<div className="flex flex-col lg:flex-row justify-between items-start gap-6">
									<div className="flex gap-6 items-start">
										<div className="relative">
											<div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm">
												<span className="text-3xl font-bold text-slate-700">
													{collector?.name?.charAt(0) || "C"}
												</span>
											</div>
											<span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-3 border-white rounded-full shadow-lg" />
										</div>
										<div className="space-y-3">
											<div className="flex items-center gap-4">
												<h2 className="text-3xl font-bold text-slate-900">
													{collector?.name || "Cobrador"}
												</h2>
												<span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200">
													Ativo
												</span>
											</div>
											<div className="flex flex-wrap gap-6 text-sm text-slate-600">
												<div className="flex items-center gap-2">
													<Phone size={16} className="text-slate-400" />
													<span>{collector?.phone || "-"}</span>
												</div>
												<div className="flex items-center gap-2">
													<Mail size={16} className="text-slate-400" />
													<span>{collector?.email || "-"}</span>
												</div>
												<div className="flex items-center gap-2">
													<MapPin size={16} className="text-slate-400" />
													<span>
														{collector?.district && collector?.province
															? `${collector.district}, ${collector.province}`
															: "-"}
													</span>
												</div>
											</div>
											<div className="flex gap-2 pt-1">
												<span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
													{collector?.clients || 0} clientes
												</span>
											</div>
										</div>
									</div>
									<div className="flex flex-wrap gap-2">
										<Button
											size="sm"
											variant="outline"
											leftIcon={<Edit size={16} />}
										>
											Editar
										</Button>
										<div className="relative">
											<Button
												size="sm"
												variant="outline"
												leftIcon={<MoreVertical size={16} />}
												onClick={() => setShowDropdown(!showDropdown)}
											>
												<span className="sr-only">Mais opções</span>
											</Button>
											{showDropdown && (
												<div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-lg z-20">
													<div className="p-2 space-y-1">
														<button
															type="button"
															className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded transition-colors text-sm w-full text-left text-slate-700"
														>
															<RefreshCw size={16} /> Reset PIN
														</button>
														<button
															type="button"
															className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded transition-colors text-sm w-full text-left border-t border-slate-200 mt-1"
														>
															<PauseCircle size={16} /> Suspender
														</button>
														<button
															type="button"
															className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded transition-colors text-sm w-full text-left text-red-600"
														>
															<Delete size={16} /> Deletar
														</button>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						)}

						{/* KPI Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							<PrototypeKPICard
								title="Dinheiro Físico Hoje"
								value="12.600 MZN"
								subtext="Contabilizado manualmente"
								borderColor="primary"
							/>
							<PrototypeKPICard
								title="Registado no Sistema Hoje"
								value={`${totalToday.toLocaleString()} MZN`}
								subtext={`${todayRecords.length} transações hoje`}
								borderColor="success"
							/>
							<PrototypeKPICard
								title="Diferença Hoje"
								value="+200 MZN"
								subtext="1.6% do volume diário"
								borderColor="warning"
							/>
							<PrototypeKPICard
								title="Status Conciliação"
								value="Pendente"
								subtext="2 discrepâncias abertas"
								borderColor="error"
							/>
						</div>

						{/* Reconciliation Section */}
						<div className="bg-white rounded-xl border border-slate-200/60 shadow-sm">
							<div className="flex justify-between items-center p-4 pb-4 border-b border-slate-100">
								<h4 className="font-semibold text-slate-900">
									Conciliação Diária
								</h4>
							</div>
							<div className="p-4 space-y-4">
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-slate-700 text-white rounded-full">
												<Banknote size={16} />
											</div>
											<div>
												<p className="text-sm font-semibold text-slate-900">
													Dinheiro Físico
												</p>
												<p className="text-xs text-slate-500">
													Contabilizado pelo cobrador
												</p>
											</div>
										</div>
										<span className="text-lg font-bold text-slate-700">
											12.600 MZN
										</span>
									</div>

									<div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-emerald-600 text-white rounded-full">
												<Wallet size={16} />
											</div>
											<div>
												<p className="text-sm font-semibold text-emerald-900">
													Registado no Sistema Hoje
												</p>
												<p className="text-xs text-emerald-600">
													{todayRecords.length} transações hoje
												</p>
											</div>
										</div>
										<span className="text-lg font-bold text-emerald-700">
											{totalToday.toLocaleString()} MZN
										</span>
									</div>

									<div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
										<div className="flex items-center gap-3">
											<div className="p-2 bg-amber-600 text-white rounded-full">
												<AlertCircle size={16} />
											</div>
											<div>
												<p className="text-sm font-semibold text-amber-900">
													Diferença
												</p>
												<p className="text-xs text-amber-600">
													Discrepância a investigar
												</p>
											</div>
										</div>
										<span className="text-lg font-bold text-amber-700">
											+200 MZN
										</span>
									</div>
								</div>

								<div className="pt-4 border-t border-slate-200">
									<Button
										size="sm"
										variant="outline"
										className="w-full"
										leftIcon={<CheckCircle size={16} />}
									>
										Confirmar Conciliação
									</Button>
								</div>
							</div>
						</div>

						{/* Transactions Section */}
						<div className="bg-white rounded-xl border border-slate-200/60 shadow-sm">
							<div className="flex justify-between items-center p-4 pb-4 border-b border-slate-100">
								<h4 className="font-semibold text-slate-900">
									Transações Hoje
								</h4>
								<button
									type="button"
									onClick={() => setShowAllTransactions(!showAllTransactions)}
									className="text-emerald-500 hover:text-emerald-600 hover:underline text-sm font-bold"
								>
									{showAllTransactions ? "Ver Menos" : "Ver Todas"}
								</button>
							</div>
							<div className="p-4">
								{recordsLoading ? (
									<LoadingSkeleton variant="card" />
								) : todayRecords.length === 0 ? (
									<p className="text-sm text-slate-500 text-center py-4">
										Nenhuma transação registrada hoje
									</p>
								) : (
									<div className="space-y-2">
										{(showAllTransactions ? todayRecords : todayRecords.slice(0, 5)).map((record) => (
											<div
												key={record.id}
												className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
											>
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
														{record.clientName.charAt(0)}
													</div>
													<div>
														<p className="text-sm font-medium text-slate-900">
															{record.clientName}
														</p>
														<p className="text-xs text-slate-500">
															{record.date}
														</p>
													</div>
												</div>
												<div className="text-right">
													<p className="text-sm font-bold text-slate-900">
														{record.amount.toLocaleString()} MZN
													</p>
													<span
														className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${record.status === "completed"
															? "bg-emerald-500/10 text-emerald-500"
															: "bg-orange-500/10 text-orange-600"
															}`}
													>
														{record.status === "completed" ? "Sincronizado" : "Pendente"}
													</span>
												</div>
											</div>
										))}
										{!showAllTransactions && todayRecords.length > 5 && (
											<p className="text-xs text-slate-500 text-center pt-2">
												+ {todayRecords.length - 5} mais transações
											</p>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Floating Support Button */}
			<button
				type="button"
				className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
			>
				<Headphones size={24} />
				<div className="absolute right-full mr-4 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
					Suporte WhatsApp
				</div>
			</button>
		</DashboardLayout>
	);
}

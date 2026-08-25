import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	ChevronRight,
	MapPin,
	Phone,
	Printer,
	Receipt,
	Share2,
	TrendingUp,
	Verified,
	Wallet,
	X,
	ArrowLeft,
	Calendar,
	AccountBalance,
	History,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/saver-details")({
	component: SaverDetailsPage,
});

function SaverDetailsPage() {
	const [activeTab, setActiveTab] = useState<"card" | "statement" | "loans" | "history">("card");
	const [selectedMonth, setSelectedMonth] = useState("Outubro 2023");

	// Mock data - will be replaced with actual API call
	const saver = {
		id: "1",
		name: "Maria Silva",
		alphanumericId: "MZ-09442",
		dailyAmount: 500,
		totalSaved: 9000,
		currentDebt: 2200,
		daysInCycle: 18,
		status: "active",
		organization: "Mercado Central, Maputo",
		contact: "+258 84 123 4567",
	};

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
						{ label: saver.name },
					]}
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
					{/* Breadcrumbs & Actions */}
					<div className="flex justify-between items-center mb-6">
						<div className="flex items-center gap-2 text-slate-500">
							<ArrowLeft size={20} className="cursor-pointer hover:text-slate-700" />
							<span className="text-xs font-semibold tracking-wider">
								Gestão / Clientes / {saver.name}
							</span>
						</div>
					</div>

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
											<span>{saver.organization}</span>
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
										<div className="flex justify-between items-center mb-6">
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
										<div className="grid grid-cols-6 gap-2 mb-6">
											{Array.from({ length: 30 }, (_, i) => {
												const day = i + 1;
												let stateClass = "bg-slate-100 border-slate-300 text-slate-400";
												let icon: string | number = day;

												if (day <= 14) {
													stateClass = "bg-blue-100 border-blue-500 text-blue-600";
													icon = "X";
												} else if (day === 15) {
													stateClass = "bg-orange-100 border-orange-500 text-orange-600";
													icon = "C";
												} else if (day === 16 || day === 17) {
													stateClass = "bg-emerald-100 border-emerald-500 text-emerald-600";
													icon = "P";
												} else if (day === 18) {
													stateClass = "bg-white border-2 border-emerald-900 ring-2 ring-emerald-900/20 text-emerald-900 animate-pulse";
												}

												return (
													<div
														key={day}
														className={cn(
															"aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all cursor-pointer hover:scale-105",
															stateClass
														)}
													>
														<span className="text-[10px] font-bold mb-1">{day}</span>
														{typeof icon === "string" ? (
															<X size={16} className="font-bold" />
														) : (
															<span className="text-sm font-bold">{icon}</span>
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
												<p className="text-xs text-slate-600 font-medium">{saver.name} tem 4 dias em atraso. Enviar lembrete via SMS?</p>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Monthly Stamp */}
								<div className="relative overflow-hidden bg-slate-900 p-6 rounded-xl text-white shadow-lg">
									<div className="absolute -right-4 -top-4 opacity-20">
										<Verified size={120} />
									</div>
									<p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-2 opacity-80">Sync Status</p>
									<h5 className="text-lg font-bold mb-2">Dados Sincronizados</h5>
									<p className="text-xs opacity-70 mb-4">Última atualização: Hoje, 14:32</p>
									<div className="flex items-center gap-2">
										<span className="bg-white/20 px-3 py-1 rounded text-[10px] font-bold">OFFLINE READY</span>
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

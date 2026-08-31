import { createFileRoute } from "@tanstack/react-router";
import {
	CirclePlus,
	Edit,
	Eye,
	MapPin,
	Phone,
	Plus,
	TrendingUp,
	Users,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { QuickTransferModal } from "#/components/business/QuickTransferModal";
import { RegisterCollectorModal } from "#/components/business/RegisterCollectorModal";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { EmptyState } from "#/components/ui/EmptyState";
import { FAB } from "#/components/ui/FAB";
import { FilterChips } from "#/components/ui/FilterChips";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import { PrototypeTable } from "#/components/ui/PrototypeTable";
import {
	ActiveBadge,
	InactiveBadge,
	PendingBadge,
} from "#/components/ui/StatusBadge";
import { SupportSection } from "#/components/ui/SupportSection";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/collectors")({
	component: CollectorsManagement,
});

interface Collector {
	id: string;
	name: string;
	phone: string;
	clients: number;
	monthlyVolume: number;
	difference: number;
	status: "active" | "suspended" | "inactive";
	avatar?: string;
}

interface CollectorData {
	name: string;
	phone: string;
	email?: string;
	observations?: string;
	isActive: boolean;
}

function CollectorsManagement() {
	const [_searchTerm, _setSearchTerm] = useState("");
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
	const [selectedCollector, setSelectedCollector] = useState<Collector | null>(
		null,
	);
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

	const handleRegisterCollector = (data: CollectorData) => {
		console.log("Registering collector:", data);
		// TODO: Integrate with API
	};

	const mockCollectors: Collector[] = [
		{
			id: "1",
			name: "Arsénio Matusse",
			phone: "+258 84 123 4567",
			clients: 47,
			monthlyVolume: 125400,
			difference: 1200,
			status: "active",
		},
		{
			id: "2",
			name: "Célia Mondlane",
			phone: "+258 82 987 6543",
			clients: 32,
			monthlyVolume: 84200,
			difference: -4500,
			status: "suspended",
		},
		{
			id: "3",
			name: "Filipe Nyusi Jr.",
			phone: "+258 84 654 3210",
			clients: 28,
			monthlyVolume: 72100,
			difference: 3200,
			status: "active",
		},
		{
			id: "4",
			name: "Isabel Nhantumbo",
			phone: "+258 82 111 2222",
			clients: 41,
			monthlyVolume: 108900,
			difference: -1200,
			status: "active",
		},
		{
			id: "5",
			name: "Jaime Macamo",
			phone: "+258 84 333 4444",
			clients: 36,
			monthlyVolume: 95600,
			difference: 5600,
			status: "suspended",
		},
		{
			id: "6",
			name: "Lídia Manhiça",
			phone: "+258 82 555 6666",
			clients: 43,
			monthlyVolume: 117300,
			difference: 7800,
			status: "active",
		},
	];

	const statusFilters = [
		{ id: "active", label: "Activo" },
		{ id: "suspended", label: "Suspenso" },
		{ id: "inactive", label: "Inativo" },
	];

	const filteredCollectors = mockCollectors.filter((collector) => {
		if (selectedStatuses.length === 0) return true;
		return selectedStatuses.includes(collector.status);
	});

	const sidebarItems = [
		{ label: "Painel", icon: TrendingUp, href: "/dashboard/overview" },
		{ label: "Gestão", icon: Users, href: "/dashboard/savers" },
		{
			label: "Cobradores",
			icon: CirclePlus,
			href: "/dashboard/collectors",
			isActive: true,
		},
		{ label: "Financeiro", icon: Wallet, href: "/dashboard/financial" },
		{ label: "Relatórios", icon: TrendingUp, href: "/dashboard/reports" },
	];

	const kpiData = [
		{
			title: "Total de Cobradores",
			value: String(mockCollectors.length),
			subtext: "+2 este mês",
			borderColor: "primary" as const,
		},
		{
			title: "Cobradores Ativos",
			value: String(mockCollectors.filter((c) => c.status === "active").length),
			subtext: `de ${mockCollectors.length} total`,
			borderColor: "success" as const,
		},
		{
			title: "Arrecadado (Mês)",
			value: "450.000 MZN",
			subtext: "Total colectado",
			borderColor: "info" as const,
		},
		{
			title: "Meta de Colecta",
			value: "82%",
			subtext: "Progresso mensal",
			borderColor: "warning" as const,
		},
	];

	const columns = [
		{
			key: "name",
			header: "COBRADOR",
			render: (value: unknown, row: Record<string, unknown>) => {
				const collector = row as unknown as Collector;
				return (
					<div className="flex items-center gap-3">
						<div className="relative">
							<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-semibold">
								{String(collector.name).charAt(0)}
							</div>
							<span
								className={cn(
									"absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full",
									collector.status === "active"
										? "bg-emerald-500"
										: collector.status === "suspended"
											? "bg-red-500"
											: "bg-slate-300",
								)}
							/>
						</div>
						<div>
							<p className="font-bold text-sm text-slate-900">{String(value)}</p>
							<p className="text-xs text-slate-400 font-mono">{collector.phone}</p>
						</div>
					</div>
				);
			},
		},
		{
			key: "clients",
			header: "CLIENTES",
			render: (value: unknown) => (
				<div className="flex items-center gap-1">
					<span className="font-bold text-sm text-slate-900">
						{String(value)}
					</span>
					<span className="text-xs text-slate-400">Ticantes</span>
				</div>
			),
		},
		{
			key: "monthlyVolume",
			header: "VOLUME MENSAL",
			className: "text-right",
			render: (value: unknown) => (
				<span className="font-mono text-sm font-bold text-slate-900">
					{Number(value).toLocaleString()} MZN
				</span>
			),
		},
		{
			key: "difference",
			header: "DIFERENÇA",
			className: "text-right",
			render: (value: unknown) => (
				<span
					className={cn(
						"font-mono text-sm",
						Number(value) > 0
							? "text-emerald-500"
							: Number(value) < 0
								? "text-red-600"
								: "text-slate-500",
					)}
				>
					{Number(value) > 0 ? "+" : ""}
					{Number(value).toLocaleString()} MZN
				</span>
			),
		},
		{
			key: "status",
			header: "ESTADO",
			render: (_: unknown, row: Record<string, unknown>) => {
				const collector = row as unknown as Collector;
				if (collector.status === "active") return <ActiveBadge />;
				if (collector.status === "suspended")
					return <PendingBadge>Em Análise</PendingBadge>;
				return <InactiveBadge />;
			},
		},
		{
			key: "actions",
			header: "ACÇÕES",
			className: "text-center",
			render: (_: unknown, _row: Record<string, unknown>) => (
				<div className="flex justify-center gap-2">
					<button
						type="button"
						className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
						title="Atribuir Clientes"
					>
						<CirclePlus size={16} />
					</button>
					<button
						type="button"
						className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
						title="Editar"
					>
						<Edit size={16} />
					</button>
					<button
						type="button"
						className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
						title="Ver Relatório"
					>
						<Eye size={16} />
					</button>
				</div>
			),
		},
	];

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Gestão de Cobradores"
					description="Gerencie sua equipe de campo e acompanhe o desempenho"
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Gestão", href: "/dashboard/savers" },
						{ label: "Cobradores" },
					]}
					rightContent={
						<Button
							size="sm"
							leftIcon={<Plus size={16} />}
							onClick={() => setIsRegisterModalOpen(true)}
						>
							Novo Cobrador
						</Button>
					}
				/>

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* KPI Cards */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{kpiData.map((kpi) => (
							<PrototypeKPICard key={kpi.title} {...kpi} />
						))}
					</div>

					{/* Action Banner with Filters */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
						<div>
							<h2 className="text-sm font-bold text-slate-950 tracking-tight">
								Filtros
							</h2>
							<p className="text-[11px] text-slate-400">
								Filtrar cobradores por estado
							</p>
						</div>
						<FilterChips
							filters={statusFilters}
							selected={selectedStatuses}
							onToggle={(id) => {
								setSelectedStatuses((prev) =>
									prev.includes(id)
										? prev.filter((s) => s !== id)
										: [...prev, id],
								);
							}}
							onRemove={(id) => {
								setSelectedStatuses((prev) => prev.filter((s) => s !== id));
							}}
						/>
					</div>

					{/* Table */}
					{filteredCollectors.length === 0 ? (
						<div className="p-8">
							<EmptyState
								icon={Users}
								title="Nenhum cobrador encontrado"
								description="Tente ajustar os filtros ou pesquisar com outros termos"
								actionLabel="Limpar Filtros"
								onAction={() => setSelectedStatuses([])}
							/>
						</div>
					) : (
						<PrototypeTable
							data={filteredCollectors as Record<string, unknown>[]}
							columns={columns}
							showAvatars={true}
							showStatusBadges={true}
							onRowClick={(row) => console.log("View collector:", row)}
							pagination={{
								currentPage: 1,
								totalPages: Math.ceil(filteredCollectors.length / 10),
								totalItems: filteredCollectors.length,
								onPageChange: (page) => console.log("Page change:", page),
							}}
						/>
					)}

					{/* Support Section */}
					<SupportSection />
				</main>

				{/* FAB */}
				<FAB
					actions={[
						{
							id: "new-collection",
							icon: <Phone size={20} />,
							label: "Nova Colecta",
							onClick: () => console.log("Nova Colecta"),
							color: "bg-emerald-500 text-white",
						},
						{
							id: "route-map",
							icon: <MapPin size={20} />,
							label: "Mapa de Rota",
							onClick: () => console.log("Mapa de Rota"),
							color: "bg-blue-600 text-white",
						},
					]}
				/>
			</div>

			<RegisterCollectorModal
				isOpen={isRegisterModalOpen}
				onClose={() => setIsRegisterModalOpen(false)}
				onSubmit={handleRegisterCollector}
			/>

			<QuickTransferModal
				isOpen={isTransferModalOpen}
				onClose={() => {
					setIsTransferModalOpen(false);
					setSelectedCollector(null);
				}}
				onSubmit={(data) => console.log("Transfer:", data)}
				collectorName={selectedCollector?.name}
				availableCollectors={mockCollectors
					.filter((c) => c.id !== selectedCollector?.id)
					.map((c) => ({
						id: c.id,
						name: c.name,
						currentClients: c.clients,
					}))}
			/>
		</DashboardLayout>
	);
}

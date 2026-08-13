import { createFileRoute } from "@tanstack/react-router";
import {
	CirclePlus,
	Edit,
	Eye,
	MapPin,
	MoreVertical,
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
import { Card, CardContent } from "#/components/ui/Card";
import { DataTable } from "#/components/ui/DataTable";
import { EmptyState } from "#/components/ui/EmptyState";
import { ExpandableRowContent } from "#/components/ui/ExpandableRow";
import { FilterChips } from "#/components/ui/FilterChips";
import { KPICard } from "#/components/ui/KPICard";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import {
	ActiveBadge,
	InactiveBadge,
	PendingBadge,
} from "#/components/ui/StatusBadge";
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
			phone: "+258 87 555 0192",
			clients: 58,
			monthlyVolume: 156000,
			difference: 0,
			status: "active",
		},
		{
			id: "4",
			name: "Maria Machava",
			phone: "+258 86 444 5678",
			clients: 41,
			monthlyVolume: 105800,
			difference: 800,
			status: "active",
		},
		{
			id: "5",
			name: "João Sitoe",
			phone: "+258 85 333 4455",
			clients: 35,
			monthlyVolume: 89000,
			difference: -1500,
			status: "suspended",
		},
	];

	const kpiData = [
		{
			title: "Total de Cobradores",
			value: String(mockCollectors.length),
			subtext: "+2 este mês",
			icon: Users,
			color: "text-emerald-600 bg-emerald-50 border-emerald-100",
			isDebt: false,
		},
		{
			title: "Cobradores Ativos",
			value: String(mockCollectors.filter((c) => c.status === "active").length),
			subtext: `de ${mockCollectors.length} total`,
			icon: Users,
			color: "text-emerald-600 bg-emerald-50 border-emerald-100",
			isDebt: false,
		},
		{
			title: "Arrecadado (Mês)",
			value: "450.000 MZN",
			subtext: "Total colectado",
			icon: Wallet,
			color: "text-blue-600 bg-blue-50 border-blue-100",
			isDebt: false,
		},
		{
			title: "Meta de Colecta",
			value: "82%",
			subtext: "Progresso mensal",
			icon: TrendingUp,
			color: "text-amber-600 bg-amber-50 border-amber-100",
			isDebt: false,
		},
	];

	const columns = [
		{
			key: "name",
			header: "COBRADOR",
			render: (value: unknown, row: Collector) => (
				<div className="flex items-center gap-3">
					<div className="relative">
						<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-semibold">
							{String(row.name).charAt(0)}
						</div>
						<span
							className={cn(
								"absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full",
								row.status === "active"
									? "bg-emerald-500"
									: row.status === "suspended"
										? "bg-red-500"
										: "bg-slate-400",
							)}
						/>
					</div>
					<div>
						<p className="font-bold text-sm text-slate-900">{String(value)}</p>
						<p className="text-xs text-slate-400 font-mono">{row.phone}</p>
					</div>
				</div>
			),
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
			render: (value: unknown) => (
				<span className="font-mono text-sm font-bold text-slate-900 text-right block">
					{Number(value).toLocaleString()} MZN
				</span>
			),
		},
		{
			key: "difference",
			header: "DIFERENÇA",
			render: (value: unknown) => (
				<span
					className={cn(
						"font-mono text-sm text-right block",
						Number(value) > 0
							? "text-emerald-600"
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
			render: (_: unknown, row: Collector) => {
				if (row.status === "active") return <ActiveBadge />;
				if (row.status === "suspended")
					return <PendingBadge>Em Análise</PendingBadge>;
				return <InactiveBadge />;
			},
		},
		{
			key: "actions",
			header: "ACÇÕES",
			render: (_: unknown, _row: Collector) => (
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

	const renderExpandedRow = (row: Collector) => (
		<ExpandableRowContent
			title={`Desempenho de ${row.name}`}
			onViewFullDetails={() => console.log("Navigate to full details:", row.id)}
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<TrendingUp size={14} />
						<span>Volume Mensal</span>
					</div>
					<p className="text-lg font-bold text-slate-900">
						{row.monthlyVolume.toLocaleString()} MZN
					</p>
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<Users size={14} />
						<span>Clientes Activos</span>
					</div>
					<p className="text-lg font-bold text-slate-900">
						{row.clients} Ticantes
					</p>
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<Wallet size={14} />
						<span>Diferença</span>
					</div>
					<p
						className={cn(
							"text-lg font-bold",
							row.difference > 0
								? "text-emerald-600"
								: row.difference < 0
									? "text-red-600"
									: "text-slate-900",
						)}
					>
						{row.difference > 0 ? "+" : ""}
						{row.difference.toLocaleString()} MZN
					</p>
				</div>
			</div>

			<div className="pt-4 border-t border-slate-200">
				<h5 className="text-xs font-semibold text-slate-500 uppercase mb-3">
					Acções Rápidas
				</h5>
				<div className="flex flex-wrap gap-2">
					<Button size="sm" variant="outline" leftIcon={<MapPin size={14} />}>
						Ver Localização
					</Button>
					<Button
						size="sm"
						variant="outline"
						leftIcon={<CirclePlus size={14} />}
						onClick={(e) => {
							e.stopPropagation();
							setSelectedCollector(row);
							setIsTransferModalOpen(true);
						}}
					>
						Transferir Clientes
					</Button>
					<Button
						size="sm"
						variant="outline"
						leftIcon={<MoreVertical size={14} />}
					>
						Mais Opções
					</Button>
				</div>
			</div>

			<div className="pt-4 border-t border-slate-200">
				<h5 className="text-xs font-semibold text-slate-500 uppercase mb-3">
					Informação de Contacto
				</h5>
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="text-slate-500">Telefone:</span>
						<span className="ml-2 font-medium text-slate-900">{row.phone}</span>
					</div>
					<div>
						<span className="text-slate-500">Estado:</span>
						<span className="ml-2 font-medium text-slate-900 capitalize">
							{row.status}
						</span>
					</div>
				</div>
			</div>
		</ExpandableRowContent>
	);

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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{kpiData.map((kpi) => (
							<KPICard key={kpi.title} {...kpi} />
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
					<Card>
						<CardContent className="p-0">
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
								<DataTable
									data={filteredCollectors}
									columns={columns}
									searchable={true}
									searchPlaceholder="Buscar por nome ou telefone..."
									onRowClick={(row) => console.log("View collector:", row)}
									emptyMessage="Nenhum cobrador encontrado"
									expandable={true}
									renderExpandedRow={renderExpandedRow}
									onRowExpand={(row) => console.log("Row expanded:", row.id)}
									striped={true}
									hoverable={true}
								/>
							)}
						</CardContent>
					</Card>
				</main>
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

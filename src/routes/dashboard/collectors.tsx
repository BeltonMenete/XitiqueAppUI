import {
	createFileRoute,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import {
	CirclePlus,
	Edit,
	Eye,
	MapPin,
	Phone,
	Plus,
	Users,
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
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import type { Collector } from "#/features/collectors/types";
import { useAuth } from "#/hooks/useAuth";
import { cn } from "#/lib/design-system";

export const Route = createFileRoute("/dashboard/collectors")({
	component: CollectorsManagement,
});

interface CollectorData {
	name: string;
	phone: string;
	email?: string;
	observations?: string;
	isActive: boolean;
}

function CollectorsManagement() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
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
			saved: 118000,
			difference: 1200,
			status: "active",
			registrationDate: "2024-09-15",
		},
		{
			id: "2",
			name: "Célia Mondlane",
			phone: "+258 82 987 6543",
			clients: 32,
			monthlyVolume: 84200,
			saved: 75000,
			difference: -4500,
			status: "suspended",
			registrationDate: "2024-10-03",
		},
		{
			id: "3",
			name: "Filipe Chissano",
			phone: "+258 84 654 3210",
			clients: 28,
			monthlyVolume: 72100,
			saved: 68000,
			difference: 3200,
			status: "active",
			registrationDate: "2024-11-20",
		},
		{
			id: "4",
			name: "Isabel Nhantumbo",
			phone: "+258 82 111 2222",
			clients: 41,
			monthlyVolume: 108900,
			saved: 102000,
			difference: -1200,
			status: "active",
			registrationDate: "2024-09-28",
		},
		{
			id: "5",
			name: "Jaime Macamo",
			phone: "+258 84 333 4444",
			clients: 36,
			monthlyVolume: 95600,
			saved: 89000,
			difference: 5600,
			status: "suspended",
			registrationDate: "2024-12-05",
		},
		{
			id: "6",
			name: "Lídia Manhiça",
			phone: "+258 82 555 6666",
			clients: 43,
			monthlyVolume: 117300,
			saved: 110000,
			difference: 7800,
			status: "active",
			registrationDate: "2024-10-18",
		},
		{
			id: "7",
			name: "Carlos Machel",
			phone: "+258 84 777 8888",
			clients: 52,
			monthlyVolume: 156800,
			saved: 148000,
			difference: 9200,
			status: "active",
			registrationDate: "2024-09-02",
		},
		{
			id: "8",
			name: "Ana Magaia",
			phone: "+258 82 999 0000",
			clients: 19,
			monthlyVolume: 45600,
			saved: 42000,
			difference: -2800,
			status: "inactive",
			registrationDate: "2024-11-12",
		},
		{
			id: "9",
			name: "Bernardo Sitoe",
			phone: "+258 84 222 3333",
			clients: 65,
			monthlyVolume: 195400,
			saved: 182000,
			difference: 12400,
			status: "active",
			registrationDate: "2024-09-25",
		},
		{
			id: "10",
			name: "Dolores Massinga",
			phone: "+258 82 444 5555",
			clients: 38,
			monthlyVolume: 98700,
			saved: 92000,
			difference: 6300,
			status: "active",
			registrationDate: "2024-10-30",
		},
		{
			id: "11",
			name: "Eduardo Zunguza",
			phone: "+258 84 666 7777",
			clients: 24,
			monthlyVolume: 63200,
			saved: 58000,
			difference: -5200,
			status: "suspended",
			registrationDate: "2024-12-15",
		},
		{
			id: "12",
			name: "Fátima Ussene",
			phone: "+258 82 888 9999",
			clients: 71,
			monthlyVolume: 215600,
			saved: 198000,
			difference: 17600,
			status: "active",
			registrationDate: "2024-09-10",
		},
		{
			id: "13",
			name: "Gaspar Moiane",
			phone: "+258 84 101 2020",
			clients: 15,
			monthlyVolume: 38400,
			saved: 35000,
			difference: 3400,
			status: "active",
			registrationDate: "2025-01-08",
		},
		{
			id: "14",
			name: "Helena Timana",
			phone: "+258 82 303 4040",
			clients: 56,
			monthlyVolume: 167800,
			saved: 155000,
			difference: 12800,
			status: "active",
			registrationDate: "2024-10-22",
		},
		{
			id: "15",
			name: "Inácio Machava",
			phone: "+258 84 505 6060",
			clients: 29,
			monthlyVolume: 74500,
			saved: 68000,
			difference: -3500,
			status: "inactive",
			registrationDate: "2024-11-28",
		},
		{
			id: "16",
			name: "Joaquina Baloi",
			phone: "+258 82 707 8080",
			clients: 83,
			monthlyVolume: 248900,
			saved: 232000,
			difference: 16900,
			status: "active",
			registrationDate: "2024-09-08",
		},
		{
			id: "17",
			name: "Khalid Tembe",
			phone: "+258 84 909 1010",
			clients: 44,
			monthlyVolume: 132400,
			saved: 124000,
			difference: 8400,
			status: "active",
			registrationDate: "2024-11-05",
		},
		{
			id: "18",
			name: "Lurdes Macuácua",
			phone: "+258 82 111 2121",
			clients: 12,
			monthlyVolume: 31200,
			saved: 28000,
			difference: -3200,
			status: "suspended",
			registrationDate: "2025-01-20",
		},
		{
			id: "19",
			name: "Marcelino Nhampossa",
			phone: "+258 84 313 4141",
			clients: 67,
			monthlyVolume: 201200,
			saved: 188000,
			difference: 13200,
			status: "active",
			registrationDate: "2024-10-12",
		},
		{
			id: "20",
			name: "Noémia Cuamba",
			phone: "+258 82 515 6161",
			clients: 95,
			monthlyVolume: 285700,
			saved: 268000,
			difference: 17700,
			status: "active",
			registrationDate: "2024-09-20",
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

	const sidebarItems = getDashboardSidebar(location.pathname, user?.role);

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
			title: "Clientes Este Mês",
			value: "34",
			subtext: "Novos registados",
			borderColor: "success" as const,
		},
		{
			title: "Total Colectado",
			value: "450.000 MZN",
			subtext: "Total colectado",
			borderColor: "info" as const,
		},
		{
			title: "Total Guardado",
			value: "380.000 MZN",
			subtext: "Valor total guardado",
			borderColor: "success" as const,
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
							<button
								type="button"
								className="font-bold text-sm text-slate-900 hover:text-emerald-600 hover:underline transition-colors bg-transparent border-none p-0 text-left cursor-pointer"
								onClick={() => {
									console.log(
										"Collector name click - navigating to collector-details for:",
										collector.id,
									);
									navigate({
										to: "/dashboard/collector-details",
										search: { id: collector.id },
									});
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										navigate({
											to: "/dashboard/collector-details",
											search: { id: collector.id },
										});
									}
								}}
							>
								{String(value)}
							</button>
							<p className="text-xs text-slate-400 font-mono">
								{collector.phone}
							</p>
						</div>
					</div>
				);
			},
		},
		{
			key: "clients",
			header: "CLIENTES REGISTRADOS",
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
			key: "newClients",
			header: "CLIENTES ESTE MÊS",
			className: "text-right",
			render: (_value: unknown, row: Record<string, unknown>) => {
				const _collector = row as unknown as Collector;
				const newClients = Math.floor(Math.random() * 5) + 1; // Mock data
				return (
					<span className="font-mono text-sm font-bold text-emerald-600">
						{newClients}
					</span>
				);
			},
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
			key: "saved",
			header: "GUARDADO",
			className: "text-right",
			render: (value: unknown) => (
				<span className="font-mono text-sm font-bold text-emerald-600">
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
			render: (_: unknown, row: Record<string, unknown>) => {
				const collector = row as unknown as Collector;
				return (
					<div className="flex justify-center gap-2">
						<button
							type="button"
							className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
							title="Ver Detalhes"
							onClick={() => {
								console.log("View collector details:", collector.id);
								navigate({
									to: "/dashboard/collector-details",
									search: { id: collector.id },
								});
							}}
						>
							<Eye size={16} />
						</button>
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
					</div>
				);
			},
		},
	];

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Gestão de Cobradores"
					description="Gerencie sua equipe de campo e acompanhe o desempenho"
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
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
							data={filteredCollectors as unknown as Record<string, unknown>[]}
							columns={columns}
							showAvatars={true}
							showStatusBadges={true}
							onRowClick={(row) => {
								const collector = row as unknown as Collector;
								console.log("View collector:", collector.id);
								navigate({
									to: "/dashboard/collector-details",
									search: { id: collector.id },
								});
							}}
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

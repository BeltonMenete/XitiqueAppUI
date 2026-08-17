import { createFileRoute } from "@tanstack/react-router";
import {
	AlertCircle,
	Calendar,
	ChevronDown,
	DollarSign,
	Filter,
	MoreVertical,
	Phone,
	Plus,
	Search,
	TrendingUp,
	Users,
	Wallet,
	Grid,
	List,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { QuickDepositModal } from "#/components/business/QuickDepositModal";
import { QuickLoanModal } from "#/components/business/QuickLoanModal";
import { RegisterSaverModal } from "#/components/business/RegisterSaverModal";
import { DayActionModal } from "#/components/business/DayActionModal";
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
import { ProgressCircle } from "#/components/ui/ProgressCircle";
import {
	ActiveBadge,
	DebtBadge,
	InactiveBadge,
} from "#/components/ui/StatusBadge";
import { useSavers, enrichSaversWithAlphanumericIds } from "#/features/savers";
import type { Saver } from "#/features/savers/types";
import { cn } from "#/lib/design-system";

// MonthCalendarGrid Component
interface MonthCalendarGridProps {
	days: Array<{ day: number; paid: boolean; amount?: number; collector?: string; isDebtPayment?: boolean; isInDebt?: boolean }>;
	onDayClick?: (dayData: { day: number; paid: boolean; amount?: number; collector?: string; isDebtPayment?: boolean; isInDebt?: boolean }) => void;
	showHeader?: boolean;
	saverName?: string;
	headerOnly?: boolean;
	saver?: Saver;
}

function MonthCalendarGrid({ days, onDayClick, showHeader = false, saverName, headerOnly = false, saver }: MonthCalendarGridProps) {
	const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];
	// Repeat week days to cover 30 days
	const repeatedWeekDays = Array.from({ length: 30 }, (_, i) => weekDays[i % 7]);

	return (
		<div className="flex flex-col items-center min-w-[640px]">
			{showHeader && (
				<>
					<div className="grid grid-cols-[repeat(30,minmax(18px,1fr))] gap-0.5 justify-center text-[7px] leading-tight text-center uppercase text-slate-400 font-medium mb-0.5">
						{repeatedWeekDays.map((day, i) => (
							<span key={`weekday-${i}`}>{day}</span>
						))}
					</div>
					<div className="grid grid-cols-[repeat(30,minmax(18px,1fr))] gap-0.5 justify-center text-[7px] leading-tight text-center text-slate-400 font-medium mb-0.5">
						{days.map((dayData) => (
							<span key={`daynum-${dayData.day}`}>{dayData.day}</span>
						))}
					</div>
				</>
			)}
			{!headerOnly && (
				<div className="grid grid-cols-[repeat(30,minmax(18px,1fr))] gap-0.5">
					{days.map((dayData) => (
						<div
							key={dayData.day}
							className={cn(
								"w-4 h-4 rounded-sm border cursor-pointer transition-all hover:scale-110 hover:shadow-md relative group",
								dayData.paid && dayData.isDebtPayment
									? "border-amber-300 bg-amber-500 hover:bg-amber-600"
									: dayData.paid
										? "border-slate-300 bg-emerald-600 hover:bg-emerald-700"
										: dayData.isInDebt
											? "border-red-200 bg-red-100 hover:bg-red-200"
											: "border-slate-200 bg-slate-50 hover:bg-slate-100",
							)}
							onClick={() => onDayClick?.(dayData)}
						>
							{/* Debt payment indicator */}
							{dayData.isDebtPayment && (
								<div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
							)}
							{/* Debt day indicator */}
							{dayData.isInDebt && !dayData.paid && (
								<div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
							)}
							{/* Beautiful Tooltip */}
							<div className={cn(
								"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] w-36 pointer-events-none border",
								dayData.paid
									? "bg-emerald-500 text-white border-emerald-600"
									: dayData.isInDebt && !dayData.paid
										? "bg-red-500 text-white border-red-600"
										: dayData.isDebtPayment
											? "bg-amber-500 text-white border-amber-600"
											: "bg-slate-700 text-white border-slate-800"
							)}>
								<div className="font-semibold mb-1">Dia {dayData.day}</div>
								<div className="text-emerald-100 text-[10px]">{saverName}</div>
								<div className={cn(
									"mt-1 font-medium",
									dayData.isDebtPayment
										? "text-amber-100"
										: dayData.isInDebt && !dayData.paid
											? "text-red-100"
											: dayData.paid
												? "text-emerald-100"
												: "text-slate-300"
								)}>
									{dayData.isDebtPayment
										? `Pagamento Dívida: ${dayData.amount || 0} MZN`
										: dayData.isInDebt && !dayData.paid
											? "Em Dívida"
											: dayData.paid
												? `Depositado: ${dayData.amount || 0} MZN`
												: "Não depositado"}
								</div>
								{dayData.collector && (
									<div className="text-[9px] text-slate-500 mt-1">
										Cobrador: {dayData.collector}
									</div>
								)}
								{/* Arrow */}
								<div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-emerald-200" />
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

// CalendarKPIs Component
interface CalendarKPIsProps {
	totalSavers: number;
	totalCollected: string;
	inDebt: number;
	adherenceRate: number;
}

function CalendarKPIs({
	totalSavers,
	totalCollected,
	inDebt,
	adherenceRate,
}: CalendarKPIsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
			<div className="flex-1 min-w-[200px] bg-emerald-50 p-4 rounded-xl text-emerald-900 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">
						Colecção do Dia
					</h4>
					<p className="text-lg font-bold">{totalCollected}</p>
				</div>
				<div className="flex items-center text-emerald-600 font-bold text-[10px]">
					<TrendingUp size={14} className="mr-1" />
					+12.4%
				</div>
			</div>
			<div className="flex-1 min-w-[200px] bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
						Em Dívida
					</h4>
					<p className="text-lg font-bold text-red-600">{inDebt}</p>
				</div>
				<AlertCircle size={16} className="text-red-500 opacity-40" />
			</div>
			<div className="flex-1 min-w-[200px] bg-white p-4 rounded-xl border border-slate-200 flex flex-col justify-center group">
				<div className="flex justify-between items-center mb-1">
					<h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
						Adesão
					</h4>
					<p className="text-lg font-bold text-slate-900">{adherenceRate}%</p>
				</div>
				<div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
					<div
						className="bg-slate-900 h-full"
						style={{ width: `${adherenceRate}%` }}
					/>
				</div>
			</div>
		</div>
	);
}

// SaversCalendarView Component
interface SaversCalendarViewProps {
	savers: Saver[];
	onRowClick: (saver: Saver) => void;
	selectedMonth: string;
	onMonthChange: (month: string) => void;
	onDayClick?: (saver: Saver, dayData: { day: number; paid: boolean; amount?: number; collector?: string; isDebtPayment?: boolean; isInDebt?: boolean }) => void;
}

function SaversCalendarView({
	savers,
	onRowClick,
	selectedMonth,
	onMonthChange,
	onDayClick,
}: SaversCalendarViewProps) {
	const months = ["Jan 2024", "Fev 2024", "Março 2024", "Abril 2024", "Maio 2024"];

	return (
		<div className="space-y-4">
			{/* Month Selector & Filters */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
				<div className="flex items-center space-x-2 overflow-x-auto">
					{months.map((month) => (
						<button
							key={month}
							type="button"
							className={cn(
								"px-3 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap",
								selectedMonth === month
									? "bg-emerald-500 text-white shadow-sm"
									: "bg-slate-100 text-slate-500 hover:bg-slate-200",
							)}
							onClick={() => onMonthChange(month)}
						>
							{month}
						</button>
					))}
				</div>
				<div className="flex space-x-2">
					<button className="flex items-center space-x-2 px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
						<Filter size={16} />
						<span className="text-xs font-semibold">Filtros</span>
					</button>
					<button className="flex items-center space-x-2 px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
						<Grid size={16} />
						<span className="text-xs font-semibold">Expandir Vista</span>
					</button>
				</div>
			</div>

			{/* Calendar Table */}
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-slate-50 border-b border-slate-200">
							<tr>
								<th className="px-2 py-1 text-[11px] text-slate-500 font-semibold w-40">
									TICANTE
								</th>
								<th className="px-2 py-1 text-[11px] text-slate-500 font-semibold">
									<MonthCalendarGrid
										days={Array.from({ length: 30 }, (_, i) => ({
											day: i + 1,
											paid: false,
										}))}
										showHeader={true}
										headerOnly={true}
									/>
								</th>
								<th className="px-2 py-1 text-[11px] text-slate-500 font-semibold w-16 text-right">
									TOTAL
								</th>
								<th className="px-2 py-1 text-[11px] text-slate-500 font-semibold w-20">
									ESTADO
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200">
							{savers.map((saver) => (
								<tr
									key={saver.id}
									className="hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-200/50"
									onClick={() => onRowClick(saver)}
								>
									<td className="px-2 py-1">
										<div className="flex flex-col">
											<div className="flex items-center space-x-1">
												<span className="font-mono text-[10px] text-slate-400">
													{saver.alphanumericId || String(saver.cardNumber)}
												</span>
											</div>
											<span className="font-bold text-xs text-slate-900 truncate w-28">
												{saver.name}
											</span>
										</div>
									</td>
									<td className="px-3 py-1">
										<MonthCalendarGrid
											days={saver.paymentDays || []}
											onDayClick={(dayData) => onDayClick?.(saver, dayData)}
											showHeader={false}
											saverName={saver.name}
											saver={saver}
										/>
									</td>
									<td className="px-2 py-1 text-right">
										<span className="font-mono text-xs font-bold text-slate-900">
											{saver.totalSaved.toLocaleString()} MZN
										</span>
									</td>
									<td className="px-2 py-1">
										{saver.status === "active" && <ActiveBadge />}
										{saver.status === "in_debt" && <DebtBadge />}
										{saver.status === "inactive" && <InactiveBadge />}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Legend */}
				<div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-slate-300 bg-emerald-600" />
						<span className="text-[10px] text-slate-600">Depósito Normal</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-amber-300 bg-amber-500 relative">
							<div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
						</div>
						<span className="text-[10px] text-slate-600">Pagamento de Dívida</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-red-200 bg-red-100 relative">
							<div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-red-400 rounded-full" />
						</div>
						<span className="text-[10px] text-slate-600">Em Dívida</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-slate-200 bg-slate-50" />
						<span className="text-[10px] text-slate-600">Não Depositado</span>
					</div>
				</div>

				{/* Pagination */}
				<div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
					<p className="text-xs text-slate-500">
						A mostrar 1-{savers.length} de {savers.length} ticantes
					</p>
					<div className="flex space-x-1">
						<button className="p-1 rounded-lg hover:bg-slate-200 text-slate-400">
							<ChevronDown size={16} className="rotate-90" />
						</button>
						<button className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-sm">
							1
						</button>
						<button className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 font-bold text-sm">
							2
						</button>
						<button className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 font-bold text-sm">
							3
						</button>
						<button className="p-1 rounded-lg hover:bg-slate-200 text-slate-400">
							<ChevronDown size={16} className="-rotate-90" />
						</button>
					</div>
				</div>
			</div>

			{/* KPIs */}
			<CalendarKPIs
				totalSavers={savers.length}
				totalCollected="45.200 MZN"
				inDebt={savers.filter((s) => s.status === "in_debt").length}
				adherenceRate={88}
			/>
		</div>
	);
}

export const Route = createFileRoute("/dashboard/savers")({
	component: SaversManagement,
});

const mockSavers: Saver[] = [
	{
		id: "1",
		cardNumber: 1001,
		name: "Carlos Mondlane",
		dailyAmount: 500,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-15",
		totalSaved: 7500,
		currentDebt: 2300,
		daysInCycle: 15,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A01",
		paymentDays: (() => {
			const debtDays = Math.floor(2300 / 500);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 8;
				const isDebtPayment = i < 3;
				const isInDebt = !paid && i < 8 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 500 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "2",
		cardNumber: 1002,
		name: "Ana Vilanculos",
		dailyAmount: 250,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-01",
		totalSaved: 2500,
		currentDebt: 1500,
		daysInCycle: 5,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A02",
		paymentDays: (() => {
			const debtDays = Math.floor(1500 / 250);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 5 && i % 2 === 0;
				const isDebtPayment = i === 2;
				const isInDebt = !paid && i < 5 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 250 : 0,
					collector: paid ? "Célia Mondlane" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "3",
		cardNumber: 1003,
		name: "Bento Sitoe",
		dailyAmount: 300,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-03-10",
		totalSaved: 6600,
		currentDebt: 0,
		daysInCycle: 22,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A03",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 22,
			amount: i < 22 ? 300 : 0,
			collector: i < 22 ? "Filipe Nyusi Jr." : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "4",
		cardNumber: 1004,
		name: "Eduarda Langa",
		dailyAmount: 1000,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-10",
		totalSaved: 12000,
		currentDebt: 2000,
		daysInCycle: 12,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A04",
		paymentDays: (() => {
			const debtDays = Math.floor(2000 / 1000);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 12;
				const isDebtPayment = i < 5;
				const isInDebt = !paid && i < 12 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 1000 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "5",
		cardNumber: 1005,
		name: "Geraldo Mucavele",
		dailyAmount: 150,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-05",
		totalSaved: 4500,
		currentDebt: 0,
		daysInCycle: 30,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A05",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 28,
			amount: i < 28 ? 150 : 0,
			collector: i < 28 ? "Célia Mondlane" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "6",
		cardNumber: 1006,
		name: "Isabel Tembe",
		dailyAmount: 200,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-15",
		totalSaved: 5000,
		currentDebt: 0,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A06",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 200 : 0,
			collector: i < 25 ? "Filipe Nyusi Jr." : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
];

function SaversManagement() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("Maio 2024");
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
	const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
	const [isDayActionModalOpen, setIsDayActionModalOpen] = useState(false);
	const [selectedSaver, setSelectedSaver] = useState<Saver | null>(null);
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
	const [viewMode, setViewMode] = useState<"standard" | "calendar">("standard");
	const [selectedDayData, setSelectedDayData] = useState<{
		day: number;
		saverName: string;
		status: "paid" | "unpaid" | "debt" | "debt_payment";
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean;
	} | null>(null);

	const { data: saversData, isLoading } = useSavers({ page: 1, pageSize: 20 });
	const savers = enrichSaversWithAlphanumericIds(saversData?.data || mockSavers);

	const statusFilters = [
		{ id: "active", label: "Activo" },
		{ id: "in_debt", label: "Em Dívida" },
		{ id: "inactive", label: "Inativo" },
	];

	const filteredSavers = savers.filter((saver) => {
		if (selectedStatuses.length === 0) return true;
		return selectedStatuses.includes(saver.status);
	});

	const sidebarItems = [
		{ label: "Painel", icon: Users, href: "/dashboard/overview" },
		{ label: "Gestão", icon: Users, href: "/dashboard/savers", isActive: true },
		{ label: "Financeiro", icon: Wallet, href: "/dashboard/financial" },
		{ label: "Relatórios", icon: TrendingUp, href: "/dashboard/reports" },
		{ label: "Configurações", icon: Search, href: "/dashboard/settings" },
	];

	const kpiData = [
		{
			title: "Total Ticantes",
			value: String(savers.length),
			subtext: "Total registado",
			icon: Users,
			color: "text-emerald-600 bg-emerald-50 border-emerald-100",
			isDebt: false,
		},
		{
			title: "Total Sob Gestão",
			value: "450.000 MZN",
			subtext: "+12.5% vs mês anterior",
			icon: Wallet,
			color: "text-slate-600 bg-slate-50 border-slate-100",
			isDebt: false,
			trend: { value: "12.5%", isPositive: true },
		},
		{
			title: "Empréstimos Activos",
			value: "8.000 MZN",
			subtext: "3 empréstimos activos",
			icon: Wallet,
			color: "text-amber-600 bg-amber-50 border-amber-100",
			isDebt: false,
		},
		{
			title: "Em Incumprimento",
			value: String(savers.filter((s) => s.status === "in_debt").length),
			subtext: "Ticantes em dívida",
			icon: AlertCircle,
			color: "text-red-600 bg-red-50 border-red-100",
			isDebt: true,
		},
	];

	const columns = [
		{
			key: "cardNumber",
			header: "TICANTE",
			render: (value: unknown, row: Saver) => (
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<span className="font-mono text-[11px] text-slate-400">
							{String(value)}
						</span>
						<span
							className={cn(
								"w-1.5 h-1.5 rounded-full",
								row.status === "active" ? "bg-emerald-500" : "bg-red-500",
							)}
						/>
					</div>
					<span className="font-bold text-sm text-slate-900 truncate w-32">
						{row.name}
					</span>
				</div>
			),
		},
		{
			key: "dailyAmount",
			header: "VALOR DIÁRIO",
			render: (value: unknown) => (
				<span className="text-sm">{Number(value).toLocaleString()} MZN</span>
			),
		},
		{
			key: "totalSaved",
			header: "TOTAL POUPADO",
			render: (value: unknown) => (
				<span className="text-sm">{Number(value).toLocaleString()} MZN</span>
			),
		},
		{
			key: "currentDebt",
			header: "DÍVIDA ATUAL",
			render: (value: unknown) => (
				<span
					className={cn(
						"text-sm",
						Number(value) > 0 ? "text-red-600" : "text-slate-500",
					)}
				>
					{Number(value).toLocaleString()} MZN
				</span>
			),
		},
		{
			key: "daysInCycle",
			header: "DIAS NO CICLO",
			render: (value: unknown) => (
				<span className="text-sm">{String(value)} Dias</span>
			),
		},
		{
			key: "status",
			header: "ESTADO",
			render: (_: unknown, row: Saver) => {
				if (row.status === "active") return <ActiveBadge />;
				if (row.status === "in_debt") return <DebtBadge />;
				if (row.status === "inactive") return <InactiveBadge />;
				return <span className="text-xs text-slate-400">-</span>;
			},
		},
	];

	const renderExpandedRow = (row: Saver) => (
		<ExpandableRowContent
			title={`Detalhes de ${row.name}`}
			onViewFullDetails={() => console.log("Navigate to full details:", row.id)}
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<DollarSign size={14} />
						<span>Total Poupança</span>
					</div>
					<p className="text-lg font-bold text-slate-900">
						{row.totalSaved.toLocaleString()} MZN
					</p>
				</div>
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<AlertCircle size={14} />
						<span>Dívida Atual</span>
					</div>
					<p
						className={cn(
							"text-lg font-bold",
							row.currentDebt > 0 ? "text-red-600" : "text-slate-900",
						)}
					>
						{row.currentDebt.toLocaleString()} MZN
					</p>
				</div>
				<div className="space-y-2 flex items-center gap-4">
					<div>
						<div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
							<Calendar size={14} />
							<span>Progresso do Ciclo</span>
						</div>
						<ProgressCircle
							value={(row.daysInCycle / 30) * 100}
							size="md"
							label={`${row.daysInCycle}/30`}
						/>
					</div>
				</div>
			</div>

			<div className="pt-4 border-t border-slate-200">
				<h5 className="text-xs font-semibold text-slate-500 uppercase mb-3">
					Acções Rápidas
				</h5>
				<div className="flex flex-wrap gap-2">
					<Button
						size="sm"
						variant="outline"
						leftIcon={<DollarSign size={14} />}
						onClick={(e) => {
							e.stopPropagation();
							setSelectedSaver(row);
							setIsDepositModalOpen(true);
						}}
					>
						Registar Depósito
					</Button>
					<Button
						size="sm"
						variant="outline"
						leftIcon={<Phone size={14} />}
						onClick={(e) => {
							e.stopPropagation();
							setSelectedSaver(row);
							setIsLoanModalOpen(true);
						}}
					>
						Solicitar Empréstimo
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
						<span className="text-slate-500">Organização:</span>
						<span className="ml-2 font-medium text-slate-900">
							{row.organization?.name || "N/A"}
						</span>
					</div>
					<div>
						<span className="text-slate-500">Data de Registo:</span>
						<span className="ml-2 font-medium text-slate-900">
							{row.registrationDate}
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
					title="Gestão de Ticantes"
					description="Visão expandida e financeira dos membros"
					searchValue={searchTerm}
					onSearchChange={setSearchTerm}
					searchPlaceholder="Pesquisar ticante..."
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Gestão" },
					]}
					rightContent={
						<div className="flex items-center gap-2">
							<div className="flex items-center bg-slate-100 rounded-lg p-1">
								<button
									type="button"
									className={cn(
										"p-1.5 rounded-md transition-colors",
										viewMode === "standard"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500 hover:text-slate-700",
									)}
									onClick={() => setViewMode("standard")}
									title="Vista padrão"
								>
									<List size={16} />
								</button>
								<button
									type="button"
									className={cn(
										"p-1.5 rounded-md transition-colors",
										viewMode === "calendar"
											? "bg-white text-slate-900 shadow-sm"
											: "text-slate-500 hover:text-slate-700",
									)}
									onClick={() => setViewMode("calendar")}
									title="Vista calendário"
								>
									<Grid size={16} />
								</button>
							</div>
							<Button
								size="sm"
								leftIcon={<Plus size={16} />}
								onClick={() => setIsRegisterModalOpen(true)}
							>
								Novo Ticante
							</Button>
						</div>
					}
				/>

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500">
					{viewMode === "standard" ? (
						<>
							{/* Action Banner */}
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
								<div>
									<h2 className="text-sm font-bold text-slate-950 tracking-tight">
										Gestão de Ticantes
									</h2>
									<p className="text-[11px] text-slate-400">
										Visão expandida e financeira dos membros
									</p>
								</div>
								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
									<div className="flex items-center gap-2">
										{["Março 2024", "Abril 2024", "Maio 2024"].map((month) => (
											<button
												key={month}
												type="button"
												className={cn(
													"px-3 py-1 rounded-full text-xs font-semibold transition-colors",
													selectedMonth === month
														? "bg-emerald-500 text-white"
														: "bg-slate-100 text-slate-500 hover:bg-slate-200",
												)}
												onClick={() => setSelectedMonth(month)}
											>
												{month}
											</button>
										))}
									</div>
									<div className="flex items-center gap-2">
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
								</div>
							</div>

							{/* KPI Cards */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
								{kpiData.map((kpi) => (
									<KPICard key={kpi.title} {...kpi} />
								))}
							</div>

							{/* Main Content */}
							<div className="grid grid-cols-12 gap-6">
								{/* Savers Table */}
								<div className="col-span-12">
									<Card>
										<CardContent className="p-0">
											{isLoading ? (
												<div className="p-8">
													<LoadingSkeleton variant="table" />
												</div>
											) : filteredSavers.length === 0 ? (
												<div className="p-8">
													<EmptyState
														icon={Users}
														title="Nenhum ticante encontrado"
														description="Tente ajustar os filtros ou pesquisar com outros termos"
														actionLabel="Limpar Filtros"
														onAction={() => setSelectedStatuses([])}
													/>
												</div>
											) : (
												<DataTable
													data={filteredSavers}
													columns={columns}
													searchable={true}
													searchPlaceholder="Pesquisar por nome ou número de cartão..."
													onRowClick={(row) => console.log("View saver:", row)}
													emptyMessage="Nenhum ticante encontrado"
													expandable={true}
													renderExpandedRow={renderExpandedRow}
													onRowExpand={(row) =>
														console.log("Row expanded:", row.id)
													}
													striped={true}
													hoverable={true}
												/>
											)}
										</CardContent>
									</Card>
								</div>

								{/* Financial Summary */}
								<div className="col-span-12 lg:col-span-4">
									<Card>
										<CardContent className="p-5">
											<h3 className="text-sm font-semibold text-slate-900 mb-4">
												Resumo Financeiro
											</h3>
											<div className="space-y-4">
												<div className="p-4 bg-emerald-50 rounded-lg">
													<p className="text-xs text-slate-500 mb-1">
														Colectado Este Mês
													</p>
													<p className="text-xl font-bold text-emerald-600">
														75.000 MZN
													</p>
													<p className="text-[10px] text-emerald-600 mt-1">
														+15% vs mês anterior
													</p>
												</div>
												<div className="p-4 bg-red-50 rounded-lg">
													<p className="text-xs text-slate-500 mb-1">Em Dívida</p>
													<p className="text-xl font-bold text-red-600">
														2.300 MZN
													</p>
													<p className="text-[10px] text-red-600 mt-1">
														4 ticantes afectados
													</p>
												</div>
												<div className="p-4 bg-slate-50 rounded-lg">
													<p className="text-xs text-slate-500 mb-1">
														Taxa de Assiduidade
													</p>
													<p className="text-xl font-bold text-slate-900">94.2%</p>
													<p className="text-[10px] text-slate-400 mt-1">
														322 de 342 ticantes
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>

								{/* Recent Activity */}
								<div className="col-span-12 lg:col-span-8">
									<Card>
										<CardContent className="p-5">
											<h3 className="text-sm font-semibold text-slate-900 mb-4">
												Actividade Recente
											</h3>
											<div className="space-y-3">
												{[
													{
														id: "1",
														action: "Novo depósito",
														user: "Carlos Mondlane",
														amount: "500 MZN",
														time: "Há 5 min",
													},
													{
														id: "2",
														action: "Empréstimo aprovado",
														user: "Ana Vilanculos",
														amount: "1.000 MZN",
														time: "Há 15 min",
													},
													{
														id: "3",
														action: "Pagamento recebido",
														user: "Bento Sitoe",
														amount: "300 MZN",
														time: "Há 30 min",
													},
													{
														id: "4",
														action: "Novo ticante registado",
														user: "Eduarda Langa",
														amount: "-",
														time: "Há 1 hora",
													},
												].map((activity) => (
													<div
														key={activity.id}
														className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
													>
														<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
															<Users size={16} className="text-emerald-600" />
														</div>
														<div className="flex-1">
															<p className="text-xs font-medium text-slate-900">
																{activity.action}
															</p>
															<p className="text-[10px] text-slate-400">
																{activity.user}
															</p>
														</div>
														<div className="text-right">
															<p className="text-xs font-semibold text-slate-900">
																{activity.amount}
															</p>
															<p className="text-[10px] text-slate-400">
																{activity.time}
															</p>
														</div>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
						</>
					) : (
						<SaversCalendarView
							savers={filteredSavers}
							onRowClick={(saver) => console.log("View saver:", saver)}
							selectedMonth={selectedMonth}
							onMonthChange={setSelectedMonth}
							onDayClick={(saver, dayData) => {
								setSelectedDayData({
									day: dayData.day,
									saverName: saver.name,
									status: dayData.paid
										? dayData.isDebtPayment
											? "debt_payment"
											: "paid"
										: dayData.isInDebt
											? "debt"
											: "unpaid",
									amount: dayData.amount,
									collector: dayData.collector,
									isDebtPayment: dayData.isDebtPayment,
								});
								setIsDayActionModalOpen(true);
							}}
						/>
					)}
				</main>
			</div>

			<RegisterSaverModal
				isOpen={isRegisterModalOpen}
				onClose={() => setIsRegisterModalOpen(false)}
				onSubmit={(data) => console.log("Register saver:", data)}
			/>

			<QuickDepositModal
				isOpen={isDepositModalOpen}
				onClose={() => {
					setIsDepositModalOpen(false);
					setSelectedSaver(null);
				}}
				onSubmit={(data) => console.log("Deposit:", data)}
				saverName={selectedSaver?.name}
				lastAmount={selectedSaver?.dailyAmount}
			/>

			<QuickLoanModal
				isOpen={isLoanModalOpen}
				onClose={() => {
					setIsLoanModalOpen(false);
					setSelectedSaver(null);
				}}
				onSubmit={(data) => console.log("Loan:", data)}
				saverName={selectedSaver?.name}
				maxLoanAmount={
					selectedSaver?.totalSaved ? selectedSaver.totalSaved * 2 : 50000
				}
			/>

			<DayActionModal
				isOpen={isDayActionModalOpen}
				onClose={() => setIsDayActionModalOpen(false)}
				saverName={selectedDayData?.saverName || ""}
				day={selectedDayData?.day || 1}
				dayStatus={selectedDayData?.status || "unpaid"}
				amount={selectedDayData?.amount}
				collector={selectedDayData?.collector}
				isDebtPayment={selectedDayData?.isDebtPayment}
				onActionComplete={(action, data) => {
					console.log("Action completed:", action, data);
					setIsDayActionModalOpen(false);

					// Show toast based on action
					if (action === "deposit" || action === "edit") {
						toast.success(`Depósito de ${data.amount} MZN registrado com sucesso para ${data.saverName}`);
					} else if (action === "delete") {
						toast.success("Depósito deletado com sucesso");
					} else if (action === "convert") {
						toast.success("Depósito convertido para pagamento de dívida");
					} else if (action === "note") {
						toast.success("Nota adicionada com sucesso");
					} else if (action === "unavailable") {
						toast.info(`Dia marcado como não disponível: ${data.reason}`);
					} else if (action === "revert") {
						toast.success("Pagamento revertido para depósito normal");
					} else {
						toast.info(`Ação "${action}" executada com sucesso`);
					}
				}}
			/>
		</DashboardLayout>
	);
}

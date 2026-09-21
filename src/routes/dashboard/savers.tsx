import {
	createFileRoute,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import {
	AlertCircle,
	Calendar,
	Check,
	DollarSign,
	Eye,
	Filter,
	Grid,
	List,
	MoreVertical,
	Phone,
	Plus,
	Users,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { DayDetailPopup } from "#/components/business/DayDetailPopup";
import { IndividualCycleClosureModal } from "#/components/business/IndividualCycleClosureModal";
import { QuickDepositModal } from "#/components/business/QuickDepositModal";
import { QuickLoanModal } from "#/components/business/QuickLoanModal";
import { RegisterSaverModal } from "#/components/business/RegisterSaverModal";
import { QuickActionMenu } from "#/components/interactive/QuickActionMenu";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { DataTable } from "#/components/ui/DataTable";
import { EmptyState } from "#/components/ui/EmptyState";
import { ExpandableRowContent } from "#/components/ui/ExpandableRow";
import { FilterChips } from "#/components/ui/FilterChips";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { ProgressCircle } from "#/components/ui/ProgressCircle";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import {
	ActiveBadge,
	DebtBadge,
	InactiveBadge,
} from "#/components/ui/StatusBadge";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { enrichSaversWithAlphanumericIds, useSavers } from "#/features/savers";
import type { Saver } from "#/features/savers/types";
import { useAuth } from "#/hooks/useAuth";
import { cn } from "#/lib/design-system";

// MonthCalendarGrid Component
interface MonthCalendarGridProps {
	days: Array<{
		day: number;
		paid: boolean;
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean; // true if this payment is repaying loan
		isInDebt?: boolean; // true if client has active loan
	}>;
	onDayClick?: (dayData: {
		day: number;
		paid: boolean;
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean;
		isInDebt?: boolean;
	}) => void;
	onSaverClick?: (saverId: string) => void;
	showHeader?: boolean;
	saverName?: string;
	headerOnly?: boolean;
	saver?: Saver;
	selectedMonth?: string;
}

const MonthCalendarGrid = memo(function MonthCalendarGrid({
	days,
	onDayClick,
	onSaverClick: _onSaverClick,
	showHeader = false,
	saverName,
	headerOnly = false,
	saver: _saver,
	selectedMonth: _selectedMonth,
}: MonthCalendarGridProps) {
	const weekDays = useMemo(() => ["S", "T", "Q", "Q", "S", "S", "D"], []);

	// Calculate the starting weekday based on the selected month
	let startDayIndex = 0; // Default to Sunday (index 0)
	if (_selectedMonth) {
		// Parse month string like "Maio 2024" or "May 2024"
		const monthNames = {
			Jan: 0,
			Janeiro: 0,
			Fev: 1,
			Fevereiro: 1,
			Mar: 2,
			Março: 2,
			Marco: 2,
			Abr: 3,
			Abril: 3,
			Mai: 4,
			Maio: 4,
			May: 4,
			Jun: 5,
			Junho: 5,
			Jul: 6,
			Julho: 6,
			Ago: 7,
			Agosto: 7,
			Set: 8,
			Setembro: 8,
			Out: 9,
			Outubro: 9,
			Nov: 10,
			Novembro: 10,
			Dez: 11,
			Dezembro: 11,
		};

		const parts = _selectedMonth.split(" ");
		const monthPart = parts[0];
		const yearPart = parts[1] ? parseInt(parts[1], 10) : 2024;

		const monthIndex = monthNames[monthPart as keyof typeof monthNames];
		if (monthIndex !== undefined) {
			// Get the day of the week for day 1 of the selected month
			const firstDay = new Date(yearPart, monthIndex, 1);
			startDayIndex = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
		}
	}

	// Repeat week days to cover 30 days, starting from the correct day
	const repeatedWeekDays = useMemo(
		() =>
			Array.from({ length: 30 }, (_, i) => weekDays[(startDayIndex + i) % 7]),
		[startDayIndex, weekDays],
	);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="grid grid-cols-[repeat(30,minmax(15px,1fr))] gap-0.5 justify-center w-full">
				{showHeader &&
					days.map((dayData, i) => (
						<div
							key={`header-${dayData.day}`}
							className="flex flex-col items-center justify-center h-5 mb-0.5"
						>
							<span className="text-[6px] sm:text-[7px] leading-tight text-center uppercase text-slate-400 font-medium">
								{repeatedWeekDays[i]}
							</span>
							<span className="text-[6px] sm:text-[7px] leading-tight text-center text-slate-400 font-medium">
								{dayData.day}
							</span>
						</div>
					))}
				{!headerOnly &&
					days.map((dayData) => (
						<button
							key={dayData.day}
							type="button"
							className={cn(
								"w-3 h-3 sm:w-4 sm:h-4 rounded-sm border cursor-pointer transition-all hover:scale-110 hover:shadow-md relative group mx-auto flex items-center justify-center",
								dayData.paid && dayData.isDebtPayment
									? "border-amber-300 bg-amber-500 hover:bg-amber-600"
									: dayData.paid
										? "border-emerald-300 bg-emerald-500 hover:bg-emerald-600"
										: "border-slate-200 bg-slate-50 hover:bg-slate-100",
							)}
							onClick={() => onDayClick?.(dayData)}
						>
							{dayData.paid && (
								<Check size={8} className="text-white font-bold" />
							)}
							{/* Beautiful Tooltip - Tonal Layering style consistent with step-1 */}
							<div
								className={cn(
									"absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 sm:px-3 py-2 sm:py-2.5 text-[10px] sm:text-xs rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] w-32 sm:w-40 pointer-events-none border bg-white",
									dayData.paid && dayData.isDebtPayment
										? "border-amber-100"
										: dayData.paid
											? "border-emerald-100"
											: "border-slate-200",
								)}
							>
								<div className="font-semibold text-gray-900 mb-1 text-[10px] sm:text-xs">
									Dia {dayData.day}
								</div>
								<div className="text-gray-600 text-[9px] sm:text-[10px]">
									{saverName}
								</div>
								<div
									className={cn(
										"mt-1 font-medium text-[9px] sm:text-[10px]",
										dayData.paid && dayData.isDebtPayment
											? "text-amber-700"
											: dayData.paid
												? "text-emerald-700"
												: "text-slate-600",
									)}
								>
									{dayData.paid && dayData.isDebtPayment
										? `Pagamento de Dívida: ${dayData.amount || 0} MZN`
										: dayData.paid
											? `Depósito: ${dayData.amount || 0} MZN`
											: "Não Depositado"}
								</div>
								{dayData.collector && (
									<div className="text-[8px] sm:text-[9px] text-gray-500 mt-1">
										Cobrador: {dayData.collector}
									</div>
								)}
								{/* Arrow indicativa com cores combinantes */}
								<div
									className={cn(
										"absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white border-r border-b rotate-45",
										dayData.paid && dayData.isDebtPayment
											? "border-amber-100"
											: dayData.paid
												? "border-emerald-100"
												: "border-slate-200",
									)}
								/>
							</div>
						</button>
					))}
			</div>
		</div>
	);
});

// SaversCalendarView Component
interface SaversCalendarViewProps {
	savers: Saver[];
	onRowDoubleClick?: (saver: Saver) => void;
	selectedMonth: string;
	onMonthChange: (month: string) => void;
	onDayClick?: (
		saver: Saver,
		dayData: {
			day: number;
			paid: boolean;
			amount?: number;
			collector?: string;
			isDebtPayment?: boolean;
			isInDebt?: boolean;
		},
	) => void;
	onDepositClick?: (saver: Saver) => void;
	onLoanClick?: (saver: Saver) => void;
	onSaverClick?: (saverId: string) => void;
	canCloseCycle?: boolean;
}

function SaversCalendarView({
	savers,
	selectedMonth,
	onMonthChange,
	onDayClick,
	onDepositClick,
	onLoanClick,
	onSaverClick,
	canCloseCycle = false,
}: SaversCalendarViewProps) {
	const totalCommission = savers.reduce((sum, s) => sum + s.dailyAmount, 0);
	const [visibleCount, setVisibleCount] = useState(25);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const months = [
		"Jan 2024",
		"Fev 2024",
		"Março 2024",
		"Abril 2024",
		"Maio 2024",
	];

	const visibleSavers = savers.slice(0, visibleCount);
	const hasMore = visibleCount < savers.length;

	const loadMore = useCallback(() => {
		if (isLoadingMore || !hasMore) return;
		setIsLoadingMore(true);
		setTimeout(() => {
			setVisibleCount((prev) => Math.min(prev + 25, savers.length));
			setIsLoadingMore(false);
		}, 500);
	}, [isLoadingMore, hasMore, savers.length]);

	useEffect(() => {
		const container = tableContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = container;
			if (scrollHeight - scrollTop - clientHeight < 100 && hasMore) {
				loadMore();
			}
		};

		container.addEventListener("scroll", handleScroll);
		return () => container.removeEventListener("scroll", handleScroll);
	}, [hasMore, loadMore]);

	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
			{/* Month Selector & Filters */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
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
					<button
						type="button"
						className="flex items-center space-x-2 px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
					>
						<Filter size={16} />
						<span className="text-xs font-semibold">Filtros</span>
					</button>
					<button
						type="button"
						className="flex items-center space-x-2 px-3 py-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
					>
						<Grid size={16} />
						<span className="text-xs font-semibold">Expandir Vista</span>
					</button>
				</div>
			</div>

			{/* Calendar Table */}
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
				<div
					ref={tableContainerRef}
					className="overflow-x-auto max-h-[600px] overflow-y-auto"
				>
					<table className="w-full text-left border-collapse">
						<thead className="bg-slate-50 border-b border-slate-200">
							<tr>
								<th className="px-1 py-0.5 text-[10px] text-slate-500 font-semibold min-w-[120px]">
									TICANTE
								</th>
								<th className="px-1 py-0.5 text-[10px] text-slate-500 font-semibold min-w-[60px] text-right">
									DIÁRIO
								</th>
								<th className="px-1 py-0.5 text-[10px] text-slate-500 font-semibold w-full">
									<MonthCalendarGrid
										days={Array.from({ length: 30 }, (_, i) => ({
											day: i + 1,
											paid: false,
										}))}
										showHeader={true}
										headerOnly={true}
										selectedMonth={selectedMonth}
									/>
								</th>
								<th className="px-1 py-0.5 text-[10px] text-slate-500 font-semibold min-w-[80px] text-right">
									TOTAL
								</th>
								<th className="px-1 py-0.5 text-[10px] text-slate-500 font-semibold min-w-[70px]">
									ESTADO
								</th>
								<th className="px-1 py-0.5 text-[10px] text-slate-500 font-semibold min-w-[70px]">
									AÇÕES
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200">
							{visibleSavers.map((saver) => (
								<tr
									key={saver.id}
									className="hover:bg-slate-50 transition-colors border-b border-slate-200/50"
								>
									<td className="px-1 py-0.5">
										{/* CALENDAR VIEW - Saver Name Click Navigation to Details */}
										<div className="flex items-center gap-1">
											<span className="font-mono text-[9px] text-slate-400 w-8 shrink-0">
												{saver.alphanumericId || String(saver.cardNumber)}
											</span>
											<button
												type="button"
												className="font-bold text-xs text-slate-900 truncate flex-1 cursor-pointer hover:text-emerald-600 hover:underline transition-colors bg-transparent border-none p-0 text-left"
												onClick={() => {
													console.log(
														"Calendar name click - navigating to saver-details for:",
														saver.id,
													);
													onSaverClick?.(saver.id);
												}}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														e.preventDefault();
														onSaverClick?.(saver.id);
													}
												}}
											>
												{saver.name}
											</button>
										</div>
									</td>
									<td className="px-1 py-0.5 text-right">
										<span className="font-mono text-[10px] font-semibold text-slate-600">
											{saver.dailyAmount}
										</span>
									</td>
									<td className="px-2 py-0.5">
										<MonthCalendarGrid
											days={saver.paymentDays || []}
											onDayClick={(dayData) => onDayClick?.(saver, dayData)}
											onSaverClick={onSaverClick}
											showHeader={false}
											saverName={saver.name}
											saver={saver}
											selectedMonth={selectedMonth}
										/>
									</td>
									<td className="px-1 py-0.5 text-right">
										<div className="flex flex-col items-end">
											<span className="font-mono text-xs font-bold text-slate-900 leading-none">
												{saver.totalSaved.toLocaleString()}
											</span>
											<span className="text-[8px] text-slate-400 font-medium">
												MZN
											</span>
										</div>
									</td>
									<td className="px-1 py-0.5">
										<div className="flex gap-0.5">
											{saver.status === "active" && <ActiveBadge />}
											{saver.status === "in_debt" && <DebtBadge />}
											{saver.status === "inactive" && <InactiveBadge />}
										</div>
									</td>
									<td className="px-1 py-0.5">
										{/* CALENDAR VIEW - QuickActionMenu "Ver Detalhes" Navigation */}
										<QuickActionMenu
											actions={[
												{
													id: "view-details",
													label: "Ver Detalhes",
													onClick: () => {
														console.log(
															"Calendar QuickActionMenu - navigating to saver-details for:",
															saver.id,
														);
														// Navigate to saver-details page with saver ID
														// setTimeout ensures menu closes before navigation
														setTimeout(() => {
															onSaverClick?.(saver.id);
														}, 50);
													},
												},
												{
													id: "deposit",
													label: "Registar Depósito",
													onClick: () => onDepositClick?.(saver),
												},
												{
													id: "loan",
													label: "Solicitar Empréstimo",
													onClick: () => onLoanClick?.(saver),
												},
												...(saver.status === "active" && canCloseCycle
													? [
															{
																id: "close-cycle",
																label: "Fechar Ciclo",
																onClick: () => {
																	setSelectedSaverForClosure(saver);
																	setShowCycleClosureModal(true);
																},
															},
														]
													: []),
											]}
										/>
									</td>
								</tr>
							))}
							{isLoadingMore && (
								<tr>
									<td colSpan={6} className="px-4 py-3 text-center">
										<div className="flex items-center justify-center gap-2 text-xs text-slate-500">
											<div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
											<span>Carregando mais...</span>
										</div>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{/* Totals Footer */}
				<div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-slate-50 border-t border-slate-200">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold">
							<div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 rounded-lg">
								<span className="text-emerald-700">Colecção do Dia:</span>
								<span className="text-emerald-900 font-bold">
									{savers
										.reduce((sum, s) => sum + (s.totalSaved || 0), 0)
										.toLocaleString()}{" "}
									MZN
								</span>
							</div>
							<div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 rounded-lg">
								<span className="text-emerald-700">Total Comissão:</span>
								<span className="text-emerald-900 font-bold">
									{totalCommission.toLocaleString()} MZN
								</span>
							</div>
							<div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 rounded-lg">
								<span className="text-red-700">Total Empréstimos:</span>
								<span className="text-red-900 font-bold">
									{savers
										.reduce((sum, s) => sum + (s.totalLoans || 0), 0)
										.toLocaleString()}{" "}
									MZN
								</span>
							</div>
							<div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 rounded-lg">
								<span className="text-emerald-700">Total Juros:</span>
								<span className="text-emerald-900 font-bold">
									{savers
										.reduce((sum, s) => sum + (s.totalInterest || 0), 0)
										.toLocaleString()}{" "}
									MZN
								</span>
							</div>
						</div>
						<div className="flex items-center gap-3 text-[10px] font-semibold">
							<div className="flex items-center gap-1.5 px-2 py-1 bg-slate-200 rounded-lg">
								<span className="text-slate-600">Total Ticantes:</span>
								<span className="text-slate-900 font-bold">
									{savers.length}
								</span>
							</div>
							<div className="flex items-center gap-1.5 px-2 py-1 bg-slate-200 rounded-lg">
								<span className="text-slate-600">Total Poupado:</span>
								<span className="text-slate-900 font-bold">
									{savers
										.reduce((sum, s) => sum + (s.totalSaved || 0), 0)
										.toLocaleString()}{" "}
									MZN
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
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
		registrationDate: "2024-09-15",
		totalSaved: 7500,
		daysInCycle: 15,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A01",
		totalLoans: 5000,
		totalInterest: 750,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 8;
			return {
				day,
				paid,
				amount: paid ? 500 : 0,
				collector: paid ? "Arsénio Matusse" : undefined,
			};
		}),
	},
	{
		id: "2",
		cardNumber: 1002,
		name: "Ana Vilanculos",
		dailyAmount: 250,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-01",
		totalSaved: 2500,
		currentDebt: 1500,
		daysInCycle: 5,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A02",
		totalLoans: 3000,
		totalInterest: 450,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 5 && i % 2 === 0;
			const isDebtPayment = i === 2;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 250 : 0,
				collector: paid ? "Célia Mondlane" : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "3",
		cardNumber: 1003,
		name: "Bento Sitoe",
		dailyAmount: 300,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-10",
		totalSaved: 6600,
		daysInCycle: 22,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A03",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 22,
			amount: i < 22 ? 300 : 0,
			collector: i < 22 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "4",
		cardNumber: 1004,
		name: "Eduarda Langa",
		dailyAmount: 1000,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-10",
		totalSaved: 12000,
		daysInCycle: 12,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A04",
		totalLoans: 8000,
		totalInterest: 1200,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 12;
			return {
				day,
				paid,
				amount: paid ? 1000 : 0,
				collector: paid ? "Arsénio Matusse" : undefined,
			};
		}),
	},
	{
		id: "5",
		cardNumber: 1005,
		name: "Geraldo Mucavele",
		dailyAmount: 150,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-05",
		totalSaved: 4500,
		daysInCycle: 30,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A05",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 28,
			amount: i < 28 ? 150 : 0,
			collector: i < 28 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "6",
		cardNumber: 1006,
		name: "Isabel Tembe",
		dailyAmount: 200,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-15",
		totalSaved: 5000,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A06",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 200 : 0,
			collector: i < 25 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "7",
		cardNumber: 1007,
		name: "João Machava",
		dailyAmount: 400,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-20",
		totalSaved: 8000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A07",
		totalLoans: 6000,
		totalInterest: 900,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 12,
			amount: i < 12 ? 400 : 0,
			collector: i < 12 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "8",
		cardNumber: 1008,
		name: "Luisa Macamo",
		dailyAmount: 150,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-01",
		totalSaved: 3600,
		daysInCycle: 24,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A08",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 24,
			amount: i < 24 ? 150 : 0,
			collector: i < 24 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "9",
		cardNumber: 1009,
		name: "Mário Macie",
		dailyAmount: 750,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-12",
		totalSaved: 15000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A09",
		totalLoans: 10000,
		totalInterest: 1500,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 15,
			amount: i < 15 ? 750 : 0,
			collector: i < 15 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "10",
		cardNumber: 1010,
		name: "Noémia Macuácua",
		dailyAmount: 180,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-20",
		totalSaved: 3600,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A10",
		totalLoans: 2000,
		totalInterest: 300,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 15,
			amount: i < 15 ? 180 : 0,
			collector: i < 15 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "11",
		cardNumber: 1011,
		name: "Paulo Bila",
		dailyAmount: 250,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-05",
		totalSaved: 6250,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A11",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 250 : 0,
			collector: i < 25 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "12",
		cardNumber: 1012,
		name: "Quiteria Zunguza",
		dailyAmount: 350,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-25",
		totalSaved: 8750,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A12",
		totalLoans: 4000,
		totalInterest: 600,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 350 : 0,
			collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "13",
		cardNumber: 1013,
		name: "Rui Chambule",
		dailyAmount: 120,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-10",
		totalSaved: 3000,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A13",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 120 : 0,
			collector: i < 25 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "14",
		cardNumber: 1014,
		name: "Sofia Munguambe",
		dailyAmount: 500,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-08",
		totalSaved: 12500,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A14",
		totalLoans: 7000,
		totalInterest: 1050,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 19,
			amount: i < 19 ? 500 : 0,
			collector: i < 19 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "15",
		cardNumber: 1015,
		name: "Tomás Nhapule",
		dailyAmount: 220,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-15",
		totalSaved: 4400,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A15",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 220 : 0,
			collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "16",
		cardNumber: 1016,
		name: "Ussene Sitoe",
		dailyAmount: 175,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-05",
		totalSaved: 4200,
		daysInCycle: 24,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A16",
		totalLoans: 1000,
		totalInterest: 150,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 175 : 0,
			collector: i < 18 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "17",
		cardNumber: 1017,
		name: "Verónica Muale",
		dailyAmount: 300,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-18",
		totalSaved: 7500,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A17",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 300 : 0,
			collector: i < 25 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "18",
		cardNumber: 1018,
		name: "William Mujojo",
		dailyAmount: 275,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-25",
		totalSaved: 6600,
		daysInCycle: 24,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A18",
		totalLoans: 2500,
		totalInterest: 375,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 275 : 0,
			collector: i < 18 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "19",
		cardNumber: 1019,
		name: "Xavier Massingue",
		dailyAmount: 225,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-20",
		totalSaved: 4500,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A19",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 225 : 0,
			collector: i < 20 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "20",
		cardNumber: 1020,
		name: "Yolanda Zongo",
		dailyAmount: 125,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-30",
		totalSaved: 3125,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A20",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 125 : 0,
			collector: i < 25 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "21",
		cardNumber: 1021,
		name: "Zacarias Mabjaia",
		dailyAmount: 1500,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-22",
		totalSaved: 30000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A21",
		totalLoans: 15000,
		totalInterest: 2250,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 15,
			amount: i < 15 ? 1500 : 0,
			collector: i < 15 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "22",
		cardNumber: 1022,
		name: "Amélia Júnior",
		dailyAmount: 190,
		organizationId: "org-1",
		isActive: false,
		registrationDate: "2024-09-15",
		totalSaved: 5700,
		daysInCycle: 30,
		status: "inactive",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A22",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 30,
			amount: i < 30 ? 190 : 0,
			collector: i < 30 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "23",
		cardNumber: 1023,
		name: "Benedito Cossa",
		dailyAmount: 160,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-28",
		totalSaved: 3200,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A23",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 17,
			amount: i < 17 ? 160 : 0,
			collector: i < 17 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "24",
		cardNumber: 1024,
		name: "Catarina Jóia",
		dailyAmount: 235,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-25",
		totalSaved: 4700,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A24",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 235 : 0,
			collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "25",
		cardNumber: 1025,
		name: "Domingos Mondlane",
		dailyAmount: 450,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-14",
		totalSaved: 11250,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A25",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 450 : 0,
			collector: i < 20 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "26",
		cardNumber: 1026,
		name: "Esther Nhleko",
		dailyAmount: 1800,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-01",
		totalSaved: 36000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A26",
		totalLoans: 20000,
		totalInterest: 3000,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 16,
			amount: i < 16 ? 1800 : 0,
			collector: i < 16 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "27",
		cardNumber: 1027,
		name: "Francisco Nkuna",
		dailyAmount: 320,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-28",
		totalSaved: 6400,
		currentDebt: 1600,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A27",
		totalLoans: 5000,
		totalInterest: 750,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 12 && i % 3 === 0;
			const isDebtPayment = i < 5;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 320 : 0,
				collector: paid ? "Arsénio Matusse" : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "28",
		cardNumber: 1028,
		name: "Graça Machel",
		dailyAmount: 450,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-12",
		totalSaved: 11250,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A28",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 23,
			amount: i < 23 ? 450 : 0,
			collector: i < 23 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "29",
		cardNumber: 1029,
		name: "Henrique Chipande",
		dailyAmount: 175,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-08",
		totalSaved: 4200,
		daysInCycle: 24,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A29",
		totalLoans: 800,
		totalInterest: 120,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 175 : 0,
			collector: i < 18 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "30",
		cardNumber: 1030,
		name: "Ilda Moiane",
		dailyAmount: 2000,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-05",
		totalSaved: 40000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A30",
		totalLoans: 25000,
		totalInterest: 3750,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 14,
			amount: i < 14 ? 2000 : 0,
			collector: i < 14 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "31",
		cardNumber: 1031,
		name: "Jorge Macamo",
		dailyAmount: 280,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-10",
		totalSaved: 5600,
		currentDebt: 1400,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A31",
		totalLoans: 3500,
		totalInterest: 525,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 10 && i % 2 === 0;
			const isDebtPayment = i < 4;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 280 : 0,
				collector: paid ? "Filipe Nyusi Jr." : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "32",
		cardNumber: 1032,
		name: "Kátia Nhampossa",
		dailyAmount: 1500,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-22",
		totalSaved: 30000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A32",
		totalLoans: 12000,
		totalInterest: 1800,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 1500 : 0,
			collector: i < 18 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "33",
		cardNumber: 1033,
		name: "Lídia Sitoe",
		dailyAmount: 190,
		organizationId: "org-1",
		isActive: false,
		registrationDate: "2024-09-18",
		totalSaved: 5700,
		daysInCycle: 30,
		status: "inactive",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A33",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 30,
			amount: i < 30 ? 190 : 0,
			collector: i < 30 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "34",
		cardNumber: 1034,
		name: "Moisés Muendane",
		dailyAmount: 160,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-30",
		totalSaved: 3200,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A34",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 15,
			amount: i < 15 ? 160 : 0,
			collector: i < 15 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "35",
		cardNumber: 1035,
		name: "Norberto Macuácua",
		dailyAmount: 235,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-03",
		totalSaved: 4700,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A35",
		totalLoans: 1500,
		totalInterest: 225,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 16,
			amount: i < 16 ? 235 : 0,
			collector: i < 16 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "36",
		cardNumber: 1036,
		name: "Olívia Chissano",
		dailyAmount: 1200,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-11",
		totalSaved: 24000,
		currentDebt: 6000,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A36",
		totalLoans: 15000,
		totalInterest: 2250,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 12;
			const isDebtPayment = i < 6;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 1200 : 0,
				collector: paid ? "Arsénio Matusse" : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "37",
		cardNumber: 1037,
		name: "Pedro Munguambe",
		dailyAmount: 375,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-15",
		totalSaved: 7500,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A37",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 19,
			amount: i < 19 ? 375 : 0,
			collector: i < 19 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "38",
		cardNumber: 1038,
		name: "Quitéria Nkuna",
		dailyAmount: 250,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-18",
		totalSaved: 6250,
		daysInCycle: 25,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A38",
		totalLoans: 3000,
		totalInterest: 450,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 250 : 0,
			collector: i < 20 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "39",
		cardNumber: 1039,
		name: "Rogério Sitoe",
		dailyAmount: 145,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-22",
		totalSaved: 2900,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A39",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 145 : 0,
			collector: i < 18 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "40",
		cardNumber: 1040,
		name: "Sónia Macamo",
		dailyAmount: 650,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-26",
		totalSaved: 13000,
		currentDebt: 3250,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A40",
		totalLoans: 8000,
		totalInterest: 1200,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 10 && i % 2 === 0;
			const isDebtPayment = i < 5;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 650 : 0,
				collector: paid ? "Filipe Nyusi Jr." : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "41",
		cardNumber: 1041,
		name: "Tomé Mondlane",
		dailyAmount: 210,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-05",
		totalSaved: 4200,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A41",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 17,
			amount: i < 17 ? 210 : 0,
			collector: i < 17 ? "Célia Mondlane" : undefined,
		})),
	},
	{
		id: "42",
		cardNumber: 1042,
		name: "Ursula Machel",
		dailyAmount: 1750,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-03",
		totalSaved: 35000,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A42",
		totalLoans: 22000,
		totalInterest: 3300,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 16,
			amount: i < 16 ? 1750 : 0,
			collector: i < 16 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "43",
		cardNumber: 1043,
		name: "Vasco Nhleko",
		dailyAmount: 185,
		organizationId: "org-1",
		isActive: false,
		registrationDate: "2024-09-20",
		totalSaved: 5550,
		daysInCycle: 30,
		status: "inactive",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A43",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 30,
			amount: i < 30 ? 185 : 0,
			collector: i < 30 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "44",
		cardNumber: 1044,
		name: "Wilhelmina Zunguza",
		dailyAmount: 330,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-25",
		totalSaved: 6600,
		currentDebt: 1650,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A44",
		totalLoans: 4000,
		totalInterest: 600,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 8 && i % 2 === 0;
			const isDebtPayment = i < 4;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 330 : 0,
				collector: paid ? "Célia Mondlane" : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "45",
		cardNumber: 1045,
		name: "Xavier Chambule",
		dailyAmount: 290,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-12",
		totalSaved: 5800,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A45",
		totalLoans: 1200,
		totalInterest: 180,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 290 : 0,
			collector: i < 18 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "46",
		cardNumber: 1046,
		name: "Yara Mucavele",
		dailyAmount: 165,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-20",
		totalSaved: 3300,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A46",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 19,
			amount: i < 19 ? 165 : 0,
			collector: i < 19 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "47",
		cardNumber: 1047,
		name: "Zélia Tembe",
		dailyAmount: 1100,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-09-07",
		totalSaved: 22000,
		currentDebt: 5500,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A47",
		totalLoans: 13000,
		totalInterest: 1950,
		paymentDays: Array.from({ length: 30 }, (_, i) => {
			const day = i + 1;
			const paid = i < 11;
			const isDebtPayment = i < 5;
			const isInDebt = true;
			return {
				day,
				paid,
				amount: paid ? 1100 : 0,
				collector: paid ? "Célia Mondlane" : undefined,
				isDebtPayment,
				isInDebt,
			};
		}),
	},
	{
		id: "48",
		cardNumber: 1048,
		name: "Abel Matusse",
		dailyAmount: 255,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-10-14",
		totalSaved: 5100,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A48",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 19,
			amount: i < 19 ? 255 : 0,
			collector: i < 19 ? "Arsénio Matusse" : undefined,
		})),
	},
	{
		id: "49",
		cardNumber: 1049,
		name: "Beatriz Langa",
		dailyAmount: 425,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-11-28",
		totalSaved: 8500,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A49",
		totalLoans: 3500,
		totalInterest: 525,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 17,
			amount: i < 17 ? 425 : 0,
			collector: i < 17 ? "Filipe Nyusi Jr." : undefined,
		})),
	},
	{
		id: "50",
		cardNumber: 1050,
		name: "Constantino Machava",
		dailyAmount: 195,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-12-25",
		totalSaved: 3900,
		daysInCycle: 20,
		status: "active",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A50",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 18,
			amount: i < 18 ? 195 : 0,
			collector: i < 18 ? "Célia Mondlane" : undefined,
		})),
	},
];

function SaversManagement() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("Maio 2024");
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
	const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
	const [isDayActionModalOpen, setIsDayActionModalOpen] = useState(false);
	const [isSaverPopupOpen, setIsSaverPopupOpen] = useState(false);
	const [showCycleClosureModal, setShowCycleClosureModal] = useState(false);
	const [selectedSaver, setSelectedSaver] = useState<Saver | null>(null);
	const [selectedSaverForClosure, setSelectedSaverForClosure] =
		useState<Saver | null>(null);
	const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
	const [viewMode, setViewMode] = useState<"standard" | "calendar">("standard");
	const [selectedDayData, setSelectedDayData] = useState<{
		day: number;
		saverName: string;
		saverDailyAmount: number;
		status:
			| "paid"
			| "partial"
			| "unpaid"
			| "deleted"
			| "not_deposited"
			| "in_debt";
		amount?: number;
		collector?: string;
	} | null>(null);

	const { data: saversData, isLoading } = useSavers({ page: 1, pageSize: 20 });
	const savers = enrichSaversWithAlphanumericIds(
		saversData?.data || mockSavers,
	);

	const statusFilters = [
		{ id: "active", label: "Activo" },
		{ id: "inactive", label: "Inativo" },
	];

	const filteredSavers = savers.filter((saver) => {
		if (selectedStatuses.length === 0) return true;
		return selectedStatuses.some((status) => {
			if (status === "active") return saver.status === "active";
			if (status === "inactive") return saver.status === "inactive";
			return false;
		});
	});

	const sidebarItems = getDashboardSidebar(location.pathname, user?.role);

	const totalCommission = savers.reduce((sum, s) => sum + s.dailyAmount, 0);

	const handleCycleClosure = (data: {
		transferDebtDays: boolean;
		reactivateNextCycle: boolean;
		sendNotification: boolean;
	}) => {
		if (!selectedSaverForClosure) return;

		// Mock implementation - in real app, this would call an API
		console.log("Closing cycle for saver:", selectedSaverForClosure.id, data);

		// Show success toast
		let message = `Ciclo fechado com sucesso para ${selectedSaverForClosure.name}`;
		if (data.transferDebtDays && selectedSaverForClosure.currentDebt > 0) {
			const debtDays = selectedSaverForClosure.paymentDays?.filter(
				(pd) => pd.paid && pd.isDebtPayment,
			).length;
			message += `. ${debtDays} dias de dívida transferidos para o próximo ciclo`;
		}
		toast.success(message);

		// Close modal
		setShowCycleClosureModal(false);
		setSelectedSaverForClosure(null);
	};

	const kpiData = [
		{
			title: "Total Ticantes",
			value: String(savers.length),
			subtext: "Total registado",
			borderColor: "success" as const,
		},
		{
			title: "Total Comissão",
			value: `${totalCommission.toLocaleString()} MZN`,
			subtext: "Soma dos diários",
			borderColor: "info" as const,
		},
		{
			title: "Total Sob Gestão",
			value: "450.000 MZN",
			subtext: "+12.5% vs mês anterior",
			borderColor: "primary" as const,
		},
		{
			title: "Empréstimos Activos",
			value: "8.000 MZN",
			subtext: "3 empréstimos activos",
			borderColor: "warning" as const,
		},
		{
			title: "Dívida de Empréstimos",
			value: `${String(savers.reduce((sum, s) => sum + (s.currentDebt || 0), 0).toLocaleString())} MZN`,
			subtext: `${savers.filter((s) => s.status === "in_debt").length} clientes com dívida`,
			borderColor: "error" as const,
		},
	];

	const columns = [
		{
			key: "cardNumber",
			header: "TICANTE",
			render: (value: unknown, row: Saver) => (
				<div className="flex flex-col leading-tight">
					{/* STANDARD TABLE - Saver Name Click Navigation to Details */}
					<div className="flex items-center gap-1">
						<span className="font-mono text-[9px] text-slate-400">
							{String(value)}
						</span>
						<span
							className={cn(
								"w-1.5 h-1.5 rounded-full",
								row.status === "active" ? "bg-emerald-500" : "bg-red-500",
							)}
						/>
						<button
							type="button"
							className="font-bold text-xs text-slate-900 truncate cursor-pointer hover:text-emerald-600 hover:underline transition-colors bg-transparent border-none p-0 text-left"
							onClick={() => {
								console.log(
									"Standard table name click - navigating to saver-details for:",
									row.id,
								);
								navigate({
									to: "/dashboard/saver-details",
									search: { id: row.id },
								});
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									navigate({
										to: "/dashboard/saver-details",
										search: { id: row.id },
									});
								}
							}}
						>
							{row.name}
						</button>
					</div>
					<span className="text-[8px] text-slate-400 font-medium">
						{row.dailyAmount}
					</span>
				</div>
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
			header: "DÍVIDA DE EMPRÉSTIMO",
			render: (value: unknown) => (
				<span
					className={cn(
						"text-sm",
						Number(value) > 0 ? "text-amber-600" : "text-slate-500",
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

	// STANDARD TABLE - Expanded Row "Ver Detalhes" Navigation
	const renderExpandedRow = (row: Saver) => (
		<ExpandableRowContent
			title={`Detalhes de ${row.name}`}
			onViewFullDetails={() => {
				console.log(
					"Standard table expanded row - navigating to saver-details for:",
					row.id,
				);
				navigate({ to: "/dashboard/saver-details", search: { id: row.id } });
			}}
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
						<span>Dívida de Empréstimo</span>
					</div>
					<p
						className={cn(
							"text-lg font-bold",
							row.currentDebt > 0 ? "text-amber-600" : "text-slate-900",
						)}
					>
						{row.currentDebt > 0 ? row.currentDebt.toLocaleString() : "0"} MZN
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
						onClick={(e) => {
							e.stopPropagation();
							setSelectedSaver(row);
							setIsSaverPopupOpen(true);
						}}
					>
						Ver Detalhes
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
								<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
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
												setSelectedStatuses((prev) =>
													prev.filter((s) => s !== id),
												);
											}}
										/>
									</div>
								</div>
							</div>

							{/* KPI Cards */}
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								{kpiData.map((kpi) => (
									<PrototypeKPICard key={kpi.title} {...kpi} />
								))}
							</div>

							{/* Main Content */}
							<div className="grid grid-cols-12 gap-4">
								{/* Savers Table */}
								<div className="col-span-12">
									{isLoading ? (
										<div className="p-4">
											<LoadingSkeleton variant="table" />
										</div>
									) : filteredSavers.length === 0 ? (
										<div className="p-4">
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
								</div>
							</div>
						</>
					) : (
						<SaversCalendarView
							savers={filteredSavers}
							onRowDoubleClick={(saver) => {
								setSelectedSaver(saver);
								setIsSaverPopupOpen(true);
							}}
							selectedMonth={selectedMonth}
							onMonthChange={setSelectedMonth}
							onDayClick={(saver, dayData) => {
								setSelectedDayData({
									day: dayData.day,
									saverName: saver.name,
									saverDailyAmount: saver.dailyAmount,
									status: dayData.paid
										? dayData.isDebtPayment
											? "partial"
											: "paid"
										: "not_deposited",
									amount: dayData.amount,
									collector: dayData.collector,
								});
								setIsDayActionModalOpen(true);
							}}
							onDepositClick={(saver) => {
								setSelectedSaver(saver);
								setIsDepositModalOpen(true);
							}}
							onLoanClick={(saver) => {
								setSelectedSaver(saver);
								setIsLoanModalOpen(true);
							}}
							onSaverClick={(saverId) => {
								navigate({
									to: "/dashboard/saver-details",
									search: { id: saverId },
								});
							}}
							canCloseCycle={user?.isAdmin || user?.isCollector}
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
				dailyAmount={selectedSaver?.dailyAmount}
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
				dailyDepositAmount={selectedSaver?.dailyAmount}
				currentSavings={selectedSaver?.totalSaved}
			/>

			<DayDetailPopup
				isOpen={isDayActionModalOpen}
				onClose={() => setIsDayActionModalOpen(false)}
				day={selectedDayData?.day || 1}
				month={selectedMonth}
				saverName={selectedDayData?.saverName || ""}
				saverDailyAmount={selectedDayData?.saverDailyAmount || 500}
				dayStatus={selectedDayData?.status || "not_deposited"}
				amount={selectedDayData?.amount}
				collector={selectedDayData?.collector}
				onDeposit={(data) => {
					toast.success(
						`Depósito de ${data.amount.toLocaleString()} MZN registrado com sucesso para ${selectedDayData?.saverName}`,
					);
					setIsDayActionModalOpen(false);
				}}
				onEdit={() => {
					toast.info("Funcionalidade de editar depósito em desenvolvimento");
				}}
				onDelete={() => {
					toast.success("Depósito eliminado com sucesso");
					setIsDayActionModalOpen(false);
				}}
			/>

			{/* Saver Details Popup */}
			{isSaverPopupOpen && selectedSaver && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					onClick={() => setIsSaverPopupOpen(false)}
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							setIsSaverPopupOpen(false);
						}
					}}
					role="dialog"
					aria-modal="true"
				>
					<div
						className="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full"
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => {
							e.stopPropagation();
						}}
						role="document"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
								<Eye size={24} className="text-emerald-600" />
							</div>
							<div>
								<h3 className="font-bold text-slate-900">
									{selectedSaver.name}
								</h3>
								<p className="text-sm text-slate-500">Ver detalhes completos</p>
							</div>
						</div>
						<Button
							className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
							onClick={() => {
								setIsSaverPopupOpen(false);
								if (selectedSaver?.id) {
									navigate({
										to: "/dashboard/saver-details",
										search: { id: selectedSaver.id },
									});
								}
							}}
						>
							Ver Detalhes
						</Button>
					</div>
				</div>
			)}

			{/* Individual Cycle Closure Modal */}
			{selectedSaverForClosure && (
				<IndividualCycleClosureModal
					isOpen={showCycleClosureModal}
					onClose={() => {
						setShowCycleClosureModal(false);
						setSelectedSaverForClosure(null);
					}}
					onSubmit={handleCycleClosure}
					saver={selectedSaverForClosure}
					currentMonth={selectedMonth}
				/>
			)}
		</DashboardLayout>
	);
}

import { createFileRoute, useNavigate, useLocation } from "@tanstack/react-router";
import {
	AlertCircle,
	Calendar,
	Check,
	ChevronDown,
	DollarSign,
	Eye,
	Filter,
	Grid,
	List,
	MoreVertical,
	Phone,
	Plus,
	TrendingUp,
	Users,
	Wallet,
} from "lucide-react";
import { memo, useMemo, useState } from "react";
import { toast } from "sonner";
import { DayDetailPopup } from "#/components/business/DayDetailPopup";
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
import { KPICard } from "#/components/ui/KPICard";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { ProgressCircle } from "#/components/ui/ProgressCircle";
import {
	ActiveBadge,
	DebtBadge,
	InactiveBadge,
} from "#/components/ui/StatusBadge";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { enrichSaversWithAlphanumericIds, useSavers } from "#/features/savers";
import type { Saver } from "#/features/savers/types";
import { cn } from "#/lib/design-system";

// MonthCalendarGrid Component
interface MonthCalendarGridProps {
	days: Array<{
		day: number;
		paid: boolean;
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean;
		isInDebt?: boolean;
	}>;
	onDayClick?: (dayData: {
		day: number;
		paid: boolean;
		amount?: number;
		collector?: string;
		isDebtPayment?: boolean;
		isInDebt?: boolean;
	}) => void;
	showHeader?: boolean;
	saverName?: string;
	headerOnly?: boolean;
	saver?: Saver;
	selectedMonth?: string;
}

const MonthCalendarGrid = memo(function MonthCalendarGrid({
	days,
	onDayClick,
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
									: dayData.paid && !dayData.isDebtPayment
										? "border-emerald-300 bg-emerald-500 hover:bg-emerald-600"
										: dayData.isInDebt
											? "border-red-200 bg-red-100 hover:bg-red-200"
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
										: dayData.paid && !dayData.isDebtPayment
											? "border-emerald-100"
											: dayData.isInDebt && !dayData.paid
												? "border-red-100"
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
										dayData.isDebtPayment
											? "text-amber-700"
											: dayData.isInDebt && !dayData.paid
												? "text-red-700"
												: dayData.paid
													? "text-emerald-700"
													: "text-slate-600",
									)}
								>
									{dayData.isDebtPayment
										? `Pagamento de Dívida: ${dayData.amount || 0} MZN`
										: dayData.isInDebt && !dayData.paid
											? "Em Dívida"
											: dayData.paid
												? `Depósito Normal: ${dayData.amount || 0} MZN`
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
										dayData.paid
											? "border-emerald-100"
											: dayData.isInDebt && !dayData.paid
												? "border-red-100"
												: dayData.isDebtPayment
													? "border-amber-100"
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

// CalendarKPIs Component
interface CalendarKPIsProps {
	totalSavers: number;
	totalCollected: string;
	inDebt: number;
	totalDebts: number;
	totalLoans: number;
	totalInterest: number;
	totalCommission: number;
}

function CalendarKPIs({
	totalSavers: _totalSavers,
	totalCollected,
	inDebt,
	totalDebts,
	totalLoans,
	totalInterest,
	totalCommission,
}: CalendarKPIsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-4">
			<div className="flex-1 min-w-[200px] bg-emerald-50 p-3 rounded-xl text-emerald-900 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">
						Colecção do Dia
					</h4>
					<p className="text-lg font-bold">{totalCollected}</p>
				</div>
				<div className="flex items-center text-emerald-500 font-bold text-[10px]">
					<TrendingUp size={14} className="mr-1" />
					+12.4%
				</div>
			</div>
			<div className="flex-1 min-w-[200px] bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
						Em Dívida
					</h4>
					<p className="text-lg font-bold text-red-600">{inDebt}</p>
				</div>
				<AlertCircle size={16} className="text-red-500 opacity-40" />
			</div>
			<div className="flex-1 min-w-[200px] bg-red-50 p-3 rounded-xl border border-red-200 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] text-red-500 uppercase tracking-widest font-semibold">
						Total Dívidas
					</h4>
					<p className="text-lg font-bold text-red-600">{totalDebts.toLocaleString()} MZN</p>
				</div>
				<AlertCircle size={16} className="text-red-500 opacity-40" />
			</div>
			<div className="flex-1 min-w-[200px] bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold">
						Total Comissão
					</h4>
					<p className="text-lg font-bold text-emerald-600">{totalCommission.toLocaleString()} MZN</p>
				</div>
				<DollarSign size={16} className="text-emerald-500 opacity-40" />
			</div>
			<div className="flex-1 min-w-[200px] bg-blue-50 p-3 rounded-xl border border-blue-200 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] text-blue-500 uppercase tracking-widest font-semibold">
						Total Empréstimos
					</h4>
					<p className="text-lg font-bold text-blue-600">{totalLoans.toLocaleString()} MZN</p>
				</div>
				<DollarSign size={16} className="text-blue-500 opacity-40" />
			</div>
			<div className="flex-1 min-w-[200px] bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-between group">
				<div>
					<h4 className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold">
						Total Juros
					</h4>
					<p className="text-lg font-bold text-amber-600">{totalInterest.toLocaleString()} MZN</p>
				</div>
				<TrendingUp size={16} className="text-amber-500 opacity-40" />
			</div>
		</div>
	);
}

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
}

function SaversCalendarView({
	savers,
	selectedMonth,
	onMonthChange,
	onDayClick,
	onDepositClick,
	onLoanClick,
}: SaversCalendarViewProps) {
	const totalCommission = savers.reduce((sum, s) => sum + s.dailyAmount, 0);

	const months = [
		"Jan 2024",
		"Fev 2024",
		"Março 2024",
		"Abril 2024",
		"Maio 2024",
	];

	return (
		<div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
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
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
				<div className="overflow-x-auto">
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
							{savers.map((saver) => (
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
													window.location.href = `/dashboard/saver-details?id=${saver.id}`;
												}}
												onKeyDown={(e) => {
													if (e.key === "Enter" || e.key === " ") {
														e.preventDefault();
														window.location.href = `/dashboard/saver-details?id=${saver.id}`;
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
											{saver.status === "inactive" && <InactiveBadge />}
											{saver.currentDebt > 0 && <DebtBadge />}
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
															window.location.href = `/dashboard/saver-details?id=${saver.id}`;
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
											]}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Legend */}
				<div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-slate-300 bg-emerald-500" />
						<span className="text-[10px] text-slate-600">Depósito Normal</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-amber-300 bg-amber-500" />
						<span className="text-[10px] text-slate-600">
							Pagamento de Dívida
						</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-red-200 bg-red-100" />
						<span className="text-[10px] text-slate-600">Em Dívida</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 rounded-sm border border-slate-200 bg-slate-50" />
						<span className="text-[10px] text-slate-600">Não Depositado</span>
					</div>
				</div>

				{/* Totals Footer */}
				<div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px] font-semibold text-slate-700">
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span className="text-slate-500">Total Comissão:</span>
							<span className="text-emerald-600">
								{totalCommission.toLocaleString()} MZN
							</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-slate-500">Total Dívidas:</span>
							<span className="text-red-600">
								{savers.reduce((sum, s) => sum + (s.currentDebt || 0), 0).toLocaleString()} MZN
							</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-slate-500">Total Empréstimos:</span>
							<span className="text-blue-600">
								{savers.reduce((sum, s) => sum + (s.totalLoans || 0), 0).toLocaleString()} MZN
							</span>
						</div>
						<div className="flex items-center gap-1">
							<span className="text-slate-500">Total Juros:</span>
							<span className="text-amber-600">
								{savers.reduce((sum, s) => sum + (s.totalInterest || 0), 0).toLocaleString()} MZN
							</span>
						</div>
					</div>
				</div>

				{/* Pagination */}
				<div className="p-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
					<p className="text-xs text-slate-500">
						A mostrar 1-{savers.length} de {savers.length} ticantes
					</p>
					<div className="flex space-x-1">
						<button
							type="button"
							className="p-1 rounded-lg hover:bg-slate-200 text-slate-400"
						>
							<ChevronDown size={16} className="rotate-90" />
						</button>
						<button
							type="button"
							className="w-8 h-8 rounded-lg bg-[#3391C2] text-white font-bold text-sm"
						>
							1
						</button>
						<button
							type="button"
							className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 font-bold text-sm"
						>
							2
						</button>
						<button
							type="button"
							className="w-8 h-8 rounded-lg hover:bg-slate-200 text-slate-500 font-bold text-sm"
						>
							3
						</button>
						<button
							type="button"
							className="p-1 rounded-lg hover:bg-slate-200 text-slate-400"
						>
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
				totalDebts={savers.reduce((sum, s) => sum + (s.currentDebt || 0), 0)}
				totalLoans={savers.reduce((sum, s) => sum + (s.totalLoans || 0), 0)}
				totalInterest={savers.reduce((sum, s) => sum + (s.totalInterest || 0), 0)}
				totalCommission={savers.reduce((sum, s) => sum + s.dailyAmount, 0)}
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
		totalLoans: 5000,
		totalInterest: 750,
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
		totalLoans: 3000,
		totalInterest: 450,
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
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A03",
		totalLoans: 0,
		totalInterest: 0,
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
		totalLoans: 8000,
		totalInterest: 1200,
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
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A05",
		totalLoans: 0,
		totalInterest: 0,
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
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A06",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 200 : 0,
			collector: i < 25 ? "Filipe Nyusi Jr." : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "7",
		cardNumber: 1007,
		name: "João Machava",
		dailyAmount: 400,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-20",
		totalSaved: 8000,
		currentDebt: 3200,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A07",
		totalLoans: 6000,
		totalInterest: 900,
		paymentDays: (() => {
			const debtDays = Math.floor(3200 / 400);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 12;
				const isDebtPayment = i < 4;
				const isInDebt = !paid && i < 12 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 400 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "8",
		cardNumber: 1008,
		name: "Luisa Macamo",
		dailyAmount: 150,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-03-01",
		totalSaved: 3600,
		currentDebt: 0,
		daysInCycle: 24,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A08",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 24,
			amount: i < 24 ? 150 : 0,
			collector: i < 24 ? "Célia Mondlane" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "9",
		cardNumber: 1009,
		name: "Mário Macie",
		dailyAmount: 750,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-12",
		totalSaved: 15000,
		currentDebt: 4500,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A09",
		totalLoans: 10000,
		totalInterest: 1500,
		paymentDays: (() => {
			const debtDays = Math.floor(4500 / 750);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 15;
				const isDebtPayment = i < 6;
				const isInDebt = !paid && i < 15 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 750 : 0,
					collector: paid ? "Filipe Nyusi Jr." : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "10",
		cardNumber: 1010,
		name: "Noémia Macuácua",
		dailyAmount: 180,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-20",
		totalSaved: 3600,
		currentDebt: 900,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A10",
		totalLoans: 2000,
		totalInterest: 300,
		paymentDays: (() => {
			const debtDays = Math.floor(900 / 180);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 15;
				const isDebtPayment = i < 3;
				const isInDebt = !paid && i < 15 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 180 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "11",
		cardNumber: 1011,
		name: "Paulo Bila",
		dailyAmount: 250,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-03-05",
		totalSaved: 6250,
		currentDebt: 0,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A11",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 250 : 0,
			collector: i < 25 ? "Célia Mondlane" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "12",
		cardNumber: 1012,
		name: "Quiteria Zunguza",
		dailyAmount: 350,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-25",
		totalSaved: 8750,
		currentDebt: 1750,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A12",
		totalLoans: 4000,
		totalInterest: 600,
		paymentDays: (() => {
			const debtDays = Math.floor(1750 / 350);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 20;
				const isDebtPayment = i < 5;
				const isInDebt = !paid && i < 20 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 350 : 0,
					collector: paid ? "Filipe Nyusi Jr." : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "13",
		cardNumber: 1013,
		name: "Rui Chambule",
		dailyAmount: 120,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-10",
		totalSaved: 3000,
		currentDebt: 0,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A13",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 120 : 0,
			collector: i < 25 ? "Arsénio Matusse" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "14",
		cardNumber: 1014,
		name: "Sofia Munguambe",
		dailyAmount: 500,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-08",
		totalSaved: 12500,
		currentDebt: 3000,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A14",
		totalLoans: 7000,
		totalInterest: 1050,
		paymentDays: (() => {
			const debtDays = Math.floor(3000 / 500);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid: boolean = i < 19;
				const isDebtPayment = i < 6;
				const isInDebt = !paid && i < 19 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 500 : 0,
					collector: paid ? "Célia Mondlane" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "15",
		cardNumber: 1015,
		name: "Tomás Nhapule",
		dailyAmount: 220,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-03-15",
		totalSaved: 4400,
		currentDebt: 0,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A15",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 220 : 0,
			collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "16",
		cardNumber: 1016,
		name: "Ussene Sitoe",
		dailyAmount: 175,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-05",
		totalSaved: 4200,
		currentDebt: 525,
		daysInCycle: 24,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A16",
		totalLoans: 1000,
		totalInterest: 150,
		paymentDays: (() => {
			const debtDays = Math.floor(525 / 175);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 18;
				const isDebtPayment = i < 3;
				const isInDebt = !paid && i < 18 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 175 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "17",
		cardNumber: 1017,
		name: "Verónica Muale",
		dailyAmount: 300,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-18",
		totalSaved: 7500,
		currentDebt: 0,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A17",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 300 : 0,
			collector: i < 25 ? "Célia Mondlane" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "18",
		cardNumber: 1018,
		name: "William Mujojo",
		dailyAmount: 275,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-25",
		totalSaved: 6600,
		currentDebt: 1375,
		daysInCycle: 24,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A18",
		totalLoans: 2500,
		totalInterest: 375,
		paymentDays: (() => {
			const debtDays = Math.floor(1375 / 275);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 18;
				const isDebtPayment = i < 5;
				const isInDebt = !paid && i < 18 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 275 : 0,
					collector: paid ? "Filipe Nyusi Jr." : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "19",
		cardNumber: 1019,
		name: "Xavier Massingue",
		dailyAmount: 225,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-03-20",
		totalSaved: 4500,
		currentDebt: 0,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A19",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 225 : 0,
			collector: i < 20 ? "Arsénio Matusse" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "20",
		cardNumber: 1020,
		name: "Yolanda Zongo",
		dailyAmount: 125,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-30",
		totalSaved: 3125,
		currentDebt: 0,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A20",
		totalLoans: 0,
		totalInterest: 0,
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 25,
			amount: i < 25 ? 125 : 0,
			collector: i < 25 ? "Célia Mondlane" : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "21",
		cardNumber: 1021,
		name: "Zacarias Mabjaia",
		dailyAmount: 1500,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-22",
		totalSaved: 30000,
		currentDebt: 7500,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A21",
		totalLoans: 15000,
		totalInterest: 2250,
		paymentDays: (() => {
			const debtDays = Math.floor(7500 / 1500);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 15;
				const isDebtPayment = i < 5;
				const isInDebt = !paid && i < 15 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 1500 : 0,
					collector: paid ? "Filipe Nyusi Jr." : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "22",
		cardNumber: 1022,
		name: "Amélia Júnior",
		dailyAmount: 190,
		organizationId: "org-1",
		isActive: false,
		registrationDate: "2023-12-15",
		totalSaved: 5700,
		currentDebt: 0,
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
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "23",
		cardNumber: 1023,
		name: "Benedito Cossa",
		dailyAmount: 160,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-02-28",
		totalSaved: 3200,
		currentDebt: 480,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A23",
		paymentDays: (() => {
			const debtDays = Math.floor(480 / 160);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 17;
				const isDebtPayment = i < 3;
				const isInDebt = !paid && i < 17 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 160 : 0,
					collector: paid ? "Célia Mondlane" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
	{
		id: "24",
		cardNumber: 1024,
		name: "Catarina Jóia",
		dailyAmount: 235,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-03-25",
		totalSaved: 4700,
		currentDebt: 0,
		daysInCycle: 20,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A24",
		paymentDays: Array.from({ length: 30 }, (_, i) => ({
			day: i + 1,
			paid: i < 20,
			amount: i < 20 ? 235 : 0,
			collector: i < 20 ? "Filipe Nyusi Jr." : undefined,
			isDebtPayment: false,
			isInDebt: false,
		})),
	},
	{
		id: "25",
		cardNumber: 1025,
		name: "Domingos Mondlane",
		dailyAmount: 450,
		organizationId: "org-1",
		isActive: true,
		registrationDate: "2024-01-14",
		totalSaved: 11250,
		currentDebt: 2700,
		daysInCycle: 25,
		status: "in_debt",
		organization: { id: "org-1", name: "Xitique Central" },
		alphanumericId: "A25",
		paymentDays: (() => {
			const debtDays = Math.floor(2700 / 450);
			return Array.from({ length: 30 }, (_, i) => {
				const day = i + 1;
				const paid = i < 20;
				const isDebtPayment = i < 6;
				const isInDebt = !paid && i < 20 + debtDays;
				return {
					day,
					paid,
					amount: paid ? 450 : 0,
					collector: paid ? "Arsénio Matusse" : undefined,
					isDebtPayment,
					isInDebt,
				};
			});
		})(),
	},
];

function SaversManagement() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMonth, setSelectedMonth] = useState("Maio 2024");
	const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
	const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
	const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
	const [isDayActionModalOpen, setIsDayActionModalOpen] = useState(false);
	const [isSaverPopupOpen, setIsSaverPopupOpen] = useState(false);
	const [selectedSaver, setSelectedSaver] = useState<Saver | null>(null);
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
		| "in_debt"
		| "current";
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
		{ id: "has_debt", label: "Com Dívida" },
	];

	const filteredSavers = savers.filter((saver) => {
		if (selectedStatuses.length === 0) return true;
		return selectedStatuses.some((status) => {
			if (status === "active") return saver.status === "active";
			if (status === "inactive") return saver.status === "inactive";
			if (status === "has_debt") return saver.currentDebt > 0;
			return false;
		});
	});

	const sidebarItems = getDashboardSidebar(location.pathname);

	const totalCommission = savers.reduce((sum, s) => sum + s.dailyAmount, 0);

	const kpiData = [
		{
			title: "Total Ticantes",
			value: String(savers.length),
			subtext: "Total registado",
			icon: Users,
			color: "text-emerald-500 bg-emerald-50 border-emerald-100",
			isDebt: false,
		},
		{
			title: "Total Comissão",
			value: `${totalCommission.toLocaleString()} MZN`,
			subtext: "Soma dos diários",
			icon: Wallet,
			color: "text-blue-600 bg-blue-50 border-blue-100",
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
								window.location.href = `/dashboard/saver-details?id=${row.id}`;
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									window.location.href = `/dashboard/saver-details?id=${row.id}`;
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

	// STANDARD TABLE - Expanded Row "Ver Detalhes" Navigation
	const renderExpandedRow = (row: Saver) => (
		<ExpandableRowContent
			title={`Detalhes de ${row.name}`}
			onViewFullDetails={() => {
				console.log(
					"Standard table expanded row - navigating to saver-details for:",
					row.id,
				);
				window.location.href = `/dashboard/saver-details?id=${row.id}`;
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

				<main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 w-full animate-in fade-in slide-in-from-bottom-3 duration-500">
					{viewMode === "standard" ? (
						<>
							{/* Action Banner */}
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
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
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
								{kpiData.map((kpi) => (
									<KPICard key={kpi.title} {...kpi} />
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
										: dayData.isInDebt
											? "in_debt"
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
								navigate({ to: "/dashboard/saver-details" });
							}}
						>
							Ver Detalhes
						</Button>
					</div>
				</div>
			)}
		</DashboardLayout>
	);
}

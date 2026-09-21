import { createFileRoute, useLocation } from "@tanstack/react-router";
import {
	AlertCircle,
	Banknote,
	Calendar,
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
	X,
} from "lucide-react";
import { useState } from "react";
import { DateDetailModal } from "#/components/business/DateDetailModal";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { DatePicker } from "#/components/ui/DatePicker";
import { LoadingSkeleton } from "#/components/ui/LoadingSkeleton";
import { Modal } from "#/components/ui/Modal";
import { PrototypeKPICard } from "#/components/ui/PrototypeKPICard";
import { getDashboardSidebar } from "#/config/dashboardSidebar";
import { useCollectionRecords, useCollector } from "#/features/collectors";
import { useAuth } from "#/hooks/useAuth";

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

	const { data: collector, isLoading: collectorLoading } =
		useCollector(collectorId);
	const { data: collectionRecords, isLoading: recordsLoading } =
		useCollectionRecords(collectorId);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showAllTransactions, setShowAllTransactions] = useState(false);
	const [showCalendarModal, setShowCalendarModal] = useState(false);
	const [showDateDetailModal, setShowDateDetailModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState<Date | undefined>();

	const { user } = useAuth();
	const sidebarItems = getDashboardSidebar(location.pathname, user?.role);

	// Calculate today's transactions from collection records
	const today = new Date().toISOString().split("T")[0];
	const todayRecords =
		collectionRecords?.filter((record) => record.date === today) || [];
	const totalToday = todayRecords.reduce(
		(sum, record) => sum + record.amount,
		0,
	);

	// Mock data for daily collection history (18 days from Jan 2025)
	const dailyCollectionHistory = [
		{
			date: "2025-01-20",
			systemRecorded: 15200,
			physicalCounted: 15000,
			difference: -200,
			status: "discrepancy",
			recordedBy: "Sistema",
			notes: "Possível erro de contagem",
			transactions: [
				{
					id: "1",
					clientName: "Carlos Mondlane",
					amount: 1200,
					time: "08:30",
					status: "completed",
				},
				{
					id: "2",
					clientName: "Ana Macamo",
					amount: 2500,
					time: "09:15",
					status: "completed",
				},
				{
					id: "3",
					clientName: "João Machava",
					amount: 1800,
					time: "10:00",
					status: "pending",
				},
				{
					id: "4",
					clientName: "Maria Nhambiu",
					amount: 3200,
					time: "11:30",
					status: "completed",
				},
				{
					id: "5",
					clientName: "Pedro Munguambe",
					amount: 2800,
					time: "14:00",
					status: "completed",
				},
				{
					id: "6",
					clientName: "Elsa Chongo",
					amount: 3500,
					time: "15:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-19",
			systemRecorded: 13800,
			physicalCounted: 13800,
			difference: 0,
			status: "matched",
			recordedBy: "Manual",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "7",
					clientName: "Fernando Sitoe",
					amount: 2200,
					time: "08:30",
					status: "completed",
				},
				{
					id: "8",
					clientName: "Luisa Maleiane",
					amount: 1900,
					time: "09:15",
					status: "completed",
				},
				{
					id: "9",
					clientName: "Armando Nhamave",
					amount: 3100,
					time: "10:00",
					status: "completed",
				},
				{
					id: "10",
					clientName: "Fatima Mondlane",
					amount: 2600,
					time: "11:30",
					status: "completed",
				},
				{
					id: "11",
					clientName: "Zacarias Zunguza",
					amount: 4000,
					time: "14:00",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-18",
			systemRecorded: 16500,
			physicalCounted: 16700,
			difference: +200,
			status: "discrepancy",
			recordedBy: "Sistema",
			notes: "Depósito extra não registrado",
			transactions: [
				{
					id: "12",
					clientName: "Teresia Guambe",
					amount: 2800,
					time: "08:30",
					status: "completed",
				},
				{
					id: "13",
					clientName: "Antonio Maibaze",
					amount: 3400,
					time: "09:15",
					status: "completed",
				},
				{
					id: "14",
					clientName: "Cristina Moiane",
					amount: 2100,
					time: "10:00",
					status: "completed",
				},
				{
					id: "15",
					clientName: "Helder Macamo",
					amount: 2900,
					time: "11:30",
					status: "completed",
				},
				{
					id: "16",
					clientName: "Julieta Mabui",
					amount: 1700,
					time: "14:00",
					status: "completed",
				},
				{
					id: "17",
					clientName: "Bernardo Chambule",
					amount: 3600,
					time: "15:30",
					status: "pending",
				},
			],
		},
		{
			date: "2025-01-17",
			systemRecorded: 11900,
			physicalCounted: 11900,
			difference: 0,
			status: "matched",
			recordedBy: "Manual",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "18",
					clientName: "Olinda Banze",
					amount: 2300,
					time: "08:30",
					status: "completed",
				},
				{
					id: "19",
					clientName: "Domingos Macuacua",
					amount: 2800,
					time: "09:15",
					status: "completed",
				},
				{
					id: "20",
					clientName: "Lucia Tembe",
					amount: 1900,
					time: "10:00",
					status: "completed",
				},
				{
					id: "21",
					clientName: "Jorge Sibinde",
					amount: 4900,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-16",
			systemRecorded: 18200,
			physicalCounted: 18200,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "22",
					clientName: "Amelia Mucavele",
					amount: 3100,
					time: "08:30",
					status: "completed",
				},
				{
					id: "23",
					clientName: "Francisco Massingue",
					amount: 2700,
					time: "09:15",
					status: "completed",
				},
				{
					id: "24",
					clientName: "Sofia Mucanhata",
					amount: 2400,
					time: "10:00",
					status: "completed",
				},
				{
					id: "25",
					clientName: "Henrique Uacane",
					amount: 3800,
					time: "11:30",
					status: "completed",
				},
				{
					id: "26",
					clientName: "Isabel Mussa",
					amount: 2200,
					time: "14:00",
					status: "completed",
				},
				{
					id: "27",
					clientName: "Nilton Bila",
					amount: 4000,
					time: "15:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-15",
			systemRecorded: 13200,
			physicalCounted: 13000,
			difference: -200,
			status: "discrepancy",
			recordedBy: "Manual",
			notes: "Falta investigar",
			transactions: [
				{
					id: "28",
					clientName: "Paula Cuna",
					amount: 2600,
					time: "08:30",
					status: "completed",
				},
				{
					id: "29",
					clientName: "Miguel Manhique",
					amount: 3300,
					time: "09:15",
					status: "completed",
				},
				{
					id: "30",
					clientName: "Lidia Nguenha",
					amount: 2100,
					time: "10:00",
					status: "completed",
				},
				{
					id: "31",
					clientName: "Rui Nhabanga",
					amount: 5200,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-14",
			systemRecorded: 14500,
			physicalCounted: 14500,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "32",
					clientName: "Vania Zunguza",
					amount: 2900,
					time: "08:30",
					status: "completed",
				},
				{
					id: "33",
					clientName: "Braimo Mahumane",
					amount: 3400,
					time: "09:15",
					status: "completed",
				},
				{
					id: "34",
					clientName: "Noemia Macamo",
					amount: 2300,
					time: "10:00",
					status: "completed",
				},
				{
					id: "35",
					clientName: "Abel Muzila",
					amount: 5900,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-13",
			systemRecorded: 10800,
			physicalCounted: 10800,
			difference: 0,
			status: "matched",
			recordedBy: "Manual",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "36",
					clientName: "Etelvina Mondlane",
					amount: 2800,
					time: "08:30",
					status: "completed",
				},
				{
					id: "37",
					clientName: "Marcelino Cuinica",
					amount: 3200,
					time: "09:15",
					status: "completed",
				},
				{
					id: "38",
					clientName: "Albertina Macie",
					amount: 4800,
					time: "10:00",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-12",
			systemRecorded: 12500,
			physicalCounted: 12700,
			difference: +200,
			status: "discrepancy",
			recordedBy: "Sistema",
			notes: "Depósito extra",
			transactions: [
				{
					id: "39",
					clientName: "Joao Sitoe",
					amount: 3500,
					time: "08:30",
					status: "completed",
				},
				{
					id: "40",
					clientName: "Maria Magaia",
					amount: 2900,
					time: "09:15",
					status: "completed",
				},
				{
					id: "41",
					clientName: "David Nhavoto",
					amount: 6300,
					time: "10:00",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-11",
			systemRecorded: 9800,
			physicalCounted: 9800,
			difference: 0,
			status: "matched",
			recordedBy: "Manual",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "42",
					clientName: "Catarina Mazuze",
					amount: 3200,
					time: "08:30",
					status: "completed",
				},
				{
					id: "43",
					clientName: "Ernesto Macamo",
					amount: 2400,
					time: "09:15",
					status: "completed",
				},
				{
					id: "44",
					clientName: "Ana Paulina",
					amount: 4200,
					time: "10:00",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-10",
			systemRecorded: 17100,
			physicalCounted: 17100,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "45",
					clientName: "Hortensia Chivambo",
					amount: 3800,
					time: "08:30",
					status: "completed",
				},
				{
					id: "46",
					clientName: "Julio Mondlane",
					amount: 2700,
					time: "09:15",
					status: "completed",
				},
				{
					id: "47",
					clientName: "Conceicao Uaca",
					amount: 3100,
					time: "10:00",
					status: "completed",
				},
				{
					id: "48",
					clientName: "Salomao Nhantumbo",
					amount: 7500,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-09",
			systemRecorded: 11200,
			physicalCounted: 11000,
			difference: -200,
			status: "discrepancy",
			recordedBy: "Manual",
			notes: "Possível erro",
			transactions: [
				{
					id: "49",
					clientName: "Elisa Moiane",
					amount: 2900,
					time: "08:30",
					status: "completed",
				},
				{
					id: "50",
					clientName: "Geraldo Nhamposse",
					amount: 3400,
					time: "09:15",
					status: "completed",
				},
				{
					id: "51",
					clientName: "Luisa Mabunda",
					amount: 4700,
					time: "10:00",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-08",
			systemRecorded: 15600,
			physicalCounted: 15600,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "52",
					clientName: "Fatima Muale",
					amount: 4200,
					time: "08:30",
					status: "completed",
				},
				{
					id: "53",
					clientName: "Armando Tamele",
					amount: 3600,
					time: "09:15",
					status: "completed",
				},
				{
					id: "54",
					clientName: "Terezinha Guambe",
					amount: 2900,
					time: "10:00",
					status: "completed",
				},
				{
					id: "55",
					clientName: "Carlos Sitoe",
					amount: 4900,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-07",
			systemRecorded: 8900,
			physicalCounted: 8900,
			difference: 0,
			status: "matched",
			recordedBy: "Manual",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "56",
					clientName: "Julieta Mucavel",
					amount: 2800,
					time: "08:30",
					status: "completed",
				},
				{
					id: "57",
					clientName: "Mateus Chongo",
					amount: 3300,
					time: "09:15",
					status: "completed",
				},
				{
					id: "58",
					clientName: "Albertina Nhantumbo",
					amount: 2800,
					time: "10:00",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-06",
			systemRecorded: 14300,
			physicalCounted: 14300,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "59",
					clientName: "Pedro Nhamave",
					amount: 3700,
					time: "08:30",
					status: "completed",
				},
				{
					id: "60",
					clientName: "Olga Macamo",
					amount: 3100,
					time: "09:15",
					status: "completed",
				},
				{
					id: "61",
					clientName: "Fernando Mahumane",
					amount: 4200,
					time: "10:00",
					status: "completed",
				},
				{
					id: "62",
					clientName: "Maria Mazuze",
					amount: 3300,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-05",
			systemRecorded: 16700,
			physicalCounted: 16500,
			difference: -200,
			status: "discrepancy",
			recordedBy: "Manual",
			notes: "Erro de contagem",
			transactions: [
				{
					id: "63",
					clientName: "Luis Mucanhata",
					amount: 4100,
					time: "08:30",
					status: "completed",
				},
				{
					id: "64",
					clientName: "Cristina Sitoe",
					amount: 3800,
					time: "09:15",
					status: "completed",
				},
				{
					id: "65",
					clientName: "Helder Mabui",
					amount: 4500,
					time: "10:00",
					status: "completed",
				},
				{
					id: "66",
					clientName: "Teresa Mondlane",
					amount: 4100,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-04",
			systemRecorded: 13200,
			physicalCounted: 13200,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Conciliação perfeita",
			transactions: [
				{
					id: "67",
					clientName: "Jorge Bila",
					amount: 3500,
					time: "08:30",
					status: "completed",
				},
				{
					id: "68",
					clientName: "Emilia Munguambe",
					amount: 2900,
					time: "09:15",
					status: "completed",
				},
				{
					id: "69",
					clientName: "Antonio Chambule",
					amount: 3800,
					time: "10:00",
					status: "completed",
				},
				{
					id: "70",
					clientName: "Lucia Nhambiu",
					amount: 3000,
					time: "11:30",
					status: "completed",
				},
			],
		},
		{
			date: "2025-01-03",
			systemRecorded: 19200,
			physicalCounted: 19200,
			difference: 0,
			status: "matched",
			recordedBy: "Sistema",
			notes: "Ano novo - conciliação perfeita",
			transactions: [
				{
					id: "71",
					clientName: "Carlos Mondlane",
					amount: 4200,
					time: "08:30",
					status: "completed",
				},
				{
					id: "72",
					clientName: "Ana Macamo",
					amount: 3800,
					time: "09:15",
					status: "completed",
				},
				{
					id: "73",
					clientName: "João Machava",
					amount: 4100,
					time: "10:00",
					status: "completed",
				},
				{
					id: "74",
					clientName: "Maria Nhambiu",
					amount: 3500,
					time: "11:30",
					status: "completed",
				},
				{
					id: "75",
					clientName: "Pedro Munguambe",
					amount: 3600,
					time: "14:00",
					status: "completed",
				},
			],
		},
	];

	// Prepare modifiers for calendar
	const discrepancyDates = dailyCollectionHistory
		.filter((d) => d.status === "discrepancy")
		.map((d) => new Date(d.date));
	const matchedDates = dailyCollectionHistory
		.filter((d) => d.status === "matched")
		.map((d) => new Date(d.date));

	// Handle date selection
	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			setShowCalendarModal(false);
			const dateStr = date.toISOString().split("T")[0];
			const dateDetails = dailyCollectionHistory.find(
				(d) => d.date === dateStr,
			);
			if (dateDetails) {
				setShowDateDetailModal(true);
			}
		}
	};

	// Handle clicking on a date in the table
	const handleDateClick = (dateStr: string) => {
		const dateDetails = dailyCollectionHistory.find((d) => d.date === dateStr);
		if (dateDetails) {
			setSelectedDate(new Date(dateStr));
			setShowDateDetailModal(true);
		}
	};

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

						{/* Daily Collection History Section */}
						<div className="bg-white rounded-xl border border-slate-200/60 shadow-sm">
							<div className="flex justify-between items-center p-4 pb-4 border-b border-slate-100">
								<h4 className="font-semibold text-slate-900">
									Histórico de Coleções Diárias
								</h4>
								<div className="flex items-center gap-3">
									<div className="flex items-center gap-2 text-xs text-slate-500">
										<Calendar size={14} />
										<span>Últimos 15 dias</span>
									</div>
									<Button
										size="sm"
										variant="outline"
										leftIcon={<Calendar size={14} />}
										onClick={() => setShowCalendarModal(true)}
									>
										Ver Histórico Completo
									</Button>
								</div>
							</div>
							<div className="p-4">
								<div className="overflow-x-auto">
									<table className="w-full text-left border-collapse">
										<thead className="bg-slate-50 border-b border-slate-200">
											<tr>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600">
													Data
												</th>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600 text-right">
													Registado (Sistema)
												</th>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600 text-right">
													Contabilizado (Físico)
												</th>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600 text-right">
													Diferença
												</th>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600">
													Status
												</th>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600">
													Registado Por
												</th>
												<th className="px-4 py-3 text-xs font-semibold text-slate-600">
													Notas
												</th>
											</tr>
										</thead>
										<tbody>
											{dailyCollectionHistory.slice(0, 15).map((record) => (
												<tr
													key={record.date}
													className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
													onClick={() => handleDateClick(record.date)}
												>
													<td className="px-4 py-3 text-sm text-slate-900 font-medium">
														{new Date(record.date).toLocaleDateString("pt-PT", {
															day: "2-digit",
															month: "short",
															year: "numeric",
														})}
													</td>
													<td className="px-4 py-3 text-sm text-slate-700 text-right font-medium">
														{record.systemRecorded.toLocaleString()} MZN
													</td>
													<td className="px-4 py-3 text-sm text-slate-700 text-right font-medium">
														{record.physicalCounted.toLocaleString()} MZN
													</td>
													<td
														className={`px-4 py-3 text-sm text-right font-bold ${
															record.difference > 0
																? "text-emerald-600"
																: record.difference < 0
																	? "text-red-600"
																	: "text-slate-700"
														}`}
													>
														{record.difference > 0 ? "+" : ""}
														{record.difference.toLocaleString()} MZN
													</td>
													<td className="px-4 py-3">
														<span
															className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
																record.status === "matched"
																	? "bg-emerald-500/10 text-emerald-600"
																	: "bg-amber-500/10 text-amber-600"
															}`}
														>
															{record.status === "matched"
																? "Conciliado"
																: "Discrepância"}
														</span>
													</td>
													<td className="px-4 py-3 text-sm text-slate-600">
														{record.recordedBy}
													</td>
													<td className="px-4 py-3 text-sm text-slate-500">
														{record.notes}
													</td>
												</tr>
											))}
										</tbody>
									</table>
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
										{(showAllTransactions
											? todayRecords
											: todayRecords.slice(0, 5)
										).map((record) => (
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
														className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
															record.status === "completed"
																? "bg-emerald-500/10 text-emerald-500"
																: "bg-orange-500/10 text-orange-600"
														}`}
													>
														{record.status === "completed"
															? "Sincronizado"
															: "Pendente"}
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

			{/* Calendar Modal */}
			<Modal
				isOpen={showCalendarModal}
				onClose={() => setShowCalendarModal(false)}
				size="sm"
			>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-slate-900">
							Selecione uma Data
						</h3>
						<button
							type="button"
							onClick={() => setShowCalendarModal(false)}
							className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
						>
							<X size={20} className="text-slate-500" />
						</button>
					</div>
					<DatePicker
						selected={selectedDate}
						onSelect={handleDateSelect}
						modifiers={{
							discrepancy: discrepancyDates,
							matched: matchedDates,
						}}
					/>
					<div className="flex items-center gap-4 text-xs text-slate-600 pt-2">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-emerald-200" />
							<span>Conciliado</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-amber-200" />
							<span>Discrepância</span>
						</div>
					</div>
				</div>
			</Modal>

			{/* Date Detail Modal */}
			<DateDetailModal
				isOpen={showDateDetailModal}
				onClose={() => setShowDateDetailModal(false)}
				dateDetails={
					selectedDate
						? dailyCollectionHistory.find(
								(d) => d.date === selectedDate.toISOString().split("T")[0],
							) || null
						: null
				}
			/>
		</DashboardLayout>
	);
}

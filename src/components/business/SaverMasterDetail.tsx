import {
	AlertCircle,
	Calendar,
	CheckCircle,
	CreditCard,
	DollarSign,
	Edit2,
	Phone,
	Users,
	X,
} from "lucide-react";
import { useState } from "react";
import {
	ExpandableCard,
	InlineEditor,
	MasterItem,
	QuickActionMenu,
	SplitView,
} from "#/components/interactive";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { cn } from "#/lib/design-system";

interface Saver {
	id: string;
	cardNumber: number;
	name: string;
	phone: string;
	dailyAmount: number;
	totalSaved: number;
	currentDebt: number;
	daysInCycle: number;
	status: "active" | "in_debt" | "inactive";
	registrationDate: string;
}

interface SaverMasterDetailProps {
	savers: Saver[];
	onSaverSelect: (saver: Saver) => void;
	onDeposit: (saver: Saver) => void;
	onLoanRequest: (saver: Saver) => void;
	onEdit: (saver: Saver) => void;
}

export function SaverMasterDetail({
	savers,
	onSaverSelect,
	onDeposit,
	onLoanRequest,
	onEdit,
}: SaverMasterDetailProps) {
	const [selectedSaver, setSelectedSaver] = useState<Saver | null>(
		savers[0] || null,
	);

	const handleSaverSelect = (saver: Saver) => {
		setSelectedSaver(saver);
		onSaverSelect(saver);
	};

	const handleDeposit = () => {
		if (selectedSaver) {
			onDeposit(selectedSaver);
		}
	};

	const handleLoanRequest = () => {
		if (selectedSaver) {
			onLoanRequest(selectedSaver);
		}
	};

	const quickActions = [
		{
			id: "deposit",
			label: "Registar Depósito",
			icon: <DollarSign size={16} />,
			onClick: handleDeposit,
		},
		{
			id: "loan",
			label: "Solicitar Empréstimo",
			icon: <CreditCard size={16} />,
			onClick: handleLoanRequest,
		},
		{
			id: "call",
			label: "Ligar WhatsApp",
			icon: <Phone size={16} />,
			onClick: () => console.log("Call:", selectedSaver?.phone),
		},
		{
			id: "edit",
			label: "Editar",
			icon: <Edit2 size={16} />,
			onClick: () => selectedSaver && onEdit(selectedSaver),
		},
	];

	return (
		<SplitView
			masterWidth="400px"
			detailWidth="auto"
			collapsible={true}
			defaultCollapsed={false}
		>
			{/* Master Panel - Savers List */}
			<div className="h-full flex flex-col">
				<div className="p-4 border-b border-border">
					<h2 className="font-semibold text-text-primary text-sm">
						Ticantes ({savers.length})
					</h2>
				</div>
				<div className="flex-1 overflow-y-auto">
					{savers.map((saver) => (
						<MasterItem
							key={saver.id}
							id={saver.id}
							title={saver.name}
							subtitle={`#${saver.cardNumber} • ${saver.dailyAmount.toLocaleString()} MZN/dia`}
							icon={
								<div
									className={cn(
										"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
										saver.status === "active"
											? "bg-status-success/10 text-status-success"
											: saver.status === "in_debt"
												? "bg-status-error/10 text-status-error"
												: "bg-background-tertiary text-text-tertiary",
									)}
								>
									{String(saver.name).charAt(0)}
								</div>
							}
							isActive={selectedSaver?.id === saver.id}
							onClick={() => handleSaverSelect(saver)}
						>
							<div className="flex items-center gap-4 text-xs text-text-secondary">
								<div className="flex items-center gap-1">
									<DollarSign size={12} />
									<span>{saver.totalSaved.toLocaleString()} MZN</span>
								</div>
								<div className="flex items-center gap-1">
									<AlertCircle size={12} />
									<span
										className={saver.currentDebt > 0 ? "text-status-error" : ""}
									>
										{saver.currentDebt.toLocaleString()} MZN
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Calendar size={12} />
									<span>{saver.daysInCycle}/30 dias</span>
								</div>
							</div>
						</MasterItem>
					))}
				</div>
			</div>

			{/* Detail Panel - Saver Details */}
			{selectedSaver ? (
				<div className="h-full flex flex-col overflow-y-auto">
					{/* Header */}
					<div className="p-6 border-b border-border bg-background-primary">
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 rounded-xl bg-background-tertiary flex items-center justify-center text-text-secondary font-bold text-xl">
									{String(selectedSaver.name).charAt(0)}
								</div>
								<div>
									<h2 className="text-xl font-bold text-text-primary">
										{selectedSaver.name}
									</h2>
									<div className="flex items-center gap-2 text-sm text-text-secondary mt-1">
										<span className="font-mono">
											#{selectedSaver.cardNumber}
										</span>
										<span>•</span>
										<span className="font-mono">{selectedSaver.phone}</span>
									</div>
								</div>
							</div>
							<QuickActionMenu actions={quickActions} />
						</div>
					</div>

					{/* Status Badge */}
					<div className="px-6 py-3 border-b border-border">
						<span
							className={cn(
								"inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold",
								selectedSaver.status === "active"
									? "bg-status-success/10 text-status-success"
									: selectedSaver.status === "in_debt"
										? "bg-status-error/10 text-status-error"
										: "bg-background-tertiary text-text-tertiary",
							)}
						>
							{selectedSaver.status === "active"
								? "Ativo"
								: selectedSaver.status === "in_debt"
									? "Em Dívida"
									: "Inativo"}
						</span>
					</div>

					{/* Quick Stats */}
					<div className="p-6 grid grid-cols-3 gap-4">
						<Card>
							<CardContent className="p-4 text-center">
								<DollarSign size={20} className="text-secondary mx-auto mb-2" />
								<p className="text-2xl font-bold text-text-primary">
									{selectedSaver.totalSaved.toLocaleString()}
								</p>
								<p className="text-xs text-text-secondary">Total Poupado</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4 text-center">
								<AlertCircle
									size={20}
									className={cn(
										"mx-auto mb-2",
										selectedSaver.currentDebt > 0
											? "text-status-error"
											: "text-text-tertiary",
									)}
								/>
								<p
									className={cn(
										"text-2xl font-bold",
										selectedSaver.currentDebt > 0
											? "text-status-error"
											: "text-text-primary",
									)}
								>
									{selectedSaver.currentDebt.toLocaleString()}
								</p>
								<p className="text-xs text-text-secondary">Dívida Atual</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4 text-center">
								<Calendar
									size={20}
									className="text-text-primary mx-auto mb-2"
								/>
								<p className="text-2xl font-bold text-text-primary">
									{selectedSaver.daysInCycle}/30
								</p>
								<p className="text-xs text-text-secondary">Dias no Ciclo</p>
							</CardContent>
						</Card>
					</div>

					{/* Inline Editable Fields */}
					<div className="px-6 py-4 border-b border-border">
						<h3 className="font-semibold text-text-primary text-sm mb-4">
							Informações do Ticante
						</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-xs font-semibold text-text-secondary mb-2">
									Nome
								</label>
								<InlineEditor
									value={selectedSaver.name}
									onSave={(value) => console.log("Update name:", value)}
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-text-secondary mb-2">
									Telefone
								</label>
								<InlineEditor
									value={selectedSaver.phone}
									onSave={(value) => console.log("Update phone:", value)}
									type="tel"
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-text-secondary mb-2">
									Valor Diário (MZN)
								</label>
								<InlineEditor
									value={String(selectedSaver.dailyAmount)}
									onSave={(value) => console.log("Update daily amount:", value)}
									type="number"
								/>
							</div>
						</div>
					</div>

					{/* Cycle Progress */}
					<div className="px-6 py-4 border-b border-border">
						<h3 className="font-semibold text-text-primary text-sm mb-4">
							Progresso do Ciclo
						</h3>
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-text-secondary">Dias pagos</span>
								<span className="font-semibold text-text-primary">
									{selectedSaver.daysInCycle}/30
								</span>
							</div>
							<div className="w-full h-3 bg-background-tertiary rounded-full overflow-hidden">
								<div
									className="h-full bg-secondary transition-all duration-300"
									style={{
										width: `${(selectedSaver.daysInCycle / 30) * 100}%`,
									}}
								/>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className="px-6 py-4">
						<h3 className="font-semibold text-text-primary text-sm mb-4">
							Acções Rápidas
						</h3>
						<div className="flex flex-wrap gap-2">
							<Button
								size="sm"
								leftIcon={<DollarSign size={16} />}
								onClick={handleDeposit}
							>
								Registar Depósito
							</Button>
							<Button
								size="sm"
								leftIcon={<CreditCard size={16} />}
								onClick={handleLoanRequest}
							>
								Solicitar Empréstimo
							</Button>
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Phone size={16} />}
							>
								Ligar WhatsApp
							</Button>
							<Button
								size="sm"
								variant="outline"
								leftIcon={<Edit2 size={16} />}
								onClick={() => onEdit(selectedSaver)}
							>
								Editar
							</Button>
						</div>
					</div>

					{/* Deposit History Preview */}
					<div className="px-6 py-4">
						<ExpandableCard
							title="Histórico de Depósitos"
							subtitle="Últimos 5 depósitos"
						>
							<div className="space-y-2">
								{[
									{ date: "18/05/2024", amount: 500, status: "paid" },
									{ date: "17/05/2024", amount: 500, status: "paid" },
									{ date: "16/05/2024", amount: 500, status: "partial" },
									{ date: "15/05/2024", amount: 500, status: "paid" },
									{ date: "14/05/2024", amount: 0, status: "unpaid" },
								].map((deposit) => (
									<div
										key={deposit.date}
										className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
									>
										<div className="flex items-center gap-3">
											<div
												className={cn(
													"w-8 h-8 rounded-full flex items-center justify-center",
													deposit.status === "paid"
														? "bg-status-success/10 text-status-success"
														: deposit.status === "partial"
															? "bg-status-warning/10 text-status-warning"
															: "bg-background-tertiary text-text-tertiary",
												)}
											>
												{deposit.status === "paid" ? (
													<CheckCircle size={16} />
												) : deposit.status === "partial" ? (
													<AlertTriangle size={16} />
												) : (
													<X size={16} />
												)}
											</div>
											<div>
												<p className="text-sm font-medium text-text-primary">
													{deposit.date}
												</p>
												<p className="text-xs text-text-tertiary">Dia</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-semibold text-text-primary">
												{deposit.amount} MZN
											</p>
										</div>
									</div>
								))}
							</div>
						</ExpandableCard>
					</div>
				</div>
			) : (
				<div className="h-full flex items-center justify-center p-6 text-center">
					<Users size={48} className="text-text-tertiary mx-auto mb-4" />
					<p className="text-text-secondary text-sm">
						Selecione um ticante para ver os detalhes
					</p>
				</div>
			)}
		</SplitView>
	);
}

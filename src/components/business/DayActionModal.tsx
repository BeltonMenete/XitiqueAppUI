import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	DollarSign,
	Edit,
	FileText,
	History,
	MoreHorizontal,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import {
	ContextMenu,
	ContextMenuHeader,
	ContextMenuItem,
	ContextMenuSeparator,
} from "#/components/ui/ContextMenu";
import { Modal } from "#/components/ui/Modal";
import { cn } from "#/lib/design-system";

interface DayActionModalProps {
	isOpen: boolean;
	onClose: () => void;
	saverName: string;
	day: number;
	dayStatus: "paid" | "unpaid" | "debt" | "debt_payment";
	amount?: number;
	collector?: string;
	isDebtPayment?: boolean;
	onActionComplete?: (action: string, data?: any) => void;
	saver?: any;
}

interface DayData {
	day: number;
	status: "paid" | "unpaid" | "debt" | "debt_payment";
	amount?: number;
	collector?: string;
	isDebtPayment?: boolean;
}

export function DayActionModal({
	isOpen,
	onClose,
	saverName,
	day,
	dayStatus,
	amount,
	collector,
	isDebtPayment,
	onActionComplete,
	saver,
}: DayActionModalProps) {
	const [showMenu, setShowMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [showDepositForm, setShowDepositForm] = useState(false);
	const [showNoteForm, setShowNoteForm] = useState(false);
	const [noteText, setNoteText] = useState("");
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [showConfirmConvert, setShowConfirmConvert] = useState(false);
	const [showUnavailableForm, setShowUnavailableForm] = useState(false);
	const [unavailableReason, setUnavailableReason] = useState("");

	const handleMoreClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		const rect = event.currentTarget.getBoundingClientRect();
		setMenuPosition({ x: rect.left, y: rect.bottom + 4 });
		setShowMenu(true);
	};

	const _dayData: DayData = {
		day,
		status: dayStatus,
		amount,
		collector,
		isDebtPayment,
	};

	const getActionsForStatus = (status: string) => {
		switch (status) {
			case "unpaid":
				return [
					{
						label: "Registrar Depósito",
						icon: <DollarSign size={16} />,
						action: "deposit",
					},
					{
						label: "Marcar Não Disponível",
						icon: <Clock size={16} />,
						action: "unavailable",
					},
					{
						label: "Adicionar Nota",
						icon: <FileText size={16} />,
						action: "note",
					},
				];
			case "paid":
				return [
					{
						label: "Ver Detalhes",
						icon: <FileText size={16} />,
						action: "details",
					},
					{
						label: "Editar Depósito",
						icon: <Edit size={16} />,
						action: "edit",
					},
					{
						label: "Deletar Depósito",
						icon: <Trash2 size={16} />,
						action: "delete",
						danger: true,
					},
					{
						label: "Converter para Pagamento de Dívida",
						icon: <CheckCircle size={16} />,
						action: "convert",
					},
					{
						label: "Ver Recibo",
						icon: <FileText size={16} />,
						action: "receipt",
					},
				];
			case "debt":
				return [
					{
						label: "Registrar Pagamento de Dívida",
						icon: <DollarSign size={16} />,
						action: "debt_payment",
					},
					{
						label: "Ver Detalhes da Dívida",
						icon: <AlertCircle size={16} />,
						action: "debt_details",
					},
					{
						label: "Calcular Plano de Pagamento",
						icon: <Calendar size={16} />,
						action: "payment_plan",
					},
				];
			case "debt_payment":
				return [
					{
						label: "Ver Detalhes do Pagamento",
						icon: <FileText size={16} />,
						action: "payment_details",
					},
					{
						label: "Editar Pagamento",
						icon: <Edit size={16} />,
						action: "edit_payment",
					},
					{
						label: "Reverter para Depósito Normal",
						icon: <History size={16} />,
						action: "revert",
					},
					{
						label: "Ver Histórico do Empréstimo",
						icon: <History size={16} />,
						action: "loan_history",
					},
				];
			default:
				return [];
		}
	};

	const actions = getActionsForStatus(dayStatus);

	const handleAction = (action: string) => {
		setShowMenu(false);

		switch (action) {
			case "deposit":
				setShowDepositForm(true);
				break;
			case "unavailable":
				setShowUnavailableForm(true);
				break;
			case "note":
				setShowNoteForm(true);
				break;
			case "delete":
				setShowConfirmDelete(true);
				break;
			case "convert":
				setShowConfirmConvert(true);
				break;
			case "edit":
			case "edit_payment":
				setShowDepositForm(true);
				break;
			case "revert":
				// Mock implementation
				console.log(`Reverting payment for ${saverName} on day ${day}`);
				onActionComplete?.("revert", { day, saverName });
				break;
			default:
				console.log(`Action: ${action} for ${saverName} on day ${day}`);
				onActionComplete?.(action, { day, saverName });
		}
	};

	const handleDepositSubmit = () => {
		const depositAmount = amount || 500; // Use fixed amount or default 500
		console.log(`Deposit ${depositAmount} MZN for ${saverName} on day ${day}`);
		onActionComplete?.("deposit", { day, saverName, amount: depositAmount });
		setShowDepositForm(false);
	};

	const handleNoteSubmit = () => {
		console.log(`Note: ${noteText} for ${saverName} on day ${day}`);
		onActionComplete?.("note", { day, saverName, note: noteText });
		setShowNoteForm(false);
		setNoteText("");
	};

	const handleDeleteConfirm = () => {
		console.log(`Delete deposit for ${saverName} on day ${day}`);
		onActionComplete?.("delete", { day, saverName });
		setShowConfirmDelete(false);
	};

	const handleConvertConfirm = () => {
		console.log(
			`Convert deposit to debt payment for ${saverName} on day ${day}`,
		);
		onActionComplete?.("convert", { day, saverName });
		setShowConfirmConvert(false);
	};

	const handleUnavailableSubmit = () => {
		console.log(
			`Mark day ${day} as unavailable for ${saverName}: ${unavailableReason}`,
		);
		onActionComplete?.("unavailable", {
			day,
			saverName,
			reason: unavailableReason,
		});
		setShowUnavailableForm(false);
		setUnavailableReason("");
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "paid":
				return isDebtPayment
					? "bg-amber-50 border-amber-200"
					: "bg-emerald-50 border-emerald-200";
			case "unpaid":
				return "bg-slate-50 border-slate-200";
			case "debt":
				return "bg-red-50 border-red-200";
			case "debt_payment":
				return "bg-amber-50 border-amber-200";
			default:
				return "bg-slate-50 border-slate-200";
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case "paid":
				return isDebtPayment ? "Pagamento de Dívida" : "Depositado";
			case "unpaid":
				return "Não Depositado";
			case "debt":
				return "Em Dívida";
			case "debt_payment":
				return "Pagamento de Dívida";
			default:
				return "Desconhecido";
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={`Ações para Dia ${day}`}
			size="md"
		>
			<Card className="border-0 shadow-none">
				<CardContent className="p-6 space-y-6">
					{/* Day Information */}
					<div
						className={cn("p-4 rounded-lg border", getStatusColor(dayStatus))}
					>
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<Calendar size={18} className="text-slate-600" />
								<span className="font-semibold text-slate-900">Dia {day}</span>
							</div>
							<span
								className={cn(
									"text-xs font-semibold px-2 py-1 rounded-full",
									dayStatus === "paid" &&
										!isDebtPayment &&
										"bg-emerald-100 text-emerald-700",
									dayStatus === "paid" &&
										isDebtPayment &&
										"bg-amber-100 text-amber-700",
									dayStatus === "unpaid" && "bg-slate-100 text-slate-600",
									dayStatus === "debt" && "bg-red-100 text-red-700",
									dayStatus === "debt_payment" && "bg-amber-100 text-amber-700",
								)}
							>
								{getStatusText(dayStatus)}
							</span>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span className="text-slate-600">Ticante:</span>
							<span className="font-medium text-slate-900">{saverName}</span>
						</div>
						{amount && dayStatus === "paid" && (
							<div className="flex items-center justify-between text-sm">
								<span className="text-slate-600">Valor:</span>
								<span className="font-medium text-slate-900">
									{amount.toLocaleString()} MZN
								</span>
							</div>
						)}
						{collector && dayStatus === "paid" && (
							<div className="flex items-center justify-between text-sm">
								<span className="text-slate-600">Cobrador:</span>
								<span className="font-medium text-slate-900">{collector}</span>
							</div>
						)}
					</div>

					{/* Deposit Form */}
					{showDepositForm && (
						<div className="p-4 bg-slate-50 rounded-lg space-y-4">
							<h4 className="text-sm font-semibold text-slate-900">
								{dayStatus === "unpaid"
									? "Registrar Depósito"
									: "Editar Depósito"}
							</h4>
							<div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
								<span className="text-sm text-slate-600">Valor (MZN)</span>
								<span className="text-lg font-semibold text-slate-900">
									{(amount || 500).toLocaleString()} MZN
								</span>
							</div>
							<p className="text-xs text-slate-500">
								{dayStatus === "unpaid"
									? "Confirme o registro do depósito no valor diário fixo do ticante."
									: "Confirme a edição do depósito."}
							</p>
							<div className="flex gap-2">
								<Button size="sm" onClick={handleDepositSubmit}>
									Confirmar
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setShowDepositForm(false)}
								>
									Cancelar
								</Button>
							</div>
						</div>
					)}

					{/* Note Form */}
					{showNoteForm && (
						<div className="p-4 bg-slate-50 rounded-lg space-y-4">
							<h4 className="text-sm font-semibold text-slate-900">
								Adicionar Nota
							</h4>
							<div>
								<label className="block text-xs text-slate-600 mb-1">
									Nota
								</label>
								<textarea
									value={noteText}
									onChange={(e) => setNoteText(e.target.value)}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
									rows={3}
									placeholder="Ex: Cliente estava doente..."
								/>
							</div>
							<div className="flex gap-2">
								<Button size="sm" onClick={handleNoteSubmit}>
									Salvar Nota
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setShowNoteForm(false)}
								>
									Cancelar
								</Button>
							</div>
						</div>
					)}

					{/* Unavailable Form */}
					{showUnavailableForm && (
						<div className="p-4 bg-slate-50 rounded-lg space-y-4">
							<h4 className="text-sm font-semibold text-slate-900">
								Marcar como Não Disponível
							</h4>
							<div>
								<label className="block text-xs text-slate-600 mb-1">
									Motivo
								</label>
								<select
									value={unavailableReason}
									onChange={(e) => setUnavailableReason(e.target.value)}
									className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
								>
									<option value="">Selecione um motivo...</option>
									<option value="Feriado">Feriado</option>
									<option value="Doença">Doença</option>
									<option value="Ausência">Ausência</option>
									<option value="Outro">Outro</option>
								</select>
							</div>
							{unavailableReason === "Outro" && (
								<div className="mt-2">
									<label className="block text-xs text-slate-600 mb-1">
										Especificar
									</label>
									<input
										type="text"
										value={noteText}
										onChange={(e) => setNoteText(e.target.value)}
										className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
										placeholder="Especifique o motivo..."
									/>
								</div>
							)}
							<div className="flex gap-2">
								<Button size="sm" onClick={handleUnavailableSubmit}>
									Confirmar
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setShowUnavailableForm(false)}
								>
									Cancelar
								</Button>
							</div>
						</div>
					)}

					{/* Confirm Delete */}
					{showConfirmDelete && (
						<div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-4">
							<h4 className="text-sm font-semibold text-red-900">
								Confirmar Exclusão
							</h4>
							<p className="text-sm text-red-700">
								Tem certeza que deseja deletar o depósito de{" "}
								{amount?.toLocaleString()} MZN para {saverName} no dia {day}?
							</p>
							<div className="flex gap-2">
								<Button
									size="sm"
									variant="destructive"
									onClick={handleDeleteConfirm}
								>
									Confirmar Exclusão
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setShowConfirmDelete(false)}
								>
									Cancelar
								</Button>
							</div>
						</div>
					)}

					{/* Confirm Convert */}
					{showConfirmConvert && (
						<div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-4">
							<h4 className="text-sm font-semibold text-amber-900">
								Converter para Pagamento de Dívida
							</h4>
							<p className="text-sm text-amber-700">
								Tem certeza que deseja converter este depósito de{" "}
								{amount?.toLocaleString()} MZN em pagamento de dívida?
							</p>
							<div className="flex gap-2">
								<Button size="sm" onClick={handleConvertConfirm}>
									Confirmar Conversão
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setShowConfirmConvert(false)}
								>
									Cancelar
								</Button>
							</div>
						</div>
					)}

					{/* Primary Action */}
					{!showDepositForm &&
						!showNoteForm &&
						!showConfirmDelete &&
						!showConfirmConvert &&
						!showUnavailableForm && (
							<div className="space-y-3">
								<Button
									size="lg"
									className="w-full"
									leftIcon={
										dayStatus === "unpaid" ? (
											<DollarSign size={20} />
										) : dayStatus === "paid" ? (
											<FileText size={20} />
										) : dayStatus === "debt" ? (
											<DollarSign size={20} />
										) : (
											<FileText size={20} />
										)
									}
									onClick={() => {
										const primaryAction = actions[0];
										if (primaryAction) handleAction(primaryAction.action);
									}}
								>
									{dayStatus === "unpaid" && "Registrar Depósito"}
									{dayStatus === "paid" && "Ver Detalhes do Depósito"}
									{dayStatus === "debt" && "Registrar Pagamento de Dívida"}
									{dayStatus === "debt_payment" && "Ver Detalhes do Pagamento"}
								</Button>

								{/* More Actions */}
								{actions.length > 1 && (
									<div className="relative">
										<Button
											size="lg"
											variant="outline"
											className="w-full"
											leftIcon={<MoreHorizontal size={20} />}
											onClick={handleMoreClick}
										>
											Mais Ações
										</Button>

										{showMenu && menuPosition && (
											<ContextMenu
												isOpen={showMenu}
												onClose={() => setShowMenu(false)}
												position={menuPosition}
											>
												<ContextMenuHeader>
													Opções para Dia {day}
												</ContextMenuHeader>
												{actions.slice(1).map((action) => (
													<ContextMenuItem
														key={action.action}
														onClick={() => handleAction(action.action)}
														icon={action.icon}
														danger={action.danger}
													>
														{action.label}
													</ContextMenuItem>
												))}
												<ContextMenuSeparator />
												<ContextMenuItem
													onClick={() => handleAction("history")}
													icon={<History size={16} />}
												>
													Ver Histórico Completo
												</ContextMenuItem>
												<ContextMenuItem
													onClick={() => handleAction("note")}
													icon={<FileText size={16} />}
												>
													Adicionar Nota
												</ContextMenuItem>
											</ContextMenu>
										)}
									</div>
								)}
							</div>
						)}

					{/* Universal Actions */}
					{!showDepositForm &&
						!showNoteForm &&
						!showConfirmDelete &&
						!showConfirmConvert &&
						!showUnavailableForm && (
							<div className="pt-4 border-t border-slate-200">
								<h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">
									Ações Disponíveis
								</h4>
								<div className="grid grid-cols-2 gap-2">
									<Button
										size="sm"
										variant="outline"
										leftIcon={<History size={14} />}
										onClick={() => handleAction("history")}
									>
										Histórico
									</Button>
									<Button
										size="sm"
										variant="outline"
										leftIcon={<FileText size={14} />}
										onClick={() => handleAction("note")}
									>
										Nota
									</Button>
								</div>
							</div>
						)}
				</CardContent>
			</Card>
		</Modal>
	);
}

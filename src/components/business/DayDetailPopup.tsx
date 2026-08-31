import { Check, DollarSign, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { cn } from "#/lib/design-system";

interface DayDetailPopupProps {
	isOpen: boolean;
	onClose: () => void;
	day: number;
	month: string;
	saverName: string;
	saverDailyAmount: number;
	dayStatus:
		| "paid"
		| "partial"
		| "unpaid"
		| "deleted"
		| "not_deposited"
		| "in_debt"
		| "current";
	amount?: number;
	collector?: string;
	isLoading?: boolean;
	onDeposit?: (data: { amount: number; type: string; days: number }) => void;
	onEdit?: () => void;
	onDelete?: () => void;
}

export function DayDetailPopup({
	isOpen,
	onClose,
	day,
	month,
	saverName: _saverName,
	saverDailyAmount,
	dayStatus,
	amount,
	collector,
	isLoading = false,
	onDeposit,
	onEdit,
	onDelete,
}: DayDetailPopupProps) {
	const [showDepositForm, setShowDepositForm] = useState(false);
	const [depositAmount, setDepositAmount] = useState("");
	const [depositType, setDepositType] = useState("normal");
	const [numberOfDays, setNumberOfDays] = useState(1);

	if (!isOpen) return null;

	const getStatusColor = (status: string) => {
		switch (status) {
			case "paid":
				return "bg-emerald-100 text-emerald-600";
			case "partial":
				return "bg-amber-100 text-amber-600";
			case "deleted":
				return "bg-red-100 text-red-600";
			case "in_debt":
				return "bg-red-100 text-red-600";
			case "current":
				return "bg-emerald-900 text-white";
			default:
				return "bg-slate-200 text-slate-600";
		}
	};

	const getStatusText = (status: string) => {
		switch (status) {
			case "paid":
				return "Depósito Normal";
			case "partial":
				return "Pagamento Parcial";
			case "deleted":
				return "Eliminado";
			case "in_debt":
				return "Em Dívida";
			case "current":
				return "Atual";
			default:
				return "Não Depositado";
		}
	};

	const handleDepositSubmit = () => {
		const amount = parseFloat(depositAmount) || saverDailyAmount;
		onDeposit?.({
			amount,
			type: depositType,
			days: numberOfDays,
		});
		setShowDepositForm(false);
		setDepositAmount("");
		setNumberOfDays(1);
	};

	const totalAmount =
		(parseFloat(depositAmount) || saverDailyAmount) * numberOfDays;

	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onClose();
				}
			}}
			role="dialog"
			aria-modal="true"
		>
			<div
				className="bg-white rounded-xl shadow-xl p-4 max-w-xs w-full mx-4 animate-in scale-in duration-200"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					e.stopPropagation();
				}}
				role="document"
			>
				<div className="flex justify-between items-start mb-3">
					<div>
						<h4 className="text-sm font-bold text-slate-900">Dia {day}</h4>
						<p className="text-xs text-slate-500">{month}</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
					>
						<X size={16} className="text-slate-500" />
					</button>
				</div>

				{isLoading ? (
					<div className="flex items-center justify-center py-4">
						<p className="text-xs text-slate-500">Carregando detalhes...</p>
					</div>
				) : showDepositForm ? (
					<div className="space-y-3">
						<div
							className={cn(
								"p-3 rounded-lg border",
								depositType === "debt_payment"
									? "bg-amber-50 border-amber-200"
									: "bg-emerald-50 border-emerald-200",
							)}
						>
							<div className="flex items-center gap-2 mb-1">
								<DollarSign
									size={14}
									className={
										depositType === "debt_payment"
											? "text-amber-600"
											: "text-emerald-600"
									}
								/>
								<h5
									className={cn(
										"text-xs font-semibold",
										depositType === "debt_payment"
											? "text-amber-900"
											: "text-emerald-900",
									)}
								>
									{depositType === "debt_payment"
										? "Registrar Pagamento de Dívida"
										: "Registrar Depósito"}
								</h5>
							</div>
							<p
								className={cn(
									"text-[10px]",
									depositType === "debt_payment"
										? "text-amber-700"
										: "text-emerald-700",
								)}
							>
								Dia {day} - {month}
							</p>
						</div>
						<div className="space-y-2">
							<div>
								<label
									htmlFor="deposit-amount"
									className="block text-xs font-medium text-slate-700 mb-1"
								>
									Valor Diário (MZN)
								</label>
								<input
									id="deposit-amount"
									type="number"
									value={depositAmount}
									onChange={(e) => setDepositAmount(e.target.value)}
									placeholder={saverDailyAmount.toString()}
									className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs"
								/>
							</div>
							{depositType !== "debt_payment" && (
								<div>
									<label
										htmlFor="number-of-days"
										className="block text-xs font-medium text-slate-700 mb-1"
									>
										Quantidade de Dias
									</label>
									<input
										id="number-of-days"
										type="number"
										min="1"
										max="30"
										value={numberOfDays}
										onChange={(e) =>
											setNumberOfDays(
												Math.max(1, parseInt(e.target.value, 10) || 1),
											)
										}
										className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs"
									/>
								</div>
							)}
							{numberOfDays > 1 && depositType !== "debt_payment" && (
								<div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
									<div className="flex justify-between items-center">
										<span className="text-xs text-slate-600">Total:</span>
										<span className="text-sm font-bold text-slate-900">
											{totalAmount.toLocaleString()} MZN
										</span>
									</div>
								</div>
							)}
							{dayStatus === "in_debt" && (
								<div>
									<label
										htmlFor="deposit-type"
										className="block text-xs font-medium text-slate-700 mb-1"
									>
										Tipo
									</label>
									<select
										id="deposit-type"
										value={depositType}
										onChange={(e) => setDepositType(e.target.value)}
										className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs"
									>
										<option value="normal">Depósito Normal</option>
										<option value="debt_payment">Pagamento de Dívida</option>
									</select>
								</div>
							)}
						</div>
						<div className="flex gap-2 pt-2">
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									setShowDepositForm(false);
									setDepositAmount("");
									setNumberOfDays(1);
								}}
								className="flex-1 text-xs"
							>
								Cancelar
							</Button>
							<Button
								size="sm"
								onClick={handleDepositSubmit}
								className={cn(
									"flex-1 text-xs",
									depositType === "debt_payment"
										? "bg-amber-600 hover:bg-amber-700"
										: "bg-emerald-600 hover:bg-emerald-700",
									"text-white",
								)}
							>
								Confirmar
							</Button>
						</div>
					</div>
				) : dayStatus === "paid" || dayStatus === "partial" ? (
					<div className="space-y-2">
						<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
							<span className="text-xs text-slate-600">Estado</span>
							<div className="flex items-center gap-1">
								{dayStatus === "paid" && (
									<Check size={12} className="text-emerald-600" />
								)}
								{dayStatus === "partial" && (
									<X size={12} className="text-amber-600" />
								)}
								<span
									className={cn(
										"text-xs font-bold px-2 py-0.5 rounded",
										getStatusColor(dayStatus),
									)}
								>
									{getStatusText(dayStatus)}
								</span>
							</div>
						</div>
						<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
							<span className="text-xs text-slate-600">Valor</span>
							<span className="text-xs font-bold text-slate-900">
								{amount?.toLocaleString()} MZN
							</span>
						</div>
						<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
							<span className="text-xs text-slate-600 flex items-center gap-1">
								<User size={12} />
								Coletor
							</span>
							<span className="text-xs font-bold text-slate-900">
								{collector || "N/A"}
							</span>
						</div>
						<div className="flex gap-2 pt-2">
							<Button
								size="sm"
								variant="outline"
								onClick={onEdit}
								className="flex-1 text-xs"
							>
								Editar
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={onDelete}
								className="flex-1 border-red-300 text-red-600 hover:bg-red-50 text-xs"
							>
								Eliminar
							</Button>
						</div>
					</div>
				) : (
					<div className="space-y-2">
						<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
							<span className="text-xs text-slate-600">Estado</span>
							<span
								className={cn(
									"text-xs font-bold px-2 py-0.5 rounded",
									getStatusColor(dayStatus),
								)}
							>
								{getStatusText(dayStatus)}
							</span>
						</div>
						<div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
							<span className="text-xs text-slate-600">Valor</span>
							<span className="text-xs font-bold text-slate-900">
								{amount?.toLocaleString() || saverDailyAmount.toLocaleString()}{" "}
								MZN
							</span>
						</div>
						{dayStatus === "in_debt" ? (
							<div className="flex gap-2 pt-2">
								<Button
									size="sm"
									onClick={() => {
										setDepositType("normal");
										setShowDepositForm(true);
									}}
									className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
									leftIcon={<DollarSign size={14} />}
								>
									Depósito Normal
								</Button>
								<Button
									size="sm"
									onClick={() => {
										setDepositType("debt_payment");
										setShowDepositForm(true);
									}}
									className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs"
									leftIcon={<DollarSign size={14} />}
								>
									Pagar Dívida
								</Button>
							</div>
						) : (
							<Button
								size="sm"
								onClick={() => setShowDepositForm(true)}
								className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
								leftIcon={<DollarSign size={14} />}
							>
								Registrar Depósito
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

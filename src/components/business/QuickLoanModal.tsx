import { AlertCircle, CheckCircle2, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface QuickLoanModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: LoanData) => void;
	saverName?: string;
	maxLoanAmount?: number;
	dailyDepositAmount?: number;
	currentSavings?: number;
}

interface LoanData {
	amount: string;
	reason: string;
	isEmergency: boolean;
	repaymentDate: string;
	loanToProvide?: number;
	interestAmount?: number;
	commissionAmount?: number;
	totalToRepay?: number;
	repaymentDays?: number;
}

export function QuickLoanModal({
	isOpen,
	onClose,
	onSubmit,
	saverName,
	maxLoanAmount = 50000,
	dailyDepositAmount = 100,
	currentSavings = 0,
}: QuickLoanModalProps) {
	const INTEREST_RATE = 10;
	const COMMISSION_AMOUNT = dailyDepositAmount;

	const [formData, setFormData] = useState<LoanData>({
		amount: "",
		reason: "",
		isEmergency: false,
		repaymentDate: "",
	});

	// Calculate eligibility
	const requiredSavings = (Number(formData.amount) * INTEREST_RATE) / 100;
	const isEligible = currentSavings >= requiredSavings;

	// Calculate loan details
	const loanToProvide = Math.max(0, Number(formData.amount) - currentSavings);
	const interestAmount = Math.round((loanToProvide * INTEREST_RATE) / 100);
	const totalToRepay = loanToProvide + interestAmount;
	const repaymentDays = Math.ceil(totalToRepay / dailyDepositAmount);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const submissionData = {
			...formData,
			loanToProvide,
			interestAmount,
			commissionAmount: COMMISSION_AMOUNT,
			totalToRepay,
			repaymentDays,
		};
		onSubmit(submissionData);
		toast.success("Empréstimo solicitado com sucesso");
		onClose();
	};

	const handleCancel = () => {
		setFormData({
			amount: "",
			reason: "",
			isEmergency: false,
			repaymentDate: "",
		});
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCancel}
			title="Solicitar Empréstimo"
			size="sm"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				{saverName && (
					<div className="bg-slate-50 p-3 rounded-lg">
						<p className="text-sm text-slate-600">
							Empréstimo para:{" "}
							<span className="font-semibold text-slate-900">{saverName}</span>
						</p>
					</div>
				)}

				<div>
					<label
						htmlFor="amount"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Valor do Empréstimo (MZN) *
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Wallet size={16} className="text-slate-400" />
						</div>
						<input
							id="amount"
							type="number"
							placeholder="0.00"
							required
							value={formData.amount}
							onChange={(e) =>
								setFormData({ ...formData, amount: e.target.value })
							}
							className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							min="0"
							max={maxLoanAmount}
							step="0.01"
						/>
					</div>
					<p className="text-xs text-slate-500 mt-1">
						Máximo disponível: {maxLoanAmount.toLocaleString()} MZN
					</p>
				</div>

				{formData.amount && !isEligible && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-3">
						<p className="text-sm text-red-700">
							⚠️ Poupança insuficiente. Você precisa de pelo menos:
							{requiredSavings.toLocaleString()} MZN (10% do valor solicitado)
						</p>
						<p className="text-xs text-red-600 mt-1">
							Poupança atual: {currentSavings.toLocaleString()} MZN
						</p>
					</div>
				)}

				{formData.amount && isEligible && (
					<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-slate-600">Valor Solicitado:</span>
							<span className="font-semibold">
								{Number(formData.amount).toLocaleString()} MZN
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-slate-600">Poupança Atual:</span>
							<span className="font-semibold">
								{currentSavings.toLocaleString()} MZN
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-slate-600">Valor a Receber:</span>
							<span className="font-bold text-emerald-700">
								{loanToProvide.toLocaleString()} MZN
							</span>
						</div>
						<div className="border-t border-emerald-200 pt-2">
							<div className="flex justify-between text-sm">
								<span className="text-slate-600">Comissão (1 dia):</span>
								<span className="font-semibold text-amber-600">
									{COMMISSION_AMOUNT} MZN
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span className="text-slate-600">Juros (10%):</span>
								<span className="font-semibold text-amber-600">
									{interestAmount.toLocaleString()} MZN
								</span>
							</div>
							<div className="text-xs text-slate-500 mt-1 italic">
								* Serão deduzidos durante o mês
							</div>
						</div>
						<div className="border-t border-emerald-200 pt-2 flex justify-between">
							<span className="text-slate-700 font-medium">
								Total a Repagar:
							</span>
							<span className="font-bold text-emerald-700">
								{totalToRepay.toLocaleString()} MZN
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-slate-600">Seu depósito diário:</span>
							<span className="font-semibold">{dailyDepositAmount} MZN</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-slate-600">Dias para pagar:</span>
							<span className="font-bold text-emerald-600">
								{repaymentDays} dias
							</span>
						</div>
					</div>
				)}

				<div>
					<label
						htmlFor="reason"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Motivo do Empréstimo *
					</label>
					<input
						id="reason"
						type="text"
						placeholder="Descreva o motivo do empréstimo..."
						required
						value={formData.reason}
						onChange={(e) =>
							setFormData({ ...formData, reason: e.target.value })
						}
						className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
					/>
				</div>

				<div>
					<label
						htmlFor="repaymentDate"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Data de Pagamento Prevista *
					</label>
					<input
						id="repaymentDate"
						type="date"
						required
						value={formData.repaymentDate}
						onChange={(e) =>
							setFormData({ ...formData, repaymentDate: e.target.value })
						}
						className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
					/>
				</div>

				<div className="flex items-center gap-3">
					<input
						type="checkbox"
						id="isEmergency"
						checked={formData.isEmergency}
						onChange={(e) =>
							setFormData({ ...formData, isEmergency: e.target.checked })
						}
						className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
					/>
					<label
						htmlFor="isEmergency"
						className="flex items-center gap-2 text-sm text-slate-700"
					>
						<AlertCircle size={16} className="text-amber-500" />
						<span>Empréstimo de Emergência</span>
					</label>
				</div>

				{formData.isEmergency && (
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
						<p className="text-xs text-amber-800">
							⚠️ Empréstimos de emergência são processados prioritariamente mas
							podem ter taxas mais elevadas.
						</p>
					</div>
				)}

				<ModalFooter>
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit" leftIcon={<CheckCircle2 size={16} />}>
						Solicitar Empréstimo
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

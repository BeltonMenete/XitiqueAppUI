import {
	AlertTriangle,
	Calendar,
	Check,
	DollarSign,
	TrendingUp,
	X,
} from "lucide-react";
import { useState } from "react";
import { SuperModal } from "#/components/interactive";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { cn } from "#/lib/design-system";

interface LoanRequest {
	id: string;
	clientName: string;
	cardNumber: string;
	totalSaved: number;
	daysInCycle: number;
	requestedAmount: number;
	cycleProgress: number;
	currentDebt: number;
}

interface LoanApprovalModalProps {
	isOpen: boolean;
	onClose: () => void;
	loanRequest: LoanRequest;
	onApprove: (data: LoanApprovalData) => void;
	onReject: (reason: string) => void;
}

interface LoanApprovalData {
	approvedAmount: number;
	interestRate: number;
	repaymentPeriod: number;
	monthlyPayment: number;
	totalToRepay: number;
}

export function LoanApprovalModal({
	isOpen,
	onClose,
	loanRequest,
	onApprove,
	onReject,
}: LoanApprovalModalProps) {
	const [formData, setFormData] = useState<LoanApprovalData>({
		approvedAmount: loanRequest.requestedAmount,
		interestRate: 10,
		repaymentPeriod: 3,
		monthlyPayment: 0,
		totalToRepay: 0,
	});

	const [rejectReason, setRejectReason] = useState("");
	const [showRejectForm, setShowRejectForm] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleAmountChange = (value: number) => {
		const newInterest = (value * formData.interestRate) / 100;
		const newTotal = value + newInterest;
		const newMonthly = Math.round(newTotal / formData.repaymentPeriod);
		setFormData({
			...formData,
			approvedAmount: value,
			totalToRepay: Math.round(newTotal),
			monthlyPayment: newMonthly,
		});
	};

	const handleInterestChange = (value: number) => {
		const newInterest = (formData.approvedAmount * value) / 100;
		const newTotal = formData.approvedAmount + newInterest;
		const newMonthly = Math.round(newTotal / formData.repaymentPeriod);
		setFormData({
			...formData,
			interestRate: value,
			totalToRepay: Math.round(newTotal),
			monthlyPayment: newMonthly,
		});
	};

	const handlePeriodChange = (value: number) => {
		const newMonthly = Math.round(formData.totalToRepay / value);
		setFormData({
			...formData,
			repaymentPeriod: value,
			monthlyPayment: newMonthly,
		});
	};

	const maxLoanAmount = loanRequest.totalSaved * 2;

	const handleApprove = () => {
		const newErrors: Record<string, string> = {};

		if (formData.approvedAmount > maxLoanAmount) {
			newErrors.approvedAmount = `Valor máximo permitido: ${maxLoanAmount.toLocaleString()} MZN`;
		}

		if (formData.approvedAmount < 1000) {
			newErrors.approvedAmount = "Valor mínimo: 1.000 MZN";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		onApprove(formData);
		onClose();
	};

	const handleReject = () => {
		if (!rejectReason.trim()) {
			setErrors({ rejectReason: "Por favor, indique o motivo da rejeição" });
			return;
		}

		onReject(rejectReason);
		onClose();
	};

	const riskLevel =
		loanRequest.currentDebt > 0
			? "high"
			: loanRequest.daysInCycle < 15
				? "medium"
				: "low";

	const getRiskColor = (level: string) => {
		switch (level) {
			case "high":
				return "text-red-500 bg-red-500/10 border-red-500/20";
			case "medium":
				return "text-amber-500 bg-amber-500/10 border-amber-500/20";
			default:
				return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
		}
	};

	return (
		<SuperModal
			isOpen={isOpen}
			onClose={onClose}
			title="Aprovação de Empréstimo"
			size="lg"
		>
			<div className="space-y-6">
				{/* Client Info */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
								{String(loanRequest.clientName).charAt(0)}
							</div>
							<div className="flex-1">
								<h3 className="font-semibold text-slate-900">
									{loanRequest.clientName}
								</h3>
								<p className="text-sm text-slate-600 font-mono">
									{loanRequest.cardNumber}
								</p>
								<div className="flex items-center gap-4 mt-2 text-sm">
									<div className="flex items-center gap-1">
										<DollarSign size={14} className="text-slate-400" />
										<span className="text-slate-600">
											{loanRequest.totalSaved.toLocaleString()} MZN poupado
										</span>
									</div>
									<div className="flex items-center gap-1">
										<Calendar size={14} className="text-slate-400" />
										<span className="text-slate-600">
											{loanRequest.daysInCycle}/30 dias
										</span>
									</div>
								</div>
							</div>
							<div
								className={cn(
									"px-3 py-1 rounded-full text-xs font-semibold border",
									getRiskColor(riskLevel),
								)}
							>
								Risco{" "}
								{riskLevel === "high"
									? "Alto"
									: riskLevel === "medium"
										? "Médio"
										: "Baixo"}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Loan Request Details */}
				<Card>
					<CardContent className="p-4">
						<h4 className="font-semibold text-slate-900 text-sm mb-3">
							Detalhes do Pedido
						</h4>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-slate-600 mb-1">Valor Solicitado</p>
								<p className="text-lg font-bold text-slate-900">
									{loanRequest.requestedAmount.toLocaleString()} MZN
								</p>
							</div>
							<div>
								<p className="text-xs text-slate-600 mb-1">
									Valor Máximo Disponível
								</p>
								<p className="text-lg font-bold text-emerald-600">
									{maxLoanAmount.toLocaleString()} MZN
								</p>
							</div>
							<div>
								<p className="text-xs text-slate-600 mb-1">
									Progresso do Ciclo
								</p>
								<div className="flex items-center gap-2">
									<div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
										<div
											className="h-full bg-secondary"
											style={{ width: `${loanRequest.cycleProgress}%` }}
										/>
									</div>
									<span className="text-sm font-medium text-slate-900">
										{loanRequest.cycleProgress}%
									</span>
								</div>
							</div>
							<div>
								<p className="text-xs text-slate-600 mb-1">Dívida Atual</p>
								<p
									className={cn(
										"text-lg font-bold",
										loanRequest.currentDebt > 0
											? "text-red-500"
											: "text-slate-900",
									)}
								>
									{loanRequest.currentDebt.toLocaleString()} MZN
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Loan Calculator */}
				<Card>
					<CardContent className="p-4">
						<h4 className="font-semibold text-slate-900 text-sm mb-4 flex items-center gap-2">
							<TrendingUp size={16} />
							Calculadora de Empréstimo
						</h4>
						<div className="space-y-4">
							<div>
								<label
									htmlFor="approved-amount"
									className="block text-xs font-semibold text-slate-600 mb-2"
								>
									Valor a Aprovar (MZN)
								</label>
								<input
									id="approved-amount"
									type="number"
									value={formData.approvedAmount}
									onChange={(e) => handleAmountChange(Number(e.target.value))}
									max={maxLoanAmount}
									min={1000}
									className={cn(
										"w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20",
										errors.approvedAmount
											? "border-status-error focus:border-red-500"
											: "border-slate-200 focus:border-emerald-600",
									)}
								/>
								{errors.approvedAmount && (
									<p className="text-xs text-red-500 mt-1">
										{errors.approvedAmount}
									</p>
								)}
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="interest-rate"
										className="block text-xs font-semibold text-slate-600 mb-2"
									>
										Taxa de Juro (%)
									</label>
									<input
										id="interest-rate"
										type="number"
										value={formData.interestRate}
										onChange={(e) =>
											handleInterestChange(Number(e.target.value))
										}
										min={5}
										max={20}
										className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
									/>
								</div>
								<div>
									<label
										htmlFor="repayment-period"
										className="block text-xs font-semibold text-slate-600 mb-2"
									>
										Período de Pagamento (meses)
									</label>
									<input
										id="repayment-period"
										type="number"
										value={formData.repaymentPeriod}
										onChange={(e) => handlePeriodChange(Number(e.target.value))}
										min={1}
										max={12}
										className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
									/>
								</div>
							</div>

							{/* Calculation Results */}
							<div className="p-4 bg-slate-100 rounded-lg space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm text-slate-600">
										Total a Repagar
									</span>
									<span className="text-lg font-bold text-slate-900">
										{formData.totalToRepay.toLocaleString()} MZN
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-slate-600">
										Pagamento Mensal
									</span>
									<span className="text-lg font-bold text-emerald-600">
										{formData.monthlyPayment.toLocaleString()} MZN
									</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm text-slate-600">Juros Totais</span>
									<span className="text-sm font-medium text-slate-900">
										{(
											formData.totalToRepay - formData.approvedAmount
										).toLocaleString()}{" "}
										MZN
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Risk Warning */}
				{riskLevel === "high" && (
					<div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
						<AlertTriangle
							size={20}
							className="text-red-500 flex-shrink-0 mt-0.5"
						/>
						<div>
							<h4 className="font-semibold text-red-500 text-sm">
								Aviso de Risco
							</h4>
							<p className="text-sm text-red-500 mt-1">
								Este cliente possui dívida activa. Recomenda-se uma avaliação
								cuidadosa antes de aprovar o empréstimo.
							</p>
						</div>
					</div>
				)}

				{/* Actions */}
				<div className="flex items-center gap-3 pt-4 border-t border-slate-200">
					{showRejectForm ? (
						<>
							<input
								type="text"
								placeholder="Motivo da rejeição..."
								value={rejectReason}
								onChange={(e) => setRejectReason(e.target.value)}
								className={cn(
									"flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2",
									errors.rejectReason
										? "border-status-error focus:border-red-500"
										: "border-slate-200 focus:border-emerald-600",
								)}
							/>
							<Button
								size="sm"
								variant="ghost"
								onClick={() => setShowRejectForm(false)}
							>
								Cancelar
							</Button>
							<Button size="sm" variant="danger" onClick={handleReject}>
								<X size={16} className="mr-1" />
								Confirmar Rejeição
							</Button>
						</>
					) : (
						<>
							<Button
								size="sm"
								variant="outline"
								onClick={() => setShowRejectForm(true)}
							>
								<X size={16} className="mr-1" />
								Rejeitar
							</Button>
							<div className="flex-1" />
							<Button size="sm" variant="ghost" onClick={onClose}>
								Cancelar
							</Button>
							<Button size="sm" onClick={handleApprove}>
								<Check size={16} className="mr-1" />
								Aprovar Empréstimo
							</Button>
						</>
					)}
				</div>
			</div>
		</SuperModal>
	);
}

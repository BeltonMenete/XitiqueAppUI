import { AlertCircle, CheckCircle2, Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface QuickLoanModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: LoanData) => void;
	saverName?: string;
	maxLoanAmount?: number;
}

interface LoanData {
	amount: string;
	reason: string;
	isEmergency: boolean;
	repaymentDate: string;
}

export function QuickLoanModal({
	isOpen,
	onClose,
	onSubmit,
	saverName,
	maxLoanAmount = 50000,
}: QuickLoanModalProps) {
	const [formData, setFormData] = useState<LoanData>({
		amount: "",
		reason: "",
		isEmergency: false,
		repaymentDate: "",
	});

	const [showToast, setShowToast] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
			onClose();
		}, 2000);
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
		<>
			<Modal
				isOpen={isOpen}
				onClose={handleCancel}
				title="Solicitar Empréstimo"
				size="md"
			>
				<form onSubmit={handleSubmit} className="space-y-4">
					{saverName && (
						<div className="bg-slate-50 p-3 rounded-lg">
							<p className="text-sm text-slate-600">
								Empréstimo para:{" "}
								<span className="font-semibold text-slate-900">
									{saverName}
								</span>
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

			{/* Toast Notification */}
			{showToast && (
				<div className="fixed bottom-6 right-6 bg-white border-l-4 border-emerald-500 shadow-lg rounded-lg p-4 transform transition-all duration-300 z-50 flex items-start gap-4 max-w-sm">
					<CheckCircle2 className="text-emerald-500 mt-0.5" size={20} />
					<div className="flex-1">
						<h4 className="text-sm font-medium text-slate-900">
							Solicitação Enviada
						</h4>
						<p className="text-xs text-slate-500 mt-1">
							O empréstimo será analisado e você receberá uma resposta breve.
						</p>
					</div>
				</div>
			)}
		</>
	);
}

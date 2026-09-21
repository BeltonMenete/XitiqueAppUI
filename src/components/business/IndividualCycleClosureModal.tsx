import {
	AlertTriangle,
	Calendar,
	RefreshCw,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { Modal, ModalFooter } from "#/components/ui/Modal";
import type { Saver } from "#/features/savers/types";

interface IndividualCycleClosureModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: IndividualCycleClosureData) => void;
	saver: Saver;
	currentMonth: string;
}

interface IndividualCycleClosureData {
	transferDebtDays: boolean;
	reactivateNextCycle: boolean;
	sendNotification: boolean;
}

export function IndividualCycleClosureModal({
	isOpen,
	onClose,
	onSubmit,
	saver,
	currentMonth,
}: IndividualCycleClosureModalProps) {
	const [formData, setFormData] = useState<IndividualCycleClosureData>({
		transferDebtDays: true,
		reactivateNextCycle: false,
		sendNotification: true,
	});

	// Calculate cycle summary
	const calculateCycleSummary = () => {
		const paymentDays = saver.paymentDays || [];
		const paidDays = paymentDays.filter((pd) => pd.paid).length;
		const debtPaymentDays = paymentDays.filter(
			(pd) => pd.paid && pd.isDebtPayment,
		).length;
		const unpaidDays = paymentDays.filter((pd) => !pd.paid).length;
		const totalSaved = saver.totalSaved || 0;
		const currentDebt = saver.currentDebt || 0;

		return {
			paidDays,
			debtPaymentDays,
			unpaidDays,
			totalSaved,
			currentDebt,
			daysInCycle: saver.daysInCycle || 0,
		};
	};

	const summary = calculateCycleSummary();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Fechar Ciclo do Ticante"
			size="md"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Client Info */}
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between mb-3">
							<h4 className="text-sm font-semibold text-slate-900">
								{saver.name}
							</h4>
							<span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-mono font-semibold border border-slate-200">
								ID: {saver.alphanumericId}
							</span>
						</div>
						<div className="flex items-center gap-2 text-xs text-slate-500">
							<Calendar size={14} />
							<span>Ciclo: {currentMonth}</span>
						</div>
					</CardContent>
				</Card>

				{/* Warning */}
				<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
					<div className="flex items-start gap-3">
						<AlertTriangle className="text-amber-600 mt-0.5" size={20} />
						<div>
							<p className="text-sm font-semibold text-amber-900">
								Ação Irreversível
							</p>
							<p className="text-xs text-amber-700">
								Ao fechar o ciclo, o cliente será marcado como inactivo e o
								ciclo actual será encerrado.
							</p>
						</div>
					</div>
				</div>

				{/* Cycle Summary */}
				<Card>
					<CardContent className="p-4">
						<h4 className="text-xs font-semibold text-slate-900 mb-3 flex items-center gap-2">
							<TrendingUp size={16} />
							Resumo do Ciclo
						</h4>
						<div className="space-y-2 text-xs">
							<div className="flex justify-between">
								<span className="text-slate-500">Dias no Ciclo:</span>
								<span className="font-semibold text-slate-900">
									{summary.daysInCycle}/30
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-500">Dias Pagos:</span>
								<span className="font-semibold text-emerald-600">
									{summary.paidDays}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-500">Dias de Dívida:</span>
								<span className="font-semibold text-amber-600">
									{summary.debtPaymentDays}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-500">Dias Não Pagos:</span>
								<span className="font-semibold text-slate-600">
									{summary.unpaidDays}
								</span>
							</div>
							<div className="border-t border-slate-200 pt-2 mt-2">
								<div className="flex justify-between">
									<span className="text-slate-500">Total Poupado:</span>
									<span className="font-semibold text-emerald-600">
										{summary.totalSaved.toLocaleString()} MZN
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-slate-500">Dívida Actual:</span>
									<span className="font-semibold text-red-600">
										{summary.currentDebt > 0
											? summary.currentDebt.toLocaleString()
											: "0"}{" "}
										MZN
									</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Options */}
				<div className="space-y-3">
					{summary.currentDebt > 0 && (
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="transferDebtDays"
								checked={formData.transferDebtDays}
								onChange={(e) =>
									setFormData({
										...formData,
										transferDebtDays: e.target.checked,
									})
								}
								className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
							/>
							<label
								htmlFor="transferDebtDays"
								className="text-sm text-slate-700"
							>
								Transferir {summary.debtPaymentDays} dias de dívida para o
								próximo ciclo
							</label>
						</div>
					)}
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="reactivateNextCycle"
							checked={formData.reactivateNextCycle}
							onChange={(e) =>
								setFormData({
									...formData,
									reactivateNextCycle: e.target.checked,
								})
							}
							className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
						/>
						<label
							htmlFor="reactivateNextCycle"
							className="text-sm text-slate-700"
						>
							Reactivar cliente no próximo ciclo
						</label>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="sendNotification"
							checked={formData.sendNotification}
							onChange={(e) =>
								setFormData({
									...formData,
									sendNotification: e.target.checked,
								})
							}
							className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
						/>
						<label
							htmlFor="sendNotification"
							className="text-sm text-slate-700"
						>
							Enviar notificação ao cliente
						</label>
					</div>
				</div>

				{/* Debt Warning */}
				{summary.currentDebt > 0 && !formData.transferDebtDays && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-3">
						<div className="flex items-start gap-2">
							<Wallet className="text-red-600 mt-0.5" size={16} />
							<p className="text-xs text-red-700">
								Atenção: Ao não transferir a dívida, o valor de{" "}
								{summary.currentDebt.toLocaleString()} MZN será considerado
								perdido.
							</p>
						</div>
					</div>
				)}

				<ModalFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancelar
					</Button>
					<Button leftIcon={<RefreshCw size={16} />} type="submit">
						Fechar Ciclo
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

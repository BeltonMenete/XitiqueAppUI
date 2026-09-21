import {
	AlertCircle,
	Banknote,
	Calendar,
	CheckCircle,
	Wallet,
	X,
} from "lucide-react";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface Transaction {
	id: string;
	clientName: string;
	amount: number;
	time: string;
	status: "synced" | "pending";
}

interface DateDetailModalProps {
	isOpen: boolean;
	onClose: () => void;
	dateDetails: {
		date: string;
		systemRecorded: number;
		physicalCounted: number;
		difference: number;
		isReconciled: boolean;
		recordedBy: string;
		notes?: string;
		transactions: Transaction[];
	} | null;
}

export function DateDetailModal({
	isOpen,
	onClose,
	dateDetails,
}: DateDetailModalProps) {
	if (!dateDetails) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Data">
			<div className="space-y-6">
				{/* Date Header */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Calendar size={20} className="text-slate-600" />
						<h3 className="text-lg font-semibold text-slate-900">
							{dateDetails.date}
						</h3>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
					>
						<X size={20} className="text-slate-500" />
					</button>
				</div>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
						<div className="flex items-center gap-2 mb-2">
							<Wallet size={16} className="text-slate-600" />
							<span className="text-xs font-semibold text-slate-600">
								Registado (Sistema)
							</span>
						</div>
						<p className="text-xl font-bold text-slate-900">
							{dateDetails.systemRecorded.toLocaleString()} MZN
						</p>
					</div>

					<div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
						<div className="flex items-center gap-2 mb-2">
							<Banknote size={16} className="text-slate-600" />
							<span className="text-xs font-semibold text-slate-600">
								Contabilizado (Físico)
							</span>
						</div>
						<p className="text-xl font-bold text-slate-900">
							{dateDetails.physicalCounted.toLocaleString()} MZN
						</p>
					</div>

					<div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
						<div className="flex items-center gap-2 mb-2">
							{dateDetails.isReconciled ? (
								<CheckCircle size={16} className="text-emerald-600" />
							) : (
								<AlertCircle size={16} className="text-amber-600" />
							)}
							<span className="text-xs font-semibold text-slate-600">
								Diferença
							</span>
						</div>
						<p
							className={`text-xl font-bold ${
								dateDetails.difference === 0
									? "text-slate-900"
									: dateDetails.difference > 0
										? "text-emerald-600"
										: "text-red-600"
							}`}
						>
							{dateDetails.difference > 0 ? "+" : ""}
							{dateDetails.difference.toLocaleString()} MZN
						</p>
					</div>
				</div>

				{/* Status and Notes */}
				<div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-medium text-slate-600">Status</span>
						<span
							className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
								dateDetails.isReconciled
									? "bg-emerald-100 text-emerald-800"
									: "bg-amber-100 text-amber-800"
							}`}
						>
							{dateDetails.isReconciled ? "Conciliado" : "Discrepância"}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-slate-600">
							Registado por:{" "}
							<span className="font-medium">{dateDetails.recordedBy}</span>
						</span>
					</div>
					{dateDetails.notes && (
						<div className="mt-2">
							<p className="text-sm text-slate-600">
								Notas: {dateDetails.notes}
							</p>
						</div>
					)}
				</div>

				{/* Transactions List */}
				<div>
					<h4 className="text-sm font-semibold text-slate-900 mb-3">
						Transações ({dateDetails.transactions.length})
					</h4>
					<div className="space-y-2 max-h-64 overflow-y-auto">
						{dateDetails.transactions.map((transaction) => (
							<div
								key={transaction.id}
								className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
							>
								<div className="flex-1">
									<p className="text-sm font-medium text-slate-900">
										{transaction.clientName}
									</p>
									<p className="text-xs text-slate-500">{transaction.time}</p>
								</div>
								<div className="flex items-center gap-3">
									<p className="text-sm font-semibold text-slate-900">
										{transaction.amount.toLocaleString()} MZN
									</p>
									<span
										className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
											transaction.status === "synced"
												? "bg-emerald-100 text-emerald-800"
												: "bg-amber-100 text-amber-800"
										}`}
									>
										{transaction.status === "synced"
											? "Sincronizado"
											: "Pendente"}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Reconcile Button if not reconciled */}
				{!dateDetails.isReconciled && (
					<Button className="w-full">Conciliar Diferença</Button>
				)}
			</div>

			<ModalFooter>
				<Button variant="outline" onClick={onClose}>
					Fechar
				</Button>
			</ModalFooter>
		</Modal>
	);
}

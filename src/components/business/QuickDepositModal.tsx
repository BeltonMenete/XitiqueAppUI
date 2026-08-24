import { CheckCircle2, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface QuickDepositModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: DepositData) => void;
	saverName?: string;
	lastAmount?: number;
}

interface DepositData {
	amount: string;
	date: string;
	notes?: string;
}

export function QuickDepositModal({
	isOpen,
	onClose,
	onSubmit,
	saverName,
	lastAmount,
}: QuickDepositModalProps) {
	const [formData, setFormData] = useState<DepositData>({
		amount: lastAmount ? String(lastAmount) : "",
		date: new Date().toISOString().split("T")[0],
		notes: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		toast.success("Depósito registrado com sucesso");
		onClose();
	};

	const handleCancel = () => {
		setFormData({
			amount: lastAmount ? String(lastAmount) : "",
			date: new Date().toISOString().split("T")[0],
			notes: "",
		});
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCancel}
			title="Registar Depósito"
			size="sm"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				{saverName && (
					<div className="bg-slate-50 p-3 rounded-lg">
						<p className="text-sm text-slate-600">
							Depositando para:{" "}
							<span className="font-semibold text-slate-900">{saverName}</span>
						</p>
					</div>
				)}

				<div>
					<label
						htmlFor="amount"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Valor do Depósito (MZN) *
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<DollarSign size={16} className="text-slate-400" />
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
							step="0.01"
						/>
					</div>
					{lastAmount && (
						<button
							type="button"
							onClick={() =>
								setFormData({ ...formData, amount: String(lastAmount) })
							}
							className="text-xs text-emerald-600 hover:text-emerald-700 mt-1"
						>
							Usar último valor: {lastAmount} MZN
						</button>
					)}
				</div>

				<div>
					<label
						htmlFor="date"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Data *
					</label>
					<input
						id="date"
						type="date"
						required
						value={formData.date}
						onChange={(e) => setFormData({ ...formData, date: e.target.value })}
						className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
					/>
				</div>

				<div>
					<label
						htmlFor="notes"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Notas (Opcional)
					</label>
					<textarea
						id="notes"
						placeholder="Observações sobre o depósito..."
						rows={2}
						value={formData.notes}
						onChange={(e) =>
							setFormData({ ...formData, notes: e.target.value })
						}
						className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
					/>
				</div>

				<ModalFooter>
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button type="submit" leftIcon={<CheckCircle2 size={16} />}>
						Confirmar Depósito
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

import { ArrowRight, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface QuickTransferModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: TransferData) => void;
	collectorName?: string;
	availableCollectors?: Array<{
		id: string;
		name: string;
		currentClients: number;
	}>;
}

interface TransferData {
	targetCollectorId: string;
	selectedClients: string[];
	transferReason?: string;
}

export function QuickTransferModal({
	isOpen,
	onClose,
	onSubmit,
	collectorName,
	availableCollectors = [],
}: QuickTransferModalProps) {
	const [formData, setFormData] = useState<TransferData>({
		targetCollectorId: "",
		selectedClients: [],
		transferReason: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		toast.success("Transferência realizada com sucesso");
		onClose();
	};

	const handleCancel = () => {
		setFormData({
			targetCollectorId: "",
			selectedClients: [],
			transferReason: "",
		});
		onClose();
	};

	const mockClients = [
		{ id: "1", name: "Ana Mabunda", currentSavings: 5000 },
		{ id: "2", name: "Sérgio Matsinhe", currentSavings: 12000 },
		{ id: "3", name: "Fátima Chissano", currentSavings: 8000 },
		{ id: "4", name: "José Mondlane", currentSavings: 3500 },
	];

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCancel}
			title="Transferir Clientes"
			size="lg"
		>
			<form onSubmit={handleSubmit} className="space-4">
				{collectorName && (
					<div className="bg-slate-50 p-3 rounded-lg">
						<p className="text-sm text-slate-600">
							Transferir clientes de:{" "}
							<span className="font-semibold text-slate-900">
								{collectorName}
							</span>
						</p>
					</div>
				)}

				<div>
					<label
						htmlFor="targetCollector"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Cobrador Destino *
					</label>
					<select
						id="targetCollector"
						required
						value={formData.targetCollectorId}
						onChange={(e) =>
							setFormData({ ...formData, targetCollectorId: e.target.value })
						}
						className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
					>
						<option value="">Selecione o cobrador destino...</option>
						{availableCollectors.map((collector) => (
							<option key={collector.id} value={collector.id}>
								{collector.name} ({collector.currentClients} clientes)
							</option>
						))}
					</select>
				</div>

				<div>
					<fieldset>
						<legend className="block text-sm font-medium text-slate-700 mb-3">
							Seleccionar Clientes a Transferir *
						</legend>
						<div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-64 overflow-y-auto">
							{mockClients.map((client) => (
								<div
									key={client.id}
									className="flex items-center gap-3 p-3 hover:bg-slate-50"
								>
									<input
										type="checkbox"
										id={`client-${client.id}`}
										checked={formData.selectedClients.includes(client.id)}
										onChange={(e) => {
											if (e.target.checked) {
												setFormData({
													...formData,
													selectedClients: [
														...formData.selectedClients,
														client.id,
													],
												});
											} else {
												setFormData({
													...formData,
													selectedClients: formData.selectedClients.filter(
														(id) => id !== client.id,
													),
												});
											}
										}}
										className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
									/>
									<label
										htmlFor={`client-${client.id}`}
										className="flex-1 cursor-pointer"
									>
										<div className="font-medium text-sm text-slate-900">
											{client.name}
										</div>
										<div className="text-xs text-slate-500">
											{client.currentSavings.toLocaleString()} MZN poupados
										</div>
									</label>
								</div>
							))}
						</div>
						<p className="text-xs text-slate-500 mt-2">
							{formData.selectedClients.length} cliente
							{formData.selectedClients.length !== 1 ? "s" : ""} seleccionado
							{formData.selectedClients.length !== 1 ? "s" : ""}
						</p>
					</fieldset>
				</div>

				<div>
					<label
						htmlFor="transferReason"
						className="block text-sm font-medium text-slate-700 mb-1"
					>
						Motivo da Transferência (Opcional)
					</label>
					<textarea
						id="transferReason"
						placeholder="Descreva o motivo da transferência..."
						rows={2}
						value={formData.transferReason}
						onChange={(e) =>
							setFormData({ ...formData, transferReason: e.target.value })
						}
						className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
					/>
				</div>

				<div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
					<div className="flex items-start gap-2">
						<Users size={16} className="text-blue-600 mt-0.5" />
						<div>
							<p className="text-xs text-blue-800 font-medium">
								Informação Importante
							</p>
							<p className="text-xs text-blue-700">
								Os clientes transferidos mantêm o seu histórico de poupança. O
								cobrador de destino terá acesso completo às informações.
							</p>
						</div>
					</div>
				</div>

				<ModalFooter>
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button
						type="submit"
						leftIcon={<ArrowRight size={16} />}
						disabled={formData.selectedClients.length === 0}
					>
						Transferir {formData.selectedClients.length} Cliente
						{formData.selectedClients.length !== 1 ? "s" : ""}
					</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

import { AlertTriangle, Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface CycleClosureModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CycleClosureData) => void;
	saverName?: string;
	currentMonth?: number;
	currentYear?: number;
}

interface CycleClosureData {
	month: number;
	year: number;
	processPayouts: boolean;
	rolloverActiveSavers: boolean;
	sendNotifications: boolean;
}

export function CycleClosureModal({
	isOpen,
	onClose,
	onSubmit,
	currentMonth = 5,
	currentYear = 2024,
}: CycleClosureModalProps) {
	const [formData, setFormData] = useState<CycleClosureData>({
		month: currentMonth,
		year: currentYear,
		processPayouts: true,
		rolloverActiveSavers: true,
		sendNotifications: true,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		onClose();
	};

	const months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Fechar Ciclo Mensal"
			size="md"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
					<div className="flex items-start gap-3">
						<AlertTriangle className="text-amber-600 mt-0.5" size={20} />
						<div>
							<p className="text-sm font-semibold text-amber-900">
								Ação Irreversível
							</p>
							<p className="text-xs text-amber-700">
								Ao fechar o ciclo, os pagamentos serão processados e o mês será
								encerrado para todos os ticantes.
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="month"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Mês *
						</label>
						<select
							id="month"
							value={formData.month}
							onChange={(e) =>
								setFormData({
									...formData,
									month: parseInt(e.target.value, 10),
								})
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							required
						>
							{months.map((month) => (
								<option key={month} value={months.indexOf(month) + 1}>
									{month}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="year"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Ano *
						</label>
						<input
							id="year"
							type="number"
							value={formData.year}
							onChange={(e) =>
								setFormData({ ...formData, year: parseInt(e.target.value, 10) })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							required
						/>
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="processPayouts"
							checked={formData.processPayouts}
							onChange={(e) =>
								setFormData({ ...formData, processPayouts: e.target.checked })
							}
							className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
						/>
						<label htmlFor="processPayouts" className="text-sm text-slate-700">
							Processar pagamentos automáticos
						</label>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="rolloverActiveSavers"
							checked={formData.rolloverActiveSavers}
							onChange={(e) =>
								setFormData({
									...formData,
									rolloverActiveSavers: e.target.checked,
								})
							}
							className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
						/>
						<label
							htmlFor="rolloverActiveSavers"
							className="text-sm text-slate-700"
						>
							Rollover para ticantes activos
						</label>
					</div>
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="sendNotifications"
							checked={formData.sendNotifications}
							onChange={(e) =>
								setFormData({
									...formData,
									sendNotifications: e.target.checked,
								})
							}
							className="w-4 h-4 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500/20"
						/>
						<label
							htmlFor="sendNotifications"
							className="text-sm text-slate-700"
						>
							Enviar notificações aos ticantes
						</label>
					</div>
				</div>

				<Card>
					<CardContent className="p-4">
						<h4 className="text-xs font-semibold text-slate-900 mb-3 flex items-center gap-2">
							<Calendar size={16} />
							Resumo do Ciclo - {months[formData.month - 1]} {formData.year}
						</h4>
						<div className="space-y-2 text-xs">
							<div className="flex justify-between">
								<span className="text-slate-500">Ticantes Activos:</span>
								<span className="font-semibold text-slate-900">318</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-500">Total a Pagar:</span>
								<span className="font-semibold text-emerald-600">
									450.000 MZN
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-slate-500">Em Incumprimento:</span>
								<span className="font-semibold text-red-600">4 ticantes</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<ModalFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancelar
					</Button>
					<Button leftIcon={<RefreshCw size={16} />}>Fechar Ciclo</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

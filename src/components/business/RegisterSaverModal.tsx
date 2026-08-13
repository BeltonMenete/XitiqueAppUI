import { useState } from "react";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface RegisterSaverModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: RegisterSaverData) => void;
}

interface RegisterSaverData {
	cardNumber: string;
	name: string;
	phone: string;
	dailyAmount: string;
	organizationId: string;
	contact?: string;
	identityDocument?: string;
	pin?: string;
	occupation?: string;
}

export function RegisterSaverModal({
	isOpen,
	onClose,
	onSubmit,
}: RegisterSaverModalProps) {
	const [formData, setFormData] = useState<RegisterSaverData>({
		cardNumber: "",
		name: "",
		phone: "",
		dailyAmount: "",
		organizationId: "",
		contact: "",
		identityDocument: "",
		pin: "",
		occupation: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Registar Novo Ticante"
			size="lg"
		>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="cardNumber"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Número de Cartão *
						</label>
						<input
							id="cardNumber"
							type="number"
							value={formData.cardNumber}
							onChange={(e) =>
								setFormData({ ...formData, cardNumber: e.target.value })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							placeholder="Ex: 1001"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="name"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Nome Completo *
						</label>
						<input
							id="name"
							type="text"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							placeholder="Nome do ticante"
							required
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="phone"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Telefone *
						</label>
						<input
							id="phone"
							type="tel"
							value={formData.phone}
							onChange={(e) =>
								setFormData({ ...formData, phone: e.target.value })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							placeholder="+258 84 XXX XXXX"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="dailyAmount"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Valor Diário (MZN) *
						</label>
						<input
							id="dailyAmount"
							type="number"
							value={formData.dailyAmount}
							onChange={(e) =>
								setFormData({ ...formData, dailyAmount: e.target.value })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							placeholder="Ex: 500"
							required
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="contact"
						className="block text-xs font-semibold text-slate-700 mb-1"
					>
						Localização
					</label>
					<input
						id="contact"
						type="text"
						value={formData.contact}
						onChange={(e) =>
							setFormData({ ...formData, contact: e.target.value })
						}
						className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
						placeholder="Ex: Mercado Central, Maputo"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="identityDocument"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							Documento de Identidade
						</label>
						<input
							id="identityDocument"
							type="text"
							value={formData.identityDocument}
							onChange={(e) =>
								setFormData({ ...formData, identityDocument: e.target.value })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							placeholder="Número BI"
						/>
					</div>
					<div>
						<label
							htmlFor="pin"
							className="block text-xs font-semibold text-slate-700 mb-1"
						>
							PIN (Opcional)
						</label>
						<input
							id="pin"
							type="text"
							value={formData.pin}
							onChange={(e) =>
								setFormData({ ...formData, pin: e.target.value })
							}
							className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							placeholder="4-6 dígitos"
							maxLength={6}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="occupation"
						className="block text-xs font-semibold text-slate-700 mb-1"
					>
						Profissão
					</label>
					<input
						id="occupation"
						type="text"
						value={formData.occupation}
						onChange={(e) =>
							setFormData({ ...formData, occupation: e.target.value })
						}
						className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
						placeholder="Ex: Vendedor"
					/>
				</div>

				<ModalFooter>
					<Button variant="secondary" onClick={onClose}>
						Cancelar
					</Button>
					<Button type="submit">Registar Ticante</Button>
				</ModalFooter>
			</form>
		</Modal>
	);
}

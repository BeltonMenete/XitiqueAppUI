import { Camera, CheckCircle2, Mail, Phone, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/Button";
import { Modal, ModalFooter } from "#/components/ui/Modal";

interface RegisterCollectorModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CollectorData) => void;
}

interface CollectorData {
	name: string;
	phone: string;
	email?: string;
	observations?: string;
	isActive: boolean;
}

export function RegisterCollectorModal({
	isOpen,
	onClose,
	onSubmit,
}: RegisterCollectorModalProps) {
	const [formData, setFormData] = useState<CollectorData>({
		name: "",
		phone: "",
		email: "",
		observations: "",
		isActive: true,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
		toast.success("Cobrador registado com sucesso");
		onClose();
	};

	const handleCancel = () => {
		setFormData({
			name: "",
			phone: "",
			email: "",
			observations: "",
			isActive: true,
		});
		onClose();
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleCancel} title="Registar Cobrador">
				<form onSubmit={handleSubmit} className="space-4">
					{/* Photo Upload */}
					<div className="flex flex-col items-center justify-center mb-4">
						<div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 cursor-pointer hover:border-emerald-500 transition-colors relative overflow-hidden group">
							<Camera className="text-slate-400 text-3xl group-hover:text-emerald-500 transition-colors" />
						</div>
						<span className="text-sm text-slate-500 mt-2">Adicionar Foto</span>
					</div>

					{/* Name Input */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Nome completo <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<User className="text-slate-400" size={18} />
							</div>
							<input
								id="name"
								type="text"
								placeholder="Ex: João Silva"
								required
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							/>
						</div>
					</div>

					{/* Phone Input */}
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Telefone <span className="text-red-500">*</span>
						</label>
						<div className="flex border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-colors bg-white">
							<div className="bg-slate-100 px-3 py-2 flex items-center border-r border-slate-200">
								<span className="font-mono text-slate-500">+258</span>
							</div>
							<div className="relative flex-1">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Phone className="text-slate-400" size={18} />
								</div>
								<input
									id="phone"
									type="tel"
									placeholder="8X XXX XXXX"
									required
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									className="block w-full pl-10 pr-3 py-2 bg-transparent border-none focus:ring-0 font-mono text-slate-900 placeholder:text-slate-400 outline-none"
								/>
							</div>
						</div>
					</div>

					{/* Email Input */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Email <span className="text-slate-400">(Opcional)</span>
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Mail className="text-slate-400" size={18} />
							</div>
							<input
								id="email"
								type="email"
								placeholder="exemplo@email.com"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
							/>
						</div>
					</div>

					{/* Observations */}
					<div>
						<label
							htmlFor="observations"
							className="block text-sm font-medium text-slate-700 mb-1"
						>
							Observações <span className="text-slate-400">(Opcional)</span>
						</label>
						<textarea
							id="observations"
							placeholder="Trabalha região X..."
							rows={2}
							value={formData.observations}
							onChange={(e) =>
								setFormData({ ...formData, observations: e.target.value })
							}
							className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
						/>
					</div>

					{/* Status Toggle */}
					<div className="flex items-center justify-between pt-2 border-t border-slate-200">
						<div>
							<span className="text-sm font-medium text-slate-900">
								Status do Cobrador
							</span>
							<p className="text-xs text-slate-500">
								Define se o cobrador pode aceder à App
							</p>
						</div>
						<label className="relative inline-flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={formData.isActive}
								onChange={(e) =>
									setFormData({ ...formData, isActive: e.target.checked })
								}
								className="sr-only peer"
							/>
							<div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
							<span className="ml-3 text-xs font-medium text-slate-600 peer-checked:text-emerald-600">
								Ativo
							</span>
						</label>
					</div>
				</form>

				<ModalFooter>
					<Button variant="outline" onClick={handleCancel}>
						Cancelar
					</Button>
					<Button
						type="submit"
						onClick={handleSubmit}
						leftIcon={<CheckCircle2 size={16} />}
					>
						Salvar
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

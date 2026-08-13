import {
	Building2,
	Layers,
	BellRing,
	Ruler,
	Trash2,
	Upload,
} from "lucide-react";
import { useState } from "react";
import { InlineEditor, SuperModalWithTabs } from "#/components/interactive";
import { Button } from "#/components/ui/Button";
import { Card, CardContent } from "#/components/ui/Card";
import { cn } from "#/lib/design-system";

interface SettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: SettingsData) => void;
}

interface SettingsData {
	organizationName: string;
	province: string;
	district: string;
	phone: string;
	dailyCommissionRate: number;
	loanInterestRate: number;
	gracePeriodDays: number;
	notificationsEnabled: boolean;
	autoApproveLoans: boolean;
}

export function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
	const [formData, setFormData] = useState<SettingsData>({
		organizationName: "Xitique Central",
		province: "Maputo Cidade",
		district: "Maputo",
		phone: "+258 84 123 4567",
		dailyCommissionRate: 5,
		loanInterestRate: 10,
		gracePeriodDays: 3,
		notificationsEnabled: true,
		autoApproveLoans: false,
	});

	const [activeTab, _setActiveTab] = useState("general");

	const tabs = [
		{
			id: "general",
			label: "Geral",
			icon: <Building2 size={18} />,
			content: (
				<div className="space-y-6">
					{/* Logo Upload */}
					<div className="flex items-start gap-4">
						<div className="w-24 h-24 rounded-lg bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-secondary transition-colors relative overflow-hidden group">
							<Upload
								size={32}
								className="text-slate-400 group-hover:text-emerald-600 transition-colors"
							/>
						</div>
						<div className="flex-1 space-y-2">
							<h4 className="font-semibold text-slate-900">
								Logotipo da Organização
							</h4>
							<p className="text-sm text-slate-600">
								Recomendado: PNG ou JPG, máx 2MB. Proporção 1:1.
							</p>
							<div className="flex gap-2">
								<Button size="sm" variant="outline">
									Fazer Upload
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="text-red-500 hover:bg-red-500/10"
								>
									<Trash2 size={16} className="mr-1" />
									Remover
								</Button>
							</div>
						</div>
					</div>

					{/* Organization Info */}
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-semibold text-slate-900 mb-2">
								Nome da Organização
							</label>
							<InlineEditor
								value={formData.organizationName}
								onSave={(value) =>
									setFormData({ ...formData, organizationName: value })
								}
								placeholder="Nome da organização"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-semibold text-slate-900 mb-2">
									Província
								</label>
								<select
									value={formData.province}
									onChange={(e) =>
										setFormData({ ...formData, province: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 bg-white"
								>
									<option value="Maputo Cidade">Maputo Cidade</option>
									<option value="Maputo Província">Maputo Província</option>
									<option value="Gaza">Gaza</option>
									<option value="Inhambane">Inhambane</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-semibold text-slate-900 mb-2">
									Distrito
								</label>
								<select
									value={formData.district}
									onChange={(e) =>
										setFormData({ ...formData, district: e.target.value })
									}
									className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 bg-white"
								>
									<option value="Maputo">Maputo</option>
									<option value="Matola">Matola</option>
									<option value="Boane">Boane</option>
								</select>
							</div>
						</div>

						<div>
							<label className="block text-sm font-semibold text-slate-900 mb-2">
								Telefone
							</label>
							<InlineEditor
								value={formData.phone}
								onSave={(value) => setFormData({ ...formData, phone: value })}
								placeholder="+258 84 123 4567"
								type="tel"
							/>
						</div>
					</div>
				</div>
			),
		},
		{
			id: "rules",
			label: "Regras Operacionais",
			icon: <Ruler size={18} />,
			content: (
				<div className="space-y-6">
					<Card>
						<CardContent className="p-4">
							<h4 className="font-semibold text-slate-900 mb-4">
								Comissões e Taxas
							</h4>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-600 mb-2">
										Taxa de Comissão Diária (%)
									</label>
									<InlineEditor
										value={String(formData.dailyCommissionRate)}
										onSave={(value) =>
											setFormData({
												...formData,
												dailyCommissionRate: Number(value),
											})
										}
										type="number"
										placeholder="5"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-600 mb-2">
										Taxa de Juro para Empréstimos (%)
									</label>
									<InlineEditor
										value={String(formData.loanInterestRate)}
										onSave={(value) =>
											setFormData({
												...formData,
												loanInterestRate: Number(value),
											})
										}
										type="number"
										placeholder="10"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-600 mb-2">
										Período de Carência (dias)
									</label>
									<InlineEditor
										value={String(formData.gracePeriodDays)}
										onSave={(value) =>
											setFormData({
												...formData,
												gracePeriodDays: Number(value),
											})
										}
										type="number"
										placeholder="3"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<h4 className="font-semibold text-slate-900 mb-4">
								Regras de Ciclo
							</h4>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
									<div>
										<p className="text-sm font-medium text-slate-900">
											Transportar dias não pagos
										</p>
										<p className="text-xs text-slate-400">
											Dias não pagos são transportados para o próximo ciclo
										</p>
									</div>
									<div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
										<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
									</div>
								</div>

								<div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
									<div>
										<p className="text-sm font-medium text-slate-900">
											Multa por incumprimento
										</p>
										<p className="text-xs text-slate-400">
											Aplicar multa de 1 dia por ciclo incompleto
										</p>
									</div>
									<div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
										<div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full" />
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			),
		},
		{
			id: "modules",
			label: "Módulos Activos",
			icon: <Layers size={18} />,
			content: (
				<div className="space-y-4">
					{[
						{
							id: "savings",
							name: "Poupança",
							description: "Gestão de poupanças e depósitos",
							active: true,
						},
						{
							id: "loans",
							name: "Empréstimos",
							description: "Sistema de empréstimos com juros",
							active: true,
						},
						{
							id: "collectors",
							name: "Cobradores",
							description: "Gestão de equipa de campo",
							active: true,
						},
						{
							id: "reports",
							name: "Relatórios",
							description: "Análises e exportação de dados",
							active: false,
						},
						{
							id: "api",
							name: "Integração API",
							description: "Acesso a API para integrações",
							active: false,
						},
					].map((module) => (
						<div
							key={module.id}
							className={cn(
								"flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
								module.active
									? "border-secondary bg-secondary/5"
									: "border-slate-200 bg-slate-100 hover:border-slate-400",
							)}
						>
							<div>
								<h4 className="font-semibold text-slate-900">{module.name}</h4>
								<p className="text-sm text-slate-600">{module.description}</p>
							</div>
							<div
								className={cn(
									"w-12 h-6 rounded-full relative transition-colors",
									module.active ? "bg-secondary" : "bg-slate-200",
								)}
							>
								<div
									className={cn(
										"absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
										module.active ? "left-6" : "left-1",
									)}
								/>
							</div>
						</div>
					))}
				</div>
			),
		},
		{
			id: "notifications",
			label: "Notificações",
			icon: <BellRing size={18} />,
			content: (
				<div className="space-y-4">
					<Card>
						<CardContent className="p-4">
							<h4 className="font-semibold text-slate-900 mb-4">
								Configurações de Notificação
							</h4>
							<div className="space-y-3">
								<div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
									<div>
										<p className="text-sm font-medium text-slate-900">
											Notificações de Pagamento
										</p>
										<p className="text-xs text-slate-400">
											Receber alertas quando houver pagamentos
										</p>
									</div>
									<div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
										<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
									</div>
								</div>

								<div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
									<div>
										<p className="text-sm font-medium text-slate-900">
											Alertas de Dívida
										</p>
										<p className="text-xs text-slate-400">
											Notificar quando ticantes entram em dívida
										</p>
									</div>
									<div className="w-12 h-6 bg-secondary rounded-full relative cursor-pointer">
										<div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
									</div>
								</div>

								<div className="flex items-center justify-between p-3 bg-slate-100 rounded-lg">
									<div>
										<p className="text-sm font-medium text-slate-900">
											Relatórios Diários
										</p>
										<p className="text-xs text-slate-400">
											Resumo diário por email
										</p>
									</div>
									<div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
										<div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full" />
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			),
		},
	];

	const handleSave = () => {
		// Save logic would go here
		onSave(formData);
		onClose();
	};

	return (
		<SuperModalWithTabs
			isOpen={isOpen}
			onClose={onClose}
			title="Configurações da Organização"
			tabs={tabs}
			defaultTab={activeTab}
			size="lg"
		/>
	);
}

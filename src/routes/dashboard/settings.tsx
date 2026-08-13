import { createFileRoute } from "@tanstack/react-router";
import {
	Bell,
	CreditCard,
	Users,
	Save,
	RotateCcw,
	ShieldCheck,
	Building2,
} from "lucide-react";
import { useState } from "react";
import { DashboardLayout } from "#/components/layout/DashboardLayout";
import { Header } from "#/components/layout/Header";
import { Sidebar } from "#/components/layout/Sidebar";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";
import { cn } from "#/lib/design-system";
import { useSettings } from "#/features/settings";

export const Route = createFileRoute("/dashboard/settings")({
	component: SettingsPage,
});

function SettingsPage() {
	const [activeTab, setActiveTab] = useState("organization");
	const {
		settings,
		isLoading,
		updateOrganization,
		updateNotifications,
		updatePayments,
		resetSettings,
	} = useSettings();

	const [orgForm, setOrgForm] = useState({
		name: settings?.organization.name || "",
		email: settings?.organization.email || "",
		phone: settings?.organization.phone || "",
		province: settings?.organization.province || "",
		district: settings?.organization.district || "",
		monthlyFee: settings?.organization.monthlyFee || 100,
		cycleDay: settings?.organization.cycleDay || 15,
	});

	const [notificationsForm, setNotificationsForm] = useState({
		emailNotifications: settings?.notifications.emailNotifications || false,
		smsNotifications: settings?.notifications.smsNotifications || false,
		pushNotifications: settings?.notifications.pushNotifications || false,
		monthlyReport: settings?.notifications.monthlyReport || false,
		lowBalanceAlert: settings?.notifications.lowBalanceAlert || false,
		overdueLoanAlert: settings?.notifications.overdueLoanAlert || false,
	});

	const sidebarItems = [
		{ label: "Painel", icon: Building2, href: "/dashboard/overview" },
		{ label: "Gestão", icon: Users, href: "/dashboard/savers" },
		{ label: "Financeiro", icon: CreditCard, href: "/dashboard/financial" },
		{ label: "Relatórios", icon: ShieldCheck, href: "/dashboard/reports" },
		{
			label: "Configurações",
			icon: ShieldCheck,
			href: "/dashboard/settings",
			isActive: true,
		},
	];

	const tabs = [
		{ id: "organization", label: "Organização", icon: Building2 },
		{ id: "notifications", label: "Notificações", icon: Bell },
		{ id: "payments", label: "Pagamentos", icon: CreditCard },
		{ id: "team", label: "Equipa", icon: Users },
	];

	const handleSaveOrganization = () => {
		updateOrganization(orgForm);
	};

	const handleSaveNotifications = () => {
		updateNotifications(notificationsForm);
	};

	const handleReset = () => {
		resetSettings();
	};

	if (isLoading) {
		return (
			<DashboardLayout>
				<Sidebar items={sidebarItems} />
				<div className="flex-1 flex items-center justify-center">
					<div className="text-slate-500">Carregando configurações...</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<Sidebar items={sidebarItems} />

			<div className="flex-1 flex flex-col h-full overflow-hidden">
				<Header
					title="Configurações"
					description="Gerencie as configurações da sua organização"
					breadcrumbs={[
						{ label: "Dashboard", href: "/dashboard/overview" },
						{ label: "Configurações" },
					]}
					rightContent={
						<Button
							size="sm"
							variant="outline"
							leftIcon={<RotateCcw size={16} />}
							onClick={handleReset}
						>
							Restaurar Padrões
						</Button>
					}
				/>

				<main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
					{/* Tab Navigation */}
					<nav className="flex items-center border-b border-slate-200 gap-1 overflow-x-auto">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2",
									activeTab === tab.id
										? "border-emerald-600 text-emerald-600"
										: "border-transparent text-slate-500 hover:text-slate-700",
								)}
							>
								<tab.icon size={16} />
								{tab.label}
							</button>
						))}
					</nav>

					{/* Organization Settings */}
					{activeTab === "organization" && (
						<Card>
							<CardHeader>
								<h4 className="font-semibold text-slate-900">
									Configurações da Organização
								</h4>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Nome da Organização
										</label>
										<input
											type="text"
											value={orgForm.name}
											onChange={(e) =>
												setOrgForm({ ...orgForm, name: e.target.value })
											}
											className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Email
										</label>
										<input
											type="email"
											value={orgForm.email}
											onChange={(e) =>
												setOrgForm({ ...orgForm, email: e.target.value })
											}
											className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Telefone
										</label>
										<input
											type="tel"
											value={orgForm.phone}
											onChange={(e) =>
												setOrgForm({ ...orgForm, phone: e.target.value })
											}
											className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Taxa Mensal (MZN)
										</label>
										<input
											type="number"
											value={orgForm.monthlyFee}
											onChange={(e) =>
												setOrgForm({
													...orgForm,
													monthlyFee: Number(e.target.value),
												})
											}
											className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-700 mb-1">
											Dia do Ciclo
										</label>
										<input
											type="number"
											min="1"
											max="31"
											value={orgForm.cycleDay}
											onChange={(e) =>
												setOrgForm({
													...orgForm,
													cycleDay: Number(e.target.value),
												})
											}
											className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600"
										/>
									</div>
								</div>
								<div className="flex justify-end pt-4">
									<Button
										onClick={handleSaveOrganization}
										leftIcon={<Save size={16} />}
									>
										Salvar Alterações
									</Button>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Notifications Settings */}
					{activeTab === "notifications" && (
						<Card>
							<CardHeader>
								<h4 className="font-semibold text-slate-900">
									Configurações de Notificações
								</h4>
							</CardHeader>
							<CardContent className="space-y-4">
								{Object.entries(notificationsForm).map(([key, value]) => (
									<div
										key={key}
										className="flex items-center justify-between py-2"
									>
										<div>
											<p className="text-sm font-medium text-slate-900">
												{key
													.replace(/([A-Z])/g, " $1")
													.replace(/^./, (str) => str.toUpperCase())}
											</p>
											<p className="text-xs text-slate-500">
												Receber notificações por este canal
											</p>
										</div>
										<button
											type="button"
											onClick={() =>
												setNotificationsForm({
													...notificationsForm,
													[key]: !value,
												})
											}
											className={cn(
												"relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
												value ? "bg-emerald-600" : "bg-slate-200",
											)}
										>
											<span
												className={cn(
													"inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
													value ? "translate-x-6" : "translate-x-1",
												)}
											/>
										</button>
									</div>
								))}
								<div className="flex justify-end pt-4">
									<Button
										onClick={handleSaveNotifications}
										leftIcon={<Save size={16} />}
									>
										Salvar Alterações
									</Button>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Payments Settings */}
					{activeTab === "payments" && (
						<Card>
							<CardHeader>
								<h4 className="font-semibold text-slate-900">
									Configurações de Pagamento
								</h4>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-700 mb-2">
										Métodos de Pagamento Aceitos
									</label>
									<div className="flex flex-wrap gap-2">
										{["bank", "mobile", "cash"].map((method) => (
											<label key={method} className="flex items-center gap-2">
												<input
													type="checkbox"
													checked={settings?.payments.acceptedMethods.includes(
														method as any,
													)}
													onChange={(e) => {
														const newMethods = e.target.checked
															? [
																	...settings!.payments.acceptedMethods,
																	method as any,
																]
															: settings!.payments.acceptedMethods.filter(
																	(m) => m !== method,
																);
														updatePayments({ acceptedMethods: newMethods });
													}}
													className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
												/>
												<span className="text-sm text-slate-700 capitalize">
													{method}
												</span>
											</label>
										))}
									</div>
								</div>
								{settings?.payments.bankAccount && (
									<div className="bg-slate-50 p-4 rounded-lg">
										<h5 className="text-sm font-medium text-slate-900 mb-2">
											Conta Bancária
										</h5>
										<div className="space-y-1 text-sm text-slate-600">
											<p>
												<span className="font-medium">Banco:</span>{" "}
												{settings.payments.bankAccount.bank}
											</p>
											<p>
												<span className="font-medium">Conta:</span>{" "}
												{settings.payments.bankAccount.accountNumber}
											</p>
											<p>
												<span className="font-medium">Titular:</span>{" "}
												{settings.payments.bankAccount.accountHolder}
											</p>
										</div>
									</div>
								)}
								{settings?.payments.mobileMoney && (
									<div className="bg-slate-50 p-4 rounded-lg">
										<h5 className="text-sm font-medium text-slate-900 mb-2">
											Mobile Money
										</h5>
										<div className="space-y-1 text-sm text-slate-600">
											<p>
												<span className="font-medium">Operadora:</span>{" "}
												{settings.payments.mobileMoney.provider}
											</p>
											<p>
												<span className="font-medium">Telefone:</span>{" "}
												{settings.payments.mobileMoney.phoneNumber}
											</p>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					)}

					{/* Team Settings */}
					{activeTab === "team" && (
						<Card>
							<CardHeader>
								<h4 className="font-semibold text-slate-900">
									Gestão de Equipa
								</h4>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h5 className="text-sm font-medium text-slate-900 mb-2">
										Administradores
									</h5>
									{settings?.team.admins.map((admin) => (
										<div
											key={admin.id}
											className="flex items-center justify-between py-2 border-b border-slate-100"
										>
											<div>
												<p className="text-sm font-medium text-slate-900">
													{admin.name}
												</p>
												<p className="text-xs text-slate-500">{admin.email}</p>
											</div>
											<span className="text-xs text-slate-500 capitalize">
												{admin.role.replace("_", " ")}
											</span>
										</div>
									))}
								</div>
								<div>
									<h5 className="text-sm font-medium text-slate-900 mb-2">
										Cobradores
									</h5>
									{settings?.team.collectors.map((collector) => (
										<div
											key={collector.id}
											className="flex items-center justify-between py-2 border-b border-slate-100"
										>
											<div>
												<p className="text-sm font-medium text-slate-900">
													{collector.name}
												</p>
												<p className="text-xs text-slate-500">
													{collector.phone}
												</p>
											</div>
											<span
												className={cn(
													"text-xs px-2 py-1 rounded-full",
													collector.active
														? "bg-emerald-100 text-emerald-700"
														: "bg-slate-100 text-slate-500",
												)}
											>
												{collector.active ? "Activo" : "Inativo"}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</main>
			</div>
		</DashboardLayout>
	);
}

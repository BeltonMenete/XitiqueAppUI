import { createFileRoute } from "@tanstack/react-router";
import { ClientLayout } from "#/components/layout/ClientLayout";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";
import { useAuth } from "#/hooks/useAuth";

export const Route = createFileRoute("/client/profile")({
	component: ClientProfile,
});

function ClientProfile() {
	const { user } = useAuth();

	return (
		<ClientLayout>
			<div className="p-6">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-slate-900">Meu Perfil</h1>
						<p className="text-slate-600 mt-2">
							Gerencie suas informações pessoais
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-1">
							<Card>
								<CardHeader>
									<h2 className="text-lg font-semibold text-slate-900">
										Informações Pessoais
									</h2>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<p className="text-sm text-slate-600">Nome</p>
											<p className="font-medium text-slate-900">
												{user?.name || "Cliente Exemplo"}
											</p>
										</div>
										<div>
											<p className="text-sm text-slate-600">Email</p>
											<p className="font-medium text-slate-900">
												{user?.email || "cliente@exemplo.com"}
											</p>
										</div>
										<div>
											<p className="text-sm text-slate-600">Telefone</p>
											<p className="font-medium text-slate-900">
												+258 84 123 4567
											</p>
										</div>
										<div>
											<p className="text-sm text-slate-600">Data de Registro</p>
											<p className="font-medium text-slate-900">
												15 de Janeiro, 2024
											</p>
										</div>
									</div>
									<Button className="w-full mt-6">Editar Perfil</Button>
								</CardContent>
							</Card>
						</div>

						<div className="lg:col-span-2 space-y-6">
							<Card>
								<CardHeader>
									<h2 className="text-lg font-semibold text-slate-900">
										Configurações de Conta
									</h2>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div className="flex items-center justify-between py-3 border-b border-slate-100">
											<div>
												<p className="font-medium text-slate-900">
													Notificações por Email
												</p>
												<p className="text-sm text-slate-600">
													Receba atualizações sobre sua conta
												</p>
											</div>
											<button
												type="button"
												className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 bg-emerald-600"
											>
												<span
													aria-hidden="true"
													className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
												></span>
											</button>
										</div>
										<div className="flex items-center justify-between py-3 border-b border-slate-100">
											<div>
												<p className="font-medium text-slate-900">
													Alertas de Pagamento
												</p>
												<p className="text-sm text-slate-600">
													Lembrete antes do vencimento
												</p>
											</div>
											<button
												type="button"
												className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 bg-emerald-600"
											>
												<span
													aria-hidden="true"
													className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
												></span>
											</button>
										</div>
										<div className="flex items-center justify-between py-3">
											<div>
												<p className="font-medium text-slate-900">
													Autenticação em Dois Fatores
												</p>
												<p className="text-sm text-slate-600">
													Proteção adicional para sua conta
												</p>
											</div>
											<button
												type="button"
												className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 bg-slate-200"
											>
												<span
													aria-hidden="true"
													className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
												></span>
											</button>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<h2 className="text-lg font-semibold text-slate-900">
										Segurança
									</h2>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<Button variant="outline" className="w-full">
											Alterar Senha
										</Button>
										<Button
											variant="outline"
											className="w-full text-red-600 border-red-200 hover:bg-red-50"
										>
											Desativar Conta
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</ClientLayout>
	);
}

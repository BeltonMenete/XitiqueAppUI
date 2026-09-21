import { createFileRoute } from "@tanstack/react-router";
import { ClientLayout } from "#/components/layout/ClientLayout";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";
import { useAuth } from "#/hooks/useAuth";

export const Route = createFileRoute("/client/dashboard")({
	component: ClientDashboard,
});

function ClientDashboard() {
	const { user } = useAuth();

	return (
		<ClientLayout>
			<div className="p-6">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-slate-900">
							Bem-vindo, {user?.name || "Cliente"}
						</h1>
						<p className="text-slate-600 mt-2">Visão geral da sua conta</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<Card>
							<CardHeader>
								<p className="text-sm font-medium text-slate-600">
									Saldo Atual
								</p>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold text-emerald-600">3.500 MZN</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<p className="text-sm font-medium text-slate-600">
									Total Depositado
								</p>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold text-blue-600">15.000 MZN</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<p className="text-sm font-medium text-slate-600">
									Empréstimos Ativos
								</p>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold text-amber-600">1</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<p className="text-sm font-medium text-slate-600">
									Próximo Pagamento
								</p>
							</CardHeader>
							<CardContent>
								<p className="text-2xl font-bold text-slate-900">100 MZN</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<h2 className="text-lg font-semibold text-slate-900">
									Histórico Recente
								</h2>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex justify-between items-center py-2 border-b border-slate-100">
										<div>
											<p className="font-medium text-slate-900">Depósito</p>
											<p className="text-sm text-slate-600">Hoje, 10:30</p>
										</div>
										<p className="text-emerald-600 font-semibold">+100 MZN</p>
									</div>
									<div className="flex justify-between items-center py-2 border-b border-slate-100">
										<div>
											<p className="font-medium text-slate-900">
												Pagamento de Empréstimo
											</p>
											<p className="text-sm text-slate-600">Ontem, 14:15</p>
										</div>
										<p className="text-red-600 font-semibold">-100 MZN</p>
									</div>
									<div className="flex justify-between items-center py-2">
										<div>
											<p className="font-medium text-slate-900">Depósito</p>
											<p className="text-sm text-slate-600">2 dias atrás</p>
										</div>
										<p className="text-emerald-600 font-semibold">+100 MZN</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<h2 className="text-lg font-semibold text-slate-900">
									Empréstimo Ativo
								</h2>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<p className="text-slate-600">Valor Total</p>
										<p className="font-semibold text-slate-900">1.870 MZN</p>
									</div>
									<div className="flex justify-between items-center">
										<p className="text-slate-600">Valor Pago</p>
										<p className="font-semibold text-emerald-600">400 MZN</p>
									</div>
									<div className="flex justify-between items-center">
										<p className="text-slate-600">Restante</p>
										<p className="font-semibold text-amber-600">1.470 MZN</p>
									</div>
									<div className="flex justify-between items-center">
										<p className="text-slate-600">Dias Restantes</p>
										<p className="font-semibold text-slate-900">15</p>
									</div>
									<div className="mt-4">
										<div className="w-full bg-slate-200 rounded-full h-2">
											<div
												className="bg-emerald-600 h-2 rounded-full"
												style={{ width: "21%" }}
											></div>
										</div>
										<p className="text-sm text-slate-600 mt-2">21% pago</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</ClientLayout>
	);
}

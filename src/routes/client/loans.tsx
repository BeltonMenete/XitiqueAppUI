import { createFileRoute } from "@tanstack/react-router";
import { ClientLayout } from "#/components/layout/ClientLayout";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";

export const Route = createFileRoute("/client/loans")({
	component: ClientLoans,
});

function ClientLoans() {
	const mockLoans = [
		{
			id: 1,
			date: "2025-01-15",
			amount: 3000,
			interest: 300,
			total: 3300,
			paid: 1500,
			remaining: 1800,
			status: "active",
			daysRemaining: 12,
		},
		{
			id: 2,
			date: "2025-01-10",
			amount: 1500,
			interest: 150,
			total: 1650,
			paid: 800,
			remaining: 850,
			status: "active",
			daysRemaining: 18,
		},
		{
			id: 3,
			date: "2024-12-20",
			amount: 5000,
			interest: 500,
			total: 5500,
			paid: 5500,
			remaining: 0,
			status: "completed",
			daysRemaining: 0,
		},
		{
			id: 4,
			date: "2024-12-05",
			amount: 2000,
			interest: 200,
			total: 2200,
			paid: 1100,
			remaining: 1100,
			status: "active",
			daysRemaining: 25,
		},
		{
			id: 5,
			date: "2024-11-15",
			amount: 1000,
			interest: 100,
			total: 1100,
			paid: 1100,
			remaining: 0,
			status: "completed",
			daysRemaining: 0,
		},
		{
			id: 6,
			date: "2024-10-28",
			amount: 4000,
			interest: 400,
			total: 4400,
			paid: 2000,
			remaining: 2400,
			status: "active",
			daysRemaining: 8,
		},
		{
			id: 7,
			date: "2024-10-10",
			amount: 800,
			interest: 80,
			total: 880,
			paid: 880,
			remaining: 0,
			status: "completed",
			daysRemaining: 0,
		},
		{
			id: 8,
			date: "2024-09-20",
			amount: 2500,
			interest: 250,
			total: 2750,
			paid: 1375,
			remaining: 1375,
			status: "active",
			daysRemaining: 30,
		},
	];

	return (
		<ClientLayout>
			<div className="p-6">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8 flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold text-slate-900">
								Histórico de Empréstimos
							</h1>
							<p className="text-slate-600 mt-2">
								Todos os seus empréstimos solicitados
							</p>
						</div>
						<Button>Novo Empréstimo</Button>
					</div>

					<div className="space-y-6">
						{mockLoans.map((loan) => (
							<Card key={loan.id}>
								<CardHeader>
									<div className="flex justify-between items-start">
										<div>
											<h2 className="text-lg font-semibold text-slate-900">
												Empréstimo #{loan.id}
											</h2>
											<p className="text-sm text-slate-600">
												Solicitado em {loan.date}
											</p>
										</div>
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												loan.status === "active"
													? "bg-amber-100 text-amber-800"
													: "bg-emerald-100 text-emerald-800"
											}`}
										>
											{loan.status === "active" ? "Ativo" : "Completado"}
										</span>
									</div>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
										<div>
											<p className="text-sm text-slate-600">Valor Solicitado</p>
											<p className="text-lg font-semibold text-slate-900">
												{loan.amount} MZN
											</p>
										</div>
										<div>
											<p className="text-sm text-slate-600">Juros (10%)</p>
											<p className="text-lg font-semibold text-red-600">
												{loan.interest} MZN
											</p>
										</div>
										<div>
											<p className="text-sm text-slate-600">Total a Pagar</p>
											<p className="text-lg font-semibold text-slate-900">
												{loan.total} MZN
											</p>
										</div>
										<div>
											<p className="text-sm text-slate-600">Status</p>
											<p className="text-lg font-semibold text-slate-900">
												{loan.status === "active" ? "Ativo" : "Completado"}
											</p>
										</div>
									</div>

									{loan.status === "active" && (
										<div className="border-t border-slate-200 pt-4 mt-4">
											<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
												<div>
													<p className="text-sm text-slate-600">Valor Pago</p>
													<p className="text-lg font-semibold text-emerald-600">
														{loan.paid} MZN
													</p>
												</div>
												<div>
													<p className="text-sm text-slate-600">Restante</p>
													<p className="text-lg font-semibold text-amber-600">
														{loan.remaining} MZN
													</p>
												</div>
												<div>
													<p className="text-sm text-slate-600">
														Dias Restantes
													</p>
													<p className="text-lg font-semibold text-slate-900">
														{loan.daysRemaining}
													</p>
												</div>
											</div>
											<div>
												<div className="w-full bg-slate-200 rounded-full h-2">
													<div
														className="bg-emerald-600 h-2 rounded-full"
														style={{
															width: `${Math.round((loan.paid / loan.total) * 100)}%`,
														}}
													></div>
												</div>
												<p className="text-sm text-slate-600 mt-2">
													{Math.round((loan.paid / loan.total) * 100)}% pago
												</p>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</ClientLayout>
	);
}

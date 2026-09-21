import { createFileRoute } from "@tanstack/react-router";
import { ClientLayout } from "#/components/layout/ClientLayout";
import { Button } from "#/components/ui/Button";
import { Card, CardContent, CardHeader } from "#/components/ui/Card";

export const Route = createFileRoute("/client/deposits")({
	component: ClientDeposits,
});

function ClientDeposits() {
	const mockDeposits = [
		{
			id: 1,
			date: "2025-01-20",
			amount: 150,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 2,
			date: "2025-01-19",
			amount: 100,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 3,
			date: "2025-01-18",
			amount: 200,
			status: "completed",
			description: "Depósito extra",
		},
		{
			id: 4,
			date: "2025-01-17",
			amount: 75,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 5,
			date: "2025-01-16",
			amount: 150,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 6,
			date: "2025-01-15",
			amount: 100,
			status: "pending",
			description: "Depósito diário",
		},
		{
			id: 7,
			date: "2025-01-14",
			amount: 180,
			status: "completed",
			description: "Depósito compensatório",
		},
		{
			id: 8,
			date: "2025-01-13",
			amount: 120,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 9,
			date: "2025-01-12",
			amount: 50,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 10,
			date: "2025-01-11",
			amount: 200,
			status: "completed",
			description: "Depósito extra",
		},
		{
			id: 11,
			date: "2025-01-10",
			amount: 100,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 12,
			date: "2025-01-09",
			amount: 150,
			status: "pending",
			description: "Depósito diário",
		},
		{
			id: 13,
			date: "2025-01-08",
			amount: 175,
			status: "completed",
			description: "Depósito compensatório",
		},
		{
			id: 14,
			date: "2025-01-07",
			amount: 100,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 15,
			date: "2025-01-06",
			amount: 125,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 16,
			date: "2025-01-05",
			amount: 200,
			status: "completed",
			description: "Depósito extra",
		},
		{
			id: 17,
			date: "2025-01-04",
			amount: 80,
			status: "completed",
			description: "Depósito diário",
		},
		{
			id: 18,
			date: "2024-12-31",
			amount: 150,
			status: "completed",
			description: "Depósito final de ano",
		},
	];

	return (
		<ClientLayout>
			<div className="p-6">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8 flex justify-between items-center">
						<div>
							<h1 className="text-3xl font-bold text-slate-900">
								Histórico de Depósitos
							</h1>
							<p className="text-slate-600 mt-2">
								Todos os seus depósitos registrados
							</p>
						</div>
						<Button>Novo Depósito</Button>
					</div>

					<Card>
						<CardHeader>
							<h2 className="text-lg font-semibold text-slate-900">
								Últimos Depósitos
							</h2>
						</CardHeader>
						<CardContent>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-slate-200">
											<th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
												Data
											</th>
											<th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
												Descrição
											</th>
											<th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
												Valor
											</th>
											<th className="text-left py-3 px-4 text-sm font-medium text-slate-600">
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{mockDeposits.map((deposit) => (
											<tr
												key={deposit.id}
												className="border-b border-slate-100 hover:bg-slate-50"
											>
												<td className="py-3 px-4 text-sm text-slate-900">
													{deposit.date}
												</td>
												<td className="py-3 px-4 text-sm text-slate-900">
													{deposit.description}
												</td>
												<td className="py-3 px-4 text-sm font-semibold text-emerald-600">
													{deposit.amount} MZN
												</td>
												<td className="py-3 px-4">
													<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
														{deposit.status === "completed"
															? "Completado"
															: "Pendente"}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</ClientLayout>
	);
}

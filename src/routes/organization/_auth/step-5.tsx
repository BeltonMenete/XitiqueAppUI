import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	CheckCircle2,
	CreditCard,
	Landmark,
	Loader2,
	Lock,
} from "lucide-react";
import { useState } from "react";
import { EMolaIcon } from "@/components/icons/EMolaIcon";
import { MPesaIcon } from "@/components/icons/MPesaIcon";

export const Route = createFileRoute("/organization/_auth/step-5")({
	component: StepFive,
});

type PaymentMethod = "mpesa" | "emola" | "card" | "bank";

function StepFive() {
	const navigate = useNavigate();
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
		null,
	);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleConfirmPayment = () => {
		if (!selectedMethod) return;
		setIsProcessing(true);

		// Simulação de chamada de API
		setTimeout(() => {
			setIsProcessing(false);
			navigate({ to: "/organization/payments/success" }); // Ajuste conforme seu fluxo
		}, 2000);
	};

	return (
		<div className="h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
			<div className="w-full lg:w-1/2 p-6 sm:p-12 bg-gray-50/50 flex flex-col justify-center overflow-y-auto">
				<div className="max-w-xl mx-auto w-full space-y-8">
					{/* Stepper */}
					<div className="space-y-2">
						<div className="flex justify-between items-center">
							<span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
								Passo 5 de 5
							</span>
							<span className="text-[10px] text-gray-400 font-bold uppercase">
								Finalização
							</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-1.5">
							<div className="bg-emerald-500 h-1.5 rounded-full w-full" />
						</div>
					</div>

					{/* Resumo */}
					<div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
								<CheckCircle2 />
							</div>
							<div>
								<p className="text-[10px] text-gray-400 font-bold uppercase">
									Plano Pro
								</p>
								<p className="font-bold text-gray-900">3.000 MZN / mês</p>
							</div>
						</div>
					</div>

					{/* Métodos */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{[
							{ id: "mpesa", label: "M-Pesa", icon: MPesaIcon, sub: "Vodacom" },
							{ id: "emola", label: "e-Mola", icon: EMolaIcon, sub: "Movitel" },
							{
								id: "card",
								label: "Cartão",
								icon: CreditCard,
								sub: "Visa/Master",
							},
							{
								id: "bank",
								label: "Bancário",
								icon: Landmark,
								sub: "Transferência",
							},
						].map((m) => (
							<button
								type="button"
								key={m.id}
								onClick={() => setSelectedMethod(m.id as PaymentMethod)}
								className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${selectedMethod === m.id
									? "border-emerald-600 bg-emerald-50"
									: "border-gray-200 hover:border-gray-300"
									}`}
							>
								<m.icon className="h-8 w-8" />
								<div>
									<p className="font-bold text-sm text-gray-900">{m.label}</p>
									<p className="text-[10px] text-gray-400">{m.sub}</p>
								</div>
							</button>
						))}
					</div>

					{/* Ações */}
					<div className="space-y-4">
						<button
							type="button"
							onClick={handleConfirmPayment}
							disabled={!selectedMethod || isProcessing}
							className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
						>
							{isProcessing ? (
								<Loader2 className="animate-spin" />
							) : (
								"Confirmar e Ativar Conta"
							)}
						</button>

						<button
							type="button"
							onClick={() => navigate({ to: "/organization/step-4" })}
							className="w-full text-gray-500 text-sm font-semibold flex items-center justify-center gap-2 hover:text-gray-800 focus:outline-none"
						>
							<ArrowLeft size={16} /> Voltar para revisão
						</button>
					</div>

					<p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
						<Lock size={12} /> Transação protegida por criptografia SSL
					</p>
				</div>
			</div>
		</div>
	);
}

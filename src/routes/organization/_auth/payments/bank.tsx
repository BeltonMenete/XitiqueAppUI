import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreditCard, Loader2, Lock, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/organization/_auth/payments/bank")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [formData, setFormData] = useState({
		cardName: "",
		cardNumber: "",
		expiry: "",
		cvv: "",
		saveCard: false,
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	// Formatações de Input
	const formatCardNumber = (value: string) =>
		value
			.replace(/\D/g, "")
			.replace(/(.{4})/g, "$1 ")
			.trim();

	const formatExpiry = (value: string) => {
		const v = value.replace(/\D/g, "");
		return v.length >= 2 ? `${v.slice(0, 2)} / ${v.slice(2, 4)}` : v;
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		let formattedValue = value;
		if (typeof value === "string") {
			if (field === "cardNumber")
				formattedValue = formatCardNumber(value).slice(0, 19);
			if (field === "expiry") formattedValue = formatExpiry(value).slice(0, 7);
			if (field === "cvv")
				formattedValue = value.replace(/\D/g, "").slice(0, 4);
		}
		setFormData((prev) => ({ ...prev, [field]: formattedValue }));
		if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);

		setTimeout(() => {
			setIsProcessing(false);
			navigate({ to: "/organization/payments/success" });
		}, 2500);
	};

	return (
		<div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
			{/* 🛡️ PAINEL ESQUERDO: Branding de Alta Confiança Dedicado (Estático) */}
			<section className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full relative overflow-hidden">
				{/* Círculo decorativo de fundo */}
				<div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

				{/* Topo com Logotipo e Nome do App alinhados */}
				<div className="flex items-center gap-3 relative z-10 select-none">
					<img
						src="/Xitique-logo-transparent-compressed.svg"
						alt="Xitique Logo"
						className="w-9 h-9 object-contain"
					/>
					<span className="text-xl font-bold tracking-wide text-white">
						Xitique
					</span>
				</div>

				{/* Mensagem Principal Centralizada */}
				<div className="space-y-4 my-auto relative z-10">
					<h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
						Pagamento Seguro
					</h1>
					<p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-sm opacity-90">
						Finalize a sua assinatura com total transparência. Os seus dados de
						faturamento estão protegidos com criptografia de ponta a ponta.
					</p>
				</div>

				{/* Badges de Confiança Estáticas */}
				<div className="space-y-3 mt-auto relative z-10 w-full">
					<div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5 flex gap-3.5 items-center cursor-default">
						<ShieldCheck className="text-emerald-400 h-6 w-6 shrink-0" />
						<div>
							<p className="font-bold text-xs tracking-wider text-white">
								SEGURANÇA NÍVEL BANCÁRIO
							</p>
							<p className="text-emerald-300 text-xs mt-0.5">
								Os seus dados sensíveis nunca são armazenados na nossa
								infraestrutura.
							</p>
						</div>
					</div>
					<div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5 flex gap-3.5 items-center cursor-default">
						<Lock className="text-emerald-400 h-6 w-6 shrink-0" />
						<div>
							<p className="font-bold text-xs tracking-wider text-white">
								PROCESSAMENTO VIA STRIPE
							</p>
							<p className="text-emerald-300 text-xs mt-0.5">
								Utilizamos a infraestrutura líder mundial para processamento
								resiliente de pagamentos.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* PAINEL DIREITO: Formulário */}
			<section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-y-auto">
				<div className="w-full max-w-md my-auto transition-all ease-out animate-in fade-in slide-in-from-bottom-4 duration-700">
					<header className="mb-6">
						<h2 className="text-2xl font-bold text-gray-900 tracking-tight">
							Informações de Pagamento
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Complete os detalhes do cartão para concluir a transação.
						</p>
					</header>

					<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
						{/* Campo: Nome no Cartão */}
						<div className="group flex flex-col">
							<label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
								Nome no Cartão
							</label>
							<input
								type="text"
								required
								placeholder="Como impresso no cartão"
								className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200"
								value={formData.cardName}
								onChange={(e) => handleInputChange("cardName", e.target.value)}
							/>
						</div>

						{/* Campo: Número do Cartão */}
						<div className="group flex flex-col">
							<label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
								Número do Cartão
							</label>
							<div className="relative">
								<CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-all duration-200" />
								<input
									type="text"
									required
									placeholder="0000 0000 0000 0000"
									className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200 font-mono tracking-wider"
									value={formData.cardNumber}
									onChange={(e) =>
										handleInputChange("cardNumber", e.target.value)
									}
								/>
							</div>
						</div>

						{/* Grid: Validade e CVV */}
						<div className="grid grid-cols-2 gap-4">
							<div className="group flex flex-col">
								<label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
									Validade
								</label>
								<input
									type="text"
									required
									placeholder="MM / AA"
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200 font-mono"
									value={formData.expiry}
									onChange={(e) => handleInputChange("expiry", e.target.value)}
								/>
							</div>
							<div className="group flex flex-col">
								<label className="block text-xs font-semibold text-gray-700 mb-1.5 group-focus-within:text-emerald-700 transition-colors duration-200">
									CVV
								</label>
								<input
									type="password"
									required
									placeholder="123"
									className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white hover:border-gray-400 focus:hover:border-emerald-500 transition-all duration-200 font-mono"
									value={formData.cvv}
									onChange={(e) => handleInputChange("cvv", e.target.value)}
								/>
							</div>
						</div>

						{/* Botão de Finalização */}
						<button
							type="submit"
							disabled={isProcessing}
							className="group/btn w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/10 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
						>
							{isProcessing ? (
								<Loader2 className="animate-spin h-5 w-5" />
							) : (
								<>
									<span>Finalizar Pagamento</span>
									<Send className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
								</>
							)}
						</button>
					</form>

					<footer className="mt-6 text-center">
						<p className="text-[10px] text-gray-400 flex items-center justify-center gap-1 font-medium tracking-wide uppercase select-none">
							<Lock size={12} className="text-gray-400" /> Transação protegida
							por SSL e PCI DSS
						</p>
					</footer>
				</div>
			</section>
		</div>
	);
}

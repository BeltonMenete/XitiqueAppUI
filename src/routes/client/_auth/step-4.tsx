// /routes/client/_auth/step-4.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	Building2,
	CheckCircle,
	Coins,
	Globe,
	HelpCircle,
	Landmark,
	MapPin,
	ShieldCheck,
	User,
	UserCheck,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { APP_NAME } from "#/lib/constants";

export const Route = createFileRoute("/client/_auth/step-4")({
	component: StepFourReview,
});

function StepFourReview() {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Dados reais/simulados do utilizador incluindo a seleção do Passo 0
	const mockData = {
		phoneNumber: "+258 84 000 0000",
		fullName: "Maria Isabel dos Santos",
		occupation: "Vendedora de Mercado",
		dailyRate: 500,
		totalEstimated: 14500,
		// Dados da Organização Escolhida
		province: "Gaza",
		district: "Chókwè",
		organizationName: "Cooperativa Agrícola de Poupança de Chókwè",
		managerName: "Maria Macuácua",
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			console.log("Registo finalizado:", mockData);
			// Avança para o ecrã final de sucesso (Passo 5)
			navigate({ to: "/client/step-5" });
		} catch (error) {
			console.error("Erro ao finalizar:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
			<div className="w-full lg:w-1/2 flex flex-col justify-between p-4 sm:p-8 bg-gray-50/50 h-full overflow-y-auto relative">
				{/* Cabeçalho Utilitário Superior */}
				<div className="flex justify-between items-center w-full max-w-md mx-auto pt-1">
					<div className="flex items-center gap-2 select-none">
						<img
							alt="Xitique Logo"
							className="w-8 h-8 object-contain"
							src="/xitique-logo.svg"
						/>
						<span className="text-lg font-bold text-gray-900 tracking-tight">
							{APP_NAME}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							type="button"
							className="text-gray-400 hover:text-emerald-700 transition-colors"
						>
							<HelpCircle size={18} />
						</button>
						<button
							type="button"
							className="text-gray-400 hover:text-emerald-700 transition-colors"
						>
							<Globe size={18} />
						</button>
					</div>
				</div>

				{/* Bloco Central - Foco Total na Revisão Limpa */}
				<div className="w-full max-w-md mx-auto my-auto py-2 transition-all ease-out animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* Indicador de Etapas (Stepper) */}
					<div className="flex items-center justify-between mb-1 select-none">
						<span className="text-[11px] font-extrabold text-emerald-700 tracking-wider">
							PASSO 4 DE 5
						</span>
						<span className="text-[11px] text-gray-400 font-medium">
							Revisão Final
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden">
						<div
							className="bg-emerald-500 h-1 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
							style={{ width: "80%" }}
						/>
					</div>

					<header className="mb-4 select-none">
						<h1 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
							Confirme os seus dados
						</h1>
						<p className="text-xs text-gray-500 leading-relaxed">
							Verifique se todas as informações estão corretas antes de concluir
							a sua adesão.
						</p>
					</header>

					<form onSubmit={handleSubmit} noValidate className="space-y-4">
						{/* Grid Bento Box - Estilo Tonal Sem Bordas Pesadas */}
						<div className="space-y-3">
							{/* NOVO CARD: Organização e Localização Escolhida */}
							<div className="p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start gap-3.5">
								<div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 shrink-0 mt-0.5">
									<Building2 size={18} />
								</div>
								<div className="flex flex-col w-full select-none">
									<span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
										Organização Selecionada
									</span>
									<div className="flex flex-col gap-2">
										<div>
											<span className="text-xs font-bold text-gray-900 block leading-tight">
												{mockData.organizationName}
											</span>
											<span className="text-[10px] text-gray-400 mt-0.5 block">
												Organizador:{" "}
												<strong className="text-gray-600 font-semibold">
													{mockData.managerName}
												</strong>
											</span>
										</div>

										<div className="flex items-center gap-3 pt-1.5 border-t border-slate-100 text-[10px] text-gray-500">
											<span className="flex items-center gap-1">
												<MapPin size={12} className="text-gray-400" />{" "}
												{mockData.province}
											</span>
											<span className="w-1 h-1 rounded-full bg-slate-300" />
											<span>{mockData.district}</span>
										</div>
									</div>
								</div>
							</div>

							{/* Card 1: Conta */}
							<div className="p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-3.5">
								<div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 shrink-0">
									<User size={18} />
								</div>
								<div className="flex flex-col select-none">
									<span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
										Conta
									</span>
									<span className="text-sm font-mono font-bold text-gray-900 mt-0.5 tracking-tight">
										{mockData.phoneNumber}
									</span>
								</div>
							</div>

							{/* Card 2: Perfil */}
							<div className="p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start gap-3.5">
								<div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 shrink-0 mt-0.5">
									<UserCheck size={18} />
								</div>
								<div className="flex flex-col w-full select-none">
									<span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
										Perfil
									</span>
									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col">
											<span className="text-[10px] text-gray-400">
												Nome Completo
											</span>
											<span className="text-xs font-semibold text-gray-900 truncate mt-0.5">
												{mockData.fullName}
											</span>
										</div>
										<div className="flex flex-col">
											<span className="text-[10px] text-gray-400">
												Ocupação
											</span>
											<span className="text-xs font-semibold text-gray-900 truncate mt-0.5">
												{mockData.occupation}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Card 3: Compromisso Mensal */}
							<div className="p-5 bg-emerald-900 text-white rounded-xl shadow-md relative overflow-hidden select-none">
								<div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
									<Coins size={90} />
								</div>

								<div className="flex items-center gap-2 mb-4">
									<Coins size={14} className="text-emerald-300" />
									<h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
										Compromisso de Poupança
									</h3>
								</div>

								<div className="grid grid-cols-2 gap-4 relative z-10">
									<div className="flex flex-col">
										<span className="text-[10px] text-emerald-200/70">
											Contribuição Diária
										</span>
										<span className="text-base font-black tracking-tight mt-0.5">
											{mockData.dailyRate} MZN
										</span>
									</div>
									<div className="flex flex-col text-right">
										<span className="text-[10px] text-emerald-200/70">
											Total Estimado (Mês)
										</span>
										<span className="text-base font-black tracking-tight text-amber-400 mt-0.5">
											{mockData.totalEstimated.toLocaleString("pt-MZ")} MZN
										</span>
									</div>
								</div>

								<div className="mt-4 pt-2.5 border-t border-white/10 text-[9px] text-emerald-200/60 italic">
									* Simulação baseada em 29 dias úteis de contribuição ativa.
								</div>
							</div>
						</div>

						{/* Ações Finais Espaçadas */}
						<div className="pt-2 space-y-2">
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.99]"
							>
								<span>
									{isSubmitting ? "A processar..." : "Concluir Registo"}
								</span>
								<CheckCircle size={14} />
							</button>

							<button
								type="button"
								onClick={() => navigate({ to: "/client/step-3" })}
								className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center justify-center gap-1 group transition-colors"
							>
								<ArrowLeft
									size={14}
									className="group-hover:-translate-x-0.5 transition-transform"
								/>
								Voltar para o passo anterior
							</button>
						</div>
					</form>
				</div>

				{/* Rodapé de Segurança Integrado */}
				<div className="pt-2 border-t border-gray-200/60 text-center w-full max-w-sm mx-auto">
					<div className="flex justify-center gap-x-6 gap-y-1 mb-2">
						<div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
							<ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
							Ambiente Seguro
						</div>
						<div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
							<Landmark className="h-3.5 w-3.5 text-emerald-500" />
							Banco Registrado
						</div>
					</div>
					<p className="text-[8px] text-gray-400 tracking-widest uppercase">
						© {new Date().getFullYear()} XITIQUE DIGITAL. TODOS OS DIREITOS
						RESERVADOS.
					</p>
				</div>
			</div>
		</div>
	);
}

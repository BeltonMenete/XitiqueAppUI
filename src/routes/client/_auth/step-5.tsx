import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle,
	CreditCard,
	Globe,
	HelpCircle,
	Info,
	Landmark,
	PhoneCall,
	ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { APP_NAME } from "#/lib/constants";

export const Route = createFileRoute("/client/_auth/step-5")({
	component: StepFiveSuccess,
});

function StepFiveSuccess() {
	const [animateRing, setAnimateRing] = useState(false);

	// Micro-interação para disparar a animação visual de sucesso ao carregar a página
	useEffect(() => {
		setAnimateRing(true);
	}, []);

	// Dados consolidados vindos do sucesso do registo
	const userData = {
		firstName: "Maria",
		dailyRate: 500,
	};

	const handleProceed = () => {
		// Redireciona o utilizador para o ecrã principal de progresso/dashboard
		//    navigate({ to: "/client/dashboard" });
	};

	return (
		<div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
			<div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 bg-slate-50 h-full overflow-y-auto relative">
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

				{/* Bloco Central - Mensagem de Sucesso Hero */}
				<div className="w-full max-w-md mx-auto my-auto py-2 transition-all ease-out animate-in fade-in slide-in-from-bottom-3 duration-500">
					{/* Indicador de Etapas (Stepper) */}
					<div className="flex items-center justify-between mb-1 select-none">
						<span className="text-[11px] font-extrabold text-emerald-700 tracking-wider">
							PASSO 5 DE 5
						</span>
						<span className="text-[11px] text-gray-400 font-medium">
							Registo Concluído
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden">
						<div
							className="bg-emerald-500 h-1 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
							style={{ width: "100%" }}
						/>
					</div>

					<div className="flex flex-col items-center text-center">
						{/* Anel de Sucesso Pulsante Dinâmico */}
						<div className="mb-6 relative flex items-center justify-center">
							<div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center relative z-10">
								<CheckCircle
									size={48}
									className="text-emerald-600 animate-in zoom-in duration-300"
								/>
							</div>
							<div
								className={`absolute inset-0 border-2 border-emerald-500/20 rounded-full scale-125 opacity-0 transition-all duration-1000 ${animateRing ? "scale-150 opacity-100 animate-ping" : ""
									}`}
							/>
						</div>

						{/* Título de Conclusão */}
						<h1 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
							Registo Concluído com Sucesso!
						</h1>

						{/* Texto Motivational Humanizado */}
						<p className="text-xs text-gray-500 leading-relaxed max-w-sm mb-6 font-body">
							Parabéns,{" "}
							<span className="font-bold text-emerald-800">
								{userData.firstName}
							</span>
							! Agora fazes parte de uma rede que valoriza o teu esforço. Cada
							metical poupado hoje é um passo firme rumo à tua independência e
							segurança familiar.
						</p>

						{/* Box de Resumo Consolidado - Camadas Tonais Sem Ruído */}
						<div className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-4 mb-6 flex flex-col gap-3.5 text-left select-none">
							{/* Detalhe da Cota Diária */}
							<div className="flex items-center gap-3 w-full">
								<div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700 shrink-0">
									<Landmark size={18} />
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
										Cota Diária Comprometida
									</span>
									<span className="text-lg font-black text-emerald-900 tracking-tight mt-0.5">
										{userData.dailyRate.toLocaleString("pt-MZ")} MZN
									</span>
								</div>
							</div>

							<div className="h-px bg-slate-100 w-full" />

							{/* ALERTA: Atribuição do Cartão */}
							<div className="flex items-start gap-3 w-full bg-amber-50/50 p-3 rounded-lg border border-amber-100/30">
								<div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-700 shrink-0 mt-0.5">
									<CreditCard size={16} />
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
										Atribuição de Cartão
									</span>
									<p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed font-body">
										O teu número de cartão será gerado assim que for atribuído
										pelo <strong>organizador</strong> do grupo que selecionaste.
									</p>
								</div>
							</div>

							{/* NOVO ALERTA: Contacto do Gestor */}
							<div className="flex items-start gap-3 w-full bg-emerald-50/30 p-3 rounded-lg border border-emerald-100/20">
								<div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-700 shrink-0 mt-0.5">
									<PhoneCall size={16} />
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
										Confirmação de Segurança
									</span>
									<p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed font-body">
										O <strong>gestor da organização</strong> entrará em contacto
										contigo brevemente através do número fornecido para ativar
										formalmente a tua conta.
									</p>
								</div>
							</div>

							<div className="h-px bg-slate-100 w-full" />

							<div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium px-0.5">
								<Info size={14} className="text-blue-500 shrink-0" />
								<span>O teu primeiro ciclo de 30 dias começa agora.</span>
							</div>
						</div>

						{/* Ação Primária - Entrada na Dashboard */}
						<button
							type="button"
							onClick={handleProceed}
							className="w-full px-4 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.99]"
						>
							<span>Ver o meu progresso</span>
							<ArrowRight size={14} />
						</button>
					</div>

					{/* Rodapé de Encerramento e Suporte */}
					<div className="pt-4 border-t border-gray-200/50 text-center w-full max-w-sm mx-auto select-none space-y-2">
						<p className="text-[10px] text-gray-400 font-medium">
							Bem-vinda ao novo Xitique Digital.
						</p>
						<div className="flex justify-center text-gray-400">
							<div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
								<ShieldCheck size={12} className="text-emerald-600" />
								Ambiente Totalmente Seguro
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

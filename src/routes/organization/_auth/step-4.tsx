import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	BadgeCheck,
	Building2,
	Pencil,
	User,
} from "lucide-react";
import type { SyntheticEvent } from "react";

export const Route = createFileRoute("/organization/_auth/step-4")({
	component: StepFour,
});

function StepFour() {
	const navigate = useNavigate();

	const organization = {
		name: "Cooperativa Agrícola de Boane",
		nuit: "400123456",
		location: "Boane, Maputo",
	};

	const owner = {
		name: "Amélia Matsinhe",
		email: "amelia.matsinhe@exemplo.mz",
		phone: "+258 84 123 4567",
	};

	const plan = {
		name: "Xitique Pro",
		price: "1.500 MZN/mês",
		details: "Até 50 Ticantes, Relatórios Mensais, Gestão de Empréstimos.",
	};

	const handleEdit = (section: "organization" | "owner" | "plan") => {
		const stepMap = {
			organization: "/organization/step-1",
			owner: "/organization/step-2",
			plan: "/organization/step-3",
		};
		navigate({ to: stepMap[section] });
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log(e);
		console.log("Confirmando registo...");
		navigate({ to: "/organization/step-5" });
	};

	return (
		<div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
			{/* Painel Direito - Confirmação de Dados */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50/50 h-full overflow-y-auto">
				<div className="w-full max-w-md my-auto py-2 transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-4">
					{/* Stepper */}
					<div className="flex justify-between items-center mb-1.5 select-none">
						<span className="text-xs font-bold text-emerald-700 tracking-wider">
							PASSO 4 DE 5
						</span>
						<span className="text-xs text-gray-400 font-medium transition-colors duration-300 hover:text-gray-600">
							Revisão Final
						</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 overflow-hidden">
						<div
							className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
							style={{ width: "80%" }}
						></div>
					</div>

					<h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
						Confirmação de Dados
					</h2>
					<p className="text-xs sm:text-sm text-gray-500 mb-5">
						Por favor, reveja as informações abaixo antes de finalizar o registo
						da sua conta Xitique Digital.
					</p>

					<div className="space-y-3 mb-6">
						{/* Card Organização */}
						<div className="relative p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-700/5 transition-all duration-300 group">
							<div className="flex items-start gap-3">
								<div className="bg-gray-100 p-2 rounded-lg group-hover:bg-emerald-50 transition-colors duration-300">
									<Building2 className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-[9px] font-bold text-gray-400 group-hover:text-emerald-700 tracking-wider mb-0.5 transition-colors duration-300">
										ORGANIZAÇÃO
									</p>
									<p className="font-semibold text-sm text-gray-900 truncate">
										{organization.name}
									</p>
									<p className="text-xs text-gray-500 truncate">
										NUIT: {organization.nuit} • {organization.location}
									</p>
								</div>
								<button
									type="button"
									onClick={() => handleEdit("organization")}
									className="text-gray-400 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all p-1.5 rounded-lg bg-gray-50 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
									title="Editar organização"
								>
									<Pencil className="h-3.5 w-3.5" />
								</button>
							</div>
						</div>

						{/* Card Proprietário */}
						<div className="relative p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-700/5 transition-all duration-300 group">
							<div className="flex items-start gap-3">
								<div className="bg-gray-100 p-2 rounded-lg group-hover:bg-emerald-50 transition-colors duration-300">
									<User className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-[9px] font-bold text-gray-400 group-hover:text-emerald-700 tracking-wider mb-0.5 transition-colors duration-300">
										PROPRIETÁRIO
									</p>
									<p className="font-semibold text-sm text-gray-900 truncate">
										{owner.name}
									</p>
									<p className="text-xs text-gray-500 truncate">
										{owner.email} • {owner.phone}
									</p>
								</div>
								<button
									type="button"
									onClick={() => handleEdit("owner")}
									className="text-gray-400 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all p-1.5 rounded-lg bg-gray-50 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
									title="Editar proprietário"
								>
									<Pencil className="h-3.5 w-3.5" />
								</button>
							</div>
						</div>

						{/* Card Plano Selecionado */}
						<div className="relative p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 shadow-sm shadow-emerald-700/5 transition-all duration-300 group">
							<div className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
								Plano Ativo
							</div>
							<div className="flex items-start gap-3">
								<div className="bg-emerald-100 p-2 rounded-lg">
									<BadgeCheck className="h-4 w-4 text-emerald-600" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-[9px] font-bold text-emerald-700 tracking-wider mb-0.5">
										PLANO SELECIONADO
									</p>
									<p className="font-semibold text-sm text-gray-900 truncate">
										{plan.name}{" "}
										<span className="font-normal text-xs text-gray-500">
											({plan.price})
										</span>
									</p>
									<p className="text-xs text-emerald-600/90 font-medium mt-0.5">
										{plan.details}
									</p>
								</div>
								<button
									type="button"
									onClick={() => handleEdit("plan")}
									className="text-emerald-600 hover:text-emerald-700 hover:scale-110 active:scale-95 transition-all p-1.5 rounded-lg bg-emerald-100/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
									title="Editar plano"
								>
									<Pencil className="h-3.5 w-3.5" />
								</button>
							</div>
						</div>
					</div>

					{/* Botões de Ação */}
					<div className="flex flex-col space-y-2.5">
						<button
							type="button"
							onClick={handleSubmit}
							className="group/btn w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/10 text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
						>
							<span>Confirmar e Continuar</span>
							<ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
						</button>

						<button
							onClick={() => navigate({ to: "/organization/step-3" })}
							className="group/back w-full border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm text-gray-600 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
						>
							<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
							<span>Voltar para Planos</span>
						</button>
					</div>

					<p className="text-center text-xs text-gray-400 mt-5 select-none">
						Precisa de ajuda?{" "}
						<button
							type="button"
							className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline focus:outline-none focus:underline transition-colors duration-200"
							onClick={() => navigate({ to: "/organization/step-3" })}
						>
							Contactar Suporte
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}

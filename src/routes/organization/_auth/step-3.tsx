import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Shield, Landmark, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/organization/_auth/step-3")({
    component: StepThree,
});

function StepThree() {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState("pro");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Plano selecionado:", selectedPlan);
        navigate({ to: "/organization/step-4" });
    };

    return (
        <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
            {/* Painel Esquerdo - Branding (Idêntico aos passos 1 e 2) */}
            <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full">
                <div className="space-y-4 my-auto">
                    <h2 className="text-2xl font-bold text-amber-400">Xitique</h2>
                    <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
                        Digitalize o seu Xitique com segurança e transparência.
                    </h1>
                    <p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-md">
                        Modernize a gestão da sua comunidade financeira. Unimos tradição
                        Moçambicana com a eficiência da tecnologia moderna.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5">
                        <Shield className="text-amber-400 mb-1.5 h-5 w-5" />
                        <p className="font-bold text-xs tracking-wider text-white">SEGURANÇA TOTAL</p>
                        <p className="text-emerald-300 text-xs mt-0.5">Dados encriptados</p>
                    </div>
                    <div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-3.5">
                        <Landmark className="text-amber-400 mb-1.5 h-5 w-5" />
                        <p className="font-bold text-xs tracking-wider text-white">AUDITÁVEL</p>
                        <p className="text-emerald-300 text-xs mt-0.5">Histórico completo</p>
                    </div>
                </div>
            </div>

            {/* Painel Direito - Seleção de Planos */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-y-auto">
                <div className="w-full max-w-md my-auto">
                    {/* Stepper atualizado para a proporção exata de 3/5 */}
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-emerald-700 tracking-wider">
                            PASSO 3 DE 5
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Escolha do Plano</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5">
                        <div
                            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: "60%" }}
                        ></div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Escolha o seu plano
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Selecione o nível de gestão ideal. O custo base é de 15 MZN por cliente/mês.
                    </p>

                    <div className="space-y-3 mb-6">
                        {/* Plano Inicial */}
                        <div
                            onClick={() => setSelectedPlan("inicial")}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan === "inicial"
                                ? "border-emerald-500 bg-emerald-50/30"
                                : "border-gray-200 bg-white hover:border-emerald-200"
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">Individual</span>
                                    <h3 className="font-bold text-lg text-gray-900 mt-1">Inicial</h3>
                                    <p className="text-xs text-gray-500">Gestão de até 50 clientes</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-emerald-700">750 MZN</div>
                                    <div className="text-[10px] text-gray-400">por mês</div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>Permite apenas <strong>1 colector</strong></span>
                            </div>
                        </div>

                        {/* Plano Pro */}
                        <div
                            onClick={() => setSelectedPlan("pro")}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan === "pro"
                                ? "border-emerald-500 bg-emerald-50/30"
                                : "border-gray-200 bg-white hover:border-emerald-200"
                                }`}
                        >
                            <div className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                Mais Popular
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">Organizador</span>
                                    <h3 className="font-bold text-lg text-gray-900 mt-1">Pro</h3>
                                    <p className="text-xs text-gray-500">Gestão de até 200 clientes</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-emerald-700">3.000 MZN</div>
                                    <div className="text-[10px] text-gray-400">por mês</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <span>Gestão de até <strong>5 colectores</strong></span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    <span>SMS Ilimitados & Suporte Prioritário</span>
                                </div>
                            </div>
                        </div>

                        {/* Plano Enterprise */}
                        <div
                            onClick={() => setSelectedPlan("enterprise")}
                            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedPlan === "enterprise"
                                ? "border-emerald-500 bg-emerald-50/30"
                                : "border-gray-200 bg-white hover:border-emerald-200"
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">Corporativo</span>
                                    <h3 className="font-bold text-lg text-gray-900 mt-1">Enterprise</h3>
                                    <p className="text-xs text-gray-500">Volume personalizado</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-emerald-700">Sob Consulta</div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span>Colectores e clientes ilimitados</span>
                            </div>
                        </div>
                    </div>

                    {/* Botões de Ação */}
                    <div className="space-y-3">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm hover:shadow active:scale-[0.99] text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        >
                            Selecionar e Próximo <ArrowRight className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => navigate({ to: "/organization/step-2" })}
                            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition text-sm active:scale-[0.99] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        >
                            <ArrowLeft className="h-4 w-4" /> Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
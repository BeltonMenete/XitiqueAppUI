import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Shield, Landmark, CheckSquare, Square } from "lucide-react";

export const Route = createFileRoute("/organization/_auth/step-4")({
    component: StepFour,
});

function StepFour() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        termos: false,
        privacidade: false,
        comunicacao: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Step 4 data (Finalizado):", form);
        // Redireciona corretamente para o passo 5 (Sucesso / Conclusão)
        navigate({ to: "/organization/step-5" });
    };

    const isFormValid = form.termos && form.privacidade;

    return (
        <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
            {/* Painel Esquerdo - Branding (Idêntico aos passos anteriores) */}
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

            {/* Painel Direito - Formulário de Termos e Políticas */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-x-hidden overflow-y-auto">
                <div className="w-full max-w-md my-auto">
                    {/* Stepper atualizado para a proporção exata de 4/5 */}
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-emerald-700 tracking-wider">
                            PASSO 4 DE 5
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Revisão e Finalização</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5">
                        <div
                            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: "80%" }}
                        ></div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        Revisão e Finalização
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Para concluir a criação da sua conta, por favor leia e aceite as nossas políticas de operação.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Box Termos de Serviço */}
                        <label className="flex items-start gap-3 p-3.5 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50/50 transition">
                            <input
                                type="checkbox"
                                checked={form.termos}
                                onChange={(e) => setForm({ ...form, termos: e.target.checked })}
                                className="sr-only peer"
                                required
                            />
                            <div className="mt-0.5 text-gray-400 peer-checked:text-emerald-600 rounded transition flex-shrink-0">
                                {form.termos ? (
                                    <CheckSquare className="h-5 w-5 text-emerald-600" />
                                ) : (
                                    <Square className="h-5 w-5 hover:border-gray-400 transition" />
                                )}
                            </div>
                            <div className="flex-1 select-none">
                                <p className="text-sm font-semibold text-gray-900">Aceito os Termos de Serviço</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                    Declaro que li e concordo com as regras de uso da plataforma, tarifas operacionais e responsabilidades de custódia.
                                </p>
                            </div>
                        </label>

                        {/* Box Política de Privacidade */}
                        <label className="flex items-start gap-3 p-3.5 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50/50 transition">
                            <input
                                type="checkbox"
                                checked={form.privacidade}
                                onChange={(e) => setForm({ ...form, privacidade: e.target.checked })}
                                className="sr-only peer"
                                required
                            />
                            <div className="mt-0.5 text-gray-400 peer-checked:text-emerald-600 rounded transition flex-shrink-0">
                                {form.privacidade ? (
                                    <CheckSquare className="h-5 w-5 text-emerald-600" />
                                ) : (
                                    <Square className="h-5 w-5 hover:border-gray-400 transition" />
                                )}
                            </div>
                            <div className="flex-1 select-none">
                                <p className="text-sm font-semibold text-gray-900">Aceito a Política de Privacidade</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                    Autorizo o processamento seguro dos dados da organização e dos membros para fins exclusivos de auditoria financeira.
                                </p>
                            </div>
                        </label>

                        {/* Box Comunicações Opcionais */}
                        <label className="flex items-start gap-3 p-3.5 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50/50 transition">
                            <input
                                type="checkbox"
                                checked={form.comunicacao}
                                onChange={(e) => setForm({ ...form, comunicacao: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="mt-0.5 text-gray-400 peer-checked:text-emerald-600 rounded transition flex-shrink-0">
                                {form.comunicacao ? (
                                    <CheckSquare className="h-5 w-5 text-emerald-600" />
                                ) : (
                                    <Square className="h-5 w-5 hover:border-gray-400 transition" />
                                )}
                            </div>
                            <div className="flex-1 select-none">
                                <p className="text-sm font-semibold text-gray-900">Comunicação e Alertas (Opcional)</p>
                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                                    Desejo receber relatórios mensais de desempenho do ecossistema e dicas de segurança por e-mail ou WhatsApp.
                                </p>
                            </div>
                        </label>

                        {/* Ações de Navegação */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate({ to: "/organization/step-3" })}
                                className="col-span-1 border border-gray-300 hover:bg-gray-100 text-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-1 transition shadow-sm text-sm active:scale-[0.99] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            >
                                <ArrowLeft className="h-4 w-4" /> Voltar
                            </button>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className="col-span-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-sm hover:shadow active:scale-[0.99] text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 disabled:active:scale-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            >
                                Concluir Cadastro <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
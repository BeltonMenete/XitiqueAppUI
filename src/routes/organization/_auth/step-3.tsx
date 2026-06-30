import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type SyntheticEvent } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import { FormError } from "#/components/FormError";

export const Route = createFileRoute("/organization/_auth/step-3")({
  component: StepThree,
});

function StepThree() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [error, setError] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    console.log(e);
    e.preventDefault();
    setError("");

    if (!selectedPlan) {
      setError("Por favor, selecione um plano para continuar.");
      return;
    }

    console.log("Plano selecionado válido:", selectedPlan);
    navigate({ to: "/organization/step-4" });
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">

      {/* Painel Direito - Seleção de Planos */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50/50 h-full overflow-y-auto">
        <div className="w-full max-w-md my-auto transition-all ease-out animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Stepper */}
          <div className="flex justify-between items-center mb-1.5 select-none">
            <span className="text-xs font-bold text-emerald-700 tracking-wider">
              PASSO 3 DE 5
            </span>
            <span className="text-xs text-gray-400 font-medium transition-colors duration-300 hover:text-gray-600">
              Escolha do Plano
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              style={{ width: "60%" }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">
            Escolha o seu plano
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Selecione o nível de gestão ideal. O custo base é de 15 MZN por
            cliente/mês.
          </p>

          <div className="space-y-3 mb-4">
            {/* Plano Inicial */}
            <div
              onClick={() => setSelectedPlan("inicial")}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none active:scale-[0.99] ${selectedPlan === "inicial"
                ? "border-emerald-500 bg-emerald-50/40 shadow-md shadow-emerald-700/5 ring-1 ring-emerald-500/20"
                : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-gray-50/50"
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full tracking-wider">
                    Individual
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-1.5">
                    Inicial
                  </h3>
                  <p className="text-xs text-gray-500">
                    Gestão de até 50 clientes
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 tracking-tight">
                    750 MZN
                  </div>
                  <div className="text-[10px] text-gray-400">por mês</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2
                  className={`h-4 w-4 transition-colors duration-300 ${selectedPlan === "inicial" ? "text-emerald-500" : "text-gray-300"}`}
                />
                <span>
                  Permite apenas <strong>1 colector</strong>
                </span>
              </div>
            </div>

            {/* Plano Pro */}
            <div
              onClick={() => setSelectedPlan("pro")}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none active:scale-[0.99] ${selectedPlan === "pro"
                ? "border-emerald-500 bg-emerald-50/40 shadow-md shadow-emerald-700/5 ring-1 ring-emerald-500/20"
                : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-gray-50/50"
                }`}
            >
              <div className="absolute -top-2.5 right-4 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Mais Popular
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full tracking-wider">
                    Organizador
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-1.5">
                    Pro
                  </h3>
                  <p className="text-xs text-gray-500">
                    Gestão de até 200 clientes
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 tracking-tight">
                    3.000 MZN
                  </div>
                  <div className="text-[10px] text-gray-400">por mês</div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2
                    className={`h-4 w-4 transition-colors duration-300 ${selectedPlan === "pro" ? "text-emerald-500" : "text-gray-300"}`}
                  />
                  <span>
                    Gestão de até <strong>5 colectores</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2
                    className={`h-4 w-4 transition-colors duration-300 ${selectedPlan === "pro" ? "text-emerald-500" : "text-gray-300"}`}
                  />
                  <span>SMS Ilimitados & Suporte Prioritário</span>
                </div>
              </div>
            </div>

            {/* Plano Enterprise */}
            <div
              onClick={() => setSelectedPlan("enterprise")}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none active:scale-[0.99] ${selectedPlan === "enterprise"
                ? "border-emerald-500 bg-emerald-50/40 shadow-md shadow-emerald-700/5 ring-1 ring-emerald-500/20"
                : "border-gray-200 bg-white hover:border-emerald-200 hover:bg-gray-50/50"
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full tracking-wider">
                    Corporativo
                  </span>
                  <h3 className="font-bold text-lg text-gray-900 mt-1.5">
                    Enterprise
                  </h3>
                  <p className="text-xs text-gray-500">Volume personalizado</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 tracking-tight">
                    Sob Consulta
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2
                  className={`h-4 w-4 transition-colors duration-300 ${selectedPlan === "enterprise" ? "text-emerald-500" : "text-gray-300"}`}
                />
                <span>Colectores e clientes ilimitados</span>
              </div>
            </div>
          </div>

          {/* Slot de Erro estático anti-CLS */}
          <div className="h-4 flex items-center pl-1 mb-2">
            <div
              className={`text-[11px] transition-opacity duration-150 ${error ? "opacity-100" : "opacity-0 invisible"}`}
            >
              <FormError message={error} />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col space-y-2.5">
            <button
              onClick={handleSubmit}
              className="group/btn w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-700/10 text-white font-bold py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <span>Selecionar e Próximo</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1" />
            </button>

            <button
              onClick={() => navigate({ to: "/organization/step-2" })}
              className="group/back w-full border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm text-gray-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/back:-translate-x-0.5" />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

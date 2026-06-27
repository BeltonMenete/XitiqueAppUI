// /routes/client/_auth/step-3.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Info,
  Globe,
  TrendingUp,
  ShieldCheck,
  Landmark,
} from "lucide-react";
import { FormError } from "#/components/FormError";
import { APP_NAME } from "#/lib/constants";
import { ClientSidebar } from "#/components/ClientSidebar";

export const Route = createFileRoute("/client/_auth/step-3")({
  component: StepThreeCommitment,
});

// Componente utilitário interno para animar cada caractere individualmente
function AnimatedValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const characters = value.split("");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {characters.map((char, index) => (
        <span
          key={`${index}-${char}`}
          className="inline-block animate-in fade-in zoom-in-75 duration-200"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function StepThreeCommitment() {
  const navigate = useNavigate();

  // Estado do formulário - valor inicial recomendado de 50 MZN
  const [dailyRate, setDailyRate] = useState<number>(50);

  // Estados de feedback visual e validação
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  // Cálculos em tempo real baseados na taxa diária introduzida
  const { totalEstimated, managerCommission } = useMemo(() => {
    const rate = dailyRate || 0;
    return {
      totalEstimated: rate * 30,
      managerCommission: rate, // Regra do Xitique: 1 dia de taxa
    };
  }, [dailyRate]);

  const handleInputChange = (value: string) => {
    setShowError(false);
    setErrorMessage("");

    // Remove qualquer caractere que não seja número
    const numericValue = value.replace(/\D/g, "");

    if (numericValue === "") {
      setDailyRate(0);
      return;
    }

    setDailyRate(parseInt(numericValue, 10));
  };

  const triggerValidationError = (message: string) => {
    setShowError(false);
    setErrorMessage(message);
    setShakeKey((prev) => prev + 1);

    setTimeout(() => {
      setShowError(true);
    }, 10);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!dailyRate || dailyRate <= 0) {
      triggerValidationError("Introduza um valor válido.");
      return;
    }

    if (dailyRate < 10) {
      triggerValidationError("O valor mínimo é 10 MZN.");
      return;
    }

    console.log("Valores válidos do Passo 3:", {
      dailyRate,
      totalEstimated,
      managerCommission,
    });
    navigate({ to: "/client/step-4" });
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
      {/* Estilos Globais CSS Inline Isolados do Efeito Shake Text da Rota de Referência */}
      <style>{`
        @keyframes shakeText {
          0%, 100% { transform: translateX(0); }
          15%, 45%, 75% { transform: translateX(-4px); }
          30%, 60%, 90% { transform: translateX(4px); }
        }
        .shake-text {
          animation: shakeText 0.4s ease-in-out;
          display: inline-block;
        }
      `}</style>

      {/* Painel Esquerdo Visual Modular Reutilizado */}
      <ClientSidebar />

      {/* Painel Direito - Estrutura ultra-compacta anti-scroll calibrada (p-4 sm:p-8) */}
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

        {/* Bloco Centralizador do Formulário e Simulação */}
        <div className="w-full max-w-md mx-auto my-auto py-2 transition-all ease-out animate-in fade-in slide-in-from-bottom-3 duration-500">
          {/* Indicador de Etapas (Stepper) */}
          <div className="flex items-center justify-between mb-1 select-none">
            <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider">
              PASSO 3 DE 5
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              Plano de Poupança
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden">
            <div
              className="bg-emerald-500 h-1 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              style={{ width: "60%" }}
            />
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-1 tracking-tight">
            O seu Compromisso
          </h1>
          <p className="text-xs text-gray-500 font-body mb-4 leading-relaxed">
            Defina quanto pretende poupar todos os dias para atingir os seus
            objetivos financeiros.
          </p>

          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            {/* Campo de Entrada de Taxa Diária */}
            <div className="space-y-1">
              <div className="flex justify-between items-center h-4">
                <label
                  className="block text-xs font-semibold text-emerald-900"
                  htmlFor="dailyRate"
                >
                  Taxa Diária (MZN/dia)
                </label>

                {/* Validação de Erro com Efeito de Transição da Rota Referenciada */}
                <span
                  key={`text-${shakeKey}`}
                  className={`text-[10px] font-bold transition-all duration-300 ${
                    showError
                      ? "opacity-100 translate-x-0 shake-text font-extrabold text-red-500"
                      : "opacity-0 translate-x-2 pointer-events-none text-gray-400"
                  }`}
                >
                  {errorMessage}
                </span>
              </div>

              {/* Input Wrapper com Contornos Dinâmicos com base em Estados */}
              <div
                className={`relative flex items-center rounded-xl border-2 transition-all duration-200 overflow-hidden focus-within:border-2 focus-within:bg-white ${
                  showError
                    ? "border-red-500 bg-red-50/30 focus-within:border-red-500"
                    : "border-gray-300 bg-white focus-within:border-emerald-500"
                }`}
              >
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-bold text-sm tracking-wide select-none">
                  MZN
                </span>
                <input
                  id="dailyRate"
                  type="text"
                  inputMode="numeric"
                  value={dailyRate || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-full pl-14 pr-4 py-2.5 bg-transparent border-0 focus:ring-0 font-sans text-xl font-extrabold text-emerald-900 tracking-tight outline-none"
                  placeholder="50"
                />
              </div>

              {/* Slot Anti-CLS Otimizado para Informações Adicionais */}
              <div className="h-3 flex items-center pl-1 select-none">
                <p className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Info size={12} className="text-gray-400" />O valor sugerido
                  para novos membros é 50 MZN/dia.
                </p>
              </div>
            </div>

            {/* Cartão de Simulação Bento Style */}
            <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-sm relative overflow-hidden select-none">
              <div className="absolute -top-2 -right-2 opacity-5 pointer-events-none">
                <TrendingUp size={100} className="text-emerald-900" />
              </div>

              <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-3 uppercase tracking-wider">
                Simulação Mensal
              </h3>

              <div className="grid grid-cols-2 gap-4 relative z-10 h-12">
                {/* Coluna 1: Total Estimado com Animação por Caractere */}
                <div className="space-y-0.5 relative">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Total Estimado (30 dias)
                  </p>
                  <div className="h-6 w-full text-lg font-black text-emerald-600 tracking-tight">
                    <AnimatedValue
                      value={`${totalEstimated.toLocaleString("pt-MZ")} MZN`}
                    />
                  </div>
                </div>

                {/* Coluna 2: Comissão com Animação por Caractere */}
                <div className="space-y-0.5 border-l border-gray-300/80 pl-4 relative">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Comissão do Gestor (1 dia)
                  </p>
                  <div className="h-6 w-full text-lg font-black text-amber-700 tracking-tight">
                    <AnimatedValue
                      value={`${managerCommission.toLocaleString("pt-MZ")} MZN`}
                    />
                  </div>
                </div>
              </div>

              {/* Nota Informativa sobre Regras */}
              <div className="mt-3 p-2.5 bg-emerald-50/70 rounded-lg border-l-4 border-emerald-600">
                <p className="text-[10px] text-emerald-950 leading-relaxed font-medium">
                  <strong className="font-bold text-emerald-800">
                    Nota importante:
                  </strong>{" "}
                  Conforme as regras do Xitique, a primeira poupança do mês (1
                  dia de taxa) é atribuída como comissão de gestão e segurança
                  do fundo.
                </p>
              </div>
            </div>

            {/* Navegação de Ações */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={() => navigate({ to: "/client/step-2" })}
                className="flex-1 px-4 py-3 border-2 border-emerald-600 text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98] text-xs focus:outline-none"
              >
                <ArrowLeft size={14} />
                Voltar
              </button>
              <button
                type="submit"
                className="flex-[2] px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-700/10 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span>Finalizar Registo</span>
                <CheckCircle size={14} />
              </button>
            </div>
          </form>
        </div>

        {/* Rodapé de Segurança Integrado */}
        <div className="pt-2 border-t border-gray-200/60 text-center w-full max-w-sm mx-auto select-none">
          <div className="flex justify-center gap-x-6 gap-y-1 mb-2">
            <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              <Landmark className="h-3.5 w-3.5 text-emerald-500" />
              Ambiente Seguro
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Parceiro Registrado
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

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, CheckCircle2, CreditCard, Landmark, Lock } from "lucide-react";
// Importação dos ícones oficiais externos
import { MPesaIcon } from "@/components/icons/MPesaIcon";
import { EMolaIcon } from "@/components/icons/EMolaIcon";

export const Route = createFileRoute("/organization/_auth/step-5")({
  component: StepFive,
});

type PaymentMethod = "mpesa" | "emola" | "card" | "bank";

function StepFive() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = () => {
    if (!selectedMethod) return;

    setIsProcessing(true);
    console.log("Processando ativação via:", selectedMethod);

    setTimeout(() => {
      setIsProcessing(false);
      alert("Cadastro e ativação efetuados com sucesso!");
      // navigate({ to: "/dashboard" });
    }, 2000);
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
      {/* Painel Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 to-emerald-900/95 z-10" />

        <div className="space-y-4 my-auto relative z-20">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold tracking-tighter text-amber-400">XITIQUE</h2>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
            Digitalize o seu Xitique com segurança.
          </h1>
          <p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-md">
            Junte-se à maior rede de poupança comunitária de Moçambique com transparência total e gestão moderna.
          </p>
        </div>

        <div className="mt-auto relative z-20">
          <div className="border border-emerald-700/60 bg-emerald-950/40 backdrop-blur-sm rounded-xl p-4 flex gap-3 items-center">
            <ShieldCheck className="text-emerald-400 h-6 w-6 flex-shrink-0" />
            <p className="text-emerald-100 text-xs leading-relaxed">
              Os seus dados e fundos estão protegidos por criptografia de nível bancário e conformidade local.
            </p>
          </div>
        </div>
      </div>

      {/* Painel Direito - Seleção de Pagamento */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 bg-gray-50/50 h-full overflow-x-hidden overflow-y-auto">
        <div className="w-full max-w-xl mx-auto my-auto space-y-6">

          {/* Stepper (Passo 5 de 5 - 100%) */}
          <nav className="w-full">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-500 tracking-wider">MÉTODO DE PAGAMENTO</span>
                <span className="text-sm text-gray-900 font-medium mt-0.5">Escolha como deseja ativar sua conta</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded-md uppercase tracking-wider">
                Passo 5 de 5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: "100%" }}
              ></div>
            </div>
          </nav>

          {/* Resumo do Plano */}
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Plano Selecionado</span>
                <h3 className="font-bold text-gray-900 text-base">Xitique Pro</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-900">3.000 MZN</p>
              <span className="text-xs text-gray-400 block">faturação mensal</span>
            </div>
          </div>

          {/* Grid de Seleção dos Métodos */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-800 tracking-wide">Selecione o Método:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {/* Botão M-Pesa */}
              <button
                type="button"
                onClick={() => setSelectedMethod("mpesa")}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all h-24 duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#E60000]/20 ${selectedMethod === "mpesa"
                  ? "border-[#E60000] bg-[#E60000]/5 ring-1 ring-[#E60000] shadow-sm"
                  : "border-gray-200 bg-white hover:bg-[#E60000]/5 hover:border-[#E60000]/40 hover:shadow-sm"
                  }`}
              >
                <div className="w-16 h-12 flex items-center justify-center flex-shrink-0 bg-white rounded-lg p-1 border border-gray-100 shadow-2xl">
                  <MPesaIcon className="h-8 w-auto object-contain scale-110" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">M-Pesa</p>
                  <p className="text-xs text-gray-400 mt-0.5">Carteira Móvel Vodacom</p>
                </div>
              </button>

              {/* Botão e-Mola */}
              <button
                type="button"
                onClick={() => setSelectedMethod("emola")}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all h-24 duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#F37227]/20 ${selectedMethod === "emola"
                  ? "border-[#F37227] bg-[#F37227]/5 ring-1 ring-[#F37227] shadow-sm"
                  : "border-gray-200 bg-white hover:bg-[#F37227]/5 hover:border-[#F37227]/40 hover:shadow-sm"
                  }`}
              >
                <div className="w-16 h-12 flex items-center justify-center flex-shrink-0 bg-white rounded-lg p-1 border border-gray-100 shadow-2xl">
                  <EMolaIcon className="h-8 w-auto object-contain scale-110" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">e-Mola</p>
                  <p className="text-xs text-gray-400 mt-0.5">Carteira Móvel Movitel</p>
                </div>
              </button>

              {/* Cartão de Crédito */}
              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all h-24 duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${selectedMethod === "card"
                  ? "border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-600 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-emerald-50/10 hover:border-emerald-500/40 hover:shadow-sm"
                  }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl border flex-shrink-0 transition-colors ${selectedMethod === "card" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Cartão de Crédito</p>
                  <p className="text-xs text-gray-400 mt-0.5">Visa ou Mastercard</p>
                </div>
              </button>

              {/* Transferência Bancária */}
              <button
                type="button"
                onClick={() => setSelectedMethod("bank")}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all h-24 duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${selectedMethod === "bank"
                  ? "border-emerald-600 bg-emerald-50/30 ring-1 ring-emerald-600 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-emerald-50/10 hover:border-emerald-500/40 hover:shadow-sm"
                  }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl border flex-shrink-0 transition-colors ${selectedMethod === "bank" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Transferência</p>
                  <p className="text-xs text-gray-400 mt-0.5">BIM, BCI, Standard Bank</p>
                </div>
              </button>
            </div>
          </div>

          {/* Ações e Rodapé */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate({ to: "/organization/step-4" })}
                className="w-full sm:w-1/3 order-2 sm:order-1 border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm text-gray-600 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm active:scale-[0.98] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>

              <button
                type="button"
                disabled={!selectedMethod || isProcessing}
                onClick={handleConfirmPayment}
                className="w-full sm:w-2/3 order-1 sm:order-2 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                {isProcessing ? "A processar..." : "Confirmar e Ativar Conta"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs font-medium transition-colors hover:text-gray-500 cursor-default">
              <Lock className="h-3.5 w-3.5 animate-pulse" />
              <span>Transação encriptada via SSL Seguro</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
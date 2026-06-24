import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, CheckCircle2, CreditCard, Landmark, Smartphone, Lock } from "lucide-react";

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
    console.log("Processando pagamento via:", selectedMethod);

    // Simulando a criação da conta / transação de ativação
    setTimeout(() => {
      setIsProcessing(false);
      alert("Cadastro e ativação efetuados com sucesso! Bem-vindo ao Xitique Digital.");
      //navigate({ to: "/dashboard" }); // Modifique para a rota interna correspondente
    }, 2000);
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
      {/* Painel Esquerdo - Branding Contextual com Imagem de Fundo de Comunidade */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full relative overflow-hidden">
        {/* Camada de Gradiente Texturizada */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 to-emerald-900/95 z-10" />

        {/* Marca e Slogan */}
        <div className="space-y-4 my-auto relative z-20">
          <div className="flex items-center gap-2 mb-2">
            <Landmark className="text-amber-400 h-8 w-8" />
            <h2 className="text-2xl font-bold tracking-tighter text-amber-400 font-headline-lg">XITIQUE</h2>
          </div>
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white font-headline-lg">
            Digitalize o seu Xitique com segurança.
          </h1>
          <p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-md font-body-md">
            Junte-se à maior rede de poupança comunitária de Moçambique com transparência total e gestão moderna.
          </p>
        </div>

        {/* Box Inferior de Proteção e Criptografia */}
        <div className="mt-auto relative z-20">
          <div className="border border-emerald-700/60 bg-emerald-950/40 backdrop-blur-sm rounded-xl p-4 flex gap-3 items-center">
            <ShieldCheck className="text-emerald-400 h-6 w-6 flex-shrink-0" />
            <p className="text-emerald-100 text-xs leading-relaxed font-body-sm">
              Os seus dados e fundos estão protegidos por criptografia de nível bancário e conformidade local.
            </p>
          </div>
        </div>
      </div>

      {/* Painel Direito - Seleção do Método de Ativação / Pagamento */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 bg-gray-50/50 h-full overflow-x-hidden overflow-y-auto">
        <div className="w-full max-w-xl mx-auto my-auto space-y-6">

          {/* Stepper no Estado Final (Passo 5 de 5) */}
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

          {/* Resumo do Plano Selecionado no Passo Anterior */}
          <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Plano Selecionado</span>
                <h3 className="font-bold text-gray-900 text-base font-headline-md">Xitique Pro</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-emerald-900 font-headline-md">1.500 MZN</p>
              <span className="text-xs text-gray-400 block font-body-sm">faturação mensal</span>
            </div>
          </div>

          {/* Grid de Seleção dos Métodos Populares em Moçambique */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-800 tracking-wide">Selecione o Método:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* M-Pesa */}
              <button
                type="button"
                onClick={() => setSelectedMethod("mpesa")}
                className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${selectedMethod === "mpesa"
                  ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-gray-50/50 hover:border-gray-300"
                  }`}
              >
                <div className={`p-2.5 rounded-lg border ${selectedMethod === "mpesa" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">M-Pesa</p>
                  <p className="text-xs text-gray-400 mt-0.5">Vodacom Moçambique</p>
                </div>
              </button>

              {/* e-Mola */}
              <button
                type="button"
                onClick={() => setSelectedMethod("emola")}
                className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${selectedMethod === "emola"
                  ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-gray-50/50 hover:border-gray-300"
                  }`}
              >
                <div className={`p-2.5 rounded-lg border ${selectedMethod === "emola" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">e-Mola</p>
                  <p className="text-xs text-gray-400 mt-0.5">Movitel Moçambique</p>
                </div>
              </button>

              {/* Cartão de Crédito */}
              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${selectedMethod === "card"
                  ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-gray-50/50 hover:border-gray-300"
                  }`}
              >
                <div className={`p-2.5 rounded-lg border ${selectedMethod === "card" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Cartão / Stripe</p>
                  <p className="text-xs text-gray-400 mt-0.5">Visa ou Mastercard Internacional</p>
                </div>
              </button>

              {/* Transferência Bancária */}
              <button
                type="button"
                onClick={() => setSelectedMethod("bank")}
                className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${selectedMethod === "bank"
                  ? "border-emerald-600 bg-emerald-50/20 ring-1 ring-emerald-600 shadow-sm"
                  : "border-gray-200 bg-white hover:bg-gray-50/50 hover:border-gray-300"
                  }`}
              >
                <div className={`p-2.5 rounded-lg border ${selectedMethod === "bank" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <Landmark className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Transferência</p>
                  <p className="text-xs text-gray-400 mt-0.5">BIM, BCI, Standard Bank</p>
                </div>
              </button>
            </div>
          </div>

          {/* Ações de Navegação e Rodapé de Segurança */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => navigate({ to: "/organization/step-4" })}
                className="w-full sm:w-1/3 order-2 sm:order-1 border border-gray-300 hover:bg-gray-100 text-gray-600 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition text-sm active:scale-[0.99] disabled:opacity-50 focus:outline-none"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>

              <button
                type="button"
                disabled={!selectedMethod || isProcessing}
                onClick={handleConfirmPayment}
                className="w-full sm:w-2/3 order-1 sm:order-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md text-sm active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-600 focus:outline-none"
              >
                {isProcessing ? (
                  <>A processar...</>
                ) : (
                  <>
                    Confirmar Pagamento <ShieldCheck className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {/* Sinalizador de SSL Seguro */}
            <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs font-medium">
              <Lock className="h-3.5 w-3.5" />
              <span>Transação encriptada via SSL Seguro</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Shield,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Phone,
  HelpCircle,
} from "lucide-react";
import { MPesaIcon } from "@/components/icons/MPesaIcon";
import { EMolaIcon } from "@/components/icons/EMolaIcon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organization/_auth/payments/mobile")({
  component: RouteComponent,
});

type PaymentMethod = "emola" | "mpesa";

function RouteComponent() {
  const [method, setMethod] = useState<PaymentMethod>("emola");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const handleMethodChange = (selected: PaymentMethod) => {
    if (isProcessing) return;
    setMethod(selected);
    setPhoneNumber("");
    setShowError(false);
    setErrorMessage("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 9) {
      setPhoneNumber(value);
    }

    if (value.length === 9) {
      const prefix = value.substring(0, 2);
      const isValidVodacom =
        method === "mpesa" && (prefix === "84" || prefix === "85");
      const isValidMovitel =
        method === "emola" && (prefix === "86" || prefix === "87");

      if (isValidVodacom || isValidMovitel) {
        setShowError(false);
        setErrorMessage("");
      }
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (phoneNumber.length === 0) {
      triggerValidationError("Campo vazio");
      return;
    }

    if (phoneNumber.length < 9) {
      triggerValidationError("Requer 9 dígitos");
      return;
    }

    const prefix = phoneNumber.substring(0, 2);
    if (method === "mpesa" && prefix !== "84" && prefix !== "85") {
      triggerValidationError("Deve começar com 84 ou 85");
      return;
    }

    if (method === "emola" && prefix !== "86" && prefix !== "87") {
      triggerValidationError("Deve começar com 86 ou 87");
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    setShowError(false);
    setErrorMessage("");

    setTimeout(() => {
      setIsProcessing(false);
      alert(
        `Push enviado com sucesso para o número +258 ${phoneNumber}! Verifique o seu telemóvel.`,
      );
    }, 2500);
  };

  const triggerValidationError = (message: string) => {
    setShowError(false);
    setErrorMessage(message);
    setShakeKey((prev) => prev + 1);

    setTimeout(() => {
      setShowError(true);
    }, 10);
  };

  return (
    <div className='h-screen w-screen flex bg-[#f8faf6] font-["Inter"] selection:bg-emerald-900/10 overflow-hidden'>
      {/* 🛡️ PAINEL ESQUERDO: Branding de Alta Confiança Dedicado */}
      <section className="hidden md:flex md:w-5/12 bg-emerald-900 text-white p-8 xl:p-12 flex-col justify-between h-full relative overflow-hidden shrink-0 select-none">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <img
            src="/Xitique-logo-transparent-compressed.svg"
            alt="Xitique Logo"
            className="w-9 h-9 object-contain"
          />
          <span className="text-xl font-bold tracking-wide text-white">
            Xitique
          </span>
        </div>

        <div className="space-y-4 my-auto relative z-10">
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white flex flex-wrap items-center gap-x-2">
            <span>Pagamento via</span>
            <span className="relative inline-flex items-center h-9 w-36 overflow-hidden align-middle">
              <span
                className={`absolute left-0 transition-all duration-500 ease-in-out ${
                  method === "emola"
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-2 invisible pointer-events-none"
                }`}
              >
                e-Mola
              </span>
              <span
                className={`absolute left-0 transition-all duration-500 ease-in-out ${
                  method === "mpesa"
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 translate-y-2 invisible pointer-events-none"
                }`}
              >
                M-Pesa
              </span>
            </span>
          </h1>
          <p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-sm opacity-90">
            Complete o seu ciclo com segurança. Introduza o seu número de
            telemóvel para receber a solicitação de pagamento instantânea no seu
            dispositivo.
          </p>
        </div>

        <div className="space-y-3 mt-auto relative z-10 w-full">
          <div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-4 flex gap-3.5 items-center cursor-default">
            <Lock className="text-emerald-400 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold text-xs tracking-wider text-white uppercase">
                Transação Encriptada
              </p>
              <p className="text-emerald-300 text-xs mt-0.5 leading-relaxed">
                Certifique-se de que tem saldo suficiente e que o seu PIN de
                validação está pronto no seu telemóvel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAINEL DIREITO: Interface Transacional Compacta */}
      <section className="w-full md:w-7/12 bg-[#f8faf6] flex flex-col justify-between items-center px-6 sm:px-10 md:px-12 py-8 h-full overflow-hidden">
        <div className="w-full max-w-md h-8 shrink-0" />

        <div className="w-full max-w-md flex-1 flex flex-col justify-center gap-5">
          {/* Escolha da Carteira */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e7e9e5] p-5 space-y-4 transition-all duration-300 hover:shadow-md">
            <span className="text-[11px] font-bold text-[#404944] uppercase tracking-wider block">
              Escolha a sua Carteira:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleMethodChange("emola")}
                className={`group flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  method === "emola"
                    ? "border-[#F37227] bg-[#F37227]/5 shadow-sm ring-1 ring-[#F37227]/20 scale-[1.02]"
                    : "border-[#e7e9e5] bg-white hover:bg-[#F37227]/5 hover:border-[#F37227]/40 active:scale-[0.98] disabled:opacity-50"
                }`}
              >
                <div className="h-9 w-20 flex items-center justify-center">
                  <EMolaIcon className="h-full w-auto object-contain" />
                </div>
                <span
                  className={`text-xs font-bold mt-2 transition-colors ${method === "emola" ? "text-[#F37227]" : "text-[#404944]"}`}
                >
                  e-Mola Movitel
                </span>
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleMethodChange("mpesa")}
                className={`group flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                  method === "mpesa"
                    ? "border-[#E60000] bg-[#E60000]/5 shadow-sm ring-1 ring-[#E60000]/20 scale-[1.02]"
                    : "border-[#e7e9e5] bg-white hover:bg-[#E60000]/5 hover:border-[#E60000]/40 active:scale-[0.98] disabled:opacity-50"
                }`}
              >
                <div className="h-9 w-20 flex items-center justify-center">
                  <MPesaIcon className="h-full w-auto object-contain" />
                </div>
                <span
                  className={`text-xs font-bold mt-2 transition-colors ${method === "mpesa" ? "text-[#E60000]" : "text-[#404944]"}`}
                >
                  M-Pesa Vodacom
                </span>
              </button>
            </div>
          </div>

          {/* Formulário */}
          <form
            key={`form-${shakeKey}`}
            onSubmit={handlePayment}
            className={`bg-white rounded-xl shadow-sm border border-[#e7e9e5] p-5 space-y-4 transition-all duration-300 hover:shadow-md ${isProcessing ? "opacity-60 pointer-events-none" : ""}`}
          >
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-[#404944] mb-2 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-x-1">
                  <span>Número de Telemóvel</span>
                  <span className="relative inline-flex items-center h-4 w-16 overflow-hidden align-middle">
                    <span
                      className={`absolute left-0 transition-all duration-500 ease-in-out ${
                        method === "emola"
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-1 invisible pointer-events-none"
                      }`}
                    >
                      Movitel
                    </span>
                    <span
                      className={`absolute left-0 transition-all duration-500 ease-in-out ${
                        method === "mpesa"
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 translate-y-1 invisible pointer-events-none"
                      }`}
                    >
                      Vodacom
                    </span>
                  </span>
                </div>

                {/* Texto Curto Sem Menção à Operadora */}
                <span
                  key={`text-${shakeKey}`}
                  className={`text-[10px] font-bold transition-all duration-300 ${
                    showError
                      ? "opacity-100 translate-x-0 shake-text font-extrabold"
                      : "opacity-0 translate-x-2 pointer-events-none text-[#707974]"
                  } ${method === "emola" ? "text-[#F37227]" : "text-[#E60000]"}`}
                >
                  {errorMessage}
                </span>
              </label>

              {/* Contornos mapeados */}
              <div
                className={`relative flex items-center rounded-lg border-2 transition-all duration-200 overflow-hidden focus-within:border-2 focus-within:bg-white ${
                  method === "emola"
                    ? showError
                      ? "border-[#F37227] bg-[#F37227]/5 focus-within:border-[#F37227]"
                      : "border-[#e7e9e5] bg-[#f2f4f1] focus-within:border-[#F37227]/70"
                    : showError
                      ? "border-[#E60000] bg-[#E60000]/5 focus-within:border-[#E60000]"
                      : "border-[#e7e9e5] bg-[#f2f4f1] focus-within:border-[#E60000]/70"
                }`}
              >
                <div className="pl-4 pr-3 flex items-center pointer-events-none border-r border-[#e7e9e5]/80 h-full py-3.5 bg-[#eceeeb]/50 select-none">
                  <span className='font-["JetBrains_Mono"] font-medium text-sm text-[#707974]'>
                    +258
                  </span>
                </div>

                <div className="relative flex-1 h-full py-3.5">
                  {phoneNumber.length === 0 && (
                    <div className="absolute inset-0 pl-3 flex items-center pointer-events-none overflow-hidden select-none">
                      <span className="relative w-full h-full flex items-center">
                        <span
                          className={`absolute left-0 font-["JetBrains_Mono"] text-base text-[#707974]/40 tracking-wider transition-all duration-500 ease-in-out ${
                            method === "emola"
                              ? "opacity-100 translate-y-0 visible"
                              : "opacity-0 -translate-y-2 invisible"
                          }`}
                        >
                          87XXXXXXX
                        </span>
                        <span
                          className={`absolute left-0 font-["JetBrains_Mono"] text-base text-[#707974]/40 tracking-wider transition-all duration-500 ease-in-out ${
                            method === "mpesa"
                              ? "opacity-100 translate-y-0 visible"
                              : "opacity-0 translate-y-2 invisible"
                          }`}
                        >
                          84XXXXXXX
                        </span>
                      </span>
                    </div>
                  )}
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    required
                    pattern="[0-9]{9}"
                    disabled={isProcessing}
                    className='block w-full pl-3 pr-4 bg-transparent border-0 focus:ring-0 font-["JetBrains_Mono"] text-base text-[#191c1b] tracking-wider outline-none relative z-10'
                  />
                </div>

                <div
                  className={`pr-4 transition-colors ${
                    phoneNumber.length === 9 && !showError
                      ? "text-[#10B981]"
                      : method === "emola"
                        ? "text-[#F37227]"
                        : "text-[#E60000]"
                  }`}
                >
                  <Phone className="h-5 w-5" />
                </div>
              </div>

              {/* Ponto (dot) Dinâmico */}
              <p className="mt-2 text-[11px] text-[#707974] flex items-center gap-1.5 select-none">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 inline-block transition-colors duration-300 ${
                    method === "emola" ? "bg-[#F37227]" : "bg-[#E60000]"
                  }`}
                />
                Enviaremos um Push USSD interativo para o seu telemóvel.
              </p>
            </div>
          </form>

          {/* Bento Box Resumo */}
          <div className="grid grid-cols-2 gap-3 select-none">
            <div className="bg-[#eceeeb] p-3.5 rounded-xl border border-[#e7e9e5] transition-all duration-200 hover:shadow-sm">
              <span className="text-[10px] font-semibold text-[#707974] block mb-0.5 uppercase tracking-wider">
                Plano Selecionado
              </span>
              <span className="text-sm font-bold text-[#191c1b] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" /> Pro
              </span>
            </div>
            <div className="bg-[#eceeeb] p-3.5 rounded-xl border border-[#e7e9e5] transition-all duration-200 hover:shadow-sm">
              <span className="text-[10px] font-semibold text-[#707974] block mb-0.5 uppercase tracking-wider">
                Total a Pagar
              </span>
              <span className='font-["Montserrat"] text-sm font-bold text-[#003527]'>
                1.500 MZN
              </span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-2.5">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full text-white py-3.5 rounded-xl font-["Montserrat"] font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-[0.98] ${
                isProcessing
                  ? "bg-[#10B981]/70 cursor-not-allowed shadow-none"
                  : "bg-[#10B981] hover:bg-[#10B981]/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#10B981]/30"
              }`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  A processar...
                </>
              ) : (
                "Confirmar Pagamento"
              )}
            </button>

            <button
              type="button"
              disabled={isProcessing}
              className="w-full py-2.5 bg-transparent hover:bg-[#eceeeb] text-xs text-[#707974] hover:text-[#191c1b] font-medium rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 focus:outline-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Cancelar Transação
            </button>
          </div>
        </div>

        {/* Rodapé de Segurança */}
        <div className="w-full max-w-md flex items-center justify-center gap-6 border-t border-[#e7e9e5] pt-4 shrink-0 select-none text-[11px] font-semibold text-[#404944]">
          <div className="flex items-center gap-1.5 opacity-60">
            <Lock className="h-3.5 w-3.5" />
            <span>PCI DSS Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 opacity-60">
            <Shield className="h-3.5 w-3.5" />
            <span>SSL Secured</span>
          </div>
        </div>
      </section>

      {/* Botão de Suporte */}
      <button
        type="button"
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#10B981] hover:bg-[#10B981]/90 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group"
      >
        <HelpCircle className="h-5 w-5" />
      </button>
    </div>
  );
}

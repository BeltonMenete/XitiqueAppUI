import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle,
  Verified,
  Info,
  ArrowRight,
  Download,
  Lock,
  Shield,
} from "lucide-react";

export const Route = createFileRoute("/organization/_auth/payments/success")({
  component: RouteComponent,
});

function RouteComponent() {
  // Handler para download do recibo
  const handleDownloadReceipt = () => {
    console.log("A descarregar recibo...");
  };

  return (
    <div className="h-screen w-screen flex bg-[#f8faf6] font-['Inter'] selection:bg-emerald-900/10 overflow-hidden">
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
          <div className="h-1 w-12 bg-[#10B981] rounded-full" />
          <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
            Ciclo Iniciado!
          </h1>
          <p className="text-emerald-100 text-sm xl:text-base leading-relaxed max-w-sm opacity-90">
            A segurança dos seus fundos é a nossa prioridade. Cada cêntimo
            ticado é um passo firme em direção à prosperidade da sua comunidade.
          </p>
        </div>

        <div className="space-y-3 mt-auto relative z-10 w-full">
          <div className="border border-emerald-700/60 bg-emerald-950/20 rounded-xl p-4 flex gap-3.5 items-center cursor-default">
            <Lock className="text-emerald-400 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold text-xs tracking-wider text-white uppercase">
                Ambiente Protegido
              </p>
              <p className="text-emerald-300 text-xs mt-0.5 leading-relaxed">
                A sua transação foi processada com encriptação bancária de ponta
                a ponta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PAINEL DIREITO: CONFIRMAÇÃO & RECIBO ESTÁTICO ================= */}
      <section className="w-full md:w-7/12 bg-[#f8faf6] flex flex-col justify-between items-center px-6 sm:px-10 md:px-12 py-8 h-full overflow-hidden">
        <div className="w-full max-w-md h-8 shrink-0" />

        <div className="w-full max-w-md flex-1 flex flex-col justify-center gap-5">
          {/* Cabeçalho de Sucesso */}
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#10B981]/10 text-[#10B981] mb-1">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Pagamento Confirmado!
            </h2>
            <p className="text-xs sm:text-sm text-black/70 font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
              A sua organização já está ativa e pronta para começar a ticar.
              Bem-vindo à nova era da gestão financeira comunitária em
              Moçambique.
            </p>
          </div>

          {/* Card do Recibo Tátil Estático */}
          <div className="bg-white border border-[#e7e9e5] rounded-xl p-5 shadow-sm space-y-4 relative overflow-hidden select-none">
            <div className="flex justify-between items-center border-b border-[#e7e9e5] pb-3">
              <div className="text-left">
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block">
                  Recibo de Transação
                </span>
                <h3 className="text-sm sm:text-base font-bold text-black mt-0.5">
                  Plano Premium Mensal
                </h3>
              </div>
              <Verified className="text-[#10B981] h-5 w-5 shrink-0" />
            </div>

            {/* Informações da Transação */}
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                  Número da Transação
                </p>
                <p className="font-['JetBrains_Mono'] text-xs font-medium text-black">
                  #XM-2026-998102
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                  Próxima Cobrança
                </p>
                <p className="text-xs font-bold text-black">
                  27 de Julho, 2026
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                  Valor Pago
                </p>
                <p className="font-['Montserrat'] text-base font-bold text-[#003527]">
                  1.500,00 MZN
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-black/40">
                  Estado
                </p>
                <div>
                  <span className="inline-flex items-center gap-1 bg-[#10B981]/5 text-[#10B981] px-2 py-0.5 rounded-full text-[10px] font-bold border border-[#10B981]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    ATIVO
                  </span>
                </div>
              </div>
            </div>

            {/* Linha Divisória de Segurança */}
            <div className="border-t border-dashed border-[#e7e9e5] pt-3">
              <div className="flex items-center gap-2 text-black/70 bg-[#eceeeb]/50 p-2.5 rounded-lg text-left border border-[#e7e9e5]/40">
                <Info className="h-4 w-4 text-[#707974] shrink-0" />
                <p className="text-[11px] font-medium leading-tight text-[#404944]">
                  Uma cópia deste recibo foi enviada para o seu email registado.
                </p>
              </div>
            </div>
          </div>

          {/* Ações / Botões Principais */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              className="flex-1 bg-[#10B981] hover:bg-[#10B981]/90 text-white font-['Montserrat'] font-bold text-xs py-3.5 px-5 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              Ir para o Painel
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={handleDownloadReceipt}
              className="flex-1 border-2 border-[#e7e9e5] text-[#404944] font-['Montserrat'] font-bold text-xs py-3.5 px-5 rounded-xl flex items-center justify-center gap-1.5 bg-transparent hover:bg-[#eceeeb] hover:text-[#191c1b] transition-all duration-200 active:scale-[0.98]"
            >
              <Download className="h-3.5 w-3.5" />
              Recibo (PDF)
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
    </div>
  );
}

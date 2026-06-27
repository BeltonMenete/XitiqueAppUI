// /routes/client/_auth/step-4.tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Globe,
  User,
  UserCheck,
  Coins,
  ShieldCheck,
  Landmark,
  Building2,
  MapPin,
} from "lucide-react";
import { APP_NAME } from "#/lib/constants";
import { ClientSidebar } from "#/components/ClientSidebar";

export const Route = createFileRoute("/client/_auth/step-4")({
  component: StepFourReview,
});

function StepFourReview() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dados reais/simulados do utilizador incluindo a seleção do Passo 0
  const mockData = {
    phoneNumber: "+258 84 000 0000",
    fullName: "Maria Isabel dos Santos",
    occupation: "Vendedora de Mercado",
    dailyRate: 500,
    totalEstimated: 14500,
    // Dados da Organização Escolhida
    province: "Gaza",
    district: "Chókwè",
    organizationName: "Cooperativa Agrícola de Poupança de Chókwè",
    managerName: "Maria Macuácua",
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Registo finalizado:", mockData);
      // Avança para o ecrã final de sucesso (Passo 5)
      navigate({ to: "/client/step-5" });
    } catch (error) {
      console.error("Erro ao finalizar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10 font-sans">
      {/* Painel Esquerdo Visual Modular */}
      <ClientSidebar />

      {/* Painel Direito - Layout Limpo e Sem Ruído */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 bg-slate-50 h-full overflow-y-auto relative">
        {/* Cabeçalho Superior Minimalista */}
        <div className="flex justify-between items-center w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 select-none">
            <img
              alt="Xitique Logo"
              className="w-7 h-7 object-contain"
              src="/xitique-logo.svg"
            />
            <span className="text-base font-bold text-gray-950 tracking-tight">
              {APP_NAME}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded-md select-none">
              Passo 4 de 5
            </span>
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

        {/* Bloco Central - Foco Total na Revisão Limpa */}
        <div className="w-full max-w-md mx-auto my-auto py-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <header className="mb-6 select-none">
            <h1 className="text-xl font-bold text-gray-900 mb-1.5 tracking-tight">
              Confirme os seus dados
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              Verifique se todas as informações estão corretas antes de concluir
              a sua adesão.
            </p>
          </header>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Grid Bento Box - Estilo Tonal Sem Bordas Pesadas */}
            <div className="space-y-3">
              {/* NOVO CARD: Organização e Localização Escolhida */}
              <div className="p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start gap-3.5">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 shrink-0 mt-0.5">
                  <Building2 size={18} />
                </div>
                <div className="flex flex-col w-full select-none">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    Organização Selecionada
                  </span>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-tight">
                        {mockData.organizationName}
                      </span>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">
                        Organizador:{" "}
                        <strong className="text-gray-600 font-semibold">
                          {mockData.managerName}
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1.5 border-t border-slate-100 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />{" "}
                        {mockData.province}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{mockData.district}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 1: Conta */}
              <div className="p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-3.5">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 shrink-0">
                  <User size={18} />
                </div>
                <div className="flex flex-col select-none">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Conta
                  </span>
                  <span className="text-sm font-mono font-bold text-gray-900 mt-0.5 tracking-tight">
                    {mockData.phoneNumber}
                  </span>
                </div>
              </div>

              {/* Card 2: Perfil */}
              <div className="p-4 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-start gap-3.5">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 shrink-0 mt-0.5">
                  <UserCheck size={18} />
                </div>
                <div className="flex flex-col w-full select-none">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Perfil
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400">
                        Nome Completo
                      </span>
                      <span className="text-xs font-semibold text-gray-900 truncate mt-0.5">
                        {mockData.fullName}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400">
                        Ocupação
                      </span>
                      <span className="text-xs font-semibold text-gray-900 truncate mt-0.5">
                        {mockData.occupation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Compromisso Mensal */}
              <div className="p-5 bg-emerald-900 text-white rounded-xl shadow-md relative overflow-hidden select-none">
                <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                  <Coins size={90} />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Coins size={14} className="text-emerald-300" />
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                    Compromisso de Poupança
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-200/70">
                      Contribuição Diária
                    </span>
                    <span className="text-base font-black tracking-tight mt-0.5">
                      {mockData.dailyRate} MZN
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-emerald-200/70">
                      Total Estimado (Mês)
                    </span>
                    <span className="text-base font-black tracking-tight text-amber-400 mt-0.5">
                      {mockData.totalEstimated.toLocaleString("pt-MZ")} MZN
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/10 text-[9px] text-emerald-200/60 italic">
                  * Simulação baseada em 29 dias úteis de contribuição ativa.
                </div>
              </div>
            </div>

            {/* Ações Finais Espaçadas */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 active:scale-[0.99]"
              >
                <span>
                  {isSubmitting ? "A processar..." : "Concluir Registo"}
                </span>
                <CheckCircle size={14} />
              </button>

              <button
                type="button"
                onClick={() => navigate({ to: "/client/step-3" })}
                className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-emerald-700 flex items-center justify-center gap-1 group transition-colors"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Voltar para o passo anterior
              </button>
            </div>
          </form>
        </div>

        {/* Rodapé de Segurança Compacto */}
        <div className="pt-4 border-t border-gray-200/50 text-center w-full max-w-sm mx-auto select-none space-y-3">
          <p className="text-[9px] text-gray-400 leading-relaxed">
            Ao concluir, confirma a veracidade dos dados e aceita os termos de
            segurança do Xitique Digital. Os seus fundos são protegidos por
            encriptação ponta-a-ponta.
          </p>
          <div className="flex justify-center gap-5 text-gray-400">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
              <Landmark size={12} className="text-emerald-600" />
              Ambiente Seguro
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider">
              <ShieldCheck size={12} className="text-emerald-600" />
              Dados Protegidos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

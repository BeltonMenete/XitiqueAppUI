import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Shield, Landmark, Building2, User, BadgeCheck, Pencil } from "lucide-react";

export const Route = createFileRoute("/organization/_auth/step-4")({
  component: StepFour,
});

function StepFour() {
  const navigate = useNavigate();

  const organization = {
    name: "Cooperativa Agrícola de Boane",
    nuit: "400123456",
    location: "Boane, Maputo"
  };

  const owner = {
    name: "Amélia Matsinhe",
    email: "amelia.matsinhe@exemplo.mz",
    phone: "+258 84 123 4567"
  };

  const plan = {
    name: "Xitique Pro",
    price: "1.500 MZN/mês",
    details: "Até 50 Ticantes, Relatórios Mensais, Gestão de Empréstimos."
  };

  const handleEdit = (section: string) => {
    const stepMap = {
      organization: "/organization/_auth/step-1",
      owner: "/organization/_auth/step-2",
      plan: "/organization/_auth/step-3"
    };
    /* navigate({ to: stepMap[section] }); */
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Confirmando registo...");
    navigate({ to: "/organization/step-5" }); // Agora vai pro step-5
  };

  return (
    <div className="h-screen max-h-screen w-screen flex overflow-hidden bg-white selection:bg-emerald-900/10">
      {/* Painel Esquerdo - Branding (Idêntico ao step-3) */}
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

      {/* Painel Direito - Confirmação de Dados */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-gray-50/50 h-full overflow-y-auto">
        <div className="w-full max-w-md my-auto py-2">
          {/* Stepper corrigido: PASSO 4 DE 5 */}
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-emerald-700 tracking-wider">
              PASSO 4 DE 5
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: "80%" }}
            ></div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-0.5">
            Confirmação de Dados
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Por favor, reveja as informações abaixo antes de finalizar o registo da sua conta Xitique Digital.
          </p>

          <div className="space-y-2.5 mb-5">
            {/* Card Organização */}
            <div className="relative p-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-500 hover:shadow-sm transition-all duration-200 group">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <Building2 className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-gray-500 tracking-wider mb-0.5">ORGANIZAÇÃO</p>
                  <p className="font-semibold text-sm text-gray-900 truncate">{organization.name}</p>
                  <p className="text-xs text-gray-500 truncate">NUIT: {organization.nuit} • {organization.location}</p>
                </div>
                <button
                  onClick={() => handleEdit('organization')}
                  className="text-gray-400 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all p-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card Proprietário */}
            <div className="relative p-3.5 rounded-xl border-2 border-gray-200 bg-white hover:border-emerald-500 hover:shadow-sm transition-all duration-200 group">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <User className="h-4 w-4 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-gray-500 tracking-wider mb-0.5">PROPRIETÁRIO</p>
                  <p className="font-semibold text-sm text-gray-900 truncate">{owner.name}</p>
                  <p className="text-xs text-gray-500 truncate">{owner.email} • {owner.phone}</p>
                </div>
                <button
                  onClick={() => handleEdit('owner')}
                  className="text-gray-400 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all p-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card Plano Selecionado */}
            <div className="relative p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50/30 hover:shadow-sm transition-all duration-200">
              <div className="absolute -top-2 right-4 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                Popular
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-gray-500 tracking-wider mb-0.5">PLANO SELECCIONADO</p>
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {plan.name} <span className="font-normal text-xs text-gray-500">{plan.price}</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">{plan.details}</p>
                </div>
                <button
                  onClick={() => handleEdit('plan')}
                  className="text-gray-400 hover:text-emerald-600 hover:scale-110 active:scale-95 transition-all p-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-2">
            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 hover:shadow-md text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Confirmar e Continuar <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate({ to: "/organization/step-3" })}
              className="w-full border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-600 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-sm active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para Planos
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            Precisa de ajuda?{" "}
            <a
              href="#"
              className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline focus:outline-none focus:underline transition-colors"
            >
              Contactar Suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}